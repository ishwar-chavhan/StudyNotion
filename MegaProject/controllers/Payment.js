const { instance } = require("../config/razorpay");
const Course = require("../models/course");
const User = require("../models/User");
const mailSender = require("../utils/mailSender");
require("dotenv").config();
const crypto = require("crypto");
const { default: mongoose } = require("mongoose");
const { paymentSuccessEmail } = require("../templates/paymentSuccessEmail");
const { courseEnrollmentEmail } = require("../templates/courseEnrollmentEmail");
const courseProgress = require("../models/courseProgress");

// ─── capturePayment ──────────────────────────────────────────────────────────
exports.capturePayment = async (req, res) => {
    const { courses } = req.body;
    const userId = req.user.id;

    if (!courses || courses.length === 0) {
        return res.status(400).json({
            success: false,
            message: "Please provide at least one valid course ID",
        });
    }

    let totalAmount = 0;

    for (const course_id of courses) {
        let course;
        try {
            course = await Course.findById(course_id);
            if (!course) {
                return res.status(404).json({
                    success: false,
                    message: `Course not found: ${course_id}`,
                });
            }

            const uid = new mongoose.Types.ObjectId(userId);
            if (course.studentEnrolled.includes(uid)) {
                return res.status(400).json({
                    success: false,
                    message: `You are already enrolled in: ${course.courseName}`,
                });
            }

            totalAmount += course.price;
        } catch (err) {
            return res.status(500).json({
                success: false,
                message: err.message,
            });
        }
    }

    const options = {
        amount: totalAmount * 100,
        currency: "INR",
        receipt: `rcpt_${Date.now()}`,
        notes: {
            // Store courseIds in order notes for verification
            courseIds: JSON.stringify(courses),
            userId: userId.toString(),
        },
    };

    try {
        const paymentResponse = await instance.orders.create(options);
        return res.status(200).json({
            success: true,
            data: paymentResponse,
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Could not initiate payment order",
        });
    }
};

// ─── verifyPayment ────────────────────────────────────────────────────────────
exports.verifyPayment = async (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, courses } = req.body;
    const userId = req.user.id;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !courses || !userId) {
        return res.status(400).json({
            success: false,
            message: "Missing payment verification fields",
        });
    }

    // 1. Verify HMAC signature
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
        .createHmac("sha256", process.env.RAZORPAY_SECRET)
        .update(body.toString())
        .digest("hex");

    if (expectedSignature !== razorpay_signature) {
        return res.status(400).json({
            success: false,
            message: "Payment verification failed: invalid signature",
        });
    }

    // 2. Fetch the order from Razorpay and confirm the courses match
    try {
        const order = await instance.orders.fetch(razorpay_order_id);
        const orderedCourseIds = JSON.parse(order.notes?.courseIds || "[]");

        // Sort both arrays for comparison
        const sortedRequested = [...courses].sort().join(",");
        const sortedOrdered = [...orderedCourseIds].sort().join(",");

        if (sortedRequested !== sortedOrdered) {
            return res.status(400).json({
                success: false,
                message: "Payment verification failed: course mismatch",
            });
        }
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Could not verify order details with payment provider",
        });
    }

    // 3. Enroll the student
    try {
        await enrollStudent(courses, userId);
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message || "Enrollment failed",
        });
    }

    return res.status(200).json({
        success: true,
        message: "Payment verified and enrollment successful",
    });
};

// ─── enrollStudent (internal helper — throws on error) ────────────────────────
async function enrollStudent(courses, userId) {
    if (!courses || !userId) {
        throw new Error("courses and userId are required for enrollment");
    }

    for (const courseId of courses) {
        // Prevent duplicate enrollment
        const course = await Course.findById(courseId);
        if (!course) throw new Error(`Course not found: ${courseId}`);

        const uid = new mongoose.Types.ObjectId(userId);
        if (course.studentEnrolled.includes(uid)) {
            continue; // already enrolled, skip without error
        }

        const enrolledCourse = await Course.findByIdAndUpdate(
            courseId,
            { $push: { studentEnrolled: userId } },
            { new: true }
        );

        if (!enrolledCourse) throw new Error(`Could not enroll in course: ${courseId}`);

        const courseprogress = await courseProgress.create({
            courseId,
            userId,
            completedVideo: [],
        });

        const enrolledStudent = await User.findByIdAndUpdate(
            userId,
            {
                $push: {
                    courses: courseId,
                    courseProgress: courseprogress._id,
                },
            },
            { new: true }
        );

        // Send enrollment confirmation email (non-blocking)
        mailSender(
            enrolledStudent.email,
            `Successfully enrolled in ${enrolledCourse.courseName}`,
            courseEnrollmentEmail(enrolledCourse.courseName, `${enrolledStudent.firstName}`)
        ).catch(() => {});
    }
}

// ─── sendPaymentSuccessEmail ──────────────────────────────────────────────────
exports.sendPaymentSuccessEmail = async (req, res) => {
    const { orderId, paymentId, amount } = req.body;
    const userId = req.user.id;

    if (!orderId || !paymentId || !amount || !userId) {
        return res.status(400).json({
            success: false,
            message: "Please provide all required fields",
        });
    }

    try {
        const enrolledStudent = await User.findById(userId);
        if (!enrolledStudent) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        await mailSender(
            enrolledStudent.email,
            "Payment Receipt – StudyNotion",
            paymentSuccessEmail(
                `${enrolledStudent.firstName} ${enrolledStudent.lastName}`,
                amount / 100,
                orderId,
                paymentId
            )
        );

        return res.status(200).json({
            success: true,
            message: "Payment success email sent",
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Could not send payment success email",
        });
    }
};

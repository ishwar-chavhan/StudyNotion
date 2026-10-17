const express = require("express");
const router = express.Router();

const { updateCourseProgress } = require("../controllers/courseProgress.js");

const {
    createCourse,
    showAllCourses,
    getAllCourseDetails,
    editCourse,
    getAllCourseByUserId,
    deleteCourseOfUser,
    getCourseByCourseId,
} = require("../controllers/Course");

const {
    createCategory,
    showAllCategories,
    categoryPageDetails,
} = require("../controllers/Category.js");

const {
    createSection,
    updateSection,
    deleteSection,
} = require("../controllers/Section.js");

const {
    createSubSection,
    updateSubSection,
    deleteSubSection,
} = require("../controllers/Subsection.js");

const {
    creatRating,
    getAverageRating,
    getAllRating,
} = require("../controllers/RatingAndReview.js");

const { auth, isStudent, isInstructor, isAdmin } = require("../middlewares/auth.js");
const Course = require("../models/course");

// Ownership guard: verifies the logged-in instructor owns the course
// Reads courseId from req.body OR req.params
async function verifyInstructorOwnership(req, res, next) {
    try {
        const courseId = req.body.courseId || req.params.courseId;
        if (!courseId) {
            return res.status(400).json({ success: false, message: "courseId is required" });
        }
        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({ success: false, message: "Course not found" });
        }
        if (course.instructor.toString() !== req.user.id.toString()) {
            return res.status(403).json({
                success: false,
                message: "Access denied: you do not own this course",
            });
        }
        next();
    } catch (err) {
        return res.status(500).json({ success: false, message: "Could not verify course ownership" });
    }
}

// ─── Course routes ────────────────────────────────────────────────────────────
router.post("/createCourse", auth, isInstructor, createCourse);
router.post("/editCourse", auth, isInstructor, verifyInstructorOwnership, editCourse);
router.delete("/deleteCourse", auth, isInstructor, verifyInstructorOwnership, deleteCourseOfUser);

// ─── Section routes ───────────────────────────────────────────────────────────
router.post("/addSection", auth, isInstructor, verifyInstructorOwnership, createSection);
router.post("/updateSection", auth, isInstructor, verifyInstructorOwnership, updateSection);
router.post("/deleteSection", auth, isInstructor, verifyInstructorOwnership, deleteSection);

// ─── SubSection routes ────────────────────────────────────────────────────────
router.post("/addSubSection", auth, isInstructor, verifyInstructorOwnership, createSubSection);
router.post("/updateSubSection", auth, isInstructor, verifyInstructorOwnership, updateSubSection);
router.post("/deleteSubSection", auth, isInstructor, verifyInstructorOwnership, deleteSubSection);

// ─── Read routes ──────────────────────────────────────────────────────────────
router.get("/getAllCourses", showAllCourses);
router.get("/getCourseDetails/:courseId", auth, getAllCourseDetails);
router.get("/getAllCourseByUserId", auth, isInstructor, getAllCourseByUserId);
router.get("/getCourseByCourseId/:courseId", auth, getCourseByCourseId);

// ─── Category routes ──────────────────────────────────────────────────────────
router.post("/createCategory", auth, isAdmin, createCategory);
router.get("/showAllCategories", showAllCategories);
router.post("/getCategoryPageDetails", categoryPageDetails);

// ─── Rating & Review routes ───────────────────────────────────────────────────
router.post("/createRating", auth, isStudent, creatRating);
router.get("/getAverageRating", getAverageRating);
router.get("/getReviews", getAllRating);

// ─── Course Progress ──────────────────────────────────────────────────────────
router.post("/updatedCourseProgress", auth, isStudent, updateCourseProgress);

module.exports = router;

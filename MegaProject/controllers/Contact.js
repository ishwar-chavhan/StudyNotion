const mailSender = require("../utils/mailSender");

exports.contactUs = async (req, res) => {
    try {
        const { firstName, lastName, email, message, phoneNo, countryCode } = req.body;

        if (!firstName || !email || !message) {
            return res.status(400).json({
                success: false,
                message: "firstName, email, and message are required",
            });
        }

        const fullName = `${firstName} ${lastName || ""}`.trim();

        // Send notification to admin/support
        await mailSender(
            process.env.MAIL_USER,
            `StudyNotion Contact Form – ${fullName}`,
            `<h2>New contact form submission</h2>
             <p><strong>Name:</strong> ${fullName}</p>
             <p><strong>Email:</strong> ${email}</p>
             <p><strong>Phone:</strong> ${countryCode ? countryCode + " " : ""}${phoneNo || "N/A"}</p>
             <p><strong>Message:</strong></p>
             <p>${message}</p>`
        );

        // Send auto-reply to the user
        await mailSender(
            email,
            "We received your message – StudyNotion",
            `<p>Hi ${fullName},</p>
             <p>Thank you for reaching out! We have received your message and will get back to you within 24–48 hours.</p>
             <p>Best regards,<br/>StudyNotion Team</p>`
        );

        return res.status(200).json({
            success: true,
            message: "Your message has been sent successfully",
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to send your message. Please try again.",
        });
    }
};

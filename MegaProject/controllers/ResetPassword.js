const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

// Helper: hash the raw token before storing
function hashToken(raw) {
    return crypto.createHash("sha256").update(raw).digest("hex");
}

exports.resetPasswordToken = async (req, res) => {
    try {
        const email = req.body.email;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(403).json({
                success: false,
                message: "This email is not registered",
            });
        }

        // Generate a raw token, store only its hash
        const rawToken = crypto.randomBytes(32).toString("hex");
        const hashedToken = hashToken(rawToken);

        await User.findOneAndUpdate(
            { email },
            {
                token: hashedToken,
                resetPasswordExpires: Date.now() + 5 * 60 * 60 * 1000,
            },
            { new: true }
        );

        const frontendUrl = process.env.FRONTEND_URL || "http://localhost:3000";
        const resetURL = `${frontendUrl}/update-password/${rawToken}`;

        await mailSender(
            email,
            "Password reset link – StudyNotion",
            `<p>Click the link below to reset your password. It expires in 5 hours.</p>
             <a href="${resetURL}">${resetURL}</a>`
        );

        return res.json({
            success: true,
            message: "Password reset email sent successfully. Please check your inbox.",
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error while sending reset email. Please try again.",
        });
    }
};

exports.resetPassword = async (req, res) => {
    try {
        const { password, confirmPassword, token } = req.body;

        if (!password || !confirmPassword || !token) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        if (password !== confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "Passwords do not match",
            });
        }

        if (password.length < 8) {
            return res.status(400).json({
                success: false,
                message: "Password must be at least 8 characters",
            });
        }

        // Look up by hashed token
        const hashedToken = hashToken(token);
        const userDetails = await User.findOne({ token: hashedToken });

        if (!userDetails) {
            return res.status(400).json({
                success: false,
                message: "Invalid or expired reset token",
            });
        }

        if (userDetails.resetPasswordExpires < Date.now()) {
            return res.status(400).json({
                success: false,
                message: "Reset token has expired. Please request a new one.",
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await User.findOneAndUpdate(
            { token: hashedToken },
            {
                password: hashedPassword,
                token: null,
                resetPasswordExpires: null,
            },
            { new: true }
        );

        // Fire-and-forget confirmation email
        mailSender(
            userDetails.email,
            "Your StudyNotion password was reset",
            "<p>Your password has been successfully reset. If you did not request this, please contact support immediately.</p>"
        ).catch(() => { });

        return res.json({
            success: true,
            message: "Password reset successfully",
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error while resetting password. Please try again.",
        });
    }
};

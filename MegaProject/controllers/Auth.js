const User = require("../models/User");
const OTP = require("../models/OTP");
const otpGenerator = require("otp-generator");
const Profile = require("../models/Profile");
const bcrypt = require("bcrypt");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const mailSender = require("../utils/mailSender");

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const ALLOWED_ACCOUNT_TYPES = ["Student", "Instructor"];

// Send OTP
exports.sendOTP = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email || !EMAIL_REGEX.test(email)) {
            return res.status(400).json({
                success: false,
                message: "Please provide a valid email address",
            });
        }

        const checkUserPresent = await User.findOne({ email });
        if (checkUserPresent) {
            return res.status(409).json({
                success: false,
                message: "User already registered with this email",
            });
        }

        const otp = otpGenerator.generate(6, {
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            specialChars: false,
        });

        // OTP model pre-save hook sends the email; if it throws we catch it here
        try {
            await OTP.create({ email, otp });
        } catch (emailErr) {
            return res.status(500).json({
                success: false,
                message: "Failed to send OTP email. Please try again.",
            });
        }

        return res.status(200).json({
            success: true,
            message: "OTP sent successfully. Please check your email.",
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error while generating OTP",
        });
    }
};

// Sign Up
exports.signUp = async (req, res) => {
    try {
        const {
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
            accountType,
            otp,
        } = req.body;

        if (!firstName || !lastName || !email || !password || !confirmPassword || !otp) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        if (!EMAIL_REGEX.test(email)) {
            return res.status(400).json({
                success: false,
                message: "Please provide a valid email address",
            });
        }

        if (password.length < 8) {
            return res.status(400).json({
                success: false,
                message: "Password must be at least 8 characters",
            });
        }

        if (password !== confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "Passwords do not match",
            });
        }

        // Prevent Admin self-registration; only allow Student or Instructor
        if (!ALLOWED_ACCOUNT_TYPES.includes(accountType)) {
            return res.status(400).json({
                success: false,
                message: "Account type must be 'Student' or 'Instructor'",
            });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: "User already exists. Please log in.",
            });
        }

        // Fetch most recent OTP for this email
        const recentOtp = await OTP.findOne({ email }).sort({ createdAt: -1 });
        if (!recentOtp) {
            return res.status(400).json({
                success: false,
                message: "OTP not found or expired. Please request a new one.",
            });
        }

        if (recentOtp.otp !== otp) {
            return res.status(400).json({
                success: false,
                message: "Invalid OTP",
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const profileDetails = await Profile.create({
            gender: null,
            dateOfBirth: null,
            about: null,
            contactNumber: null,
        });

        await User.create({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            accountType,
            additionDetails: profileDetails._id,
            image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,
        });

        return res.status(201).json({
            success: true,
            message: "User registered successfully",
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Registration failed. Please try again.",
        });
    }
};

// Login
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required",
            });
        }

        const user = await User.findOne({ email })
            .populate("additionDetails")
            .populate("courses")
            .exec();

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials",
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials",
            });
        }

        const payload = {
            email: user.email,
            id: user._id,
            accountType: user.accountType,
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: "24h",
        });

        // Don't expose password in response
        user.password = undefined;

        const cookieOptions = {
            expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
            httpOnly: true,
            sameSite: "strict",
        };

        return res
            .status(200)
            .cookie("token", token, cookieOptions)
            .json({
                success: true,
                token,
                user,
                message: "Logged in successfully",
            });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Login failed. Please try again.",
        });
    }
};

// Change Password
exports.changePassword = async (req, res) => {
    try {
        const userId = req.user.id;
        const userDetails = await User.findById(userId);
        if (!userDetails) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        const { password, newPassword, confirmPassword } = req.body;

        if (!password || !newPassword || !confirmPassword) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        if (newPassword.length < 8) {
            return res.status(400).json({
                success: false,
                message: "New password must be at least 8 characters",
            });
        }

        if (newPassword !== confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "New password and confirm password do not match",
            });
        }

        const isMatch = await bcrypt.compare(password, userDetails.password);
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Current password is incorrect",
            });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await User.findByIdAndUpdate(
            userId,
            { password: hashedPassword },
            { new: true }
        );

        // Fire-and-forget notification email
        mailSender(
            userDetails.email,
            "Your StudyNotion password was changed",
            "<p>Your password has been changed successfully. If you did not request this, contact support immediately.</p>"
        ).catch(() => {});

        return res.status(200).json({
            success: true,
            message: "Password changed successfully",
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Could not change password. Please try again.",
        });
    }
};

const mongoose = require("mongoose");
const mailSender = require("../utils/mailSender");

const OTPSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    otp: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 5 * 60,   // TTL index: auto-delete after 5 minutes
    },
});

async function sendVerificationEmail(email, otp) {
    await mailSender(
        email,
        "Your StudyNotion OTP",
        `<p>Your OTP for StudyNotion registration is: <strong>${otp}</strong></p>
         <p>This OTP is valid for 5 minutes. Do not share it with anyone.</p>`
    );
}

// Pre-save hook: propagate email errors so the controller can handle them
OTPSchema.pre("save", async function (next) {
    try {
        await sendVerificationEmail(this.email, this.otp);
        next();
    } catch (err) {
        next(err);   // propagate — controller catches this
    }
});

module.exports = mongoose.model("OTP", OTPSchema);
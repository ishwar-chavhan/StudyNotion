const mongoose = require("mongoose");
const mailSender = require("../utils/mailSender");

const OTPSchema = new mongoose.Schema({
    email : {
        type : String,
        required : true,
    },
    otp : {
        type : String,
        required : true,
    },
    createdAt : {
        type : Date,
        default :  Date.now,
        expires : 5*60,
    }
});


async function sendVerificationEmail(email , otp){
    try{

        const mailResponse = await mailSender(email , "verification email from studyNotion" , otp);
        console.log("email send successfully" , mailResponse);

    }catch(err){
        console.log("error occured while sending email" , err);
        throw err;
    }
}

OTPSchema.pre("save" , async function(next){
   try{ await sendVerificationEmail(this.email , this.otp);
    next();}
    catch(err){
    //    next(err);
    }
})



module.exports = mongoose.model("OTP" , OTPSchema);
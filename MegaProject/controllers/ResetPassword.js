const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const bcrypt = require("bcrypt");

exports.resetPasswordToken = async (req , res , next)=>{
    try{
        const email = req.body.email;
        const user = await User.findOne({email : email});
        if(!user){
            return res.status(403).json({
                success : false,
                message : "your email not registered"
            });
        }

        const token = crypto.randomUUID();
        const updateDetails = await User.findOneAndUpdate(
                                                            {
                                                                email : email
                                                            },
                                                            {
                                                                token : token,
                                                                resetPasswordExpires : Date.now() + 5 * 60 * 60 * 1000,
                                                            },
                                                            {
                                                                new : true
                                                            }
        )

        const URL = `http://localhost:3000/update-password/${token}`;

        await mailSender(email , "Password reset link" , `Password reset link : ${URL}`);

        return res.json({
            success : true,
            message : "email sent successfully , please check email and change password",
            token
        });
    }catch(error){

        console.log(error);
        return res.status(500).json({
            success : false,
            message : "error while reseting password"
        });

    }
}

exports.resetPassword = async (req , res)=>{
    try{
        const {password , confirmPassword , token} = req.body;
        if(password !== confirmPassword){
            return res.status(400).json({
                success : true,
                message : "password doesnt match"
            })
        }
        const userDetails = await User.findOne({token : token});
        if(!userDetails){
            return res.json({
                success : false,
                message : "token doesnt match"
            })
        }

        if(userDetails.resetPasswordExpires < Date.now()){
            return res.json({
                success : false,
                message : "token is expired please regenerate your token"
            });
        };

        const hashedPassword = await bcrypt.hash(password , 10);
        
        await User.findOneAndUpdate({token:token},{password : hashedPassword} , {new : true});

        mailSender(userDetails.email , "you have reset your password" , "password is reset");

        return res.json({
            success : true,
            message : "password is changed"
        })
    }catch(error){
        console.log(error);
        return res.status(500).json({
            success : false,
            message : "error while reseting password"
        });

    }
}


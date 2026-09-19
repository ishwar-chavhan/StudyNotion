const User = require("../models/User");
const OTP = require("../models/OTP");
const otpGenerator = require("otp-generator");
const Profile = require("../models/Profile");
const bcrypt = require("bcrypt");
require("dotenv").config();
const jwt = require("jsonwebtoken");
// const cookie = require("cookie-parser");
const mailSender = require("../utils/mailSender");

//  send otp
exports.sendOTP = async (req , res)=>{
    try{
        const {email} = req.body;
        
        const checkUserPresent = await User.findOne({email});
        if(checkUserPresent){
            return res.status(401).json({
                success : false,
                message : "user already registered"
            });
        };

            let otp = otpGenerator.generate(6 , {
                upperCaseAlphabets : false,
                lowerCaseAlphabets : false,
                specialChars : false,
            })

            // let result = await OTP.findOne({otp : otp});

            // while(result){
            // otp = otpGenerator.generate(6 , {
            //     upperCaseAlphabets : false,
            //     lowerCaseAlphabets : false,
            //     specialChars : false,
            // })

            // result = await OTP.findOne({otp : otp});
            // }


            // const otpPayload = {email , otp};

            const otpBody = await OTP.create({
                email : email,
                otp : otp
            });
            
            res.status(200).json({
                success : true,
                message : "OTP sent successfully",
                   otp : otp
            });        
    }catch(err){
        console.log(err);
        return res.status(500).json({
            success : false,
            message : "error while generating otp"
        })
    }
}




exports.signUp = async (req , res) =>{
    try{
        const {
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
            accountType,
            contactNumber,
            otp,
        } = req.body;

        if(!firstName || !lastName || !email || !password || !confirmPassword || !otp){
            return res.status(403).json({
                success : false,
                message : "enter all details in all section"
            });
        };

        if(password !== confirmPassword){
            return res.status(400).json({
                success : false,
                message : "both password doesnt match"
            });
        };

        const existingUser = await User.findOne({email});

        if(existingUser){
            return res.status(400).json({
                success : false,
                message : "user already exist please login"
            });
        };

        // fetch most recent OTP for this email and compare values
        const recentOtp = await OTP.findOne({ email }).sort({ createdAt: -1 });

        if(!recentOtp){
            return res.status(400).json({
                success : false,
                message : "OTP not found"
            });
        }
         if(recentOtp.otp != otp){
            return res.status(400).json({
                success : false,
                message : "Invalid OTP"
            });
        }

        const hashedPassword = await bcrypt.hash(password , 10);
        const profileDetails = await Profile.create({
            gender : null,
            dateOfBirth : null,
            about : null,
            contactNumber:null,
        })

      
        const user = await User.create({
            firstName,
            lastName,
            email,
            password : hashedPassword,
            accountType,
            additionDetails: profileDetails._id,
            image : `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`
        })


        // const mailResponse = await mailSender(email , "your have successfully signIn in studyNotion" , "congratulation");

        return res.status(200).json({
            success : true,
            message : "user is resistered successfully"
        })
    }catch(error){
        console.log(error);
        return res.status(500).json({
            success : false,
            message : "user can not be resistered please try again",
            error : error.message
        })
    }
}

exports.login = async (req , res)=>{
    try{

        const {email , password} = req.body;
        if(!email || !password){
            return res.status(403).json({
                success : false,
                message : "All field are required please try again"
            });
        };

        const user = await User.findOne({email}).populate("additionDetails").populate("courses").exec();
        if(!user){
            return res.status(403).json({
                success : false,
                message : "user doesnt exist please singup first"
            })
        }

        if(await bcrypt.compare(password , user.password)){
            const payload = {
                email : user.email,
                id : user._id,
                accountType : user.accountType,
            }
            const token = jwt.sign(payload , process.env.JWT_SECRET,{
                expiresIn : "2h"
            });


            user.token = token;
            user.password = undefined;

            const options = {
                expires : new Date(Date.now() + 3 * 23 * 60 * 60 * 1000),
                httpOnly : true,
            }

            res.cookie("token" , token , options).json({
                success : true,
                token ,
                user ,
                message : "logged in successfully"
            }
            );
        }
        else{
            return res.status(401).json({
                success : false,
                message : "Password is incorrect",
            });
        }
    }catch(error){
        console.log(error);
        return res.status(500).json({
            success : false,
            message : "login failure , please try again"
        });
    }
}


// home work 

exports.changePassword = async (req , res)=>{
    try{
        const userId = req.user.id;
        const userDetails = await User.findById(userId);

        const {password , newPassword , confirmPassword} = req.body;

        if(newPassword !== confirmPassword){
            return res.status(400).json({
                success : false,
                message : "password and confirm password doesnt match"
            });
        };

        if(await bcrypt.compare(password , userDetails.password)){
                
              const hashedPassword = await bcrypt.hash(newPassword , 10);
              const updatedDetails = await User.findByIdAndUpdate(
                                                                    {_id : userId},
                                                                    {
                                                                       
                                                                            password : hashedPassword,
                                                                        
                                                                    },
                                                                    {new : true}
              )
              
              try{

                const mailResponse = await mailSender(userDetails.email ," yourpassword is change " , "you have changed your password");
                // console.log(mailResponse);

              }catch(error){
                return res.json({
                    success : false,
                    message : "error while sending mail"
                })
              }
        }else
        {
            return res.json({
                success : false,
                message : "password doesnt match"
            })
        }

        return res.status(200).json({
            success : true,
            message : "password has change successfully"

        })


    }catch(error){
        return res.status(500),json({
            success : false,
            message : "password con not be changed pls try again later"
        })
    }
}

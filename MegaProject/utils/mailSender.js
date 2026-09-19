const nodemailer = require("nodemailer");
require("dotenv").config();

const mailSender = async (email , title , body)=>{
    try{
        let transporter = nodemailer.createTransport({
            host : process.env.MAIL_HOST,
            port: 587,
            secure: false,
            auth : {
                user : process.env.MAIL_USER,
                pass : process.env.MAIL_PASS,
            }
        });
//         console.log("email" , email);
//  console.log("title" , title);
//  console.log("body" , body);
        let info = await transporter.sendMail({
            from : "StudyNotion || CodeHelp -- loveBabbar",
            to : `${email}`,
            subject : `${title}`,
            html : `${body}`,
        });

        // console.log(info);
        return info;


    }catch(err){
        console.log(err.message);
        throw new Error("something is wrong")
    }
}

module.exports = mailSender;
const {instance} = require("../config/razorpay");
const Course = require("../models/course");
const User = require("../models/User");
const mailSender = require("../utils/mailSender");
// const {courseEnrollmentEmail} = require("..");
require("dotenv").config();
const crypto = require("crypto");
const { default: mongoose } = require("mongoose");
const { paymentSuccessEmail } = require("../templates/paymentSuccessEmail");
const {courseEnrollmentEmail } = require("../templates/courseEnrollmentEmail");
const courseProgress = require("../models/courseProgress");

exports.capturePayment = async(req , res)=>{
    const {courses} = req.body;
    const userId = req.user.id;
    console.log("level 1");
    if(courses.length === 0) {
        return res.status(404).json({
            success : false,
            message : "please provide valid course id"
        })
    }
    console.log("level 2");

    let totalAmount = 0;
    for(const course_id of courses){
         console.log("level 1 sub");
        //  const
        let course;
        try{
            course = await Course.findById(course_id);
            if(!course){
                 return res.status(404).json({
                            success : false,
                            message : "could not find the course"
                        })
            }
console.log("level 2 sub");
            const uid = new mongoose.Types.ObjectId(userId);
            if(course.studentEnrolled.includes(uid))
            {
                return res.json({
                    success : false,
                    message : "student is already enrolled"
                })
            }
console.log("level 3 sub");
            totalAmount += course.price;
        }catch(err){
            console.log(err)
            return res.status(500).json({
                success : false,
                message : error.message
            })
        }
    }
    console.log("level 3");

    const options = {
        amount : totalAmount * 100,
        currency : "INR",
        receipt : Math.random(Date.now()).toString(),        
    }

    try{
        const paymentResponse = await instance.orders.create(options);
         console.log("level final");
        res.json({
            success : true,
            // message : paymentResponse,
            data : paymentResponse
        })
    }catch(Error){
        console.log(error);
        return res.status(500).json({
                success : false,
                message : "could not initiate order"
        }
        )

    }

}
// payment verification 
exports.verifyPayment = async(req , res)=>{
    const razorpay_order_id = req.body?.razorpay_order_id;
    const razorpay_payment_id = req.body?.razorpay_payment_id;
    const razorpay_signature = req.body?.razorpay_signature;
    const course = req.body?.courses;
    const userId = req.user.id; 
     console.log("level1 gfgre")
    if(!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !course || !userId){
        return res.status(400).json({
            success : false,
            message : "payment failed"
        });
    }
    console.log("level2 grdrg")

    let body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto.createHmac("sha256" , process.env.RAZORPAY_SECRET)
    .update(body.toString()).digest("hex");

        console.log("level3 grddrg")
    if(expectedSignature === razorpay_signature){

        await enrollStudent(course , userId , res); 
        console.log("final grdgrd")
        return res.status(200).json({
            success : true,
            message : "Payment verified"
        })
    }


      return res.status(500).json({
            success : false,
            message : "Payment failed"
        }) 
}

async function enrollStudent(courses , userId , res){
    if(!courses || !userId){
         return res.status(500).json({
            success : false,
            message : " please provide data for courses and userId"
        })
    }
     console.log("level4g dr gdrg")
    for(const courseId of courses){

              try{
                    const enrolledCourse = await Course.findByIdAndUpdate(courseId , {
                            $push : {
                                studentEnrolled : userId
                            }
                        },
                        {new : true}
                    )

                    if(!enrolledCourse){
                        return res.status(500).json({
                            success : false,
                            message : " course not found"
                        })
                    }

                    const courseprogress = await courseProgress.create({
                                 courseId:courseId,
                                userId : userId,
                                completedVideo : []
                    }
                    );



 console.log("level5 dgrrdrd")
    // find the student and add the course 
                    const enrolledStudent = await User.findByIdAndUpdate(userId , {
                    $push : {
                        courses : courseId,
                        courseProgress : courseprogress._id
                    }
                    },
                    {
                        new : true
                    }
                        )

    // send a mail 
     console.log("level6 grdgdr")
                    const emailResponse = await mailSender(
                        enrolledStudent.email,
                        `successfully enrolled into ${enrolledCourse.courseName}`,
                        courseEnrollmentEmail(enrolledCourse.courseName , `${enrolledStudent.firstName}`) 
                    ) ;
                    console.log("email sent successfully" , emailResponse.response);
console.log("level7 drgdr")
              }catch(err){
                console.log(err);
                return res.status(500).json({
                    success : false,
                    message : err.message
                })

              }
    }

}

exports.sendPaymentSuccessEmail = async (req , res)=>{
    const {orderId , paymentId , amount } = req.body;

    const userId = req.user.id;
//  console.log("error in sending main 1");
    if(!orderId || !paymentId || !amount || !userId){
        return res.status(400).json({
            success : false,
            message : "please provide all the field"
        });
    }
//  console.log("error in sending main  2");
    try{
        const enrolledStudent = await User.findById(userId);
        //  console.log("error in sending main3");
        //  console.log("enrolledStudent.email",enrolledStudent.email);
        await mailSender(
            enrolledStudent.email,
            `Payment Receipt`,
            paymentSuccessEmail(`${enrolledStudent.firstName}${" "}${enrolledStudent.lastName}`,
                amount/100,orderId ,paymentId
            )
        )
        //  console.log("error in sending main");
         return;
    }catch(error){
        console.log("error in sending main" , error);
          return res.status(500).json({
                success : false,
                message : "could not send email"
        })
    }

}



// capture the payment an initiate the razorpay order

// exports.capturePayment = async (req , res)=>{
//     try{

//         // spelling check required
//         const {course_id} = req.body;
//         const userId = req.user.Id;

//         if(!course_id){
//             return res.json({
//                 success : false,
//                 message :"please provide valid user id"
//             })
//         };

//         let course;

//         try{
//             course = await Course.findById(course_id);

//             if(!course){
//                 return res.json({
//                     success : false,
//                     // need to fill this after verifying in code
//                     message : "find the course"
//                 })
//             }

//             const uid = new mongoose.Types.ObjectId(userId);

//             if(course.studentEnrolled.includes(uid)){
//                 return res.json({
//                     success : false,
//                     message : "student is emrolled already in course"
//                 })
//             }
//         }catch(error){
//             console.log(error);
//             return res.status(500).json({
//                 success : false,
//                 message : error.message
//             })
//         }

//         const amount = course.price;
//         const currency = "INR";

//         const options = {
//             amount : amount*100,
//             currency,
//             receipt : math.Random(Date.now()).toString(),
//             notes : {
//                 courseId : course_id,
//                 userId,
//             }
//         }

//         try{

//             const paymentResponse = await instance.orders.create(options);
//             console.log(paymentResponse);

//             return res.status(200).json({
//                 success : true,
//                 courseName : course.courseName,
//                 courseDescription : course.courseDescription,
//                 thumnail : course.thumbnail,
//                 orderId : paymentResponse.id,
//                 currency : paymentResponse.currency,
//                 amount : paymentResponse.amount,
//             });
//         }catch(error){
//             return res.json({
//                 success : false,
//                 message : "could not initiate order"
//             })
//         }

//     }catch(error){
//         return res.status(500).json({
//             success : false,
//             message : "error while placing order (payment)"
//         })
//     }
// }


// exports.verifySignature = async (req , res) =>{
//     const webhooksecret = "123456789";
//     const signature = req.header["x-razorpay-sognature"];

//     const shasum = crypto.createHmac("sha256" , webhooksecret);

//     shasum.update(JSON.stringify(req.body));

//     const digest = shasum.digest("hex");

//     if(signature === digest){
//         console.log("paymenrt is authorized");
//         const {courseId , userId} = req.body.payload.entity.notes;

//         try{
//             const enrolledCourse = await Course.findOneAndUpdate(
//                                                                 {_id : courseId},
//                                                                 {
//                                                                     $push : {
//                                                                         studentEnrolled : userId
//                                                                     }
//                                                                 },
//                                                                 {new : true}
//             )

//             if(!enrolledCourse){
//                 return res.status(400).json({
//                     success : false,
//                     message : "course not found"
//                 })
//             }


//             const enrolledStudent = await User.findOneAndUpdate(
//                                                                 {_id : userId},
//                                                                 {
//                                                                     $push : {
//                                                                         courses : courseId
//                                                                     }
//                                                                 },
//                                                                 {new : true}
//             );

//             if(!enrolledStudent){
//                 return res.status(400).json({
//                     success : false,
//                     message : "student can not be enrolled"
//                 })
//             }

//             const emailResponse = await mailSender(
//                                                 enrolledStudent.email,
//                                                 "congratulation from studyNotion",
//                                                 "congratulation , you have successfully enrolled in studyNotion course"
//             )

//             return res.status(200).json({
//                 success : true,
//                 message : "you have successfully enrolled in course",
//             });


//         }catch(error){
//             return res.status(500).json({
//                 success : false, 
//                 message : error.message,
//             })
//         }
//     }
//     else{
//         return res.status(400).json({
//             success : false,
//              message : "invalid request"
//         })
//     }
// }

const Profile = require("../models/Profile");
const User = require("../models/User");
const Course = require("../models/course");
const { convertSecondsToDuration } = require("../utils/secToDuration.js");
const { uploadImageToCloudinary } = require("../utils/imageUploader");
require("dotenv").config();

exports.updateProfile = async (req, res) => {
    try {
        const { dateOfBirth = "", about = "", gender, contactNumber, firstName, lastName } = req.body;

        const id = req.user.id;


        if (!gender || !contactNumber || !firstName || !lastName) {
            return res.status(400).json({
                success: false,
                message: "all field are required",
            })
        }

        const userDetails = await User.findById(id);




        const profileId = userDetails.additionDetails;
        const profileDetails = await Profile.findById(profileId);

        profileDetails.dateOfBirth = dateOfBirth;
        profileDetails.about = about;
        profileDetails.contactNumber = contactNumber;
        profileDetails.gender = gender;


        await profileDetails.save();

        const userUpdate = await User.findByIdAndUpdate(
            id,
            {
                firstName: firstName,
                lastName: lastName
            },
            {
                new: true
            }
        ).populate("additionDetails").exec();




        return res.status(200).json(
            {
                success: true,
                message: "profile updated successfully",
                profileDetails,
                user: userUpdate
            }
        )

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "profile connot be updated",
            error: error.message
        })
    }
}

exports.deleteAccound = async (req, res) => {
    try {
        const id = req.user.id;
        const userDetails = await User.findById(id);
        if (!userDetails) {
            return res.status(404).json({
                success: false,
                message: "user not found"
            })
        }

        await Profile.findByIdAndDelete({ _id: userDetails.additionDetails });

        // TODO : HW :-> unenroll user from all emnrolled course



        await User.findByIdAndDelete(id);



        return res.status(200).json({
            success: false,
            message: "accont has been deleted successfully"
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "user accound connot be delete pls try again later"
        })
    }
}

exports.getAllUserDetails = async (req, res) => {
    try {
        const id = req.user.id;

        const userDetails = await User.findById(id).populate("additionDetails").exec();

        return res.status(200).json({
            success: true,
            message: "user data found",
            userDetails,
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "error while fetching the user data"
        })

    }
}

exports.getEnrolledCourses = async (req, res) => {
    try {
        const userId = req.user.id;
        const userDetails = await User.findOne({
            _id: userId
        }).populate({
            path: "courses",
            populate: {
                path: "courseContent",
                model: "Section",
                populate: {
                    path: "subSection",
                    model: "subSection"
                }
            }
        }).exec();

        if (!userDetails) {
            return res.json({
                success: false,
                message: `Could not find user with id: ${userDetails}`,
            })
        }


        console.log(
            "userDetails?.courses?.courseContent?", userDetails?.courses[1]?.courseContent[0]?.subSection[0]
        )


        for (const course of userDetails.courses || []) {
            let courseDuration = 0;

            for (const content of course?.courseContent || []) {
                for (const subsection of content?.subSection || []) {
                    const timeDurationInSeconds = parseFloat(subsection?.timeDuration) || 0;
                    courseDuration += timeDurationInSeconds;
                }
            }
            const totalDuration = convertSecondsToDuration(courseDuration);
            await Course.findByIdAndUpdate(
                course._id,
                { totalDuration: totalDuration },
                { new: true }
            );
        }

        console.log("final step of enrolled coursed")
        const userDetails1 = await User.findOne({
            _id: userId
        }).populate({
            path: "courses",
            populate: {
                path: "courseContent",
                model: "Section",
                populate: {
                    path: "subSection",
                    model: "subSection"
                }
            }
        }).exec();

        // const totalDuration = convertSecondsToDuration(totalDurationInSeconds);

        console.log("final stage")
        return res.status(200).json({
            success: true,
            message: "user details fetched",
            data: userDetails1.courses || [],
            // totalDuration : totalDuration,
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })

    }
}


exports.uploadProfilePicture = async (req, res) => {
    try {
        console.log("error1")
        const userId = req.user.id;
        const imageFile = req.files?.imageFile;
        if (!imageFile) {
            return res.status(400).json({
                success: false,
                message: "Please upload an image"
            })
        }
        console.log("error2")
        const response = await uploadImageToCloudinary(imageFile, process.env.FOLDER_NAME, 1000, 1000);
        console.log("error3")
        const response1 = await User.findByIdAndUpdate(userId,
            {
                image: response.secure_url
            },
            {
                new: true
            }
        ).populate("additionDetails").exec();

        console.log("error4")
        return res.status(200).json({
            success: true,
            user: response1,
            imageUrl: response.secure_url
        })

    } catch (error) {
        console.log("error in uploadProfilePicture");
        return res.status(500).json({
            success: false,
            message: error.message,
            error: "error hai bhai file upload me"
        })
    }
}


exports.instructorDashboard = async (req , res)=>{
    try{
        const courseDetails = await Course.find({instructor:req.user.id});

        const courseData = courseDetails.map((course)=>{
            const totalStudentEnrolled = course.studentEnrolled.length;
            const totalAmountGenerated = totalStudentEnrolled*course.price;

            const courseDataWithStats ={
                _id : course._id,
                courseName : course.courseName,
                courseDescrition : course.courseDescription,
                totalStudentEnrolled,
                totalAmountGenerated,
            }
            return courseDataWithStats;
        })

        console.log(courseData);
        return res.status(200).json({
            success :true ,
            courses : courseData,
            // courseDetails:courseDetails
        })
    }catch(error){
        return res.status(500).json({
            success : false,
            message : error.message
        })
    }
}
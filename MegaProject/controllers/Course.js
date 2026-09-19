// const course = require("../models/course");
const Course = require("../models/course");
const Category = require("../models/Category");
const subSection = require("../models/subSection");
const Section = require("../models/section");
const User = require("../models/User");
const CourseProgress = require("../models/courseProgress");
const { uploadImageToCloudinary } = require("../utils/imageUploader");

const { findByIdAndUpdate } = require("../models/subSection");
const { convertSecondsToDuration } = require("../utils/secToDuration");
require("dotenv").config();


exports.createCourse = async (req, res) => {
    try {
        const {
            courseName,
            courseDescription,
            whatYouWillLearn,
            price,
            category,
            tags,
            instructions
        } = req.body;
        console.log("not okay")
        const thumbnail = req.files?.thumbnail;
        console.log("thumbnail is okay")
        if (!courseName || !courseDescription || !whatYouWillLearn || !price || !category || !tags || !thumbnail || !instructions) {
            return res.status(400).json({
                success: false,
                message: "all field are required"
            });
        }
        console.log("validtion is okay")

        const userId = req.user.id;
        const instructordetails = await User.findById(userId);

        if (!instructordetails) {
            return res.status(404).json({
                success: false,
                message: "Instuctor details not found"
            })
        }

        const categoryDetails = await Category.findById(category);
        if (!categoryDetails) {
            return res.status(404).json({
                success: false,
                message: "category details not found"
            });
        }

        const thumbnailImage = await uploadImageToCloudinary(thumbnail, process.env.FOLDER_NAME);
        console.log("thumbnailImage upload datas", thumbnailImage);
        console.log("cloudinary  is okay")
        const newCourse = await Course.create({
            courseName,
            courseDescription,
            instructor: instructordetails._id,
            whatYouWillLearn,
            price,
            tags: JSON.parse(tags),
            category: categoryDetails._id,
            thumbnail: thumbnailImage.secure_url,
            instructions: JSON.parse(instructions),
            createdAt: Date.now(),
        });
        console.log("newCourse  is okay")
        await User.findByIdAndUpdate(
            instructordetails._id,
            {
                $push: {
                    courses: newCourse._id,
                }
            },
            { new: true }
        );
        console.log("User  is okay")
        await Category.findByIdAndUpdate(
            category,
            {
                $push: {
                    course: newCourse._id,
                },
            },
            { new: true }
        );
        console.log("Category  is okay")

        return res.status(200).json({
            success: true,
            message: "course created successfully",
            data: newCourse,
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "failed to create course",
            error: error.message

        })

    }
}

// get all courses
exports.showAllCourses = async (req, res) => {
    try {

        const allCourse = await Course.find({}, {
            courseName: true,
            price: true,
            thubnail: true,
            instructor: true,
            ratingAndReviews: true,
            studentEnrolled: true
        }).populate("instructor").exec();

        return res.status(200).json({
            success: true,
            message: "data for all courses fetched successfully",
            data: allCourse,
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Connot fetch course data",
            error: error.message
        })
    }
}

exports.getAllCourseDetails = async (req, res) => {
    try {
        const courseId = req.params.courseId;
        const userId = req.user.id;
        console.log("courseId -->", courseId);

        if (!courseId) {
            return res.status(400).json({
                success: false,
                message: "courseId is required"
            });
        }

        const courseDetails = await Course.findById(courseId)
            .populate(
                {
                    path: "instructor",
                    populate: {
                        path: "additionDetails",
                        model: "Profile"
                    }
                }
            )
            .populate("category")
            .populate("ratingAndreviews")
            .populate({
                path: "courseContent",
                populate: {
                    path: "subSection"
                },
            });

        let courseProgressCount = await CourseProgress.findOne({
            courseId : courseId,
            userId : userId,
        })

        console.log("courseProgressCount--->" , courseProgressCount);


        if (!courseDetails) {
            return res.status(400).json({
                success: false,
                message: `could not fund the course with ${courseId}`
            });
        };

        // let totalDurationInSeconds = 0
        //     courseDetails.courseContent.forEach((content) => {
        //     content.subSection.forEach((subSection) => {
        //         const timeDurationInSeconds = parseInt(subSection.timeDuration)
        //         totalDurationInSeconds += timeDurationInSeconds
        //     })
        //     })

        // const totalDuration = convertSecondsToDuration(totalDurationInSeconds);
        return res.status(200).json({
            success: true,
            message: "course details fetched successfully",
            data: {
                courseDetails : courseDetails,
                courseProgressCount : courseProgressCount.completedVideo
            },
            // totalDuration : totalDuration,
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

exports.getAllCourseByUserId = async (req, res) => {
    try {
        console.log("stage 1")
        const userId = req.user.id;
        const userDetails = await User.findById(userId, {
            image: true
        }).populate({
            path: "courses",
            populate: {
                path: "courseContent",
                model: "Section",
                populate: {
                    path: "subSection",
                    model: "subSection",
                }
            }
        }).exec();



        console.log("stage 2")
        if (!userDetails) {
            return res.status(404).json({
                success: false,
                message: "userDetail cannot fetched"
            })
        }

        console.log("stage 3")

        return res.json({
            success: true,
            data: userDetails,
            message: "userDetails is fecthed"
        })


    } catch (error) {
        console.log("error in fetching all instructor courses");
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

exports.editCourse = async (req, res) => {
    try {
        console.log("stage contoller 1")
        const { courseId } = req.body;
        const updates = req.body;
        console.log("updates 1", updates);
        const course = await Course.findById(courseId);
        console.log("updates 1", updates);
        if (!course) {
            return res.status(404).json({
                success: false,
                message: "course is not found"
            })
        }
        console.log("stage contoller 2")
        console.log("updates 1", updates);
        if (req.files) {
            console.log("thubnail Update");
            const thubnail = req.files.thumbnail;
            const thumbnailImage = await uploadImageToCloudinary(thumbnail, process.env.FOLDER_NAME);
            course.thumbnail = thumbnailImage.secure_url;
        }
        console.log("stage 3")
        for (const key in updates) {
            if ((Object.hasOwn(updates, key))) {
                if (key === "tags" || key === "instructions" || key === "instructor") {
                    course[key] = JSON.parse(updates[key]);
                } else {
                    course[key] = updates[key];
                }
            }
        }
        console.log("stage 4")
        await course.save();
        console.log("stage 5")
        const updatedCourse = await Course.findOne({
            _id: courseId,
        }).populate(
            {
                path: "instructor",
                populate: {
                    path: "additionDetails",
                    model: "Profile"
                }
            }
        )
            .populate("category")
            // // .poppulate("ratingAndreviews")
            .populate({
                path: "courseContent",
                populate: {
                    path: "subSection"
                },
            });

        console.log("stage s")
        res.json({
            success: true,
            message: "Course updated successfully",
            data: updatedCourse,
        })


    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "somethinf is wrong in setStatusOfCourse ",
            error: error.message
        })
    }

}

exports.deleteCourseOfUser = async (req, res) => {
    try {
        const { courseId } = req.body;
        const userId = req.user.id;

        const courseDetails = await Course.findById(courseId);
        if (!courseDetails) {
            return res.status(404).json({
                success: false,
                messagae: "course if not found"
            })
        }

        const courseSection = courseDetails.courseContent;
        for (const sectionID of courseSection) {
            const section = await Section.findById(sectionID);
            if (section) {
                const SubSection = section.subSection;
                for (const subSectionId of SubSection) {
                    await subSection.findByIdAndDelete(subSectionId);
                }
            }
            await Section.findByIdAndDelete(section);
        }

        await Course.findByIdAndDelete(courseId);

        const updatedUser = await User.findByIdAndUpdate(userId, {
            $pull: {
                courses: courseId
            }
        }, {
            new: true
        }).populate({
            path: "courses",
            populate: {
                path: "courseContent",
                model: "Section",
                populate: {
                    path: "subSection",
                    model: "subSection",
                }
            }
        }).exec();

        console.log("uspderd user ", updatedUser);
        return res.status(200).json({
            success: true,
            message: "Course deleted successfully",
            data: updatedUser
        })


    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "something is wrong in deleteCourseOfUser",
            error: error.message,
        })
    }
}


exports.getCourseByCourseId = async (req, res) => {
    try {
        console.log("1")
        const courseId = req.params.courseId;
        const userId = req.user.id;
        console.log("courseId -->", courseId);

        if (!courseId) {
            return res.status(400).json({
                success: false,
                message: "courseId is required"
            });
        }
         console.log("1")

        const courseDetails = await Course.findById(courseId)
            .populate(
                {
                    path: "instructor",
                    populate: {
                        path: "additionDetails",
                        model: "Profile"
                    }
                }
            )
            .populate("category")
            .populate("ratingAndreviews")
            .populate({
                path: "courseContent",
                populate: {
                    path: "subSection"
                },
            });
 console.log("1")
      
        if (!courseDetails) {
            return res.status(400).json({
                success: false,
                message: `could not fund the course with ${courseId}`
            });
        };
 console.log("1")
        return res.status(200).json({
            success: true,
            message: "course details fetched successfully",
            data:  courseDetails,
            // totalDuration : totalDuration,
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

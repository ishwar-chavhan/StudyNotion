const Course = require("../models/course");
const Category = require("../models/Category");
const subSection = require("../models/subSection");
const Section = require("../models/section");
const User = require("../models/User");
const CourseProgress = require("../models/courseProgress");
const { uploadImageToCloudinary } = require("../utils/imageUploader");
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
            instructions,
        } = req.body;

        const thumbnail = req.files?.thumbnail;

        if (!courseName || !courseDescription || !whatYouWillLearn || !price || !category || !tags || !thumbnail || !instructions) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        const userId = req.user.id;
        const instructorDetails = await User.findById(userId);

        if (!instructorDetails) {
            return res.status(404).json({
                success: false,
                message: "Instructor details not found",
            });
        }

        const categoryDetails = await Category.findById(category);
        if (!categoryDetails) {
            return res.status(404).json({
                success: false,
                message: "Category not found",
            });
        }

        const thumbnailImage = await uploadImageToCloudinary(thumbnail, process.env.FOLDER_NAME);

        const newCourse = await Course.create({
            courseName,
            courseDescription,
            instructor: instructorDetails._id,
            whatYouWillLearn,
            price,
            tags: JSON.parse(tags),
            category: categoryDetails._id,
            thumbnail: thumbnailImage.secure_url,
            instructions: JSON.parse(instructions),
            createdAt: Date.now(),
        });

        await User.findByIdAndUpdate(
            instructorDetails._id,
            { $push: { courses: newCourse._id } },
            { new: true }
        );

        await Category.findByIdAndUpdate(
            category,
            { $push: { course: newCourse._id } },
            { new: true }
        );

        return res.status(201).json({
            success: true,
            message: "Course created successfully",
            data: newCourse,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to create course",
        });
    }
};

exports.showAllCourses = async (req, res) => {
    try {
        const allCourse = await Course.find(
            {},
            {
                courseName: true,
                price: true,
                thumbnail: true,
                instructor: true,
                ratingAndReviews: true,
                studentEnrolled: true,
            }
        )
            .populate("instructor")
            .exec();

        return res.status(200).json({
            success: true,
            message: "All courses fetched successfully",
            data: allCourse,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Cannot fetch course data",
        });
    }
};

exports.getAllCourseDetails = async (req, res) => {
    try {
        const courseId = req.params.courseId;
        const userId = req.user.id;

        if (!courseId) {
            return res.status(400).json({
                success: false,
                message: "courseId is required",
            });
        }

        const courseDetails = await Course.findById(courseId)
            .populate({
                path: "instructor",
                populate: { path: "additionDetails", model: "Profile" },
            })
            .populate("category")
            .populate("ratingAndreviews")
            .populate({
                path: "courseContent",
                populate: { path: "subSection" },
            });

        if (!courseDetails) {
            return res.status(404).json({
                success: false,
                message: `Course not found: ${courseId}`,
            });
        }

        const courseProgressCount = await CourseProgress.findOne({
            courseId,
            userId,
        });

        return res.status(200).json({
            success: true,
            message: "Course details fetched successfully",
            data: {
                courseDetails,
                courseProgressCount: courseProgressCount?.completedVideo || [],
            },
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
        });
    }
};

exports.getAllCourseByUserId = async (req, res) => {
    try {
        const userId = req.user.id;
        const userDetails = await User.findById(userId, { image: true })
            .populate({
                path: "courses",
                populate: {
                    path: "courseContent",
                    model: "Section",
                    populate: { path: "subSection", model: "subSection" },
                },
            })
            .exec();

        if (!userDetails) {
            return res.status(404).json({
                success: false,
                message: "User details not found",
            });
        }

        return res.status(200).json({
            success: true,
            data: userDetails,
            message: "User details fetched successfully",
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
        });
    }
};

exports.editCourse = async (req, res) => {
    try {
        const { courseId } = req.body;
        const updates = req.body;

        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({
                success: false,
                message: "Course not found",
            });
        }

        if (req.files) {
            const thumbnailFile = req.files.thumbnail;
            const thumbnailImage = await uploadImageToCloudinary(thumbnailFile, process.env.FOLDER_NAME);
            course.thumbnail = thumbnailImage.secure_url;
        }

        for (const key in updates) {
            if (Object.hasOwn(updates, key)) {
                if (key === "tags" || key === "instructions" || key === "instructor") {
                    course[key] = JSON.parse(updates[key]);
                } else {
                    course[key] = updates[key];
                }
            }
        }

        await course.save();

        const updatedCourse = await Course.findById(courseId)
            .populate({
                path: "instructor",
                populate: { path: "additionDetails", model: "Profile" },
            })
            .populate("category")
            .populate({
                path: "courseContent",
                populate: { path: "subSection" },
            });

        return res.status(200).json({
            success: true,
            message: "Course updated successfully",
            data: updatedCourse,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to update course",
        });
    }
};

exports.deleteCourseOfUser = async (req, res) => {
    try {
        const { courseId } = req.body;
        const userId = req.user.id;

        const courseDetails = await Course.findById(courseId);
        if (!courseDetails) {
            return res.status(404).json({
                success: false,
                message: "Course not found",
            });
        }

        const courseSections = courseDetails.courseContent;
        for (const sectionId of courseSections) {
            const section = await Section.findById(sectionId);
            if (section) {
                for (const subSectionId of section.subSection) {
                    await subSection.findByIdAndDelete(subSectionId);
                }
            }
            await Section.findByIdAndDelete(sectionId);
        }

        await Course.findByIdAndDelete(courseId);

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { $pull: { courses: courseId } },
            { new: true }
        )
            .populate({
                path: "courses",
                populate: {
                    path: "courseContent",
                    model: "Section",
                    populate: { path: "subSection", model: "subSection" },
                },
            })
            .exec();

        return res.status(200).json({
            success: true,
            message: "Course deleted successfully",
            data: updatedUser,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to delete course",
        });
    }
};

exports.getCourseByCourseId = async (req, res) => {
    try {
        const courseId = req.params.courseId;

        if (!courseId) {
            return res.status(400).json({
                success: false,
                message: "courseId is required",
            });
        }

        const courseDetails = await Course.findById(courseId)
            .populate({
                path: "instructor",
                populate: { path: "additionDetails", model: "Profile" },
            })
            .populate("category")
            .populate("ratingAndreviews")
            .populate({
                path: "courseContent",
                populate: { path: "subSection" },
            });

        if (!courseDetails) {
            return res.status(404).json({
                success: false,
                message: `Course not found: ${courseId}`,
            });
        }

        return res.status(200).json({
            success: true,
            message: "Course details fetched successfully",
            data: courseDetails,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
        });
    }
};

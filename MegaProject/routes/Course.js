const express = require("express");
const router = express.Router();

const {
    updateCourseProgress
} = require("../controllers/courseProgress.js");

const {
    createCourse,
    showAllCourses,
    getAllCourseDetails,
    editCourse,
    getAllCourseByUserId,
    deleteCourseOfUser,
    getCourseByCourseId
} = require("../controllers/Course");

const {
    createCategory,
    showAllCategories,
    categoryPageDetails
} = require("../controllers/Category.js");

const {
    createSection,
    updateSection,
    deleteSection
} = require("../controllers/Section.js");

const {
    createSubSection,
    updateSubSection,
    deleteSubSection
} = require("../controllers/Subsection.js");

const {
    creatRating,
    getAverageRating,
    getAllRating
} = require("../controllers/RatingAndReview.js");

const { auth, isStudent, isInstructor, isAdmin } = require("../middlewares/auth.js");

// course
router.post("/createCourse", auth, createCourse);
// section
router.post("/addSection", auth, isInstructor, createSection);
router.post("/updateSection", auth, isInstructor, updateSection);
router.post("/deleteSection", auth, isInstructor, deleteSection);
router.post("/editCourse", auth, isInstructor, editCourse);
router.delete("/deleteCourse", auth, isInstructor, deleteCourseOfUser);
// subSection
router.post("/updateSubSection", auth, isInstructor, updateSubSection);
router.post("/deleteSubSection", auth, isInstructor, deleteSubSection);
router.post("/addSubSection", auth, isInstructor, createSubSection);
// get details
router.get("/getAllCourses", showAllCourses);
router.get("/getCourseDetails/:courseId", auth, getAllCourseDetails);
router.get("/getAllCourseByUserId", auth, isInstructor, getAllCourseByUserId);

// for admin
router.post("/createCategory", auth, isAdmin, createCategory);
router.get("/showAllCategories", showAllCategories);
router.post("/getCategoryPageDetails", categoryPageDetails);

// rating and review 

router.post("/createRating", auth, isStudent, creatRating);
router.get("/getAverageRating", getAverageRating);
router.get("/getReviews", getAllRating);


router.post("/updatedCourseProgress", auth, isStudent, updateCourseProgress);
// router.post("/getCourseByCourseId:" , getCourseByCourseId)
router.get("/getCourseByCourseId/:courseId", auth , getCourseByCourseId);

module.exports = router;


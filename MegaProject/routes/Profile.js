const express = require("express")
const router = express.Router()

const {auth} = require("../middlewares/auth");

const{
   getAllUserDetails ,
   deleteAccound,
   updateProfile,
   getEnrolledCourses,
   uploadProfilePicture,
   instructorDashboard
} = require("../controllers/Profile");

router.delete("/deleteProfile" , auth , deleteAccound);
router.put("/updateProfile" , auth , updateProfile);
router.get("/getAllUserDetails" , auth , getAllUserDetails);
router.get("/getEnrolledCourses" , auth , getEnrolledCourses );
router.post("/uploadProfilePicture" , auth , uploadProfilePicture );
router.get("/instructorDashboard" , auth , instructorDashboard );
module.exports = router;
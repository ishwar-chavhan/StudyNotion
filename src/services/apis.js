const BASE_URL = process.env.REACT_APP_BASE_URL


export const categories = {
  CATEGORIES_API: BASE_URL + "/course/showAllCategories"
}

export const authEndpoint = {
  SENDOTP_API: BASE_URL + "/auth/sendotp",
  SIGNUP_API: BASE_URL + "/auth/signup",
  LOGIN_API: BASE_URL + "/auth/login",
  RESETPASSTOKEN_API: BASE_URL + "/auth/reset-password-token",
  RESETPASSWORD_API: BASE_URL + "/auth/reset-password",
  CHANGEPASSWORD_API : BASE_URL + "/auth/changepassword"
}


export const contactusEndpoint = {
  CONTACT_US_API: BASE_URL + "/reach/contact",
}

export const profileEndpoints = {
  GET_USER_DETAILS_API: BASE_URL + "/profile/getAllUserDetails",
  GET_USER_ENROLLED_COURSES_API: BASE_URL + "/profile/getEnrolledCourses",
  UPDATE_PROFILE_IMAGE_API : BASE_URL + "/profile/uploadProfilePicture" ,
  UPDATE_PROFILE_API : BASE_URL + "/profile/updateProfile",
  GET_INSTRUCTOR_DATA_API : BASE_URL + "/profile/instructorDashboard"
}

export const courseEndpoints = {
   COURSE_CATEGORIES_API: BASE_URL + "/course/showAllCategories",
   CREATE_COURSE_API : BASE_URL +  "/course/createCourse",
   UPDATE_SECTION_API : BASE_URL + "/course/updateSection",
   UPDATE_SUBSECTION_API : BASE_URL + "/course/updateSubSection",
   CREATE_SECTION_API : BASE_URL + "/course/addSection",
   CREATE_SUBSECTION_API : BASE_URL + "/course/addSubSection",
   DELETE_SECTION_API : BASE_URL + "/course/deleteSection",
   DELETE_SUBSECTION_API : BASE_URL + "/course/deleteSubSection",
   EDIT_COURSE_API: BASE_URL + "/course/editCourse",
   FETCHEDALLCOURSEDETAILS_API : BASE_URL + "/course/getAllCourseByUserId",
  //  FETCH_COURSE_DETAILS_BY_ID_API : BASE_URL + "/course/getCourseDetails/:courseId",
   DELETECOURSE_API : BASE_URL +  "/course/deleteCourse",
    CREATE_RATING : BASE_URL + "/course/createRating",
   GETALLCOURSEBYCOURSEID_API : BASE_URL + "/course/getCourseDetails",
   LECTURE_COMPLETION_API  : BASE_URL + "/course/updatedCourseProgress",
   GET_COURSE_BY_COURSEID : BASE_URL + "/course/getCourseByCourseId"
}

export const ratinsEndpoint = {
  REVIEWS_DETAILS_API : BASE_URL + "/course/getReviews"
}


export const catalogDataEndpoint = {
  CATALOGPAGEDATA_API : BASE_URL + "/course/getCategoryPageDetails",
}



export const studentEndpoint = {
  COURSE_PAYMENT_API : BASE_URL + "/payment/capturePayment",
  COURSE_VERIFY_API : BASE_URL + "/payment/verifyPayment",
  SEND_PAYMENT_SUCCESS_EMAIL_API : BASE_URL + "/payment/sendPaymentSuccessEmail"
}

// export const ratingEndpoint = {

// }
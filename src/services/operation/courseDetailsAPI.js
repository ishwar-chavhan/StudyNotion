import { apiConnector } from "../apiconnector";
import { toast } from "react-toastify";
import { courseEndpoints } from "../../services/apis";

const {
    COURSE_CATEGORIES_API,
    CREATE_COURSE_API,
    UPDATE_SECTION_API,
    CREATE_SECTION_API,
    DELETE_SECTION_API,
    DELETE_SUBSECTION_API,
    CREATE_SUBSECTION_API,
    UPDATE_SUBSECTION_API,
    EDIT_COURSE_API,
   FETCHEDALLCOURSEDETAILS_API,
   DELETECOURSE_API,
   GETALLCOURSEBYCOURSEID_API,
   FETCH_COURSE_DETAILS_BY_ID_API,
   CREATE_RATING,
   LECTURE_COMPLETION_API ,
   GET_COURSE_BY_COURSEID
} = courseEndpoints;

export const fetchCategories = async () => {
    let result = [];
    const toastId = toast.loading("...loading");
    try {
        const response = await apiConnector("GET", COURSE_CATEGORIES_API);
        console.log(response);
        if (!response?.data?.success) {
            throw new Error(response?.data?.message)
        }
        result = response?.data?.data
    } catch (error) {
        console.log(error);
        toast.error("error in fetcbCategorie");
    }
    return result;
     toast.dismiss(toastId);
}

export const addCourseDetails = async (data, token) => {
    let result = [];
    const toastId = toast.loading("...loading");

    try {
        console.log("level1")
        console.log("formdata", Object.fromEntries(data.entries()));
        const response = await apiConnector("POST", CREATE_COURSE_API, data,
            {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`,
            })
        console.log("level2")


        if (!response.data.success) {
            throw new Error(response.data.message);
        }
        console.log("level3")

        result = response.data.data;
        console.log(response);
        toast.success("Course Created successfully");

    } catch (error) {
        console.log(error)
        toast.error("error while creating course");
    }

    toast.dismiss(toastId);
    return result;
}

export const updateSection = async (data, token) => {
    let result = null;
    const toastId = toast.loading("...loading");
    try {
        const response = await apiConnector("POST", UPDATE_SECTION_API, data,
            {
                Authorization: `Bearer ${token}`,
            }
        )

        console.log(response);
        if (!response?.data?.success) {
            throw new Error("could not update section");
        }
        toast.success("course Section updated")
        result = response?.data?.data;

    } catch (error) {
        console.log("updated section api error", error);
        toast.error(error.message);
    }
    toast.dismiss(toastId);
    return result;
}

export const createSection = async (data, token) => {
    let result = null;
    const toastId = toast.loading("...loading");
    try {
        const response = await apiConnector("POST", CREATE_SECTION_API, data,
            {
                Authorization: `Bearer ${token}`,
            }
        );

        console.log("createSection FULL RESPONSE:", response.data);
        if (!response?.data?.success) {
            throw new Error("could not create section");
        }

        toast.success("section is created successFully");
        result = response?.data?.updatedCourseDetails;
    } catch (error) {
        console.log("error in create section api", error);
        toast.error("could not create section");
    }
    toast.dismiss(toastId);
    return result;

}

export const createSubSection = async (data, token) => {
    let result = null;
    const toastId = toast.loading("...loading");
    try {
        const response = await apiConnector("POST", CREATE_SUBSECTION_API, data,
            {
                Authorization: `Bearer ${token}`,
            }
        );

        console.log("createSubSection FULL RESPONSE:", response.data);
        if (!response?.data?.success) {
            throw new Error("could not create Subsection");
        }

        toast.success("Subsection is created successFully");
        result = response?.data?.data; 
    } catch (error) {
        console.log("error in create Subsection api", error);
        toast.error("could not create Subsection");
    }
    toast.dismiss(toastId);
    return result;

}


export const deleteSection = async (data, token) => {
    let result = null;
    const toastId = toast.loading("...loading");
    try {
        const response = await apiConnector("POST", DELETE_SECTION_API, data,
            {
                Authorization: `Bearer ${token}`,
            }
        );

        if (!response?.data?.success) {
            throw new Error("something is wrong in deletesection controller");
        }

        toast.success("section is deleted successfully");
        result = response?.data?.data;

    } catch (error) {
        console.log("error in deletesection api", error);
        toast.error("section could not be deleted")
    }
    toast.dismiss(toastId);
    return result;
}

export const deleteSubSection = async (data, token) => {
    let result = null;
    const toastId = toast.loading("...loading");
    try {
        console.log("level1")
        const response = await apiConnector("POST", DELETE_SUBSECTION_API, data,
            {
                Authorization: `Bearer ${token}`,
            }
        )
        console.log("level2")

        if (response?.data?.success) {
            throw new Error("something is wrong in deletesubsection controller");
        }
        console.log("level3")

        toast.success("subsection is deleted successfully");
        result = response?.data?.data;

    } catch (error) {
        console.log("error in DELETESUBSETION_API", error);
        toast.error("Subsection could not be deleted")
    }
    toast.dismiss(toastId);
    return result;
}

export const updateSubSection = async (data, token) => {
    let result = null;
    const toastId = toast.loading("...loading");
    try {
        console.log("level1")
        const response = await apiConnector("POST", UPDATE_SUBSECTION_API, data,
            {
                Authorization: `Bearer ${token}`,
            }
        )
              console.log("level2")
        if (!response?.data?.success) {
            throw new Error("error in updating subsection");
        }
          console.log("level3")
        result = response?.data?.data;
        toast.success("subSection updated successfully");
    } catch (error) {
        console.log("error in UpdateSection_api", error);
        toast.error("Subsection could not be updated")
    }
    toast.dismiss(toastId);
    return result;
}

export const editCourseDetails = async (data , token) =>{
    let result = [];
    const toastId = toast.loading("...loading");
    try{
        console.log("stage1" ,  EDIT_COURSE_API)
        const response = await apiConnector("POST" , EDIT_COURSE_API , data ,  {
                Authorization: `Bearer ${token}`,
            })
console.log("stage2")
            if(!response.data.success){
                throw new Error("something is wrong in editCourseDetails ,EDIT_COURSE_API");
            }
console.log("stage3")
               result = response?.data?.data;
               console.log("editCourseDetails" , result);
                 toast.success("course edited successfully");
    }catch(error){
        console.log("error in editCourseDetails " ,error);
        toast.error("error in EDIT_COURSE_API ")
    }
    toast.dismiss(toastId);
    return result;
}

export const fetchInstructorCourse = async (token)=>{
     let result = null;
    const toastId = toast.loading("...loading");
    try{
        
        const response = await apiConnector("GET" , FETCHEDALLCOURSEDETAILS_API , null  , {
               Authorization: `Bearer ${token}`,
        } );
        if(!response.data.success){
            throw new Error("something is wrong while fetching the courseData by userId");
        }
          result = response?.data?.data;
                //  toast.success("course data fecthed successfully");
    }catch(error){
        console.log("error in fetchInstructorCourse " ,error);
        toast.error("error in fetchInstructorCourse ")
    }
    toast.dismiss(toastId);
    return result;
}


export const deleteCourse =async(data , token) =>{
       let result = null;
    const toastId = toast.loading("...loading");  
     try{

        const response = await apiConnector("DELETE" , DELETECOURSE_API , data , {
               Authorization: `Bearer ${token}`,
        } );

        if(!response?.data?.success){
            throw new Error("success is false check it deleteCourse")
        }
        result = response?.data?.data;
        toast.success("course deleted successfully");
    }catch(error){
        console.log("error in deleteCourse " ,error);
        toast.error("error in deleteCourse ")
    }
    toast.dismiss(toastId);
    return result;
}

export const getFullDetailsOfCourse = async(courseId , token)=>{
     let result = null;
    const toastId = toast.loading("...loading"); 
    console.log("courseId" , courseId)
    console.log("GETALLCOURSEBYCOURSEID_API" , GETALLCOURSEBYCOURSEID_API)
    try{
           console.log("porblem is here----------->" );
        const url = `${GETALLCOURSEBYCOURSEID_API}/${courseId}`;
        const response = await apiConnector("GET" , url, null, {
               Authorization: `Bearer ${token}`,
        });

        if(!response?.data?.success){
            throw new Error("success is false check it deleteCourse")
        }
        console.log("result is here----------->" , result);
        toast.success("course details is fetched successfully");
        result =response?.data?.data;
        console.log(" GETALLCOURSEBYCOURSEID_API result" , response?.data?.data?.courseDetails)
    }catch(error){
        console.log("error in getFullDetailsOfCourse " ,error);
        toast.error("error in getFullDetailsOfCourse ")
    }
    toast.dismiss(toastId);
    return result;
}

export const createRating = async (data , token)=>{
    const toastId = toast.loading("...loading"); 
    console.log("step1")
    try{
 console.log("data" , data)
        const response = await apiConnector("POST" , CREATE_RATING , data , {
               Authorization: `Bearer ${token}`,
        }
        );
    console.log("step2")
          if(!response?.data?.success){
            throw new Error("error in create rating")
        }
        toast.success("rating created")
    }catch(error){
        console.log("error in create rating " ,error);
        toast.error("error in create rating ")
    }
     toast.dismiss(toastId);
}


export const markLectureAsComplete = async(data , token) =>{
    let result = null;
    console.log("mark complete data" , data);
    const toastId = toast.loading("...loading"); 
    try{
         console.log("curseprogress level 23")
        const response = await apiConnector("POST" , LECTURE_COMPLETION_API , data , {
            Authorization: `Bearer ${token}`,
        });
        console.log("MARK_LECTURE_COMPLETION_API_response" , response);
     console.log("curseprogress level 128")
        if(!response.data.success){
            throw new Error(response.data.error);
        }
        toast.success("lecture completed");
        result = true;
    }catch(error){
        console.log("error in MARK_LECTURE_COMPLETION_API" ,error);
        toast.error("error in MARK_LECTURE_COMPLETION_API")
    }
     toast.dismiss(toastId);
     return result;
}



export const getCourseByCourseId = async(courseId , token)=>{
     let result = null;
    const toastId = toast.loading("...loading"); 
    console.log("getCourseByCourseId" , courseId)
    console.log("getCourseByCourseId" ,    GET_COURSE_BY_COURSEID)
    console.log("step 1")
    try{
        //    console.log("porblem is here----------->" );
        const url = `${GET_COURSE_BY_COURSEID}/${courseId}`;
        const response = await apiConnector("GET" , url, null, {
               Authorization: `Bearer ${token}`,
        });

        if(!response?.data?.success){
            throw new Error("success is false check it deleteCourse")
        }
        // console.log("result is here----------->" , result);
        console.log("step 2")
        toast.success("course details is fetched successfully");
        result =response?.data?.data;
        // console.log(" GETALLCOURSEBYCOURSEID_API result" , response?.data?.data?.courseDetails)
    }catch(error){
        console.log("error in fetchong getCourseByCourseId " ,error);
        toast.error("error in fetchong getCourseByCourseId ")
    }
    console.log("step 3 ")
    toast.dismiss(toastId);
    return result;
}
import { apiConnector } from "../apiconnector";
import { profileEndpoints } from "../apis";
import { toast } from "react-toastify";
import { setUser } from "../../slice/profileSlice";

const {
    GET_USER_ENROLLED_COURSES_API, 
    GET_USER_DETAILS_API,
    UPDATE_PROFILE_IMAGE_API ,
    UPDATE_PROFILE_API,
    GET_INSTRUCTOR_DATA_API
    } = profileEndpoints;


export async function getUserEnrolledCourse(token) {
    const toastId = toast.loading("...loading");
    let result = [];

    console.log("URL:", GET_USER_ENROLLED_COURSES_API);
    console.log("Token:", token);

    try {
        console.log("calling backend apis for enrolled course1");
        const response = await apiConnector("GET", GET_USER_ENROLLED_COURSES_API, null , {
            Authorization: `Bearer ${token}`,
        });
        console.log("calling backend apis for enrolled course2");
        if (!response.data.success) {
            throw new Error(response.data.message);
        }
        result = response.data || [];
    }
    catch (error) {
        console.log("getUserEnrolledCourse api error.......", error);
        toast.error("could not fetch any enrolled courses");
    }
    toast.dismiss(toastId);
    return result;
}

export function changeProfileImage(file ,token , navigate){
    return async (dispatch)=>{
        const toastId = toast.loading("...loading");
        try{
            console.log(file);
            const response = await apiConnector(
                "POST",
                UPDATE_PROFILE_IMAGE_API,
                file,
                {
                     "Content-Type": "multipart/form-data",
                     Authorization: `Bearer ${token}`,
                }
            );

            if(!response.data.success){
                throw new Error(response.data.message);
            }

            dispatch(setUser(response.data.user));
            localStorage.setItem("user" , JSON.stringify(response.data.user));
            toast.success("profile picture changed successfully")
            navigate("/dashboard/myprofile");
        }catch(error){
            console.log("Error while changing profile", error);
            toast.error("Could not change profile image");
        }
        toast.dismiss(toastId);
    }
}

export function profileUpdate(
    firstName,
    lastName,
    gender,
    contactNumber,
    about,
    dateOfBirth,
    token
){
    return async(dispatch)=>{
        const toastId = toast.loading("...loading");
        try{
            console.log("Error state1");
            const response =await apiConnector("PUT" , UPDATE_PROFILE_API , {
                    firstName,
                    lastName,
                    gender,
                    contactNumber,
                    about,
                    dateOfBirth,
            },
            {
                     Authorization: `Bearer ${token}`,
            }
        )
        console.log("Error state2");
        console.log(response);

        if(!response.data.success){
                throw new Error(response.data.message);
            }

        console.log("Error state3");

          dispatch(setUser(response.data.user));
          localStorage.setItem("user" , JSON.stringify(response.data.user));
          console.log("Error state4");
          toast.success("profile update successfully")

        }catch(error){
            console.log("error in profile update");
            toast.error("could not update profile something went wrong")
        }
        toast.dismiss(toastId);
    }
}

export async function getInstructorData(token){
    const toastId = toast.loading("..loading");
    let result = [];
    try{
        const response = await apiConnector("GET" , GET_INSTRUCTOR_DATA_API , null , {
               Authorization: `Bearer ${token}`,
        })
        console.log("GET INSTRUCTOR API RESPONSE" , response);
        if(!response?.data?.success){
            throw new Error("something is wrong in getInstructor api");
        }
        toast.success("instructor data is fetch");
        result = response?.data?.courses;
    }catch(error){
        console.log("GET INSTRUCTOR API ERROR" , error );
        toast.error("could not fetch instructor data");
    }
    toast.dismiss(toastId);
    return result;
}
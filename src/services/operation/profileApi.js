import { apiConnector } from "../apiconnector";
import { profileEndpoints } from "../apis";
import { toast } from "react-toastify";
import { setUser } from "../../slice/profileSlice";

const {
    GET_USER_ENROLLED_COURSES_API,
    UPDATE_PROFILE_IMAGE_API,
    UPDATE_PROFILE_API,
    GET_INSTRUCTOR_DATA_API,
} = profileEndpoints;

export async function getUserEnrolledCourse(token) {
    const toastId = toast.loading("Loading enrolled courses...");
    let result = [];

    try {
        const response = await apiConnector("GET", GET_USER_ENROLLED_COURSES_API, null, {
            Authorization: `Bearer ${token}`,
        });

        if (!response.data.success) {
            throw new Error(response.data.message);
        }
        result = response.data || [];
    } catch (error) {
        toast.error("Could not fetch enrolled courses");
    }
    toast.dismiss(toastId);
    return result;
}

export function changeProfileImage(file, token, navigate) {
    return async (dispatch) => {
        const toastId = toast.loading("Updating profile picture...");
        try {
            const response = await apiConnector(
                "POST",
                UPDATE_PROFILE_IMAGE_API,
                file,
                {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${token}`,
                }
            );

            if (!response.data.success) {
                throw new Error(response.data.message);
            }

            dispatch(setUser(response.data.user));
            localStorage.setItem("user", JSON.stringify(response.data.user));
            toast.dismiss(toastId);
            toast.success("Profile picture updated");
            navigate("/dashboard/myprofile");
        } catch (error) {
            toast.dismiss(toastId);
            toast.error("Could not update profile picture");
        }
    };
}

export function profileUpdate(
    firstName,
    lastName,
    gender,
    contactNumber,
    about,
    dateOfBirth,
    token
) {
    return async (dispatch) => {
        const toastId = toast.loading("Updating profile...");
        try {
            const response = await apiConnector(
                "PUT",
                UPDATE_PROFILE_API,
                { firstName, lastName, gender, contactNumber, about, dateOfBirth },
                { Authorization: `Bearer ${token}` }
            );

            if (!response.data.success) {
                throw new Error(response.data.message);
            }

            dispatch(setUser(response.data.user));
            localStorage.setItem("user", JSON.stringify(response.data.user));
            toast.dismiss(toastId);
            toast.success("Profile updated successfully");
        } catch (error) {
            toast.dismiss(toastId);
            toast.error("Could not update profile");
        }
    };
}

export async function getInstructorData(token) {
    const toastId = toast.loading("Loading instructor data...");
    let result = [];
    try {
        const response = await apiConnector("GET", GET_INSTRUCTOR_DATA_API, null, {
            Authorization: `Bearer ${token}`,
        });

        if (!response?.data?.success) {
            throw new Error("Could not fetch instructor data");
        }

        result = response?.data?.courses;
        toast.dismiss(toastId);
    } catch (error) {
        toast.dismiss(toastId);
        toast.error("Could not fetch instructor data");
    }
    return result;
}
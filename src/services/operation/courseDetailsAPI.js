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
    CREATE_RATING,
    LECTURE_COMPLETION_API,
    GET_COURSE_BY_COURSEID,
} = courseEndpoints;

export const fetchCategories = async () => {
    let result = [];
    const toastId = toast.loading("Loading categories...");
    try {
        const response = await apiConnector("GET", COURSE_CATEGORIES_API);
        if (!response?.data?.success) {
            throw new Error(response?.data?.message);
        }
        result = response?.data?.data;
    } catch (error) {
        toast.error("Could not fetch categories");
    }
    toast.dismiss(toastId);
    return result;
};

export const addCourseDetails = async (data, token) => {
    let result = [];
    const toastId = toast.loading("Creating course...");
    try {
        const response = await apiConnector("POST", CREATE_COURSE_API, data, {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
        });

        if (!response.data.success) {
            throw new Error(response.data.message);
        }

        result = response.data.data;
        toast.dismiss(toastId);
        toast.success("Course created successfully");
    } catch (error) {
        toast.dismiss(toastId);
        toast.error(error?.response?.data?.message || "Could not create course");
    }
    return result;
};

export const updateSection = async (data, token) => {
    let result = null;
    const toastId = toast.loading("Updating section...");
    try {
        const response = await apiConnector("POST", UPDATE_SECTION_API, data, {
            Authorization: `Bearer ${token}`,
        });

        if (!response?.data?.success) {
            throw new Error("Could not update section");
        }
        toast.dismiss(toastId);
        toast.success("Section updated");
        result = response?.data?.data;
    } catch (error) {
        toast.dismiss(toastId);
        toast.error(error.message);
    }
    return result;
};

export const createSection = async (data, token) => {
    let result = null;
    const toastId = toast.loading("Creating section...");
    try {
        const response = await apiConnector("POST", CREATE_SECTION_API, data, {
            Authorization: `Bearer ${token}`,
        });

        if (!response?.data?.success) {
            throw new Error("Could not create section");
        }

        toast.dismiss(toastId);
        toast.success("Section created successfully");
        result = response?.data?.updatedCourseDetails;
    } catch (error) {
        toast.dismiss(toastId);
        toast.error("Could not create section");
    }
    return result;
};

export const createSubSection = async (data, token) => {
    let result = null;
    const toastId = toast.loading("Adding lecture...");
    try {
        const response = await apiConnector("POST", CREATE_SUBSECTION_API, data, {
            Authorization: `Bearer ${token}`,
        });

        if (!response?.data?.success) {
            throw new Error("Could not create lecture");
        }

        toast.dismiss(toastId);
        toast.success("Lecture added successfully");
        result = response?.data?.data;
    } catch (error) {
        toast.dismiss(toastId);
        toast.error("Could not create lecture");
    }
    return result;
};

export const deleteSection = async (data, token) => {
    let result = null;
    const toastId = toast.loading("Deleting section...");
    try {
        const response = await apiConnector("POST", DELETE_SECTION_API, data, {
            Authorization: `Bearer ${token}`,
        });

        if (!response?.data?.success) {
            throw new Error("Could not delete section");
        }

        toast.dismiss(toastId);
        toast.success("Section deleted successfully");
        result = response?.data?.data;
    } catch (error) {
        toast.dismiss(toastId);
        toast.error("Section could not be deleted");
    }
    return result;
};

export const deleteSubSection = async (data, token) => {
    let result = null;
    const toastId = toast.loading("Deleting lecture...");
    try {
        const response = await apiConnector("POST", DELETE_SUBSECTION_API, data, {
            Authorization: `Bearer ${token}`,
        });

        if (!response?.data?.success) {
            throw new Error("Could not delete lecture");
        }

        toast.dismiss(toastId);
        toast.success("Lecture deleted successfully");
        result = response?.data?.data;
    } catch (error) {
        toast.dismiss(toastId);
        toast.error("Lecture could not be deleted");
    }
    return result;
};

export const updateSubSection = async (data, token) => {
    let result = null;
    const toastId = toast.loading("Updating lecture...");
    try {
        const response = await apiConnector("POST", UPDATE_SUBSECTION_API, data, {
            Authorization: `Bearer ${token}`,
        });

        if (!response?.data?.success) {
            throw new Error("Could not update lecture");
        }

        result = response?.data?.data;
        toast.dismiss(toastId);
        toast.success("Lecture updated successfully");
    } catch (error) {
        toast.dismiss(toastId);
        toast.error("Lecture could not be updated");
    }
    return result;
};

export const editCourseDetails = async (data, token) => {
    let result = [];
    const toastId = toast.loading("Saving course changes...");
    try {
        const response = await apiConnector("POST", EDIT_COURSE_API, data, {
            Authorization: `Bearer ${token}`,
        });

        if (!response.data.success) {
            throw new Error("Could not edit course");
        }

        result = response?.data?.data;
        toast.dismiss(toastId);
        toast.success("Course updated successfully");
    } catch (error) {
        toast.dismiss(toastId);
        toast.error("Failed to update course");
    }
    return result;
};

export const fetchInstructorCourse = async (token) => {
    let result = null;
    const toastId = toast.loading("Loading courses...");
    try {
        const response = await apiConnector("GET", FETCHEDALLCOURSEDETAILS_API, null, {
            Authorization: `Bearer ${token}`,
        });

        if (!response.data.success) {
            throw new Error("Could not fetch courses");
        }
        result = response?.data?.data;
    } catch (error) {
        toast.error("Could not fetch your courses");
    }
    toast.dismiss(toastId);
    return result;
};

export const deleteCourse = async (data, token) => {
    let result = null;
    const toastId = toast.loading("Deleting course...");
    try {
        const response = await apiConnector("DELETE", DELETECOURSE_API, data, {
            Authorization: `Bearer ${token}`,
        });

        if (!response?.data?.success) {
            throw new Error("Could not delete course");
        }

        result = response?.data?.data;
        toast.dismiss(toastId);
        toast.success("Course deleted successfully");
    } catch (error) {
        toast.dismiss(toastId);
        toast.error("Could not delete course");
    }
    return result;
};

export const getFullDetailsOfCourse = async (courseId, token) => {
    let result = null;
    const toastId = toast.loading("Loading course details...");
    try {
        const url = `${GETALLCOURSEBYCOURSEID_API}/${courseId}`;
        const response = await apiConnector("GET", url, null, {
            Authorization: `Bearer ${token}`,
        });

        if (!response?.data?.success) {
            throw new Error("Could not fetch course details");
        }

        toast.dismiss(toastId);
        result = response?.data?.data;
    } catch (error) {
        toast.dismiss(toastId);
        toast.error("Could not fetch course details");
    }
    return result;
};

export const createRating = async (data, token) => {
    const toastId = toast.loading("Submitting rating...");
    try {
        const response = await apiConnector("POST", CREATE_RATING, data, {
            Authorization: `Bearer ${token}`,
        });

        if (!response?.data?.success) {
            throw new Error("Could not submit rating");
        }

        toast.dismiss(toastId);
        toast.success("Rating submitted");
    } catch (error) {
        toast.dismiss(toastId);
        toast.error("Could not submit rating");
    }
};

export const markLectureAsComplete = async (data, token) => {
    let result = null;
    const toastId = toast.loading("Marking lecture as complete...");
    try {
        const response = await apiConnector("POST", LECTURE_COMPLETION_API, data, {
            Authorization: `Bearer ${token}`,
        });

        if (!response.data.success) {
            throw new Error(response.data.error);
        }

        toast.dismiss(toastId);
        toast.success("Lecture marked as complete");
        result = true;
    } catch (error) {
        toast.dismiss(toastId);
        toast.error("Could not mark lecture as complete");
    }
    return result;
};

export const getCourseByCourseId = async (courseId, token) => {
    let result = null;
    const toastId = toast.loading("Loading course...");
    try {
        const url = `${GET_COURSE_BY_COURSEID}/${courseId}`;
        const response = await apiConnector("GET", url, null, {
            Authorization: `Bearer ${token}`,
        });

        if (!response?.data?.success) {
            throw new Error("Could not fetch course");
        }

        result = response?.data?.data;
        toast.dismiss(toastId);
    } catch (error) {
        toast.dismiss(toastId);
        toast.error("Could not fetch course details");
    }
    return result;
};
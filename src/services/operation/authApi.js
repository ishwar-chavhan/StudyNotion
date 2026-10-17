import { apiConnector } from "../apiconnector";
import { authEndpoint } from "../apis";
import { toast } from "react-toastify";
import { setLoading, setToken } from "../../slice/authSlice";
import { setUser } from "../../slice/profileSlice";

const {
    LOGIN_API,
    SIGNUP_API,
    SENDOTP_API,
    RESETPASSTOKEN_API,
    RESETPASSWORD_API,
    CHANGEPASSWORD_API
} = authEndpoint;

export function sendotp(email, navigate) {
    return async (dispatch) => {
        const toastId = toast.loading("Sending OTP...");
        try {
            const response = await apiConnector("POST", SENDOTP_API, { email });

            if (!response.data.success) {
                throw new Error(response.data.message);
            }

            toast.dismiss(toastId);
            toast.success("OTP sent successfully. Please check your email.");
            navigate("/verify-email");
        } catch (error) {
            toast.dismiss(toastId);
            toast.error(error?.response?.data?.message || "Could not send OTP");
        }
    };
}

export function login(email, password, navigate) {
    return async (dispatch) => {
        const toastId = toast.loading("Logging in...");
        dispatch(setLoading(true));
        try {
            const response = await apiConnector("POST", LOGIN_API, { email, password });

            if (!response.data.success) {
                throw new Error(response.data.message);
            }

            toast.dismiss(toastId);
            toast.success("Logged in successfully");

            dispatch(setToken(response.data.token));

            const userImage = response.data?.user?.image
                ? response.data.user.image
                : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.user.firstName} ${response.data.user.lastName}`;

            dispatch(setUser({ ...response.data.user, image: userImage }));
            localStorage.setItem("token", JSON.stringify(response.data.token));
            localStorage.setItem("user", JSON.stringify(response.data.user));
            navigate("/dashboard/myprofile");
        } catch (error) {
            toast.dismiss(toastId);
            toast.error(error?.response?.data?.message || "Login failed");
        }
        dispatch(setLoading(false));
    };
}

export function signup(
    accountType,
    firstName,
    lastName,
    password,
    confirmPassword,
    otp,
    email,
    navigate,
) {
    return async (dispatch) => {
        const toastId = toast.loading("Creating account...");
        dispatch(setLoading(true));
        try {
            const response = await apiConnector("POST", SIGNUP_API, {
                accountType,
                firstName,
                lastName,
                password,
                confirmPassword,
                email,
                otp,
            });

            if (!response.data.success) {
                throw new Error(response.data.message);
            }

            toast.dismiss(toastId);
            toast.success("Account created successfully");
            navigate("/login");
        } catch (error) {
            toast.dismiss(toastId);
            toast.error(error?.response?.data?.message || "Sign up failed");
            navigate("/signup");
        }
        dispatch(setLoading(false));
    };
}

export function getPasswordResetToken(email, setEmailSent) {
    return async (dispatch) => {
        dispatch(setLoading(true));
        const toastId = toast.loading("Sending reset email...");
        try {
            const response = await apiConnector("POST", RESETPASSTOKEN_API, { email });

            if (!response.data.success) {
                throw new Error(response.data.message);
            }

            toast.dismiss(toastId);
            toast.success("Password reset email sent. Please check your inbox.");
            setEmailSent(true);
        } catch (error) {
            toast.dismiss(toastId);
            toast.error(error?.response?.data?.message || "Failed to send reset email");
        }
        dispatch(setLoading(false));
    };
}

export function resetPassword(password, confirmPassword, token, doneResetState) {
    return async (dispatch) => {
        dispatch(setLoading(true));
        const toastId = toast.loading("Resetting password...");
        try {
            const response = await apiConnector("POST", RESETPASSWORD_API, {
                password,
                confirmPassword,
                token,
            });

            if (!response.data.success) {
                throw new Error(response.data.message);
            }

            toast.dismiss(toastId);
            toast.success("Password reset successfully");
            doneResetState(true);
        } catch (error) {
            toast.dismiss(toastId);
            toast.error(error?.response?.data?.message || "Could not reset password");
        }
        dispatch(setLoading(false));
    };
}

export function logOut(navigate) {
    return (dispatch) => {
        dispatch(setToken(null));
        dispatch(setUser(null));
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        toast.success("Logged out successfully");
        navigate("/");
    };
}

export function changePasswordOf(password, newPassword, confirmPassword, token) {
    return async (dispatch) => {
        const toastId = toast.loading("Changing password...");
        try {
            const response = await apiConnector(
                "POST",
                CHANGEPASSWORD_API,
                { password, newPassword, confirmPassword },
                { Authorization: `Bearer ${token}` }
            );

            if (!response.data.success) {
                throw new Error(response.data.message);
            }

            toast.dismiss(toastId);
            toast.success("Password changed successfully");
        } catch (error) {
            toast.dismiss(toastId);
            toast.error(error?.response?.data?.message || "Could not change password");
        }
    };
}
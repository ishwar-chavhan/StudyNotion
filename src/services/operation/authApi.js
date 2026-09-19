import { apiConnector } from "../apiconnector";
import { authEndpoint } from "../apis";
import { toast } from "react-toastify";
import { setLoading , setToken , setSignupData } from "../../slice/authSlice";
import { setUser } from "../../slice/profileSlice";

const{
    LOGIN_API,
    SIGNUP_API,
    SENDOTP_API,
    RESETPASSTOKEN_API,
    RESETPASSWORD_API,
    CHANGEPASSWORD_API
} = authEndpoint;


export function sendotp(email , navigate){
    return async(dispatch) =>{
        const toastId = toast.loading("...loading");
        try{
            const response = await apiConnector("POST" , SENDOTP_API , {email});

            console.log("SENDOTP API RESPONSE............", response)

            console.log(response.data.success)

            if(!response.data.success){
                throw new Error(response.data.message);
            }

            toast.success("OTP Sent Successfully");

            navigate("/verify-email");

        }catch(error){
            console.log("SENDOTP api error......." , error);
            toast.error("could not send otp");
        }
        toast.dismiss(toastId)
    }
}

export function login(email , password ,navigate){
    return async (dispatch)=>{
        const toastId = toast.loading("...loading");
        dispatch(setLoading(true));
        try{
            const response = await apiConnector("POST" , LOGIN_API , {
                email ,
                password,
            })

            console.log("login api response....." , response);

            // response got no success-> false
            if(!response.data.success){
                throw new Error(response.data.message);
            }

            toast.success("Login Successfully");
            // token set 
            dispatch(setToken(response.data.token));

            // image of user
            const userImage = response.data?.user?.image
            ?   response.data.user.image 
            : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.user.firstName} ${response.data.user.lastName}`

            // user data and userImage set 
            dispatch(setUser({...response.data.user , image: userImage}));
            localStorage.setItem("token", JSON.stringify(response.data.token))
            localStorage.setItem("user" , JSON.stringify(response.data.user));
            // all done navigate to dashboard and my profile
            navigate("/dashboard/myprofile");
        }catch(error){
            console.log("login api error....." , error);
            toast.error("login failed");

        }
        dispatch(setLoading(false));
        toast.dismiss(toastId);
    }
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
){
   return async (dispatch)=>{
     const toastId = toast.loading("...loading");
     dispatch(setLoading(true));
    try{
        const response = await apiConnector("POST" , SIGNUP_API , {
                accountType,
                firstName,
                lastName,
                password,
                confirmPassword,
                email,
                otp,
        })

        if(!response.data.success){
            throw new Error(response.data.message);
        }

        toast.success("signup successfully");
        navigate("/login");
    }catch(error){
        console.log(error);
        toast.error("sign up failed");
        navigate("/signup")
    }
    toast.dismiss(toastId);
    dispatch(setLoading(false));
   }
}

export function getPasswordResetToken(
    email ,
    setEmailSent,
){
    return async(dispatch)=>{
        dispatch(setLoading(true));
        const toastId = toast.loading("...loading");
        try{
            const response = await apiConnector("POST" , RESETPASSTOKEN_API , {email , });
            console.log('RESET PASSWORD TOKEN RESPONSE...' , response);

            if(!response.data.success){
                throw new Error(response.data.message);
            }

            toast.success("reset mail sent");
            setEmailSent(true);
        }catch(error){
            console.log("reset password token error",error);
            toast.error("error on reset pass")

        }
        dispatch(setLoading(false));
        toast.dismiss(toastId);
    }

}


export function resetPassword(password , confirmPassword , token ,doneResetState){
    return async(dispatch)=>{
        dispatch(setLoading(true));
        const toastId = toast.loading("...loading");
        try{
            const response = await apiConnector("POST" ,  RESETPASSWORD_API, {
                password ,
                confirmPassword,
                token
            });
            console.log("RESET PASSWORD RESPONSE...." , response);

            if(!response.data.success){
                toast.error("kush to gadbad hai")
                throw new Error(response.data.message);
            }
            doneResetState(true);
            toast.success("Password reset successfully")
        }catch(error){
            console.log(error);
            toast.error("could not reset password")
        }
         dispatch(setLoading(false));
         toast.dismiss(toastId);
    }
}

export function logOut(navigate){
    return (dispatch)=>{
        dispatch(setToken(null));
        dispatch(setUser(null));
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        toast.success("logged out");
        navigate("/");
    }
}


export function changePasswordOf(
    password,
    newPassword,
    confirmPassword,
    token
){
    return async(dispatch)=>{
        const toastId = toast.loading("...loading")
        try{
            console.log("error stage1")
            const response = await apiConnector("POST" , CHANGEPASSWORD_API ,{
                   password,
                    newPassword,
                    confirmPassword
            },{
                    Authorization: `Bearer ${token}`,
            }
        );
        console.log("error stage2")

        console.log(response);
        if(!response.data.message){
            throw new Error(response.data.message);
        }
        console.log("error stage3")

        toast.success("password is changed");

        }catch(error){
            console.log("error in changePassword" , error);
            toast.error("could not change password please try agian later");
        }
        toast.dismiss(toastId);
    }

}
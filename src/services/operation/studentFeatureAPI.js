import { toast } from "react-toastify";
import { studentEndpoint } from "../apis";
import { apiConnector } from "../apiconnector";
import rzpLogo from "../../assets/Logo/Logo-Full-Light.png"
// import { verifyPayment } from "../../../MegaProject/controllers/Payment";
import { resetCart } from "../../slice/cartSlice";


const {
    COURSE_PAYMENT_API,
    COURSE_VERIFY_API,
    SEND_PAYMENT_SUCCESS_EMAIL_API
} = studentEndpoint;


function loadScript (src){
    return new Promise((resolve)=>{
        const script = document.createElement("script");
        script.src = src;

        script.onload=()=>{
            resolve(true);
        }

        script.onerror = ()=>{
            resolve(false);
        }

        document.body.appendChild(script)
    })
}


export async function buyCourse(token , courses , userDetails , navigate , dispatch){
    const toastId = toast.loading("...loading");
    try{
        const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");
        if(!res){
            toast.error("RazorPay SDK failed to load");
            return;
        }
// console.log("reached this level")
        const orderResponse = await apiConnector("POST" , COURSE_PAYMENT_API , {courses},  {
               Authorization: `Bearer ${token}`,
        })
        
        if(!orderResponse.data.success){
            throw new Error(orderResponse.data.message);
        }
        console.log("orderResponse",orderResponse)
        console.log("Razorpay Key:", process.env.REACT_APP_RAZORPAY_KEY);
        const options ={
            key :  process.env.REACT_APP_RAZORPAY_KEY,
            currency : orderResponse.data.data.currency,
            amount : `${orderResponse.data.data.amount}`,
            order_id :  orderResponse.data.data.id,
            name : "StudyNotion",
            description : "thank you for purchasing the course",
            image : rzpLogo ,
            prefill : {
                name : `${userDetails.firstName}${" "}${userDetails.lastName}`,
                email : userDetails.email,
            } ,
            handler : function(response){
                // send successfull mail
                sendPaymentSuccessEmail(response , orderResponse.data.data.amount , token);
                
                // vefiry payment
                verifyPayment({...response , courses} , token , navigate , dispatch)
            },
        }   

        const paymentObject = new window.Razorpay(options)
        paymentObject.open();
        paymentObject.on("payment.failed" , function(response){
            toast.error("oops , payment failed");
            console.log(response.error)
        })
    }catch(error){
        console.log("payment api error..", error);
        toast.error("could not make payment");
    }
    toast.dismiss(toastId);
}


async function sendPaymentSuccessEmail(response , amount , token){
    try{
        console.log("level 1")
       
        await apiConnector("POST" , SEND_PAYMENT_SUCCESS_EMAIL_API ,
             {
                orderId : response.razorpay_order_id,
                paymentId : response.razorpay_payment_id,
                amount,
             },
             {
            Authorization: `Bearer ${token}`,
             }
            )
                    console.log("level 2")

    }catch(error){
        console.log("PAYMENT SUCCESS EMAIL ERROR..." , error);
    }
}

// verify payment

async function verifyPayment(bodyData , token , navigate , dispatch){
    const toastId = toast.loading("Verifyping Payment...."); 
    // dispatch(setPaymentLoading(true));
     console.log(bodyData);
    try{
         console.log("level 1")
        const response = await apiConnector("POST" , COURSE_VERIFY_API , bodyData ,{
            Authorization: `Bearer ${token}`,
        });

         console.log("level 2")
        if(!response.data.success){
            throw new Error("something is wrong in verify payment");
        }

        toast.success("payment successfull , your added to the course");
        navigate("/dashboard/enrolled-courses");
        dispatch(resetCart());
    }catch(error){
        console.log("PAYMENT NOT VERIFY ERROR..." , error);
        toast.error("Could not verify payment");
    }
    toast.dismiss(toastId);
    // dispatch(setPaymentLoading(false));
}
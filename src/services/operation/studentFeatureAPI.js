import { toast } from "react-toastify";
import { studentEndpoint } from "../apis";
import { apiConnector } from "../apiconnector";
import rzpLogo from "../../assets/Logo/Logo-Full-Light.png";
import { resetCart } from "../../slice/cartSlice";

const {
    COURSE_PAYMENT_API,
    COURSE_VERIFY_API,
    SEND_PAYMENT_SUCCESS_EMAIL_API,
} = studentEndpoint;

function loadScript(src) {
    return new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = src;
        script.onload = () => resolve(true);
        script.onerror = () => resolve(false);
        document.body.appendChild(script);
    });
}

export async function buyCourse(token, courses, userDetails, navigate, dispatch) {
    const toastId = toast.loading("Preparing checkout...");
    try {
        const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");
        if (!res) {
            toast.dismiss(toastId);
            toast.error("Razorpay SDK failed to load. Check your internet connection.");
            return;
        }

        const orderResponse = await apiConnector("POST", COURSE_PAYMENT_API, { courses }, {
            Authorization: `Bearer ${token}`,
        });

        if (!orderResponse.data.success) {
            throw new Error(orderResponse.data.message);
        }

        toast.dismiss(toastId);

        const options = {
            key: process.env.REACT_APP_RAZORPAY_KEY,
            currency: orderResponse.data.data.currency,
            amount: `${orderResponse.data.data.amount}`,
            order_id: orderResponse.data.data.id,
            name: "StudyNotion",
            description: "Thank you for purchasing the course",
            image: rzpLogo,
            prefill: {
                name: `${userDetails.firstName} ${userDetails.lastName}`,
                email: userDetails.email,
            },
            handler: function (response) {
                sendPaymentSuccessEmail(response, orderResponse.data.data.amount, token);
                verifyPayment({ ...response, courses }, token, navigate, dispatch);
            },
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
        paymentObject.on("payment.failed", function () {
            toast.error("Payment failed. Please try again.");
        });
    } catch (error) {
        toast.dismiss(toastId);
        toast.error(error?.response?.data?.message || "Could not initiate payment");
    }
}

async function sendPaymentSuccessEmail(response, amount, token) {
    try {
        await apiConnector(
            "POST",
            SEND_PAYMENT_SUCCESS_EMAIL_API,
            {
                orderId: response.razorpay_order_id,
                paymentId: response.razorpay_payment_id,
                amount,
            },
            { Authorization: `Bearer ${token}` }
        );
    } catch (error) {
        // Non-critical: don't block the user if email fails
    }
}

async function verifyPayment(bodyData, token, navigate, dispatch) {
    const toastId = toast.loading("Verifying payment...");
    try {
        const response = await apiConnector("POST", COURSE_VERIFY_API, bodyData, {
            Authorization: `Bearer ${token}`,
        });

        if (!response.data.success) {
            throw new Error("Payment verification failed");
        }

        toast.dismiss(toastId);
        toast.success("Payment successful! You are now enrolled.");
        navigate("/dashboard/enrolled-courses");
        dispatch(resetCart());
    } catch (error) {
        toast.dismiss(toastId);
        toast.error(error?.response?.data?.message || "Could not verify payment");
    }
}
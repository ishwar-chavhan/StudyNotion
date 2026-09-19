import React, { useEffect, useState } from 'react'
import OtpInput from 'react-otp-input';
import { useDispatch, useSelector } from 'react-redux';
import { SlReload } from "react-icons/sl";
import { useNavigate } from 'react-router-dom';
import { sendotp } from '../services/operation/authApi';
import { FaArrowLeftLong } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import { signup } from '../services/operation/authApi';
const VerifyEmail = () => {
    const [otp, setOtp] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { loading, signupData } = useSelector((state) => state.auth);

    useEffect(() => {
        if (!signupData) {
            navigate("/signup");
        }
    }, [signupData, navigate]);


    const {
        accountType,
        firstName,
        lastName,
        email,
        password,
        confirmPassword,

    } = signupData;


    function handleOnSubmit(e) {
        e.preventDefault();
        console.log(otp);
        console.log(signupData);
        // dispatch(signup(accountType, firstName, lastName, password, confirmPassword, otp, navigate));
        dispatch(signup(accountType, firstName, lastName, password, confirmPassword, otp, email, navigate));
    }

    return (
        <div className='text-white flex flex-col justify-center items-center h-[80vh]'>
            {
                loading ?
                    (<div></div>)
                    :
                    (
                        <div className='flex flex-col w-[400px] gap-4'>
                            <h1 className='text-[30px] font-semibold text-richblack-5 font-inter'>Verify email</h1>
                            <p className='text-[18px] text-richblack-100 font-inter'>
                                A verification code has been sent to you. Enter the code below
                            </p>
                            <form onSubmit={handleOnSubmit} className='w-full flex flex-col gap-3'>
                                  <OtpInput
                                            value={otp}
                                            onChange={setOtp}
                                            numInputs={6}
                                            renderInput={(props) => (
                                                <input
                                                {...props}
                                                placeholder="-"
                                                style={{
                                                    boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                                                }}
                                                className="w-[48px] lg:w-[60px] border-0 bg-richblack-800 rounded-[0.5rem]
                                                 text-richblack-5 aspect-square text-center focus:border-0 focus:outline-2
                                                  focus:outline-yellow-50"
                                                />
                                            )}
                                            containerStyle={{
                                                justifyContent: "space-between",
                                                gap: "0 6px",
                                            }}
                                            />
                                 <button type='submit' className='w-full p-3 bg-yellow-50 rounded-lg text-richblack-900 font-semibold mt-3'>
                                    Verify Email
                                </button>
                            </form>

                            <div className='flex justify-between'>
                                <div className='flex items-center gap-3 '>
                                    <FaArrowLeftLong />
                                    <Link to="/login">
                                        <p className='text-[18px]'>Back To Login</p>
                                    </Link>
                                </div>
                                <div className='flex items-center gap-3 text-richblue-100'>
                                    <SlReload />
                                    <button onClick={() => dispatch(sendotp(signupData.email, navigate))}>
                                        Resend it
                                    </button>
                                </div>
                            </div>
                        </div>
                    )
            }
        </div>
    )
}

export default VerifyEmail

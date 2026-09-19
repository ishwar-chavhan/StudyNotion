import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { FaArrowLeftLong } from "react-icons/fa6";
import { getPasswordResetToken } from '../services/operation/authApi';


const ForgotPassword = () => {
    const [emailSent , setEmailSent] = useState(false);
    const [email , setEmail] = useState("");
    const {laoding} = useSelector((state)=>state.auth);
    const dispatch = useDispatch();
    function handleOnSubmit(e){
        e.preventDefault();
        dispatch(getPasswordResetToken(email , setEmailSent));
    }
  return (
    <div className='text-white flex justify-center  items-center h-[80vh]'>
       <div className='w-[30%] flex flex-col gap-3'>
         {
            laoding ? (
                <div>

                </div>
            ) : (
                <div className='flex flex-col gap-6'>
                    <div>
                        <h1 className='text-[30px] font-semibold text-richblack-25'>
                        {
                            !emailSent ? "Reset Your Password" : "Check Your Email"
                        }
                    </h1>
                    <p className='text-[16px]  text-richblack-100'>
                        {
                           ! emailSent 
                           ? "Have no fear. Well email you instructions to reset your password. If you dont have access to your email we can try account recovery" 
                           : 
                           `We have sent the reset email to ${email}`
                        }
                    </p>
                    </div>

                        <form onSubmit={handleOnSubmit} className='flex gap-[12px] flex-col'>
                        {
                            !emailSent && (
                                <label className='w-full'>
                                    <p className='text-[14px] text-richblack-25'>Email Address :</p>
                                    <input 
                                    type='email' 
                                    required 
                                    name='email'
                                    value={email}
                                    onChange={(e)=>setEmail(e.target.value)}
                                    placeholder='Enter your email address'
                                    className='w-full p-3 rounded-md mt-1 bg-richblack-800 text-richblack-5'
                                    />
                                </label>
                            )
                        }
                        <button type='submit' className='w-full mt-4 p-3 bg-yellow-50 rounded-lg hover:scale-95 transition-all duration-200 text-richblack-800 '>
                            {
                                !emailSent ? "Reset Password" : "Resend Email"
                            }
                        </button>
                    </form>
                    <div className='flex items-center gap-3 '>
                        <FaArrowLeftLong />
                        <Link to ="/login">
                             <p>Back To Login</p>
                        </Link>    
                    </div>

                </div>
            )
        }  
       </div>
    </div>
  )
}

export default ForgotPassword

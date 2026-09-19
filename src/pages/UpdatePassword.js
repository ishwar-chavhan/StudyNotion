import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import {AiOutlineEye , AiOutlineEyeInvisible} from "react-icons/ai"; 
import { Link } from 'react-router-dom';
import { FaArrowLeftLong } from "react-icons/fa6";
import { resetPassword } from '../services/operation/authApi';
const UpdatePassword = () => {
    const [showPassword , setShowPassword] = useState(false);
    const [showConfirmPassword , setShowConfirmPassord] = useState(false);
    const {loading}  = useSelector((state) => state.auth);
    const [formData , setFormData] = useState({
        password : "",
        confirmPassword : ""
    })
    const location = useLocation();

    const dispatch = useDispatch();
    const {password , confirmPassword} = formData;
    function handleChange(e){
        setFormData((prevData) =>({
            ...prevData,
            [e.target.name] : e.target.value
        }))
    }

    const [resetState , doneResetState] = useState(false);

    function handleOnSubmit(e){
        e.preventDefault();
        const token = location.pathname.split("/").at(-1);
        dispatch(resetPassword(password , confirmPassword , token , doneResetState));
    }

  return (
    <div className='text-white flex flex-col justify-center items-center h-[80vh]'>
        {
            loading ? (<div>
                loading
            </div>) 
            :
            (
            <div className='flex flex-col gap-4 justify-center ml-44 w-[400px]'>
                <h1 className='text-[30px] font-semibold font-inter text-richblack-5'>
                    {
                        !resetState ? "Choose new Password" : "Reset Completed!"
                    }
                </h1>
                <p className='text-[18px] text-richblack-100'>
                {
                  !resetState ? "Almost done. Enter your new password and youre all set." 
                  :
                  `All done! We have sent an email to ${"email here"} to confirm`
                }</p>

                <form onSubmit={handleOnSubmit} className='flex flex-col gap-6  '>
                        {
                            !resetState ? (
                            <label className='relative'>
                                    <p className='text-[14px] text-richblack-25'>New Password <span className='text-pink-200'>*</span></p>
                                    <input
                                    type ={showPassword ? "text" : "password"}
                                    name='password'
                                    value={password}
                                    required
                                    onChange={handleChange}
                                    placeholder='Enter New Password'
                                        className='bg-richblack-700 w-full p-3 rounded-lg mt-1'
                                    />
                                    
                                    <span onClick={()=>setShowPassword((prev) =>!prev)} className='absolute top-[35px] right-2'>
                                        {
                                            showPassword ? <AiOutlineEye fontSize={24}/> : <AiOutlineEyeInvisible fontSize={24}/>
                                        }                            
                                    </span>
                            </label>) 
                         :
                          (<div></div>)
                        }

                        {
                            !resetState ? (
                            <label className='relative'>
                                    <p className='text-[14px] text-richblack-25'>Confirm New Password <span className='text-pink-200'>*</span></p>
                                    <input
                                    type ={showConfirmPassword ? "text" : "password"}
                                    name='confirmPassword'
                                    value={confirmPassword}
                                    required
                                    onChange={handleChange}
                                    placeholder='Enter Confirm Password'
                                    className='bg-richblack-700  w-full p-3 rounded-lg mt-1'
                                    />
                                    
                                    <span onClick={()=>setShowConfirmPassord((prev) =>!prev)} className='absolute top-[35px] right-2'>
                                        {
                                            showConfirmPassword ? <AiOutlineEye fontSize={24}/> : <AiOutlineEyeInvisible fontSize={24}/>
                                        }                            
                                    </span>
                            </label>
                            ) 
                            :
                            (<div></div>)
                        }

                        <button  className=' p-4 bg-yellow-50 rounded-lg text-richblack-800 font-semibold'>
                           {
                              !resetState ? 
                                 (<button type='submit'>Reset Password</button>)
                                 :
                                 (
                                    <Link to='/login'>
                                        <p className='text-[18px]'>Return to login</p>
                                    </Link>
                                 ) 
                           }
                        </button>
                </form>

                  <div className='flex items-center gap-3 '>
                        <FaArrowLeftLong />
                        <Link to ="/login">
                              <p className='text-[18px]'>Back To Login</p> 
                        </Link>    
                    </div>


            </div>
            
            )
             
        }
    </div>
  )
}

export default UpdatePassword

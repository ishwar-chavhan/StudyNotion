import React, { useState } from 'react';
import {AiOutlineEye , AiOutlineEyeInvisible} from "react-icons/ai";
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import { sendotp } from '../services/operation/authApi';
import { useDispatch } from 'react-redux';
import { setSignupData } from '../slice/authSlice';
const Signup = () => {

   const [formDataSignUp,  setFormDataSignUp] = useState({
          firstName : "",
          lastName : "",
          email : "",
          // mobileNumber :0 ,
          password : "" ,
          confirmPassword : "",
          accountType : "",
      })
  

      

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPassword , setShowPassword] = useState(false);
  const [showConfirmPassword , setShowConfirmPassord] = useState(false);
  
  function changeHandler(event){
    setFormDataSignUp((prevData)=>({
      ...prevData,
      [event.target.name] : event.target.value,   
    }))
  }

  function submitHandler(event){
        event.preventDefault();
    if(formDataSignUp.password !== formDataSignUp.confirmPassword){
      toast.error("password doesnt match");
      return;
    };

    dispatch(setSignupData(formDataSignUp));
    dispatch(sendotp(formDataSignUp.email , navigate));
    setFormDataSignUp({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      accountType:""
    })
   
  } 
 const[isType , setType] = useState(""); 
  function clickHandler(value){
          const name = "accountType";
          setType(value);
         setFormDataSignUp((prevData)=>({
            ...prevData,
            [name] : value
      }))
      }

  return (
    <div className="text-white flex flex-col gap-1 max-w-maxContent " >

            <div className="flex gap-x-1 p-1  border-b-[1px] border-richblack-200  bg-richblack-800 rounded-full my-6 max-w-max">
                          <button onClick={()=>clickHandler("Student")}
                               className={`${isType === "Student" ? "bg-richblack-900" : "bg-richblack-800 " } text-richblack-5 rounded-full py-2 
                              px-5  max-w-max transition-all duration-200`}
                              >
                              Student
                          </button>
                          <button  onClick={()=>clickHandler("Instructor")}
                              className={`${isType === "Instructor" ? "bg-richblack-900" : "bg-richblack-800 " } text-richblack-5 rounded-full py-2 
                              px-5  max-w-max transition-all duration-200`}
                              >
                              Instructor
                          </button>
                </div>
    
            <form className="flex flex-col gap-5" onSubmit={submitHandler}>
                    
                   <div className='flex gap-5'>
                            <label className="w-full flex flex-col gap-1">
                                <p  className="text-[14px] font-inter mb-1">first Name<span className='text-pink-200'>*</span></p>
                                <input 
                                type='text'
                                className="bg-richblack-800 px-2 py-3 rounded-xl" 
                                placeholder='Enter First Name'
                                name='firstName'
                                value={formDataSignUp.firstName}
                                onChange={changeHandler}
                                required
                                />
                            </label>
                            <label className="w-full flex flex-col gap-1">
                                <p  className="text-[14px] font-inter mb-1">Last Name<span className='text-pink-200'>*</span></p>
                                <input 
                                type='text'
                                className="bg-richblack-800  px-2 py-3 rounded-xl" 
                                placeholder='Enter last Name'
                                name='lastName'
                                value={formDataSignUp.lastName}
                                onChange={changeHandler}
                                required
                                />
                            </label>
                   </div>

                  <label className="w-full flex flex-col gap-1">
                    <p className="text-[14px] font-inter mb-1">Email Address<span className='text-pink-200'>*</span></p>
                    <input type="email"
                      placeholder="Enter Email Address"
                      required 
                      name = "email" 
                      onChange={changeHandler}
                      value={formDataSignUp.email}
                      className="bg-richblack-800 p-3 rounded-xl"
                      />
                  </label>

                   <div className='flex gap-5'>
                            <label className="w-full relative flex flex-col gap-1">
                                <p  className="text-[14px] font-inter mb-1">Create Password<span className='text-pink-200'>*</span></p>
                                <input 
                                type={showPassword ? "text" : "password"}
                                className="bg-richblack-800 px-2 py-3 rounded-xl" 
                                placeholder='Enter Password'
                                name='password'
                                value={formDataSignUp.password}
                                onChange={changeHandler}
                                required
                                />
                                <span onClick={()=>setShowPassword((prev) =>!prev)} className='absolute right-3 bottom-[16%]'>
                                                                                     {
                                                                                         showPassword ? <AiOutlineEye fontSize={24}/> : <AiOutlineEyeInvisible fontSize={24}/>
                                                                                     }                            
                                </span>
                            </label>

                            <label className="w-full relative flex flex-col gap-1">
                                <p  className="text-[14px] font-inter mb-1">Confirm Password<span className='text-pink-200'>*</span></p>
                                <input 
                                type={showConfirmPassword ? "text" : "password"}
                                className="bg-richblack-800  px-2 py-3 rounded-xl" 
                                placeholder='Enter Password'
                                name='confirmPassword'
                                value={formDataSignUp.confirmPassword}
                                onChange={changeHandler}
                                required
                                />
                                 <span onClick={()=>setShowConfirmPassord((prev) =>!prev)} className='absolute right-3 bottom-[16%]'>
                                                                                      {
                                                                                          showPassword ? <AiOutlineEye fontSize={24}/> : <AiOutlineEyeInvisible fontSize={24}/>
                                                                                      }                            
                                 </span>
                            </label>
                   </div>

                       <div className='h-1'></div>
                     
                          <button className="bg-yellow-50 px-3 py-3 rounded-lg text-richblack-900
                           font-bold text-lg hover:scale-95 transition-all duration-200 " type="submit" >
                            Create Account
                          </button> 

            </form>
    </div>
  )
}

export default Signup

import React, { useState } from "react";
import {AiOutlineEye , AiOutlineEyeInvisible} from "react-icons/ai";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import {login} from "../services/operation/authApi";

const Login = () => {

  const [formDataLogin , setFormDataLogin] = useState({
    email : "",
    password : "",
  });

  const [showPassword , setShowPassword] = useState(false);

  const navigate = useNavigate()
  const dispatch = useDispatch();

  function changeHandler(event){
    setFormDataLogin((prevData)=>({
      ...prevData,
      [event.target.name] : event.target.value,   
    }))
  }

  function submitHandler(event){
    event.preventDefault();
    dispatch(login(formDataLogin.email , formDataLogin.password , navigate))
  }
   

  return (
  <div className="text-white flex flex-col gap-1 max-w-maxContent mt-5 ">
        
      

            <form className="flex flex-col gap-5" onSubmit={submitHandler}>
                  <label className="w-full  flex flex-col gap-1">
                    <p className="text-[14px] font-inter mb-1">Email Address<span className='text-pink-200'>*</span></p>
                    <input type="email"
                      placeholder="Enter Email Address"
                      required 
                      name = "email" 
                      onChange={changeHandler}
                      value={formDataLogin.email}
                      className="bg-richblack-800 p-3 rounded-xl"
                      />
                      
                  </label>

                  <label className="text-[14px] gap-1 flex relative flex-col w-full  font-inter mb-1">
                    <p className="text-[14px] font-inter mb-1">Password<span className='text-pink-200'>*</span></p>
                    <input type={showPassword ? "text" : "password"} 
                    placeholder="Enter Password"
                    required
                    name="password"
                    value={formDataLogin.password}
                    onChange={changeHandler}
                     className="bg-richblack-800  p-3  rounded-xl"
                    />
                   <span onClick={()=>setShowPassword((prev) =>!prev)} className='absolute right-3 bottom-[37%]'>
                                                      {
                                                          showPassword ? <AiOutlineEye fontSize={24}/> : <AiOutlineEyeInvisible fontSize={24}/>
                                                      }                            
                    </span>
                    <Link to="/forgot-password" className="ml-auto">
                    <span className="text-[12px] mt-1 text-richblue-100">Forgot Password</span> 
                    </Link>
                  </label>

                    
                    
                          <button className="bg-yellow-50 px-3 py-3 rounded-lg text-richblack-900
                           font-bold text-lg hover:scale-95 transition-all duration-200 " type="submit" >
                            sign in
                          </button> 
                

            </form>

            
                     
  </div>
  )
}

export default Login;

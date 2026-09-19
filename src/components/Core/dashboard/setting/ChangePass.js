import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import {AiOutlineEye , AiOutlineEyeInvisible} from "react-icons/ai";
import { useDispatch, useSelector } from 'react-redux';
import { changePasswordOf } from "../../../../services/operation/authApi";
const ChangePass = () => {
  const {
    register,
    handleSubmit,
    formState : {errors}
  } = useForm();
  const dispatch = useDispatch();
  const {token} = useSelector((state)=>state.auth);

  const [typePass , setTypePass] = useState(false);
  const [typeConfirmPass , setTypeConfirmPass] = useState(false);

   function submitContactForm(data){
    console.log(data);
    const confirmPassword = data.newPassword;
    const password = data.password;
     const  newPassword = data.newPassword;
    dispatch(changePasswordOf(password , newPassword ,confirmPassword , token ));
   }


  return (
    <div className='flex flex-col gap-8  bg-richblack-800 p-6 rounded-xl ' >
        <h2>password</h2>
        <form onSubmit={handleSubmit(submitContactForm)} className='flex flex-col  w-[90%] mx-auto gap-5'>
 
         <div className='flex w-[100%] justify-between'>
           <div className='flex relative flex-col gap-2 w-[48%]'>
            <label htmlFor='password'  className='text-[14px] text-richblack-5'>current password</label>
           <div >
             <input
            type={typePass ? "text" : "password"}
            id = "password"
            name='password'
            placeholder='enter current password'
           className='text-richblack-50 w-full p-3 bg-richblack-700 rounded-lg'
               {...register("password" , {required : true})}
            />
            {
               errors.password && 
                    (
                        <span>
                            Please enter password
                        </span>
                    ) 
            }
            <button className='absolute top-[41px] right-3 ' onClick={(e)=>{
              e.preventDefault();
              setTypePass((prev) => !prev)}}>
              {
                typePass ? <AiOutlineEye fontSize={24}/> : <AiOutlineEyeInvisible fontSize={24}/>
              }
            </button>
           </div>
          </div>


          <div  className='flex relative flex-col gap-2 w-[48%]'>
            <label htmlFor='newPassword'  className='text-[14px] text-richblack-5'>Change password</label>
           <div>
             <input
            type={typeConfirmPass ? "text" : "password"}
            id = "newPassword"
            name='newPassword'
            placeholder='enter current newpassword'
             className='text-richblack-50 w-full p-3 bg-richblack-700 rounded-lg'
               {...register("newPassword" , {required : true})}
            />
            {
               errors.newPassword && 
                    (
                        <span>
                            Please enter newPassword
                        </span>
                    ) 
            }
            <button className='absolute top-[41px] right-3 ' onClick={(e)=>
              {
                e.preventDefault();
                setTypeConfirmPass((prev) => !prev)
            }
            }>
              {
                typeConfirmPass ? <AiOutlineEye fontSize={24}/> : <AiOutlineEyeInvisible fontSize={24}/>
              }
            </button>
           </div>
          </div>
         </div>


          <button type="submit" className='py-2 px-3 rounded-xl text-richblack-700 font-semibold
          bg-yellow-50 self-center w-[150px]'>Save</button>
        
        </form>
      
    </div>
  )
}

export default ChangePass

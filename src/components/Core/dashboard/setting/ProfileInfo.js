import React from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux';
import { profileUpdate } from "../../../../services/operation/profileApi";


const ProfileInfo = () => {
    const {user} = useSelector((state)=>state.profile);
    const {token} = useSelector((state)=>state.auth);
     const dispatch = useDispatch();
    const{
      register,
      handleSubmit,
      formState : {errors}
    } = useForm();


    function submitContactForm(data){
      // console.log(token);
      
      dispatch(profileUpdate(
        data.firstName, 
        data.lastName,
        data.gender,
        data.contactNumber,
        data.about,
        data.dateOfBirth,
        token
      ));
    }


  return (
    <div className='flex flex-col gap-8  bg-richblack-800 p-6 rounded-xl ' >
      <h2 className='text-[26px]'>Profile Information</h2>
      <form className='flex flex-col gap-6 w-[90%] mx-auto' onSubmit={handleSubmit(submitContactForm)}>
        <div className='flex justify-between'>
          {/* first name */}
          <div className='flex flex-col gap-2 w-[48%]'>
            <label htmlFor='firstName' className='text-[14px] text-richblack-5'>First Name</label>
            <input
            type='text'
            name='firstName'
            id='firstName'
            className='text-richblack-50 w-full p-3 bg-richblack-700 rounded-lg'
            defaultValue={`${user?.firstName}`}
            {...register("firstName" , {required : true})}
            />
            {
                    errors.firstName && 
                    (
                        <span>
                            Please enter your name
                        </span>
                    )
              }
          </div>
          {/* last name */}
          <div  className='flex flex-col gap-2 w-[48%]'>
            <label htmlFor='lastName' className='text-[14px] text-richblack-5'>last Name</label>
            <input
            type='text'
            name='lastName'
            id='lastName'
             className='text-richblack-50 w-full p-3 bg-richblack-700 rounded-lg'
            defaultValue={`${user?.lastName}`}
            {...register("lastName" , {required : true})}
            />
            {
                    errors.lastName && 
                    (
                        <span>
                            Please enter your name
                        </span>
                    )
              }
          </div>
        </div> 



        <div  className='flex justify-between'>
          {/* DOB */}
          <div className='flex flex-col gap-2 w-[48%]'>
            <label htmlFor='dateOfBirth'  className='text-[14px] text-richblack-5'>Date of birth</label>
            <input
            type='date'
            name='dateOfBirth'
            id='dateOfBirth'
            className='text-richblack-50 w-full p-3 bg-richblack-700 rounded-lg'
            defaultValue={`${user?.additionDetails?.dateOfBirth}`}
            {...register("dateOfBirth" , {required : true})}
            />
            {
                    errors.dateOfBirth && 
                    (
                        <span>
                            Please enter your name
                        </span>
                    )
              }
          </div>
          {/* gender */}
          <div className='flex flex-col gap-2 w-[48%]'>
            <label htmlFor='gender' className='text-[14px] text-richblack-5'>Gender</label>
            <select
            name='gender'
            id='gender'
            className='text-richblack-50 w-full p-3 bg-richblack-700 rounded-lg'
            defaultValue={`${user?.additionDetails?.gender || "enter your gender"} `}

            {...register("gender" , {required : true})}
            >
                  {/* <option value="" disabled>
                    Enter your gender
                  </option> */}
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>


            </select>
            {
                    errors.gender && 
                    (
                        <span>
                            Please enter your name
                        </span>
                    )
              }
          </div>
        </div>


         <div  className='flex justify-between items-center'>
          {/* contactNumber */}
          <div className='flex flex-col gap-2 w-[48%]'>
            <label htmlFor='contactNumber' className='text-[14px] text-richblack-5'>Contact Number</label>
            <input
            type='tel'
            name='contactNumber'
            id='contactNumber'
            //  className=''
         
            defaultValue={`${user?.additionDetails?.contactNumber}`}
            placeholder='enter contact number'
             className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none
              text-richblack-50 w-full p-3 bg-richblack-700 rounded-lg" 
            {...register("contactNumber" , {required : true,
                minLength: {
                              value: 8,
                              message: "Contact number must be at least 8 digits",
                            },
                maxLength: {
                              value: 10,
                              message: "Contact number must be at most 10 digits",
                            },
                pattern: {
                            value: /^[0-9]+$/,
                            message: "Only numbers are allowed",
                          },
            })}
            />
            {
                    errors.contactNumber && 
                    (
                        <span>
                            Please enter your contact
                        </span>
                    )
              }
          </div>
          {/* about */}
          <div className='flex flex-col gap-[6px] w-[48%]'>
            <label htmlFor='about' className='flex flex-col gap-2 w-[48%]'>About</label>
            <input
            type='text'
            name='about'
            id='about'
            className='text-richblack-50 w-full p-3 bg-richblack-700 rounded-lg'
            defaultValue={`${user?.additionDetails?.about}`}
            placeholder='About you'
            {...register("about" , {required : true})}
            />
            {
                    errors.about && 
                    (
                        <span>
                            Please enter your name
                        </span>
                    )
              }
          </div>
        </div>


        <button type="submit" className='py-2 px-3 rounded-xl text-richblack-700 font-semibold
          bg-yellow-50 self-center w-[150px]'>Save</button>
       
      </form>
    </div>
  )
}

export default ProfileInfo

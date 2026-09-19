import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import CountryCode from "../data/countrycode.json";
const ContactPage = () => {
    const {
        register ,
        handleSubmit,
        reset,
        formState : {errors , isSubmitSuccessful}
    } = useForm();


    const submitContactForm = async(data) => {
        try{
            const response = {status : "Ok"}
            console.log("Logging Response" ,  response);
        }catch(error){
            console.log("error : " , error);
        }
    }

    useEffect(()=>{
        if(isSubmitSuccessful){
            reset({
                email: "",
                firstName: "",
                lastName: "",
                message: "",
                phoneNo: "",
            })
        }
    }, [reset, isSubmitSuccessful]);




  return (
    <form className='flex flex-col gap-4 mt-4 text-richblack-600'  onSubmit={handleSubmit(submitContactForm)}>
        <div className='flex gap-5  justify-between'>
            {/*firstname*/}
            <div className='flex w-[47%] gap-2 flex-col'>
                <label htmlFor='firstName'  className='text-richblack-5 text-[13px] ml-1 font-inter'>
                    First Name
                </label>
                <input 
                type='text'
                name = 'firstName'
                placeholder='Enter first name '
                id='firstName'
                className='w-full bg-richblack-800 p-3 rounded-lg text-richblack-5'
                {...register("firstName" , {required:true})}
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
            {/* lastname */}
             <div className='flex w-[48%] gap-2 flex-col'> 
                <label htmlFor='lastName' className='text-richblack-5 ml-1 text-[14px] font-inter'>
                    Last Name
                </label>
                <input 
                type='text'
                name = 'lastName'
                placeholder='Enter last name'
                id='lastName'
                className='w-full bg-richblack-800 p-3 rounded-lg text-richblack-5'
                {...register("lastName" ,{ required : true} )}
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
        </div>
                    {/* email */}
        <div className='flex gap-2 flex-col'>
                <label htmlFor='email' className='text-richblack-5 ml-1 text-[14px] font-inter'>
                    Email Address
                </label>
                <input
                type = "email"
                name = "email"
                id = "email"
                className='w-full bg-richblack-800 p-3 rounded-lg text-richblack-5'
                placeholder = "Enter your email address"
                {...register("email" , {required : true})}
                />
                {
                    errors.email && (
                        <span>
                            Please enter your email address
                        </span>
                    )
                }
        </div>

        <div className='flex flex-col gap-2'>
            <label htmlFor='phonenumber' className='text-richblack-5 ml-1 text-[14px] font-inter'>
                Phone Number
            </label>
            <div className='flex gap-5'>
                {/* select  */}
               
                    <select 
                    name="dropdown"
                    id = "dropdown"
                    className='w-[75px] bg-richblack-800 p-3 rounded-lg text-richblack-5'

                    {...register("countrycode" , {required : true})}
                    >
                        {
                            CountryCode.map((element , index)=>{
                                return (
                                    <option key={index} value={element.code}>
                                        {element.code}-{element.country}
                                    </option>
                                )
                            })
                        }

                    </select>
           

                
                    <input
                    type='number'
                    name = "phonenumber"
                    id='phonenumber'
                    placeholder='12345 67890'
                    className=' w-[calc(100%-80px)] bg-richblack-800 p-3 rounded-lg text-richblack-5
                    [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none
                    '
                    {...register("phoneNo" , 
                    {
                        required : {value : true , message : "Please Enter Phone Number"} ,
                        maxLength : {value : 10 , message : "Invalid Phone Number"},
                        minLength : {value : 8 , message : "Invalid Phonse Number"}
                    })}

                    />
              
            </div>
            {
                errors.phoneNo && (
                    <span>
                        {errors.phoneNo.message}
                    </span>
                )
            }
        </div>

        {/* text area */}
        <div className='flex flex-col w-full gap-2'>
            <label htmlFor='message' className='text-richblack-5 ml-1 text-[14px] font-inter'>
                Message
            </label>
            <textarea
            name='message'
            id='message'
            cols="30"
            rows="7"
                className='w-full bg-richblack-800 p-3 rounded-lg text-richblack-5'
            placeholder='Enter your message here'
            {...register("message" , { required : true})}
            />
            {
                errors.message && (
                    <span>please enter your message</span>
                )
            }
        </div>

        <button type='submit' className=' mt-4 bg-yellow-50 rounded-md 
        text-center p-3 text-richblack-900 font-bold
        '> 
            Send Message
        </button>
    </form>
  )
}

export default ContactPage

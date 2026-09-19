import React from 'react'
import Login from './login';
import loginBackImage from "../assets/Images/frame.png";
import Signup from './signup';


const Template = ({ title, data2, data1, image, formtype }) => {






  return (
    <div className='flex  gap-48 justify-center items-center  mt-10 mx-auto w-11/12 max-w-maxContent'>
      <div className='w-11/12 max-w-[450px] '>
        <div>
          <div className="flex flex-col gap-3 font-inter">
            <h2 className="text-[30px] text-richblack-5 font-semibold">{title}</h2>
            <p className="text-[18px] text-richblack-100  font-bold ">{data1}<br />
              <span className="text-[16px] text-richblue-100 font-edu-sa ">{data2}</span> </p>
          </div>
        </div>
        {/* LOGIN AND SIGN IN SWITCHHING */}
        {formtype === "login" ? <Login /> :
          <Signup />
        }


      </div>
      <div className='relative max-w-[450px] w-11/12 '>
        <img src={image} alt='image1' width={450} className='absolute -top-4 -left-4 ' />
        <img src={loginBackImage} alt='image2' width={450} />
      </div>

    </div>
  )
}

export default Template

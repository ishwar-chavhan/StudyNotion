import React from 'react';
import InstructorImage from "../assets//Images/Instructor.png";
import HighlightText from './HighlightText';
import { FaArrowRight } from "react-icons/fa";
import CTAButton from "./Button";

const InstructorSection = () => {
  return (
    <div className='mt-10'>
        <div className='flex gap-[98px] pb-10'>
          <div>
            <img src = {InstructorImage} alt='instructorImage'  className=' shadow-[-13px_-13px_1px_2px_#ffffff] '/>
          </div>
          <div className='flex flex-col items-start justify-center w-[486px] gap-[15px]'>
            <p className='text-[36px] font-semibold'>Become an <HighlightText text={"instuctor"}/></p>
            <p className='text-[16px]'>Instructors from around the world teach millions of students on StudyNotion. 
              We provide the tools and skills to teach what you love.
            </p>
          <div className='mt-12'>
              <CTAButton active = {true} linkto = {"/signup"} >
              <p className='flex flex-row items-center gap-5'>Start teachin today <FaArrowRight/></p>
            </CTAButton>  </div>            
          </div>

        </div>
    </div>
  )
}


export default InstructorSection

import React from 'react';
import HighlightText from "./HighlightText";
import CTAButton from "../HomePage/Button"
import know_your_progress from "../assets/Images/Know_your_progress.png";
import campare_with_others from "../assets/Images/Compare_with_others.png";
import plan_your_lession from "../assets/Images/Plan_your_lessons.png";

const LearningLanguegeSection = () => {
  return (
    <div className='mt-[130px] mb-20'>
            <div className='flex flex-col gap-5 items-center'>
                 <div className='text-4xl font-semibold text-center'>
                    your swiss knife for <HighlightText text={"learning any languege"}/>
                 </div>
                 <div className='text-center text-richblack-600 mx-auto text-base w-[70%] font-medium'>
                    Using spin making learning multiple languages easy. with 20+ languages realistic 
                    voice-over, progress tracking, custom schedule and more.
                 </div>

                 <div className='flex flex-row items-center justify-center mt-5'> 
                    <img src={know_your_progress}
                    alt='knowYpurProgres'
                    className='object-contain -mr-32'
                    /> 

                    <img src={campare_with_others}
                    alt='knowYpurProgres'
                    className='object-contain'
                    /> 

                    <img src={plan_your_lession}
                    alt='knowYpurProgres'
                    className='object-contain -ml-32'
                    /> 

                </div>
                <div className='w-fit'>
                    <CTAButton active = {true} linkto = {"/signup"}>
                        <div>
                            Learn More
                        </div>
                    </CTAButton>
                </div>
            </div>
      
    </div>
  )
}

export default LearningLanguegeSection;

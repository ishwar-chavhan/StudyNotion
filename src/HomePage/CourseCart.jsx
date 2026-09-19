import React from 'react';
import { RxPeople } from "react-icons/rx";
import { TbBinaryTree2 } from "react-icons/tb";


const CourseCart = ({cardData , currentCart , setCurrentCart , index}) => {
  return (
    <div>
            {
            <div className={`flex flex-col gap-5 font-inter w-[85%] mx-auto px-10 py-6  ${
                index === 0 ? "bg-white shadow-[15px_15px_1px_2px_#FDFF2E]" : "bg-richblack-800"
            }`}>
                <div className='pb-16 flex gap-4 flex-col border-b border-dashed border-richblack-500' >
                    <p className={`${index === 0 ? "text-richblack-800 " : "text-richblack-25"} text-[20px] font-semibold`}>{cardData.heading}</p>
                    <p className={`${index === 0 ? "text-[16px] text-richblack-500" : "text-richblack-300"}`}>{cardData.description}</p>
                </div>
                <div className={`flex justify-between ${index === 0 ? "text-richblue-500 " : "text-richblack-300"}`}>
                    <div className='flex items-center gap-3'>
                        <RxPeople />
                        <p>{cardData.level}</p>
                    </div>
                    <div className='flex items-center gap-3'>
                        <TbBinaryTree2 />
                        <p>{cardData.lessionNumber} Lessons</p>
                    </div>
                </div>
            </div>
            }
    </div>
  )
}

export default CourseCart

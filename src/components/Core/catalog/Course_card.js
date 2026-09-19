import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import GetAvgRating from '../../../utils/avgRating';
import RatingStars from '../../Common/RatingStars';

const Course_card = ({course , height , width}) => {
    const [avgReviewCount , setAvgReviewCount] = useState(0);
    useEffect(()=>{
        const count = GetAvgRating(course.ratingAndreviews);
        setAvgReviewCount(count);
        console.log("course data of card",course);
    } , [course]);
  return (
    <div className='border-[1px] py-2 px-2 border-richblack-800 rounded-xl '>
        <Link to={`/course/${course._id}`}>
           <div className='flex flex-col gap-2'>
               <div>
                <img
                 src={course?.thumbnail}
                 alt='thumbnail'
                 style={{
                    height: height,
                    width: width,
                    }}
                 className={`rounded-xl object-cover`} 
                  />

               </div>
               <div className='flex flex-col gap-2'>
                    <p className='text-richblack-5'>{course?.courseName}</p>
                    <p className='text-richblack-300'>
                        {course?.instructor?.firstName} {course?.instructor?.lastName} 
                    </p>
                    <div className='flex gap-5'>
                        <span>{avgReviewCount || 0}</span>
                        {/* create ratuing star component */}
                        <RatingStars Review_Count = {avgReviewCount}/>
                        <span className='text-richblack-400'>
                            {course?.ratingAndreviews?.length} {" "} Ratings
                        </span>
                    </div>
                    <p className='font-semibold'>
                       Rs. {course?.price}
                    </p>
               </div>
               
           </div>

        </Link>
    </div>
  )
}

export default Course_card

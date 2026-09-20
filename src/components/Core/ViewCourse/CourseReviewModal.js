import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { FaStar } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import ReactStars from "react-rating-stars-component"
import { createRating } from '../../../services/operation/courseDetailsAPI';

const CourseReviewModal = ({setReviewModal}) => {
    const {user} = useSelector((state)=>state.profile);
    const {token} = useSelector((state)=> state.auth);
    const {courseEntireData} = useSelector((state)=>state.viewCourse)
    const{
        register,
        handleSubmit,
        setValue,
        formState : {errors}
    } = useForm();

    useEffect(()=>{
        setValue("courseExperience" , "");
        setValue("courseRating" , 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    const onSubmit = async (data)=>{
        console.log("staerted")
        console.log(data)
        await createRating(
            {
                courseId : courseEntireData._id ,
                rating : data.courseRating,
                review :data.courseExperience
            },
            token
        )

        setReviewModal(false);
    }

    const ratingChanged = (newRating)=>{
        console.log(newRating)
        setValue("courseRating" , newRating);
    }

  return (
    <div className='text-white mt-10 w-[350px] rounded-t-lg h-[450px] bg-richblack-800   '>
        <div className='flex flex-col gap-4'>
            {/* modal pheader */}
            <div className='flex justify-between bg-richblack-700 p-5 rounded-t-lg'>
                <p>
                    add review
                </p>
                <button 
                onClick={()=>setReviewModal(false)}
                >
                  <RxCross2 size={24} />
                </button>
            </div>

            {/* modal body */}
            <div className='rounded-b-lg '>
                <div className='flex justify-center gap-3 items-center'>
                        <img 
                        src={user?.image}
                        alt={`${user?.firstName}`}
                        className='aspect-square  w-[52px] h-[52px] rounded-full object-cover'
                        />
                        <div >
                            <p className='text-richblack-5'>{user?.firstName} {user?.lastName}</p>
                            <p className='text-[14px] text-richblack-200'>Posting publicly</p>
                        </div>
                </div>

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className=' flex flex-col items-center'
                    >
               
                     <ReactStars
                                      count={5}
                                      size={20}
                                      onChange={ratingChanged}
                                      activeColor="#ffd700"
                                      emptyIcon={<FaStar />}
                                      fullIcon={<FaStar />}
                            />

                    <div className='mt-5'>
                        <label htmlFor='courseExperience' className='text-[13px] ml-1'>
                            Add Your Experience 
                        </label>
                        <textarea

                          id='courseExperience'
                          placeholder=' Add Your Experience Here'
                          {...register("courseExperience" , {required:true})}
                          className='min-h-[130px] w-full bg-richblack-600 rounded-lg px-3 pb-4 mt-1' 
                        />
                        {
                            errors.courseExperience && (
                                    <span>Please Add Your Experience</span>
                            )
                        }
                    </div>

                    <div className='flex gap-3 mt-7 ml-auto mr-5'>
                        <button
                        className='bg-richblack-300 px-3 py-2 rounded-lg text-richblack-5'
                        onClick={()=>setReviewModal(false)}
                        >
                            Cancel
                        </button>
                        <button type='submit'
                         className='bg-yellow-50 px-3 py-2 rounded-lg text-richblack-900'
                        >
                            Save 
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
  )
}

export default CourseReviewModal

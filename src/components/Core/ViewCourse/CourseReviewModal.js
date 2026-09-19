import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { Rating } from 'react-simple-star-rating'
import { createRating } from '../../../services/operation/courseDetailsAPI';
import { useParams } from 'react-router-dom';

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
        setValue("courseRating" , newRating);
    }

  return (
    <div className='text-white mt-10 text-center'>
        <div>
            {/* modal pheader */}
            <div>
                <p>
                    add review
                </p>
                <button 
                onClick={()=>setReviewModal(false)}
                >
                    close
                </button>
            </div>

            {/* modal body */}
            <div>
                <div>
                        <img 
                        src={user?.image}
                        alt='user image'
                        className='aspect-square mx-auto w-[50px] rounded-full object-cover'
                        />
                        <div>
                            <p>{user?.firstName} {user?.lastName}</p>
                            <p>Posting publicly</p>
                        </div>
                </div>

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className='mt-6 flex flex-col items-center'
                    >
                    <Rating
                      iconsCount={5}
                      onChange={ratingChanged}
                      size={24}
                    />

                    <div>
                        <label htmlFor='courseExperience'>
                            Add Your Experience
                        </label>
                        <textarea

                          id='courseExperience'
                          placeholder=' Add Your Experience Here'
                          {...register("courseExperience" , {required:true})}
                          className='min-h-[130px] w-full bg-richblack-800'
                        />
                        {
                            errors.courseExperience && (
                                    <span>Please Add Your Experience</span>
                            )
                        }
                    </div>

                    <div>
                        <button
                        onClick={()=>setReviewModal(false)}
                        >
                            Cancel
                        </button>
                        <button type='submit'>
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

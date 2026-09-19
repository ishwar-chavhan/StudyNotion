import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { resetCourseState, setStep } from '../../../../slice/courseSlice';
import { COURSE_STATUS } from '../../../../utils/constants';
import { editCourseDetails } from '../../../../services/operation/courseDetailsAPI';
import { useNavigate } from 'react-router-dom';

const PublishCourse = () => {
    const { register, handleSubmit, setValue, getValues } = useForm();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { token } = useSelector((state) => state.auth);
    const { course } = useSelector((state) => state.course);
    const [loading, setLoading] = useState(false);


    useEffect(() => {

        setValue("public", course?.status);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const goback = () => {
        dispatch(setStep(2));
    }

    const goToCourse = () => {
        dispatch(resetCourseState());
        navigate("/dashboard/my-courses");
    }

    const handleCoursePublish = async () => {

        // if ((course?.status === COURSE_STATUS.PUBLISHED && getValues("public") === true) || (course.status === COURSE_STATUS.DRAFT && getValues("public") === false)) {
        //     // no updation in form
        //     // no need to make api call
        //     goToCourse();
        //     return;
        // }
        // if form updated
        const formData = new FormData();
        formData.append("courseId", course._id);
        const courseStatus = getValues("public") ? COURSE_STATUS.PUBLISHED : COURSE_STATUS.DRAFT;
        formData.append("status", courseStatus);
        console.log(getValues("public"));
        setLoading(true);
        console.log(Object.fromEntries(formData.entries()));
        const result = await editCourseDetails(formData, token);

        if (result) {
            goToCourse();
        }

        setLoading(false);

    }

    const onSubmit = () => {
        console.log("ishahda")
        handleCoursePublish();
    }

    return (
        <div className='rounded-md border-[1px] bg-richblack-800
     p-6 border-richblack-700
    '>
            <p>Publish Course</p>

            <form onSubmit={handleSubmit(onSubmit)} className='mt-5'>
                <div>
                    <label htmlFor='public' className='flex items-center'>
                        <input
                            type='checkbox'
                            id='public'
                            defaultChecked={getValues("public")}
                            {
                            ...register("public")
                            }
                            className='rounded h-4 w-4'
                        />
                        <span className='ml-3'> make this course as public</span>
                    </label>
                </div>


                <div className='flex justify-end items-center gap-6'>
                    <button
                        disabled={loading}
                        onClick={goback}
                        type='button'
                        className='flex items-center  px-3 py-2 text-richblack-800 bg-richblack-200 font-semibold rounded-lg'
                    >
                        Back
                    </button>
                    <button
                        disabled={loading}
                        // onClick={(e) => {
                        //     e.preventDefault();
                        //     handleSubmit(onSubmit)(e);
                        // }}
                        type='submit'
                        className='px-3 py-2 text-richblack-800 font-semibold rounded-lg bg-yellow-50'
                    >
                        Save Changes
                    </button>
                </div>
            </form>

        </div>
    )
}

export default PublishCourse

import React, { useEffect, useState } from 'react';
import { buyCourse } from '../services/operation/studentFeatureAPI';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
// import { } from '../services/operation/courseDetailsAPI';
import GetAvgRating from '../utils/avgRating';
import { TbWorld } from "react-icons/tb";
import ConfirmationModal from '../components/Core/dashboard/ConfirmationModal';
import CourseDetailsCard from '../components/Core/Coursees/CourseDetailsCard';
import RatingStars from '../components/Common/RatingStars';
import { getCourseByCourseId } from '../services/operation/courseDetailsAPI';
const CourseDetails = () => {
    const { user } = useSelector((state) => state.profile);
    const { token } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { courseId } = useParams();
    const [courseData, setCourseData] = useState(null);
    const [avgReviewCount, setAvgReviewCount] = useState(0);
    const [totalNoOfLectures, setTotalNoOfLectures] = useState(0);
    const [confirmationModal, setConfirmationModal] = useState(null);
    const [totalDuration, setTotalDuration] = useState(0);
    const [isActive, setIsActive] = useState([]);

    useEffect(() => {
        const getFullCourseDetails = async () => {
            try {
                const result = await getCourseByCourseId(courseId, token);
                setCourseData(result);
            } catch (error) {
                console.log("could not fetch the course details");
            }
        };

        getFullCourseDetails()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [courseId]);


    useEffect(() => {
        let lecture = 0;
        let totalDuration = 0;
        courseData?.courseContent.forEach(element => {
            element.subSection.forEach(element => {
                totalDuration += parseInt(element?.timeDuration) || 0;
            })
            lecture += 1;
        });
        setTotalDuration(totalDuration)
        setTotalNoOfLectures(lecture);
    }, [courseData])


    useEffect(() => {
        const count = GetAvgRating(courseData?.ratingAndreviews);
        setAvgReviewCount(count);
    }, [courseData])

    const handleBuyCourse = () => {
        if (token) {
            buyCourse(token, [courseId], user, navigate, dispatch);
            return;
        }


        setConfirmationModal({
            text1: "you are not logged in",
            text2: "please log in to purchase the course",
            btn1Text: "login",
            btn2Text: "Cancel",
            btn1Handler: () => navigate("/login"),
            btn2Handler: () => setConfirmationModal(null)
        })

    }


    const handleActive = (id) => {
        setIsActive(
            !isActive.includes(id) ?
                isActive.concat(id)
                :
                isActive.filter((e) => e !== id)
        )
    }


    if (!courseData) {
        return (
            <div className='text-white'>
                Loading...
            </div>
        )
    }

    //       if(!courseData.success) {
    //     return ( 
    //         <div>
    //             <Error/>
    //         </div>
    //     )
    //    }
    const {
        courseName,
        courseDescription,
        whatYouWillLearn,
        courseContent,
        instructor,
        ratingAndreviews,
        studentEnrolled,
        createdAt,
    } = courseData;



    return (
        <div className='bg-richblack-800  ' onClick={() => handleActive(0)}>
            <div className=' relative flex items-start pb-10 mx-auto w-11/12 pt-10 max-w-maxContent text-white flex-col'>
                <div className='relative gap-3 flex flex-col   '>
                    <p className='text-[30px] font-semibold text-richblack-5'>
                        {courseName}
                    </p>
                    <p className='text-richblack-200'>
                        {courseDescription}
                    </p>
                    <p className='flex  items-center gap-4'>
                        <span>{avgReviewCount}</span>
                        <RatingStars Review_Count={avgReviewCount} Star_Size={24} />
                        <span className='text-richblack-100'>{`(${ratingAndreviews.length} review)`}</span>
                        <span className='text-richblack-100'>
                            {`${studentEnrolled.length} Student enrolled`}
                        </span>
                    </p>


                    <div>
                        <p className='text-richblack-100 text-[18px] capitalize' >
                            Created By : {instructor.firstName} {instructor.lastName}
                        </p>

                    </div>


                    <div className='flex justify-between w-[80%]'>
                        <p className='text-richblack-100 text-[18px] '>Created At {` Created:${" "}${new Date(createdAt).toLocaleString("en-US", {
                            month: "long",
                            day: "numeric",
                            year: "numeric",
                            // hour: "numeric",
                            // minute: "2-digit",
                            // hour12: true,
                        })}`}
                        </p>
                        <div className='flex gap-3 items-center text-richblack-100 text-[18px]'>
                            <TbWorld />
                            <p >
                                {" "} English
                            </p>
                        </div>
                    </div>


                    <div className='absolute top-0 w-[400px] -right-[650px]'>
                        <CourseDetailsCard
                            course={courseData}
                            setConfirmationModal={setConfirmationModal}
                            handleBuyCourse={handleBuyCourse}
                        />
                    </div>

                </div>
            </div>

            <div className='bg-richblack-900  '>
                <div className='flex items-start mx-auto w-11/12 pt-16 max-w-maxContent text-white flex-col'>

                    <div>
                        <div className='border-[1px] border-richblack-800 p-8 space-y-2' >
                            <p className='text-richblack-5 text-[30px] font-semibold font-inter'>
                                What You Will Learn
                            </p>
                            <p className='text-[14px] text-richblack-25 ml-2'>{whatYouWillLearn}</p>
                        </div>

                        <div className='mt-16'>
                            <>
                                <div className='mb-5'>
                                    <p className='text-[24px] font-semibold'>
                                        Course Content:
                                    </p>
                                </div>
                                <div className='flex gap-x-3 justify-between'>

                                    <div className='space-x-5 text-richblack-100'>
                                        <span>{`• ${courseContent.length} section(s)`}</span>

                                        <span>{`• ${totalNoOfLectures} Lecture(s)`}</span>

                                        {/* first add in controller */}

                                        <span>{totalDuration}</span>
                                    </div>

                                    <div>
                                        <button className='text-yellow-50' onClick={() => setIsActive([])}>
                                            Collapse All Sections
                                        </button>
                                    </div>
                                </div>
                            </>
                            <div>

                            </div>
                        </div>


                    </div>
                </div>
            </div>













            {
                confirmationModal && (
                    <ConfirmationModal modalData={confirmationModal} />
                )
            }
            {
                confirmationModal && <div className='absolute bg-[#5f5f5f83] top-0 right-0 left-0 bottom-0 -z-0 transition-all duration-200 backdrop-blur-sm' onClick={() => setConfirmationModal(null)}></div>
            }
        </div>
    )
}

export default CourseDetails

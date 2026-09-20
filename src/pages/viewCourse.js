import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useParams } from 'react-router-dom';
import { getFullDetailsOfCourse } from '../services/operation/courseDetailsAPI';
import VideoDetailsSidebar from "../components/Core/ViewCourse/VideoDetailsSidebar";
import CourseReviewModal from '../components/Core/ViewCourse/CourseReviewModal';
import { setCompletedLectures, setCourseSectionData, setEntireCourseData, setTotalNoOfLectures } from '../slice/viewCourseSlice';
const ViewCourse = () => {
    const [reviewModal, setReviewModal] = useState(false);
    const { courseId } = useParams();
    const { token } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    useEffect(() => {
        const setCourseSpecificDetails = async () => {
            const courseData = await getFullDetailsOfCourse(courseId, token);
            // if(!courseData)return;
            console.log("courseData------>", courseData);
            dispatch(setCourseSectionData(courseData?.courseDetails?.courseContent || []));
            dispatch(setEntireCourseData(courseData?.courseDetails || []));
            dispatch(setCompletedLectures(courseData?.courseProgressCount || []));
            let lecture = 0;
            courseData?.courseDetails?.courseContent.forEach((element) => {
                lecture += element.subSection.length;
            });
            console.log("lecture---->", lecture);
            dispatch(setTotalNoOfLectures(lecture));
        }

        setCourseSpecificDetails();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    return (
        <div className='relative  w-full'>
            <div className='flex w-[100%] gap-2'>
                <VideoDetailsSidebar setReviewModal={setReviewModal} />
                <div className='h-full w-[75%] mr-5 '>
                    <Outlet />
                </div>
            </div>

          <div className='absolute top-[50%] left-[50%] space-y-1 -translate-x-[50%] z-10  -translate-y-[50%]'>
              {
                reviewModal && <CourseReviewModal setReviewModal={setReviewModal} />
              }
             
          </div>
           {
                reviewModal && <div className='absolute bg-[#5f5f5f83] top-0 right-0 left-0 bottom-0 -z-0 transition-all duration-200 backdrop-blur-sm'></div>
            }
        </div>
    )
}

export default ViewCourse

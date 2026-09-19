import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useParams } from 'react-router-dom';
import { getFullDetailsOfCourse } from '../services/operation/courseDetailsAPI';
import VideoDetailsSidebar from "../components/Core/ViewCourse/VideoDetailsSidebar";
import CourseReviewModal from '../components/Core/ViewCourse/CourseReviewModal';
import { setCompletedLectures, setCourseSectionData, setEntireCourseData, setTotalNoOfLectures } from '../slice/viewCourseSlice';
const ViewCourse = () => {
    const [reviewModal , setReviewModal] = useState(false);
    const {courseId} = useParams();
    const {token} = useSelector((state)=>state.auth);
    const dispatch = useDispatch();
    
    useEffect(()=>{
        const setCourseSpecificDetails = async () =>{
            const courseData = await getFullDetailsOfCourse(courseId , token);
            // if(!courseData)return;
            console.log("courseData------>",courseData);
            dispatch(setCourseSectionData(courseData?.courseDetails?.courseContent || []));
            dispatch(setEntireCourseData(courseData?.courseDetails || []));
            dispatch(setCompletedLectures(courseData?.courseProgressCount || []));
            let lecture = 0;
            courseData?.courseDetails?.courseContent.forEach((element) => {
                lecture += element.subSection.length;
            });
            console.log("lecture---->",lecture);
            dispatch(setTotalNoOfLectures(lecture));
        }

        setCourseSpecificDetails();
    },[])


  return (
    <div>
        <div>
            <VideoDetailsSidebar setReviewModal={setReviewModal}/>
            <div>
                <Outlet/>
            </div>
        </div>

        {
            reviewModal && <CourseReviewModal setReviewModal={setReviewModal}/>
        }
        
    </div>
  )
}

export default ViewCourse

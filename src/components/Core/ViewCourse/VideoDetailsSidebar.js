import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

const VideoDetailsSidebar = ({setReviewModal}) => {

    const [activeStatus , setActiveStatus] = useState("");
    const [videoBarActive , setVideoBarActive] = useState("");
    const {sectionId , subSectionId} = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const {
        courseSectionData,
        courseEntireData ,
         totalNoOfLectures , 
        completedLectures ,
    } = useSelector((state)=>state.viewCourse);

    useEffect(()=>{
        console.log("totalNoOfLecture----->" , totalNoOfLectures);
       const setActiveFlags = ()=>{
            if(!courseSectionData.length)return;


            const currentSectionIndex = courseSectionData.findIndex(
                (data) => data._id === sectionId
            )
            const currentSubSectionIndex = courseSectionData?.[currentSectionIndex]?.subSection
            .findIndex((data) => data._id === subSectionId);

            const activeSubSectionId  = courseSectionData[currentSectionIndex]?.subSection?.[currentSubSectionIndex]?._id;

            // setCurrentSection id
            setActiveStatus(courseSectionData?.[currentSectionIndex]?._id);
            // setCurrentSubSection id
            setVideoBarActive(activeSubSectionId)
        }

          setActiveFlags();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    } , [courseSectionData , courseEntireData , location.pathname]);



  return (
    <div className='text-white bg-richblack-800 w-[25%] h-screen pt-10 '>
        <div>
            {/*for button and heading*/}
            <div className='flex justify-between pl-5 pr-5 border-b pb-4 items-center'>
                <div
                 className='p-2 bg-richblack-300  rounded-lg text-richblack-800'
                onClick={()=>{navigate("/dashboard/enrolled-courses")}}
                >
                    Back 
                </div>
                <div>
                    <button onClick={ ()=>{ setReviewModal(true)}
                    }
                    className='p-2 bg-yellow-50 rounded-lg text-richblack-800'
                    >

                        Add Review
                    </button>
                </div>
            </div>
            {/*for heading and title*/}
            <div className='flex mt-4 pb-4 gap-2 pl-2 border-dashed border-b '> 
                <p>
                    {
                        courseEntireData?.courseName
                    }
                </p>
                <p className='text-yellow-50'>
                    
                        {completedLectures?.length || 0 } / {totalNoOfLectures || 0}
                    
                </p>
            </div>
            
        </div>

        {/* for section and subSection */}

        <div>
            {
                courseSectionData.map((section , index) =>(
                    <div
                    className='mb-2 mt-2'
                    onClick={()=>{setActiveStatus(section?._id)}}
                    key = {index}
                    >
                        {/* section */}
                        <div className='p-5  uppercase bg-richblack-600'>
                            <div >{section?.sectionName}</div>
                            {/* arrow add here and handle rotate logic */}
                        </div>

                        {/* subsection */}
                        <div>
                            {
                                activeStatus === section?._id && (
                                    <div>
                                        {
                                            section.subSection.map((topic , index) =>(
                                                <div
                                                className={`flex gap-5 p-2 border border-richblack-25 capitalize ${videoBarActive === topic?._id ?
                                                     "bg-yellow-50" : "bg-richblack-900 text-white"}`}
                                                key={index}
                                                onClick={()=>
                                                {
                                                    navigate(
                                                        `/view-course/${courseEntireData?._id}/section/${section?._id}/sub-section/${topic?._id}`
                                                    );

                                                    setVideoBarActive(topic?._id);
                                                }

                                                }
                                                >
                                                    <input
                                                    type = "checkbox"
                                                    checked = {completedLectures?.includes(topic?._id)}
                                                    onChange={()=>{}}
                                                    />
                                                   <span>
                                                    {topic.title}
                                                    </span> 
                                                </div>
                                            ))
                                        }
                                    </div>
                                )
                            }
                        </div>

                    </div>
                ))
            }
        </div>

      
    </div>
  )
}

export default VideoDetailsSidebar

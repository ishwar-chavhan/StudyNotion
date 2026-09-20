import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { Player } from 'video-react';
import { setCompletedLectures } from '../../../slice/viewCourseSlice';
import 'video-react/dist/video-react.css';
import { markLectureAsComplete } from '../../../services/operation/courseDetailsAPI';


const VideoDetails = () => {

  const { courseId, sectionId, subSectionId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const playerRef = useRef();
  const location = useLocation();
  const { token } = useSelector((state) => state.auth);
  const {
    courseSectionData,
    courseEntireData,
    completedLectures,
  } = useSelector((state) => state.viewCourse);

  const [videoData, setVideoData] = useState([]);
  const [videoEnded, setVideoEnded] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log("completedLectures->>>",completedLectures)
    const setVideoSpecificDetails = () => {
      if (!courseSectionData) return;
      console.log("courseSectionData---->", courseSectionData);
      console.log("courseEntireData---->", courseEntireData);
      if (!courseId && !sectionId && !subSectionId) {
        navigate("/dashboard/enrolled-courses");
      } else {
        const filteredSection = courseSectionData.find(
          (section) => section._id === sectionId
        );

        console.log("filteredSection --->", filteredSection);

        const filteredVideoData = filteredSection?.subSection?.find(
          (subSection) => subSection._id === subSectionId
        );

        console.log("filteredVideoData --->", filteredVideoData);

        setVideoData(filteredVideoData);
        setVideoEnded(false);
      }
    }
    setVideoSpecificDetails();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [courseSectionData, courseEntireData, location.pathname])



  const isFirstVideo = () => {
    const currentSectionIndex = courseSectionData.findIndex(
      (data) => data._id === sectionId
    )
    // const noOfSubSection = courseSectionData[currentSectionIndex].subSection.length;
    const currentSubSectionIndex = courseSectionData[currentSectionIndex].subSection.findIndex((
      (data) => data._id === subSectionId
    ))

    if (currentSectionIndex === 0 && currentSubSectionIndex === 0) {
      return true;
    }
    else {
      return false;
    }
  }

  const isLastVideo = () => {
    const currentSectionIndex = courseSectionData.findIndex(
      (data) => data._id === sectionId
    )
    const noOfSubSection = courseSectionData[currentSectionIndex]?.subSection?.length;
    const currentSubSectionIndex = courseSectionData[currentSectionIndex]?.subSection?.findIndex((
      (data) => data._id === subSectionId
    ))

    if (currentSectionIndex === courseSectionData.length - 1 &&
      currentSubSectionIndex === noOfSubSection - 1
    ) {
      return true;
    } else {
      return false;
    }

  }

  const goToNextVideo = () => {
    const currentSectionIndex = courseSectionData.findIndex(
      (data) => data._id === sectionId
    )
    const noOfSubSection = courseSectionData[currentSectionIndex].subSection.length;
    const currentSubSectionIndex = courseSectionData[currentSectionIndex].subSection.findIndex((
      (data) => data._id === subSectionId
    ))



    if (currentSubSectionIndex !== noOfSubSection - 1) {
      // same section ki next video me jana hai
      const nextSubSectionId = courseSectionData[currentSectionIndex].subSection[currentSubSectionIndex + 1]._id;
      // is video pr jav

      navigate(`/view-course/${courseId}/section/${sectionId}/sub-section/${nextSubSectionId}`);
    } else {
      // different seciton ki video pr jao
      const nextSectionId = courseSectionData[currentSectionIndex + 1]._id;
      const nextSubSectionId = courseSectionData[currentSectionIndex + 1].subSection[0]._id;


      navigate(`/view-course/${courseId}/section/${nextSectionId}/sub-section/${nextSubSectionId}`);
    }


  }

  const goToPrevVideo = () => {
    const currentSectionIndex = courseSectionData.findIndex(
      (data) => data._id === sectionId
    )
    const currentSubSectionIndex = courseSectionData[currentSectionIndex].subSection.findIndex((
      (data) => data._id === subSectionId
    ))



    if (currentSubSectionIndex !== 0) {
      // same section prev video
      const prevSubSectionId = courseSectionData[currentSectionIndex].subSection[currentSubSectionIndex - 1]._id;
      navigate(`/view-course/${courseId}/section/${sectionId}/sub-section/${prevSubSectionId}`);
    } else {
      const prevSectionId = courseSectionData[currentSectionIndex - 1]._id;
      const prevSubSectionLength = courseSectionData[currentSectionIndex - 1].subSection.length;
      const prevSubSectionId = courseSectionData[currentSectionIndex - 1].subSection[prevSubSectionLength - 1]._id;

      navigate(`/view-course/${courseId}/section/${prevSectionId}/sub-section/${prevSubSectionId}`);

    }


  }

  const handleLectureCompletion = async () => {
    // dummy code next time we will complete this code
    setLoading(true);
    const res = await markLectureAsComplete({ courseId: courseId, subSectionId: subSectionId }, token);

    if (res) {
       const updated = [...new Set([...(completedLectures || []), subSectionId])];

      localStorage.setItem("completedLectures" , JSON.stringify(updated));
      dispatch(setCompletedLectures(updated));
    }

    // console.log("jbjfsdibi")

    setLoading(false);
  }

  return (
    <div className='text-white z-1 w-full h-full relative'>
      {
        !videoData ? (<div>No DATA FOUND</div>) : (
          <Player
          
            ref={playerRef}
           aspectRatio="16:9"
            playsInline
            onEnded={(() => setVideoEnded(true))}
            src={videoData?.videoUrl}
          >
            {/* <FaPlayCircle size={50} /> */}

            {
              videoEnded && (
                <div className='absolute top-[50%] left-[50%] space-y-1 -translate-x-[50%]  -translate-y-[50%] z-10'>

                    <div className='flex gap-4'>
                        {
                            !isLastVideo() && (
                              <button
                                disabled={loading}
                                onClick={goToNextVideo}
                                className='cursor-pointer rounded-md  px-3 py-2  bg-yellow-50   text-richblack-800 text-[20px]'
                              >
                                Next
                              </button>
                            )
                          }
                    
                        

                            <button
                              disabled={loading}
                              className='cursor-pointer rounded-md px-3 py-2 bg-yellow-50 text-richblack-800 text-[20px]'
                              onClick={() => {
                                if (playerRef?.current) {
                                  playerRef.current?.seek(0);
                                  setVideoEnded(false);
                                }
                              }}
                            >
                              Rewatch
                            </button>
                  

                  
                          {
                            !isFirstVideo() && (
                              <button
                                disabled={loading}
                                onClick={goToPrevVideo}
                                className='cursor-pointer rounded-md px-3 py-2   bg-yellow-50 text-richblack-800 text-[20px]'
                              >
                                Prev
                              </button>
                            )
                          }  
                      
                    </div> 

                    {
                        !completedLectures?.includes(subSectionId) && (
                          <button
                            disabled={loading}
                            className='cursor-pointer rounded-md px-3 py-2  bg-yellow-50 text-richblack-800 text-[20px]'
                            onClick={() => handleLectureCompletion()}
                          >
                            {
                              !loading ? "Mark As Coompleted" : "loading...."
                            }
                          </button>
                        )
                      }
                </div>
              )
            }
          </Player>
        )
      }

      <h1 className='mt-2 text-[18px] font-semibold'>
        {videoData?.title}
      </h1>
      <p className='text-[14px] text-richblack-3000'>
        {videoData?.description}
      </p>
    </div>
  )
}

export default VideoDetails

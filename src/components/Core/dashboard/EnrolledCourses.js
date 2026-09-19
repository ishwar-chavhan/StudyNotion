import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { getUserEnrolledCourse } from '../../../services/operation/profileApi';
import ProgressBar from '@ramonak/react-progress-bar';
import { useNavigate } from 'react-router-dom';


const EnrolledCourses = () => {

    const { token } = useSelector((state) => state.auth);
    const [totalDuration , setTotalduration] = useState("");
    const [enrolledCourses, setEnrolledCourses] = useState(null);
    const navigate = useNavigate();

    

    const getEnrolledCourses = async () => {
        try {
            const response = await getUserEnrolledCourse(token);
            
            setEnrolledCourses(response?.data);
            // setTotalduration(response?.data.totalDuration);
            console.log("course id",response?.data[1]?._id)
            console.log("courseContent id",response?.data[1]?.courseContent[0]?._id);
            console.log("subSection id",response?.data[1]?.courseContent[0]?.subSection[0]?._id);
            console.log(response);
        } catch (error) {
            console.log("Unable to fetch enrolled course");
        }
    }
    
    useEffect(() => {
        getEnrolledCourses();
    }, []);

    return (
        <div className='text-white'>
            <h2 className='mb-10 text-[30px] font-semibold'>Enrolled Courses</h2>
            {
                !enrolledCourses ? (
                    <div>
                        ....Loading
                    </div>
                )
                    : !enrolledCourses.length ?
                        (
                            <div> you have not enrolled in any course yet</div>
                        )
                        :
                        (
                        <table className="w-full  ">
                            <thead  >
                                <tr className="bg-richblack-700 border-[1px]  border-richblack-700 ">
                                    <th className="text-left p-4 text-richblack-50">Course Name</th>
                                    <th className="text-left p-4 text-richblack-50">Duration</th>
                                    <th className="text-left p-4 text-richblack-50">Progress</th>
                                </tr>
                            </thead>

                            <tbody>
                                {enrolledCourses.map((course, index) => (
                                    <tr key={index} className='border-[1px]  border-richblack-700'>

                                        <td
                                        onClick={() => {
                                            navigate(
                                                `/view-course/${course?._id}/section/${course.courseContent[0]?._id}/sub-section/${course.courseContent?.[0]?.subSection?.[0]?._id}`
                                            )
                                            }}
                                        className="py-4 px-2 ">
                                            <div className="flex gap-8 items-center">
                                                <img
                                                    src={course.thumbnail}
                                                    className="rounded-lg"
                                                    width={52}
                                                    height={52}
                                                    alt="thumbnail"
                                                />

                                                <div>
                                                    <p>{course.courseName}</p>

                                                    <p className="overflow-hidden text-richblack-300 text-ellipsis w-[180px] whitespace-nowrap">
                                                        {course.courseDescription}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>

                                        <td className="py-4 px-2  text-richblack-50">
                                            {course.totalDuration || "NCY"}
                                        </td>

                                        <td className="py-4 px-2">
                                            <p className='text-richblack-50'>
                                                Progress : {course.progressPercentage || 0}%
                                            </p>

                                            <ProgressBar
                                                completed={course.progressPercentage || 0}
                                                height="8px"
                                                isLabelVisible={false}
                                            />
                                        </td>

                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        )
            }
        </div>
    )
}

export default EnrolledCourses

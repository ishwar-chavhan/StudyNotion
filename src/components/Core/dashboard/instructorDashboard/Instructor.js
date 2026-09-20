import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { fetchInstructorCourse } from '../../../../services/operation/courseDetailsAPI';
import { getInstructorData } from '../../../../services/operation/profileApi';
import { Link } from 'react-router-dom';
import InstuctorChart from './InstuctorChart';
const Instructor = () => {
    const [loading, setLoading] = useState(false);
    const [instructorData, setInstructorData] = useState(null)
    const [coursesData, setCourses] = useState([]);
    const { user } = useSelector((state) => state.profile);
    const { token } = useSelector((state) => state.auth);
    useEffect(() => {
        const getCourseDataWithStats = async () => {
            setLoading(true);
            const instructorApiData = await getInstructorData(token);
            const result = await fetchInstructorCourse(token);
            console.log("instructorApiData------------->", instructorApiData);
            console.log("result------------->", result);

            if (instructorApiData.length) {
                setInstructorData(instructorApiData);
            }

            if (result) {
                setCourses(result);
            }
            setLoading(false);
        }

        // pending
        getCourseDataWithStats();
    }, [token])


    // console.log("course data found or not",coursesData);
    const totalAmount = instructorData?.reduce((acc, curr) => acc + curr.totalAmountGenerated, 0);
    const totalStudent = instructorData?.reduce((acc, curr) => acc + curr.totalStudentEnrolled, 0);

    return (
        <div className=' text-white'>
            <div className='text-white mb-10'>
                <h2 className='text-[24px] font-bold '>hi {user?.firstName}</h2>
                <p className='text-richblack-300 text-[18px]'>lets start something new</p>
            </div>
            {
                loading ? (<div></div>) : coursesData?.courses?.length > 0 ? (<div>
                    <div className='flex gap-8'>
                        <InstuctorChart coursesData={instructorData} />
                        <div className=' px-7 py-6 bg-richblack-800 w-[30%] flex flex-col gap-5 '>
                            <p className='text-[20px] font-semibold'>Statistics</p>
                            <div  className='space-y-1'>
                                <p className='text-[16px] text-richblack-300'>Total Course</p>
                                <p className='text-[22px] font-semibold'>{coursesData?.courses?.length}</p>
                            </div>

                            <div  className='space-y-1'>
                                <p  className='text-[16px] text-richblack-300'>Total Student</p>
                                <p className='text-[22px] font-semibold'>{totalStudent}</p>
                            </div>

                            <div className='space-y-1'>
                                <p className='text-[16px] text-richblack-300'>Total Amount</p>
                                <p  className='text-[22px] font-semibold'>{totalAmount}</p>
                            </div>
                        </div>
                    </div>

                    <div className='bg-richblack-800 mt-10 p-4 flex flex-col gap-3'>
                        {/* render 3 course  */}
                        <div className='flex justify-between'>
                            <p className='text-[20px] font-semibold'>Your Courses</p>
                            <Link to="/dashboard/my-courses">
                                <p className='text-yellow-50 hover:text-yellow-200'>view all</p>
                            </Link>
                        </div>
                        <div className='flex   gap-3 '>
                            {
                                coursesData?.courses?.slice(0, 3).map((course, index) => (
                                    <div key={index} className='w-[33%] flex gap-2 flex-col'>
                                        <img
                                            alt='thumbnail'
                                            src={course.thumbnail}
                                            // height={200}
                                            // width={200}
                                           className="h-[201px] w-full rounded-md object-cover"
                                        />
                                        <div>
                                            <p className='text-richblack-5'>{course.courseName}</p>
                                            <div className='flex gap-2 text-[14px] text-richblack-200'>
                                                <p>{course?.studentEnrolled?.length} Student</p>
                                                <p>|</p>
                                                <p>Rs {course.price}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>) : (
                    <div>
                        <div>You Have Not Created</div>
                        <Link to="/dashboard/add-course">
                            Create A Course
                        </Link>
                    </div>
                )
            }
        </div>
    )
}

export default Instructor

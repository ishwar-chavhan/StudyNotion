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
        }
        setLoading(false);
        // pending
        getCourseDataWithStats();
    }, [token])


    // console.log("course data found or not",coursesData);
    const totalAmount = instructorData?.reduce((acc, curr) => acc + curr.totalAmountGenerated, 0);
    const totalStudent = instructorData?.reduce((acc, curr) => acc + curr.totalStudentEnrolled, 0);

    return (
        <div className=' text-white'>
            <div className='text-white'>
                <h2>hi {user?.firstName}</h2>
                <p>lets start something new</p>
            </div>
            {
                loading ? (<div></div>) : coursesData?.courses?.length > 0 ? (<div>
                    <div>
                        <InstuctorChart coursesData={instructorData} />
                        <div>
                            <p>Statistics</p>
                            <div>
                                <p>Total Course</p>
                                <p>{coursesData?.courses?.length}</p>
                            </div>

                            <div>
                                <p>Total Student</p>
                                <p>{totalStudent}</p>
                            </div>

                            <div>
                                <p>Total Amount</p>
                                <p>{totalAmount}</p>
                            </div>
                        </div>
                    </div>

                    <div>
                        {/* render 3 course  */}
                        <div>
                            <p>Your Courses</p>
                            <Link to="/dashboard/my-courses">
                                <p>view all</p>
                            </Link>
                        </div>
                        <div>
                            {
                                coursesData?.courses?.slice(0, 3).map((course, index) => (
                                    <div key={index}>
                                        <img
                                            alt='thumbnail'
                                            src={course.thumbnail}
                                        />
                                        <div>
                                            <p>{course.courseName}</p>
                                            <div>
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

import React, { useEffect, useState } from 'react'
import { CiCirclePlus } from "react-icons/ci";
import { useSelector } from 'react-redux';
import { MdDelete } from "react-icons/md";
import { MdModeEdit } from "react-icons/md";
import { deleteCourse, fetchInstructorCourse } from '../../../services/operation/courseDetailsAPI';
import { useNavigate } from 'react-router-dom';
import ConfirmationModal from '../dashboard/ConfirmationModal';

// import { fetchInstructorCourse } from '../../../services/operation/courseDetailsAPI';
const IstructorCart = () => {
    // const {user} = useSelector((state)=>state.profile);
    const navigate = useNavigate();
    const { token } = useSelector((state) => state.auth);
    const [coursesOFInstructor, setCoursesOFInstructor] = useState([]);
    const [confirmationModal, setConfirmationModal] = useState(null);
    const [loading, setLoading] = useState(false);
    // const [change, setChange] = useState(true);
    useEffect(() => {
        const fecthedCourse = async () => {
            const result = await fetchInstructorCourse(token);
            console.log("result data", result)
            if (result) {
                setCoursesOFInstructor(result);
            }
        }

        fecthedCourse();
    }, []);

    const handleCourseDelete = async (courseId) => {
        setLoading(true);
        const result = await deleteCourse({ courseId: courseId }, token);
        setConfirmationModal(null);
         setCoursesOFInstructor(result);
        setLoading(false);
        // setChange((pre) => (!pre));
    }

    // console.log(user.courses.length);

    return (
        <div className='text-white flex flex-col gap-6'>
            <div className=' flex justify-between items-center'>
                <h1 className='text-3xl font-semibold font-inter text-richblack-5'>My Course</h1>

                <button className='flex gap-2 items-center px-6 py-3 bg-yellow-50 text-richblack-700 
                 font-semibold rounded-lg hover:scale-95 transition-all duration-200'
                    onClick={() => navigate("/dashboard/add-course")}
                >

                    <CiCirclePlus size={20} />
                    <p>New</p>
                </button>
            </div>

            <div className='flex gap-4 flex-col border-[1px] p-4 rounded-lg border-richblack-800' >
                <div className='flex justify-between text-[14px] border-b border-richblack-800 pb-4 text-richblack-100 uppercase'>
                    <p className=''>courses</p>

                    <div className='flex gap-8'>
                        <p>duration</p>
                        <p>price</p>
                        <p>actions</p>
                    </div>
                </div>

                <div className='flex flex-col gap-7 mt-2'>
                    {
                        coursesOFInstructor?.courses?.length > 0 ? (
                            coursesOFInstructor?.courses?.map((course, index) => {
                                return (
                                    <div key={index} className='flex justify-between'>
                                        <div className='flex gap-6'>
                                            <img
                                                src={course?.thumbnail}
                                                width={170}
                                                height={130}
                                                alt="courseImage"
                                                className='rounded-xl'
                                            />

                                            <div className='flex gap-3 flex-col'>
                                                <h2 className='text-[20px] font-inter font-semibold text-richblack-5'>{course?.courseName}</h2>
                                                <p className='text-[14px] text-richblack-100'>{course?.courseDescription}</p>
                                                <p className='text-[12px] text-richblack-25'>
                                                    Created:{" "}
                                                    {new Date(course.createdAt).toLocaleString("en-US", {
                                                        month: "long",
                                                        day: "numeric",
                                                        year: "numeric",
                                                        hour: "numeric",
                                                        minute: "2-digit",
                                                        hour12: true,
                                                    }).replace(",", " |")}


                                                </p>
                                                <p className='px-2 py-1 bg-yellow-25 w-[100px] text-richblack-800 rounded-lg '>{course?.status}</p>
                                            </div>
                                        </div>
                                        <div className='flex gap-10 items-center justify-center'>
                                            <p className='text-sm text-richblack-100'>
                                                {String(Math.floor(course?.courseContent?.subSection?.timeDuration / 3600)).padStart(2, "0")}h :{" "}
                                                {String(Math.floor((course?.courseContent?.subSection?.timeDuration % 3600) / 60)).padStart(2, "0")}m
                                            </p>
                                            <p className='text-sm text-richblack-100'>{course.price}</p>
                                            <div className='flex text-richblack-100  items-start gap-3'>
                                                <button
                                                    disabled={loading}
                                                    onClick={() => {
                                                        navigate(`/dashboard/edit-course/${course._id}`);
                                                    }}
                                                >
                                                    <MdModeEdit size={22} />
                                                </button>
                                                <button
                                                    onClick={() => {
                                                        setConfirmationModal({
                                                            text1: "Do you want to delete this course?",
                                                            text2: "All data related to this course will be deleted",
                                                            btn1Text: "Delete",
                                                            btn2Text: "Cancel",
                                                            btn1Handler: () => handleCourseDelete(course._id),
                                                            btn2Handler: () => setConfirmationModal(null)
                                                        })
                                                    }}
                                                >
                                                    <MdDelete size={22} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        ) : (
                            <div>
                                You havent create any course yet
                            </div>
                        )
                    }
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

export default IstructorCart;

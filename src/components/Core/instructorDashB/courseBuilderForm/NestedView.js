import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RxDropdownMenu } from "react-icons/rx";
import { MdModeEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { BiSolidDownArrow } from "react-icons/bi";
import { HiOutlinePlusSm } from "react-icons/hi";
import { setCourse, setStep } from '../../../../slice/courseSlice';
import { deleteSection, deleteSubSection } from '../../../../services/operation/courseDetailsAPI';
import SubSectionModal from './SubSectionModal';
import ConfirmationModal from "../../dashboard/ConfirmationModal";
const NestedView = ({ handleChangeEditSectionName }) => {
    const { course } = useSelector((state) => state.course);
    const { token } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const [addSubsection, setAddSubsection] = useState(null);
    const [viewSubsection, setViewSubsection] = useState(null);
    const [editSubsection, setEditSubsection] = useState(null);
    const [confirmationModal, setConfirmationModal] = useState(null);

    const handlerDeleteSection = async (sectionId) => {
        const result = await deleteSection({
            sectionId,
            courseId: course._id
        }, token);


        if (result) {

            dispatch(setCourse(result));
        }
        setConfirmationModal(null);
    }

    // useEffect(()=>setStep(2) , []);


    const handlerDeleteSubSection = async (subSectionId, sectionId) => {
        const result = await deleteSubSection({
            subSectionId,
            sectionId,
        }, token);

        if (result) {
            const updatedCourseContent = course.courseContent.map((section) =>
                section._id === sectionId ? result : section
            )
            const updatedCourse = { ...course, courseContent: updatedCourseContent };
            dispatch(setCourse(updatedCourse));
        }
        setConfirmationModal(null);
    }


    return (
        <div className='text-white  mt-5'>

            <div className='rounded-lg bg-richblack-700 p-6 px-8'>
                {
                    course?.courseContent?.map((section) => (
                        <details key={section._id} open>
                            <summary className='flex items-center justify-between gap-3 border-b-2 '>
                                <div className='flex items-center gap-x-3'>
                                    <RxDropdownMenu />
                                    <p>{section?.sectionName}</p>
                                </div>
                                <div className='flex items-center gap-x-3'>
                                    <button
                                        type='button'
                                        onClick={() => handleChangeEditSectionName(section._id, section.sectionName)}
                                    >
                                        <MdModeEdit />
                                    </button>
                                    <button
                                        onClick={() => {
                                            setConfirmationModal({
                                                text1: "Delete This Section",
                                                text2: "All The Lecture In This Section Will Be Deleted",
                                                btn1Text: "Delete",
                                                btn2Text: "Cancel",
                                                btn1Handler: () => { handlerDeleteSection(section._id) },
                                                btn2Handler: () => setConfirmationModal(null)
                                            })
                                        }}
                                    >
                                        <MdDelete />
                                    </button>
                                    <span>|</span>
                                    <BiSolidDownArrow className='text-xl text-richblack-300' />
                                </div>
                            </summary>
                            <div>
                                {
                                    section.subSection.map((data) => (
                                        <div key={data?._id}
                                            onClick={() => setViewSubsection(data)}
                                            className='flex items-center justify-between gap-x-3 border-b-2'
                                        >
                                            <div className='flex items-center gap-x-3'>
                                                <RxDropdownMenu />
                                                <p>{data?.title}</p>
                                            </div>
                                            <div
                                                onClick={(e) => e.stopPropagation()}
                                                className='flex items-center gap-x-2'
                                            >
                                                <button
                                                    onClick={() => setEditSubsection({ ...data, sectionId: section._id })}
                                                >
                                                    <MdModeEdit />
                                                </button>
                                                <button onClick={() =>
                                                    setConfirmationModal({
                                                        text1: "Delete This Subsection",
                                                        text2: "Selected Lecture Will be deleted",
                                                        btn1Text: "Delete",
                                                        btn2Text: "Cancel",
                                                        btn1Handler: () => { handlerDeleteSubSection(data._id, section._id) },
                                                        btn2Handler: () => setConfirmationModal(null)
                                                    })
                                                }>
                                                    <MdDelete />

                                                </button>
                                            </div>
                                        </div>
                                    ))
                                }

                                <button
                                    type="button"
                                    onClick={() => setAddSubsection(section._id)}
                                    className='mt-4 flex items-center gap-x-2 text-yellow-50'
                                >
                                    <HiOutlinePlusSm />
                                    <p>Add Lecture</p>
                                </button>
                            </div>

                        </details>
                    ))
                }
            </div>

            {
                addSubsection ? (<SubSectionModal
                    modalData={addSubsection}
                    setModalData={setAddSubsection}
                    add={true}
                />)
                    : viewSubsection ? (<SubSectionModal
                        modalData={viewSubsection}
                        setModalData={setViewSubsection}
                        view={true}
                    />)
                        : editSubsection ? (<SubSectionModal
                            modalData={editSubsection}
                            setModalData={setEditSubsection}
                            edit={true}
                        />)
                            : (<div></div>)
            }
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

export default NestedView

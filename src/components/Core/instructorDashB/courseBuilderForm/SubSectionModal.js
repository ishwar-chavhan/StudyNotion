import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { createSubSection, updateSubSection } from '../../../../services/operation/courseDetailsAPI';
import { setCourse } from '../../../../slice/courseSlice';
import { RxCross1 } from "react-icons/rx";
import UploadImage from '../AddcourseFile/UploadImage';
const SubSectionModal = ({
    modalData,
    setModalData,
    add = false,
    view = false,
    edit = false,
}) => {

    console.log(add);
    console.log(view);
    console.log(edit);
    const {
        register,
        handleSubmit,
        setValue,
        getValues,
        formState: { errors }
    } = useForm();

    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const { course } = useSelector((state) => state.course)
    const { token } = useSelector((state) => state.auth);

    useEffect(() => {
        if (view || edit) {
            setValue("lectureTitle", modalData.title);
            setValue("lectureDesc", modalData.description);
            setValue("lectureVideo", modalData.video);

        }
    }, // eslint-disable-next-line react-hooks/exhaustive-deps
    []);

    const isFormUpdated = () => {
        const currentValue = getValues();
        if (currentValue.lectureTitle !== modalData.title ||
            currentValue.lectureDesc !== modalData.description ||
            currentValue.lectureVideo !== modalData.video
        ) {
            return true;
        } else {
            return false;
        }
    }

    const handleEditSubSection = async () => {
        const currentValue = getValues();
        const formData = new FormData();

        formData.append("sectionId", modalData.sectionId);
        formData.append("subSectionId", modalData._id);

        if (currentValue.lectureTitle !== modalData.title) {
            formData.append("title", currentValue.lectureTitle);
        }

        if (currentValue.lectureDesc !== modalData.description) {
            formData.append("description", currentValue.lectureDesc);
        }

        if (currentValue.lectureVideo !== modalData.video) {
            formData.append("video", currentValue.lectureVideo);
        }

        setLoading(true);
        const result = await updateSubSection(formData, token);
        if (result) {
            const sectionId = modalData.sectionId;
            const updatedCourseContent = course.courseContent.map((section) =>
                section._id === sectionId ? result : section
            )
            const updatedCourse = { ...course, courseContent: updatedCourseContent };
            dispatch(setCourse(updatedCourse));
        }
        setModalData(null);
        setLoading(null);
    }

    async function onSubmit(data) {
        if (view) {
            return;
        }
        if (edit) {
            if (!isFormUpdated()) {
                toast.error("No change made to form");
            }
            else {
                // edit kardo
                handleEditSubSection();
            }
            return;
        }

        const formdata = new FormData();
        formdata.append("sectionId", modalData);
        formdata.append("title", data.lectureTitle);
        formdata.append("description", data.lectureDesc);
        formdata.append("video", data.lectureVideo);  // File object from UploadImage
        formdata.append("courseId", course._id);

        // API CALL 
        setLoading(true);
        const result = await createSubSection(formdata, token);
        console.log(result);
        setLoading(false);

        if (result) {
            const sectionId = modalData;
            const updatedCourseContent = course.courseContent.map((section) =>
                section._id === sectionId ? result : section
            )
            const updatedCourse = { ...course, courseContent: updatedCourseContent };
            dispatch(setCourse(updatedCourse));
        }
        setModalData(null);
        setLoading(false);
    }

    return (
        <div className='absolute top-[50%] left-[50%] z-10 -translate-x-[50%] -translate-y-[50%]'>
            <div>
                <div >
                   <div className='flex justify-between bg-richblack-700 mt-5 rounded-t-lg px-3 p-2' >
                            <p>{view && "Viewing"} {edit && "Editing"} {add && "Adding"} Lecture</p>
                            <button type='button' onClick={() => setModalData(null)}>
                                <RxCross1 />
                            </button>
                   </div>
                    <form className='px-4 py-5 flex flex-col gap-2 bg-richblack-800 rounded-b-lg' >
                        <UploadImage
                            name="lectureVideo"
                            label="Lecture Video"
                            register={register}
                            setValue={setValue}
                            errors={errors}
                            video={true}
                            viewData={view ? modalData.videoUrl : null}
                            editData={edit ? modalData.videoUrl : null}
                        />
                        <div>
                            <label className='text-[14px] ml-1 text-richblack-5'>
                                Lecture Title
                            </label>
                            <input
                                id="LectureTitle"
                                placeholder='Enter Lecture Title'
                                {...register("lectureTitle", { required: true })}
                                className='w-full p-3 rounded-lg bg-richblack-700'
                            />
                            {
                                errors.lectureTitle && (
                                    <span>
                                        lecture title is required
                                    </span>
                                )
                            }
                        </div>
                        <div>
                            <label  className='text-[14px] ml-1 text-richblack-5'>
                                Lecture description
                            </label>
                            <textarea
                                id='lectureDesc'
                                placeholder='Enter Lecture Description'
                                {...register("lectureDesc", { required: true })}
                                className='w-full min-h-[130px] p-3 rounded-lg bg-richblack-700'
                            />
                            {
                                errors.lectureDesc && (
                                    <span>
                                        Lecture Description is Required
                                    </span>
                                )
                            }
                        </div>


                        <button

                            onClick={(e) => {
                                e.preventDefault();
                                handleSubmit(onSubmit)(e);
                            }}
                            className='p-4 bg-yellow-50 rounded-lg text-richblack-800 text-[18px] font-semibold'

                        >
                            {loading ? "Loading..." : edit ? "Save Changes" : view ? "" : "Save"}
                        </button>


                    </form>

                </div>
            </div>
        </div>
    )
}

export default SubSectionModal

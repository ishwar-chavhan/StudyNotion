import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import IconButton from '../../dashboard/IconButton';
import { GoPlusCircle } from "react-icons/go";
import { useDispatch, useSelector } from 'react-redux';
import { FaArrowRightLong } from "react-icons/fa6";
import { setCourse, setEditCourse, setStep } from '../../../../slice/courseSlice';
import { toast } from 'react-toastify';
import { updateSection, createSection } from '../../../../services/operation/courseDetailsAPI';
import NestedView from './NestedView';

const CourseBuilderForm = () => {

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm();

  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const [editSectionName, setEditSectionName] = useState(null);
  const { course } = useSelector((state) => state.course);



  function cancelEdit(e) {
    e.preventDefault();
    setEditSectionName(null);
    setValue("sectionName", "");
  }

  const goBack = () => {
    dispatch(setStep(1));   // Step 3 is the next step after course builder
    dispatch(setEditCourse(true));
  }

  const goToNext = () => {
    if (course.courseContent.length === 0) {
      toast.error("please add atleast on section");
      return;
    }

    if (course.courseContent.some((section) => section.subSection.length === 0)) {
      toast.error("please add atleast one lecture in each section");
      return;
    }

    // if everything is good

    dispatch(setStep(3));

  }

  async function onSubmit(data) {
    setLoading(true);
    let result;
    console.log("editSectionName", editSectionName)
    if (editSectionName) {
      // we are 
      result = await updateSection(
        {
          sectionName: data.sectionName,
          sectionId: editSectionName,
          courseId: course._id,
        },
        token
      )
    } else {
      result = await createSection({
        sectionName: data.sectionName,
        courseId: course._id,
      },
        token
      )
    }

    if (result) {
      dispatch(setCourse(result));
      setEditSectionName(null);
      setValue("sectionName", "");
    }
    console.log(loading)
    setLoading(false);
  }


  const handleChangeEditSectionName = (sectionId, sectionName) => {

    if (editSectionName === sectionId) {
      cancelEdit();
      console.log("iuabfidabdui")
      return;
    }
    console.log("editSectionName", editSectionName)
    console.log(sectionId)
    console.log(sectionName)
    setEditSectionName(sectionId);
    setValue("sectionName", sectionName);
    console.log("editSectionName", editSectionName)
  }


  return (
    <div className='space-y-8 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6'>
      <p className='text-2xl font-semibold text-richblack-5'>Course Builder</p>

      <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
        <div className='flex flex-col space-y-2'>
          <label htmlFor='sectionName' className='text-sm text-richblack-5'>
            Section Name <sup className='text-pink-200'>*</sup>
          </label>
          <input
            id='sectionName'
            placeholder='Add a section to build your course'
            {...register('sectionName', { required: true })}
            className='w-full rounded-lg bg-richblack-700 p-3 text-[16px] leading-[24px] text-richblack-5 shadow-[0_1px_0_0_rgba(255,255,255,0.18)] placeholder:text-richblack-400 focus:outline-none focus:ring-1 focus:ring-yellow-50'
          />
          {errors.sectionName && (
            <span className='ml-2 text-xs tracking-wide text-pink-200'>
              Section name is required
            </span>
          )}
        </div>

        <div className='flex items-center gap-4'>
          <IconButton
            type='Submit'
            text={editSectionName ? 'Edit Section Name' : 'Create Section'}
            outline={true}
            customClasses='flex items-center gap-x-2 rounded-md border border-yellow-50 bg-transparent py-2.5 px-5 font-semibold text-yellow-50 hover:bg-yellow-50 hover:text-richblack-900 transition-all duration-200 cursor-pointer'
          >
            <GoPlusCircle className='text-lg' />
          </IconButton>
          {editSectionName && (
            <button
              type='button'
              onClick={cancelEdit}
              className='text-sm text-richblack-300 underline hover:text-richblack-100 transition-colors'
            >
              Cancel Edit
            </button>
          )}
        </div>

        {course.courseContent.length > 0 && (
          <NestedView handleChangeEditSectionName={handleChangeEditSectionName} />
        )}

        <div className='flex justify-end gap-x-3 pt-4'>
          <button
            type='button'
            onClick={goBack}
            className='flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-700 py-2.5 px-5 font-semibold text-richblack-50 hover:bg-richblack-600 transition-all'
          >
            Back
          </button>
          <button
            type='button'
            onClick={goToNext}
            className='flex cursor-pointer items-center gap-x-2 rounded-md bg-yellow-50 py-2.5 px-6 font-semibold text-richblack-900 hover:scale-95 transition-all duration-200'
          >
            <span>Next</span>
            <FaArrowRightLong />
          </button>
        </div>
      </form>
    </div>
  );
};

export default CourseBuilderForm

import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories } from '../../../../services/operation/courseDetailsAPI';
import { HiOutlineCurrencyRupee } from "react-icons/hi";
import RequirementField from './RequirementField';
import { toast } from 'react-toastify';
import IconButton from "../../dashboard/IconButton";
import { setCourse, setStep } from '../../../../slice/courseSlice';
import { addCourseDetails } from '../../../../services/operation/courseDetailsAPI';
import UploadImage from './UploadImage';
import ChipInput from './ChipInput';
import { editCourseDetails } from '../../../../services/operation/courseDetailsAPI';
const CourseInformationForm = () => {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();

  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { course, editCourse } = useSelector((state) => state.course);
  const [loading, setLoading] = useState(false);
  const [courseCategories, setCourseCategories] = useState([]);
  const [tagsData, setTagsData] = useState(null);

  useEffect(() => {
    const getCategories = async () => {
      setLoading(true);
      const categories = await fetchCategories();

      if (categories?.length > 0) {
        setCourseCategories(categories);
      }

      setLoading(false);
    };
    console.log("course--->", course)
    if (editCourse && course) {
      const initialTags = Array.isArray(course?.tags)
        ? course.tags
        : course?.tags
          ? [course.tags]
          : [];

      setValue('courseTitle', course?.courseName || '');
      setValue('courseShortDesc', course?.courseDescription || '');
      setValue('coursePrice', course?.price ?? '');
      setValue('courseTags', initialTags);
      setValue('courseBenefits', course?.whatYouWillLearn || '');
      setValue('courseCategory', course?.category?._id || course?.category || '');
      setValue('courseImage', course?.thumbnail || '');
      setValue('mediaUpload', course?.thumbnail || '');
      setValue('courseRequirements', Array.isArray(course?.instructions) ? course.instructions : []);
      setTagsData(initialTags);
    }

    getCategories();
  }, [course, editCourse, setValue]);

  const safeStringValue = (value) => {
    if (Array.isArray(value)) return value.join(',');
    return value ?? '';
  };

  const isFormUpdated = () => {
    const currentValues = getValues();
    const originalCourse = course || {};

    console.log("currentValues", currentValues);
    console.log("course", originalCourse);

    if (currentValues.courseTitle !== originalCourse.courseName
      || currentValues.courseShortDesc !== originalCourse.courseDescription
      || currentValues.coursePrice !== originalCourse.price
      || safeStringValue(currentValues.courseTags) !== safeStringValue(originalCourse.tags)
      || currentValues.courseBenefits !== originalCourse.whatYouWillLearn
      || (currentValues.courseCategory || '') !== (originalCourse.category?._id || originalCourse.category || '')
      || safeStringValue(currentValues.courseImage) !== safeStringValue(originalCourse.thumbnail)
      || safeStringValue(currentValues.courseRequirements) !== safeStringValue(originalCourse.instructions)
    ) {
      return true;
    } else {
      return false;
    }

  }
  const onSubmit = async (data) => {

    if (editCourse) {
      if (isFormUpdated()) {
        const currentValue = getValues();
        const formData = new FormData();
        formData.append("courseId", course._id);
        if (currentValue.courseTitle !== course.courseName) {
          formData.append("courseName", data.courseTitle);
        }
        if (currentValue.courseShortDesc !== course.courseDescription) {
          formData.append("courseDescription", data.courseShortDesc);

        }
        if (currentValue.coursePrice !== course.price) {
          formData.append("price", data.coursePrice);

        }
        if (currentValue.courseBenefits !== course.whatYouWillLearn) {
          formData.append("whatYouWillLearn", data.courseBenefits);

        }
        const currentCategoryId = currentValue.courseCategory || '';
        const originalCategoryId = course?.category?._id || course?.category || '';
        if (currentCategoryId !== originalCategoryId) {
          formData.append("category", data.courseCategory);

        }
        if (safeStringValue(currentValue.courseRequirements) !== safeStringValue(course?.instructions)) {
          formData.append("instructions", JSON.stringify(data.courseRequirements));

        }
        if (safeStringValue(currentValue.courseTags) !== safeStringValue(course?.tags)) {
          formData.append("tags", JSON.stringify(data.courseTags));

        }
        if (safeStringValue(currentValue.courseImage) !== safeStringValue(course?.thumbnail)) {
          formData.append("thumbnail", data.thumbnail);

        }

        // tags and image remaining
        setLoading(true);
        const result = await editCourseDetails(formData, token);
        setLoading(false);
        if (result) {
          console.log("result", result);
          dispatch(setStep(2));
          dispatch(setCourse(result));
        }
      }
      else {
        toast.error("no change is made to form");
      }
      return;
    }


    // create  new caourse
    console.log(editCourse);
    console.log("data s", data)
    const formData = new FormData();
    formData.append("courseName", data.courseTitle);
    formData.append("courseDescription", data.courseShortDesc);
    formData.append("price", data.coursePrice);
    formData.append("category", data.courseCategory);
    formData.append("whatYouWillLearn", data.courseBenefits);
    formData.append("instructions", JSON.stringify(data.courseRequirements));
    formData.append("tags", JSON.stringify(data.courseTags));
    formData.append("thumbnail", data.mediaUpload);
    setLoading(true);
    console.log("formdata", Object.fromEntries(formData.entries()));
    const result = await addCourseDetails(formData, token);
    // console.log(r)
    console.log("result", result)
    if (result) {

      dispatch(setStep(2));
      dispatch(setCourse(result));
      console.log("is step is set of not");
    }
    console.log("is step is set of not");
    setLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='rounded-md border-richblack-700 p-6 space-y-8 bg-richblack-800'
    >
      <div>
        <label htmlFor='courseTitle' className='text-[14px] text-richblack-5'>Course title <span className='text-[14px] text-pink-200'>*</span></label>
        <input
          id='courseTitle'
          placeholder='Enter course title'
          {...register('courseTitle', { required: true })}
          className='w-full p-3 bg-richblack-700 rounded-lg -ml-1 mt-1'
        />

        {errors.courseTitle && (
          <span className='text-yellow-100'>Course title is required</span>
        )}
      </div>
      <div>
        <label htmlFor='courseShortDesc' className='text-[14px] text-richblack-5'> Course Short Description<span className='text-[14px] text-pink-200'>*</span></label>
        <textarea
          id='courseShortDesc'
          placeholder='Enter course short description'
          {...register('courseShortDesc', { required: true })}
          className={`w-full mt-1 h-[150px]  pt-1 pl-1
           bg-richblack-700 border-[1px] border-richblack-600`}
        />
        {
          errors.courseShortDesc && (
            <span>course description is required</span>
          )
        }
      </div>

      <div className='relative'>
        <label htmlFor='coursePrice' className=' text-[14px] text-richblack-5'>Course Price <span className='text-[14px] text-pink-200'>*</span></label>
        <input
          id='coursePrice'
          placeholder='Enter course price'

          {
          ...register("coursePrice", {
            required: true,
            valueAsNumber: true,
          })
          }
          className='w-full p-3 pl-10 bg-richblack-700 relative rounded-lg -ml-1 mt-1'
        />
        <HiOutlineCurrencyRupee className='absolute top-10 left-1 text-richblack-500 ' size={24} />
        {
          errors.coursePrice && (
            <span>Course Price is required</span>
          )
        }
      </div>

      <div>
        <label htmlFor='courseCategory' className='text-[14px] text-richblack-5'>course categories<span className='text-[14px] text-pink-200'>*</span></label>
        <select
          id='courseCategory'
          defaultValue=""
          className='w-full p-3 text-richblack-200 bg-richblack-700 relative rounded-lg -ml-1 mt-1'
          {...register("courseCategory", { required: true })}
        >
          <option value="" disabled> Choose a category</option>
          {
            !loading && courseCategories.map((category, index) => (
              <option key={index} value={category?._id}>
                {category.name}
              </option>
            ))
          }

        </select>
        {
          errors.courseCategory && (
            <span>
              course category is required
            </span>
          )
        }
      </div>

      {/* create a costum component for handling tags input */}
      <ChipInput
        label="Tags"
        name="courseTags"
        placeholder="Enter tags and press enter"
        register={register}
        errors={errors}
        tagsData={tagsData}
        // getValues = {getValues}
        setValue={setValue}
      />

      {/* create a component for uploading and showing previev of  media */}
      <UploadImage
        label="Course Thubnail"
        name="mediaUpload"
        placeholder="Enter tags and press enter"
        register={register}
        errors={errors}
        setValue={setValue}
        editData={course?.thumbnail}
      />



      <div>
        <label htmlFor='courseBenefitss' className='text-[14px] text-richblack-5'>Benefits of the course <span className='text-[14px] text-pink-200'>*</span></label>
        <textarea
          id='courseBenefits'
          placeholder='Enter benefits of the course'
          {...register("courseBenefits", { required: true })}
          className={`w-full mt-1 h-[150px]  pt-1 pl-1
           bg-richblack-700 border-[1px] border-richblack-600`}
        />
        {
          errors.courseBenefits && (
            <span>
              Benefits of the course are required
            </span>
          )
        }
      </div>

      <RequirementField
        name="courseRequirements"
        label="Requirements/Instructions"
        register={register}
        errors={errors}
        placeholder="Enter requirement"
        setValue={setValue}
        editData={editCourse ? course?.instructions : []}
      />

      <div className='flex gap-5'>
        {
          editCourse && (
            <button
              onClick={() => dispatch(setStep(2))}
              className='flex items-center gap-x-2 bg-richblack-300 p-3 rounded-lg'
            >
              Continue Without Saving
            </button>
          )
        }

        <IconButton
          text={!editCourse ? "next" : "save changes"}
          customClasses="bg-yellow-50 p-3 rounded-lg text-richblack-800 font-semibold"
        />
      </div>

    </form>
  );

}

export default CourseInformationForm;
import React from 'react';
import RenderStep from './RenderStep';

const AddCourse = () => {
  return (
    <div className='text-white '>
      <div className='-ml-24 flex gap-10 '>
        <div className='w-[80%] '>
          <h2>Add Course</h2>
          <div>
            <RenderStep />
          </div>
        </div>
        <div className='ml-6'>
          <div className='flex flex-col gap-6 bg-richblack-800 border-[1px] border-richblack-700 p-6'>
            <p className='text-[18px] font-inter font-semibold text-richblack-5'>Code Upload Tips</p>
            <ul className='flex gap-3 flex-col text-[14px]'>
              <li>Set the Course Price option or make it free.</li>
              <li>Standard size for the course thumbnail is 1024x576.</li>
              <li>Video section controls the course overview video.</li>
              <li>Course Builder is where you create & organize a course.</li>
              <li>Add Topics in the Course Builder section to create lessons, quizzes, and assignments.</li>
              <li>Information from the Additional Data section shows up on the course single page.</li>
              <li>Make Announcements to notify any important</li>
              <li>Notes to all enrolled students at once.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddCourse

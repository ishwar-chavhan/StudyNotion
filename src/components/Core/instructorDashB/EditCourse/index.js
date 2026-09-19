import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import RenderStep from '../RenderStep';
import { getFullDetailsOfCourse } from '../../../../services/operation/courseDetailsAPI';
import { setCourse, setEditCourse } from '../../../../slice/courseSlice';

const EditCourse = () => {
  const dispatch = useDispatch();
  const { courseId } = useParams();
  const { course } = useSelector((state) => state.course);
  const [loading, setLoading] = useState(false);
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    const populateCourseDetails = async () => {
      setLoading(true);
      console.log(courseId)
      const result = await getFullDetailsOfCourse(courseId, token);
      console.log(result)
      if (result) {
        dispatch(setEditCourse(true));
        dispatch(setCourse(result));

      }
      setLoading(false);

    }
    populateCourseDetails();
  }, [])
  return (
    <div>
      <h1>Edit Course</h1>
      <div>
        {
          course ? (<RenderStep />) : (
            <p>Course not found</p>
          )
        }
      </div>

    </div>
  )
}

export default EditCourse;

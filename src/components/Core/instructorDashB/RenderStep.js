import React from 'react'
import { FaCheck } from 'react-icons/fa';
import { useSelector } from 'react-redux'
import CourseInformationForm from './AddcourseFile/CourseInformationForm';
import CourseBuilderForm from './courseBuilderForm/CourseBuilderForm';
import PublishCourse from './PublishCoursefolder/PublishCourse';
const RenderStep = () => {
    const { step } = useSelector((state) => state.course);
    // const step=1;
    const steps = [
        {
            id: 1,
            title: "Course Information"
        },
        {
            id: 2,
            title: "Course Builder"
        },
        {
            id: 3,
            title: "Publish"
        },
    ]


    return (
        <div>
            <div>
                {
                    steps.map((item) => (
                        <div key={item.id}>
                            <div className={`${step === item.id ?
                                "bg-yellow-900 border-yellow-50 text-yellow-50"
                                :
                                "border-richblack-700 bg-richblack-800 text-richblack-300"}`}>
                                {
                                    step > item.id ? (<FaCheck />) : (<p>{item.id}</p>)
                                }
                            </div>
                            {/* add daches between the label */}
                        </div>
                    ))
                }
            </div>
            <div>
                {
                    steps.map((item) => (
                        <div key={item.id}>
                            <div>
                                <p>{item.title}</p>
                            </div>
                        </div>
                    ))
                }
            </div>

            {
                step === 1 && <CourseInformationForm />
            }
            {
                step === 2 && <CourseBuilderForm />
            }
            {
                step === 3 && <PublishCourse />
            }

        </div>
    )
}

export default RenderStep

import React, { useEffect, useState } from 'react'

const RequirementField = ({ name, label, register, errors, placeholder, setValue, editData }) => {
    const [requirement, setRequirement] = useState("");
    const [requirementList, setRequirementList] = useState([]);

    useEffect(() => {
        register(name, {
            required: true,
            validate: (value) => value.length > 0
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Pre-populate with existing instructions when editing a course
    useEffect(() => {
        if (editData && Array.isArray(editData) && editData.length > 0) {
            setRequirementList(editData);
        }
    }, [editData]);

    useEffect(() => {
        setValue(name, requirementList);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [requirementList])



    const handleAddRequirement = () => {
        if (requirement) {
            setRequirementList([...requirementList, requirement]);
            setRequirement("");
        }
    }

    const handleRemoveRequirement = (index) => {
        const updateRequirementList = [...requirementList];
        updateRequirementList.splice(index, 1);
        setRequirementList(updateRequirementList);
    }

    return (
        <div>
            <label htmlFor={name} className='text-[14px] text-richblack-5'>{label} <span className='text-[14px] text-pink-200'>*</span></label>
            <div>
                <input
                    type="text"
                    id={name}
                    value={requirement}
                    onChange={(e) => setRequirement(e.target.value)}
                    className='w-full p-3 text-richblack-200 bg-richblack-700 relative rounded-lg -ml-1 mt-1'
                    placeholder={placeholder}
                />

                <button
                    type='button'
                    onClick={handleAddRequirement}
                    className='font-semibold text-yellow-50'
                >
                    Add
                </button>

            </div>

            {
                requirementList.length > 0 && (
                    <ul>
                        {
                            requirementList.map((requirement, index) => (
                                <li key={index} className='flex items-center gap-2 text-richblack-5'>
                                    <span>{requirement}</span>
                                    <button
                                        type='button'
                                        onClick={() => handleRemoveRequirement(index)}
                                        className='text-xs text-pure-greys-300'
                                    >clear</button>
                                </li>
                            ))
                        }
                    </ul>
                )
            }

            {
                errors[name] && (<span>
                    {label} is required
                </span>)

            }
        </div>
    )
}

export default RequirementField

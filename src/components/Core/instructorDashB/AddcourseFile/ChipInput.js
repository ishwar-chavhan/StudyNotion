import React, { useEffect, useState } from 'react'

const ChipInput = ({ label, setValue, name, placeholder, register, tagsData, errors }) => {
  const [tagsList, setTagsList] = useState([]);
  const [tags, setTags] = useState("");

  useEffect(() => {
    if (Array.isArray(tagsData)) {
      setTagsList(tagsData);
    }
    console.log("tagsData", tagsData);

    register(name, {
      required: true,
      validate: (value) => Array.isArray(value) ? value.length > 0 : !!value,
    });
  }, [register, name, tagsData]);

  useEffect(() => {
    console.log("tagsList", tagsList);
    setValue(name, tagsList);
  }, [tagsList, name, setValue]);

  function addTagsHandler(e) {
    e.preventDefault()
    if (tags) {
      setTagsList([...tagsList, tags]);
      console.log(tagsList)
      setTags("");
    }
  }

  function removeTagsHandler(index) {
    const updatedTagsList = [...tagsList];
    updatedTagsList.splice(index, 1);
    setTagsList(updatedTagsList);
  }

  return (
    <div>


      <div>
        <label htmlFor={name} className='text-[14px] text-richblack-5'> {label} <span className='text-[14px] text-pink-200'>*</span></label>
        <input
          id={name}
          placeholder={placeholder}
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          className='w-full p-3 text-richblack-200 bg-richblack-700 relative rounded-lg -ml-1 mt-1'
        />
        <button onClick={addTagsHandler} className='font-semibold text-yellow-50'>
          Add
        </button>
      </div>

      {
        tagsList.length > 0 && (
          <div>
            {tagsList.map((element, index) => (
              <div key={index} className='flex items-center gap-2 text-richblack-5' >
                <span>
                  {element}
                </span>
                <button type='button' onClick={() => removeTagsHandler(index)} className='text-xs text-pure-greys-300'>
                  clear
                </button>
              </div>
            ))}
          </div>
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

export default ChipInput

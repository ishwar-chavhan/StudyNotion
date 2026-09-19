import React from 'react'
import IconButton from './IconButton'

const ConfirmationModal = ({modalData}) => {
  return (
    <div className='text-white z-10  absolute top-[50%] bg-richblack-800  backdrop-blur-[10px] p-6 rounded-xl left-[50%]  -translate-x-[50%] -translate-y-[50%]'>
          <div className='text-center flex flex-col gap-4'>
            <p className='text-[20px] text-richblack-200 capitalize'>
                {modalData.text1}
            </p>
            <p className='text-[14px] text-richblack-200 capitalize'>
                {modalData.text2}
            </p>
            <div className='flex gap-14  mx-auto'>
                <IconButton 
                onclick={modalData?.btn1Handler}
                text={modalData?.btn1Text}
                customClasses = "bg-yellow-50 px-3 py-2 text-richblack-800 font-semibold rounded-lg"
                />
                <button onClick={modalData?.btn2Handler} className='bg-richblack-100 px-3 py-2 text-richblack-800 font-semibold rounded-lg'>
                    {modalData?.btn2Text}
                </button>

            </div>
          </div>
    </div>
  )
}

export default ConfirmationModal

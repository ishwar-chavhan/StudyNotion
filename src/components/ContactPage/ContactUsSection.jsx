import React from 'react'
import ContactPage from '../../pages/ContactUsForm'
const ContactUsSection = () => {
  return (
    <div className='text-white flex flex-col gap-5  mt-24'>
       <div>
         <h1 className='text-center text-[36px] font-semibold font-inter'>
            Get in Touch
        </h1>
        <p className='text-center text-[16px] text-richblack-300'>
            We’d love to here for you, Please fill out this form.
        </p>
       </div>

        <div>
            <ContactPage/>
        </div>
    </div>
  )
}

export default ContactUsSection

import React from 'react';
import ContactPage from '../../pages/ContactUsForm';
import { IoLocationOutline } from "react-icons/io5";
import { MdOutlineAddIcCall } from "react-icons/md";
import { TiMessages } from "react-icons/ti";
import FooterPartOne from '../../HomePage/FooterPartOne';
import ReviewSlider from '../../HomePage/ReviewSlider';
const Contact = () => {
  return (
    <div className='flex flex-col text-white w-11/12 items-center max-w-maxContent mx-auto justify-between mt-20'>
            <div className='flex  justify-between w-[1000px] mx-auto  mb-10'>
                    <div className='bg-richblack-800 flex flex-col gap-5 justify-start items-start h-[320px] p-8 rounded-lg' >
                                <div className='flex justify-center gap-4'>
                                    <div><TiMessages  size={25}/></div>
                                    <div>
                                        <h2 className='text-[20px] font-semibold '>Chat on us</h2>
                                        <p className='text-[14px] text-richblack-300'>Our friendly team is here to help <br/> 
                                        <span>ishwarchavhan30feb@gmail.com</span> </p>
                                    </div>
                                </div>
                                <div className='flex justify-center gap-4'>
                                    <div><IoLocationOutline size={25}/></div>
                                    <div>
                                        <h2 className='text-[20px] font-semibold '>Visit us</h2>
                                        <p className='text-[14px] text-richblack-300'>Come and say hello at our office HQ. <br/> 
                                        Here is the location/ address
                                        </p>
                                    </div>
                                </div>
                                <div className='flex justify-center gap-4'>
                                    <div><MdOutlineAddIcCall size={25} /></div>
                                    <div>
                                        <h2 className='text-[20px] font-semibold '>Call us</h2>
                                        <p className='text-[14px] text-richblack-300'>Mon - Fri From 8am to 5pm <br/> +123 456 7890</p>
                                    </div>
                                </div>
                    </div>
                    <div>

                        <div >
                            <h2 className='text-[36px] font-semibold'>Got a Idea? We’ve got the skills. <br/> Let’s team up</h2>
                            <p className='text-richblack-300 text-[16px]'>Tall us more about yourself and what you’re got in mind.</p>
                        </div>
                        <div>
                            <ContactPage/>
                        </div>

                    </div>
            </div>
            <div className='mx-auto'>
                <p className='text-center text-[42px] font-semibold'>Review From Other Learner</p>
                <ReviewSlider/>
            </div>
            <div className='w-screen bg-richblack-800 '>
                <FooterPartOne/>
            </div> 
    </div>
  )
}

export default Contact;

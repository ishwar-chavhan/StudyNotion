import React from 'react'
import HighlightText from '../../HomePage/HighlightText'
import bannerImg1 from "../../assets/Images/aboutus1.webp";
import bannerImg2 from "../../assets/Images/aboutus2.webp"
import bannerImg3 from "../../assets/Images/aboutus3.webp"
import bannerImg4 from "../../assets/Images/FoundingStory.png"
import CTAButton from "../../HomePage/Button";
// import ContactPage from '../../pages/ContactUsForm';
import ContactUsSection from '../ContactPage/ContactUsSection';
import FooterPartOne from '../../HomePage/FooterPartOne';
import ReviewSlider from '../../HomePage/ReviewSlider';
const About = () => {
  return (
    <div className=' w-11/12 max-w-maxContent mx-auto flex flex-col items-center text-white'>
        {/* section 1 */}
        <section className='flex flex-col   relative items-center text-center pt-[100px] w-screen bg-richblack-800'>
            <div className='w-[800px] p-[52px] flex flex-col gap-3'>
                <header className='text-[36px] font-inter font-semibold '>
                  Driving Innovation in Online Education for a <HighlightText text= {"Brighter Future"}/>
                </header>
                <p className='text-[16px] text-richblack-300 font-inter'>Studynotion is at the forefront of driving innovation in online education.
                   We're passionate about creating a brighter future by offering cutting-edge courses,
                    leveraging emerging technologies, and nurturing a vibrant learning community.</p>
            </div>
            <div className='h-[150px]'></div>
            <div className='flex absolute p-3 rounded-md  transition-all
            duration-200 -bottom-[200px] gap-3'>
              <img src={bannerImg1} alt='image1' className='rounded-md'/>
              <img src={bannerImg2} alt='image2' className='rounded-md'/>
              <img src={bannerImg3} alt='image3' className='rounded-md'/>            
            </div>
        </section>

         <div className='h-[250px]'></div>
        {/* section 2 */}
        <section className='flex flex-col items-center '>
          <div>
             <h2 className='text-[36px] text-center'>We are passionate about revolutionizing the way we learn. Our innovative platform <HighlightText text={ "combines technology"}/>, <span>expertise</span>, 
              and community to create an <span>unparalleled educational experience.</span></h2>
          </div>
          <div className='flex gap-4 mt-28 mb-20 items-center'>
            <div className='w-[43%] ml-1 flex flex-col gap-3  justify-start'> 
                  <h2 className='text-[36px] font-semibold'>
                    Our Founding Story 
                  </h2>
                  <p className='text-richblack-100 text-[16px]'>Our e-learning platform was born out of a shared vision and passion for transforming
                    education. It all began with a group of educators, technologists, and lifelong learners who recognized 
                    the need for accessible, flexible, and high-quality learning opportunities in a rapidly evolving digital world.
                  </p>
                  <p className='text-richblack-100 text-[16px]'>
                    As experienced educators ourselves, we witnessed firsthand the limitations and challenges
                    of traditional education systems. We believed that education should not be confined to the walls
                      of a classroom or restricted by geographical boundaries. We envisioned a platform that 
                    could bridge these gaps and empower individuals from all walks of life to unlock their full potential.
                  </p>
            </div>
             <div className='ml-28'>
                  <img src={bannerImg4} alt=''/>
             </div>
          </div>

          <div className='flex mt-24 mb-20 '>
            <div className='w-[43%] flex flex-col gap-3  justify-start'>
              <h2 className='text-[36px] font-inter font-semibold'>Our Vision</h2>
              <p className='text-richblack-100 text-[16px]'>With this vision in mind, we set out on a journey to create an e-learning platform 
                that would revolutionize the way people learn. Our team of dedicated experts worked tirelessly 
                to develop a robust and intuitive platform that combines cutting-edge technology with
                 engaging content, fostering a dynamic and interactive learning experience.</p>
            </div>
            <div className='w-[43%] flex flex-col gap-3 ml-28 '>
              <h2 className='text-[36px] font-inter font-semibold'>
                Our Mission
              </h2>
              <p className='text-richblack-100 text-[16px]'>our mission goes beyond just delivering courses online. We wanted to create a vibrant community 
                of learners, where individuals can connect, collaborate, and learn from one another. We believe that
                 knowledge thrives in an environment of sharing and dialogue, and we foster this spirit of collaboration
                  through forums, live sessions, and networking opportunities.</p>
            </div>

          </div> 
        </section>

        {/* section 3.1 */}
      <section className=' bg-richblack-800 w-screen p-16'>
        <div className='w-11/12 max-w-maxContent mx-auto  '>
          <div className='flex w-[90%] justify-between text-center'>
            <div>
              <p className='text-[30px] font-inter font-semibold text-richblack-5'>5K</p>
              <p className='text-[16px] text-richblack-500'>active student</p>
            </div>
            <div>
              <p  className='text-[30px] font-inter font-semibold text-richblack-5'>10+</p>
              <p className='text-[16px] text-richblack-500'>Mentors</p>
            </div>
            <div>
              <p  className='text-[30px] font-inter font-semibold text-richblack-5'>200+</p>
              <p className='text-[16px] text-richblack-500'>Courses</p>
            </div>
            <div>
              <p  className='text-[30px] font-inter font-semibold text-richblack-5'>50+</p>
              <p className='text-[16px] text-richblack-500'>award</p>
            </div>
          </div>
        </div>
      </section>

      {/* section 3.2 */}
      <section  className='mt-20 mb-10 mx-auto flex flex-col justify-center items-center '>
      <div className='grid grid-rows-2  grid-cols-4 '>
          <div className='col-span-2 flex flex-col gap-6 w-[80%]  items-start '>
          <h2 className='text-[36px] font-inter font-semibold'>World-Class Learning for <HighlightText text = {" Anyone, Anywhere"}/></h2>
          <p className='text-[14px] text-richblack-300'>
            Studynotion partners with more than 275+ leading universities and companies to 
            bring flexible, affordable, job-relevant online learning to individuals and 
            organizations worldwide.
          </p>
          <CTAButton active = {true}  linkto={"/signup"}>
                    Learn More
          </CTAButton>
        </div>
        <div className= "flex flex-col gap-14 bg-richblack-700 p-8">
          <h2 className='text-[16px] font-inter font-semibold text-richblack-5'>Curriculum Based on Industry Needs</h2>
          <p  className="text-[14px] text-richblack-100">Save time and money! The Belajar curriculum is made to be easier to understand and in line with industry needs.</p>
        </div>
        <div className= "flex flex-col gap-14 bg-richblack-800 p-8">
          <h2 className='text-[16px] font-inter font-semibold text-richblack-5'>Our Learning Methods</h2>
          <p className="text-[14px] text-richblack-100">The learning process uses the namely online and offline.</p>
        </div>
        <div className= "flex flex-col gap-14 p-8">
          <h2 className='text-[16px] font-inter font-semibold text-richblack-5'></h2>
          <p className="text-[14px] text-richblack-100"></p>    
        </div>
        <div className= "flex flex-col gap-14 bg-richblack-700 p-8">
          <h2 className='text-[16px] font-inter font-semibold text-richblack-5'>Certification</h2>
          <p className="text-[14px] text-richblack-100">You will get a certificate that can be used as a certification during job hunting.</p>
        </div>
          <div className= "flex flex-col gap-14 bg-richblack-800 p-8">
          <h2 className='text-[16px] font-inter font-semibold text-richblack-5'>Rating "Auto-grading"</h2>
          <p className="text-[14px] text-richblack-100">You will immediately get feedback during the learning process without 
            having to wait for an answer or response from the mentor.</p>
        </div>
          <div className= "flex flex-col gap-14 bg-richblack-700 p-8">
          <h2 className='text-[16px] font-inter font-semibold text-richblack-5'>Ready to Work</h2>
          <p className="text-[14px] text-richblack-100">Connected with over 150+ hiring partners, you will have the opportunity to 
            find a job after graduating from our program.</p>
        </div>
      </div>


      <ContactUsSection/>

      </section>

      <ReviewSlider/>
   <div className='w-screen bg-richblack-800'>
      <FooterPartOne/>
   </div>
    </div>
  )
}

export default About

import React from 'react'
import { Link } from 'react-router-dom';
import { FaArrowRight } from "react-icons/fa";
import HighlightText from "../HomePage/HighlightText";
import CTAButton from "../HomePage/Button";
import Banner from "../assets/Images/banner.mp4";
import CodeBlocks from "../HomePage/CodeBlocks";
import TimelineSection from '../HomePage/TimelineSection';
import LearningLanguegeSection from '../HomePage/LearningLanguegeSection';
import InstructorSection from '../HomePage/InstructorSection';
import FooterPartOne from '../HomePage/FooterPartOne';
// import  FooterPartTwo from '../components/HomePage/FooterPartTwo';
import ExploreMore from '../HomePage/ExploreMore';
import ReviewSlider from '../HomePage/ReviewSlider';

const Home = () => {
  return (
    <div className='z-1'>
        {/* section1*/}
        <div className = "  relative mx-auto flex flex-col w-11/12 items-center text-white  justify-between max-w-maxContent">
            <Link to = {"/signup"}>
                    <div className = "group mx-auto mt-16 p-1 rounded-full bg-richblack-800 font-bold text-richblack-200 transition-all duration-200 hover:scale-95 w-fit" >
                            <div className=' flex items-center gap-2 rounded-full px-10 py-[5px] group-hover:bg-richblack-900'>
                                    <p>Become An Instructor</p>
                                    <FaArrowRight />
                            </div>
                    </div>
            </Link>
            <div className='text-center text-4xl font-semibold mt-7'>
                        Empower your future with 
                        <HighlightText text = {"Coding  Skills"}/>
            </div>
            <div className='w-[90%] text-center text-lg text-richblack-300 mt-4'>
                With our online coding courses, you can learn at your own pace, from anywhere in the world, and get access to a wealth of resources,
                 including hands-on projects, quizzes, and personalized feedback from instructors.             
            </div>

            <div className='flex flex-row gap-7 mt-8'>
                <CTAButton active = {true}  linkto={"/signup"}>
                    Learn More
                </CTAButton>
                <CTAButton active = {false}  linkto={"/login"}>
                    Book a Demo
                </CTAButton>
            </div>

            <div className='shadow-blue-200 mx-3 my-12'>
                <video
                muted
                loop
                autoPlay
                width={900}
                
                
                class="shadow-[15px_15px_1px_2px_#ffffff] "
                >
                    <source src={Banner} type = "video/mp4" />
                </video>
            </div>

            {/* code section 1 */}
            <div>
                <CodeBlocks 
                position={"lg : flex-row"}
                heading={
                    <div className='text-4xl font-semibold'>
                        Unlock your
                        <HighlightText text={"coding potential"}/>

                         {" "}with our online course
                    </div>
                }
                  subheading={
                    "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
                }
                ctabtn1={
                    {
                        btnText : "try it your self",
                        linkto : "/signup",
                        active : true
                    }
                }
                   ctabtn2={
                    {
                        btnText : "Learn More",
                        linkto : "/login",
                        active : false
                    }
                }

                codeblock={
                    `<!DOCTYPE html>\n<html>\n<head><title>Example</title><linkrel="stylesheet"href="styles.css">\n</head>\n<body>\n<h1><ahref="/">Header</a>\n</h1>\n<nav><ahref="one/">One</a><ahref="two/">Two</a><ahref="three/">Three</a>\n</nav>`
                }
                codeColor={"text-yellow-25"}
                />
            </div>

            {/* code section 1 */}
            <div>
                <CodeBlocks 
                position={"lg : flex-row-reverse"}
                heading={
                    <div className='text-4xl font-semibold'>
                        Start 
                        <HighlightText text={"coding  in second"}/>

                    </div>
                }
                  subheading={
                    "Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."
                }
                ctabtn1={
                    {
                        btnText : "Continue Lession",
                        linkto : "/signup",
                        active : true
                    }
                }
                   ctabtn2={
                    {
                        btnText : "Learn more",
                        linkto : "/login",
                        active : false
                    }
                }

                codeblock={
                    `<!DOCTYPE html>\n<html>\n<head><title>Example</title><linkrel="stylesheet"href="styles.css">\n</head>\n<body>\n<h1><ahref="/">Header</a>\n</h1>\n<nav><ahref="one/">One</a><ahref="two/">Two</a><ahref="three/">Three</a>\n</nav>`
                }
                codeColor={"text-richblue-500"}
                />
            </div>

            <ExploreMore/>
             
        </div>        
        {/* section2*/}
        <div className='bg-pure-greys-5  text-richblack-700'>
            <div className='homepage_bg  h-[310px]'>
                <div className='w-11/12 max-w-maxContent  flex flex-col items-center gap-5 mx-auto'>
                 <div className='h-[150px]'></div>
                   <div className='flex flex-row gap-7 text-white '>

                    <CTAButton active={true} linkto={"/signup"}>
                        <div className='flex gap-3 items-center'>
                            Explore Full Catalog
                              <FaArrowRight/>
                        </div>
                      
                    </CTAButton>

                    <CTAButton active={false} linkto={"/signup"} >
                         <div>
                            Learn More
                         </div>
                    </CTAButton>
                   </div>
                </div>
            </div>

            <div className='mx-auto w-11/12 max-w-maxContent flex flex-col items-center justify-between gap-7'>
                    <div className='flex flex-row gap-5 mt-[95px] mb-10'>
                        <div className='text-4xl font-semibold w-[49%] '>
                            Get the skills you need for a 
                            <HighlightText text = {"job that is in demand"}/>
                        </div>  

                            
                        <div className='flex flex-col gap-10 w-[48%] items-start '>
                            <p className='text-[16px]'>The modern StudyNotion is the dictates its own terms. Today, to be a
                                competitive specialist requires more than professional skills.
                            </p>
                            <CTAButton active={true} linkto={"/signup"}>
                                    <div>
                                        Learn More
                                    </div>
                            </CTAButton>
                        </div> 



                    </div>

                    <TimelineSection/>
                    <LearningLanguegeSection/>
            </div>

            

         

        </div>
        
        {/* section3*/}
        <div className='w-11/12 mx-auto max-w-maxContent flex flex-col items-center justify-between
         gap-8 first-letter bg-richblack-900 text-white '>
             
             <InstructorSection/>

             {/* <h2>review from other languege</h2> */}

             <ReviewSlider/>

             {/* review slider */}

        </div>

        {/* section4*/}
        <div className=' bg-richblack-800'>
        
            <FooterPartOne/>
        
        </div>
         
    </div>
  )
}

export default Home;

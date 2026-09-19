import React from 'react';
import logo1 from "../assets/Logo/Logo-Full-Light.png";

const FooterPartOne = () => {
  return (
    <div className='mx-auto flex w-11/12 flex-col gap-5 max-w-maxContent   '>
        <div className='flex justify-center mt-12 border-b border-richblack-500 pb-5 gap-8'>
             <div className='flex gap-20 border-r border-richblack-500 pr-10'>
        <div className='flex flex-col gap-3'>
            <img src={logo1} alt='StudyNotionLogo'/>
            <div className='text-richblack-400 text-[14px] flex flex-col gap-1'>
                <h2 className='text-white font-bold text-[16px]'>Company</h2>
                <p>About</p>
                <p>Careers</p>
                <p>Affiliates</p>
            </div>
        </div>
        <div className='flex flex-col gap-3'>
                <div className='text-richblack-400 text-[14px] flex flex-col gap-1'>
                    <h2  className='text-white font-bold text-[16px]'>Resources</h2>
                    <p>Articles</p>
                    <p>Blog</p>
                    <p>Chart Sheet</p>
                    <p>Code challenges</p>
                    <p>Projects</p>
                    <p>Videos</p>
                    <p>Workspaces</p>
                    <p>Docs</p>
                </div>
                <div className='text-richblack-400 text-[14px] flex flex-col gap-1'>
                    <h2  className='text-white font-bold text-[16px]'>Support</h2>
                    <p>Help Center</p>
                </div>
        </div>
        <div className='flex flex-col gap-3'>
            <div className='text-richblack-400 text-[14px] flex flex-col gap-1'>
                <h2  className='text-white font-bold text-[16px]'>Plans</h2>
                <p>Paid memberships</p>
                <p>For students</p>
                <p>Business solutions</p>
            </div>
            <div className='text-richblack-400 text-[14px] flex flex-col gap-1'>
                <h2  className='text-white font-bold text-[16px]'>Community</h2>
                <p>Forums</p>
                <p>Chapters</p>
                <p>Events</p>
            </div>
        </div>

             </div>

            <div className='flex gap-20 pl-5'>
                <div  className='text-richblack-400 text-[14px] flex flex-col gap-1' >
                    <h2 className='text-white font-bold text-[16px]'>Subjects</h2>
                    <p>AI</p>
                    <p>Cloud Computing</p>
                    <p>Code Foundations</p>
                    <p>Computer Science</p>
                    <p>Cybersecurity</p>
                    <p>Data Analytics</p>
                    <p>Data Science</p>
                    <p>Data Visualization</p>
                    <p>Developer Tools</p>
                    <p>DevOps</p>
                    <p>Game Development</p>
                    <p>IT</p>
                    <p>Machine Learning</p>
                    <p>Math</p>
                    <p>Mobile Development</p>
                    <p>Web Design</p>
                    <p>Web Development</p>
                </div>
                <div  className='text-richblack-400 text-[14px] flex flex-col gap-1'>
                    <h2 className='text-white font-bold text-[16px]'>Languages</h2>
                    <p>Bash</p>
                    <p>C</p>
                    <p>C++</p>
                    <p>C#</p>
                    <p>Go</p>
                    <p>HTML $ CSS</p>
                    <p>Java</p>
                    <p>JavaScript</p>
                    <p>Kotlin</p>
                    <p>PHP</p>
                    <p>Python</p>
                    <p>R</p>
                    <p>Ruby</p>
                    <p>SQL</p>
                    <p>Swift</p>
                </div>
                <div  className='text-richblack-400 text-[14px] flex flex-col gap-1'>
                    <h2 className='text-white font-bold text-[16px]'>Career building</h2>
                    <p>Career paths</p>
                    <p>Career services</p>
                    <p>Interview prep</p>
                    <p>Professional certification</p>
                    <p>-</p>
                    <p>Full Catalog</p>
                    <p>Beta Content</p>
                </div>
            
            </div>
        </div>
          <div className='flex justify-between w-11/12 mx-auto  text-richblack-300 max-w-maxContent pb-10'>
                <div className='flex gap-4'>
                    <p className='border-r  border-richblack-300 pr-3'>Privacy Policy</p>
                    <p className='border-r border-richblack-300 pr-3'>Cookie Policy</p>
                    <p >Terms</p>
                </div>
                <div>
                    <p className='border-b capitalize'>study and teach with StudyNotion</p>
                </div>
            </div>
    </div>
   
  )
}

export default FooterPartOne;

import React, { useState } from 'react';
import { HomePageExplore } from '../data/homepage-explore';
import HighlightText from './HighlightText';
import CourseCart from './CourseCart';


const tabsName = [
    "Free" , "New to coding" , "Most popular" ,"Skills paths" , "Career paths",
]


const ExploreMore = () => {

    const [currentTab , setCurrentTab] = useState(tabsName[0]);
    const [courses , setCourses] = useState(HomePageExplore[0].courses);
    const [currentCart , setCurrentCart]  = useState(HomePageExplore[0].courses[0].heading);
    
    const setMyCarts =  (value)=>{
        setCurrentTab(value);
        const result = HomePageExplore.filter((course) => course.tag === value);
        setCourses(result[0].courses);
        setCurrentCart(result[0].courses[0].heading);
    }


  return (
    <div >
        <div>
            <div className='text-4xl font-semibold text-center '>
                Unlock The <HighlightText text = {"Power Of Code"}/>
            </div>

            <p className='text-center text-richblack-300 text-[16px]  mt-3'>
                Learn To Build Anything You Can Imagine
            </p>

            <div className='flex flex-row rounded-full bg-richblack-800 mb-5 mt-4 border mx-auto  px-1 py-1 border-richblack-500'>
                {
                    tabsName.map((element , index) =>{
                        return (
                            <div className={`text-[16px] flex flex-row items-center gap-2 
                            ${currentTab === element ? 
                                "bg-richblack-900 text-richblack-5 font-medium border border-richblack-600" 
                                :
                                "text-richblack-200"
                            } rounded-full transition-all duration-200 hover:bg-richblack-900  hover:text-richblack-5 px-7 py-2
                            `} key={index} onClick={()=>setMyCarts(element)}>
                                {element}
                            </div>
                        )
                    }) 
                }
            </div>
        </div>
        <div className='lg:h-[220px]'></div>

        {/* course card ka group */}
        <div className='grid grid-cols-3 gap-1 mx-auto lg:absolute -bottom-[8rem] -left-4 mb-5' >
            {
                courses.map((element , index)=>{
                    return(
                        <CourseCart
                        key = {index}
                        cardData = {element}
                        currentCart = {currentCart}
                        setCurrentCart = {setCurrentCart}
                        index = {index}
                        />
                    )
                })
            }
        </div>


    </div>
  )
}

export default ExploreMore

import React from 'react';
import { FreeMode, Pagination , Navigation,Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import Course_card from './Course_card';


const CourseSlider = ({course , height , width}) => {
  // console.log(course.length);
  return (
    <>
      {
        course?.length > 0 ? (<div>
          <Swiper
                    slidesPerView={3}
                    loop={true}
                    spaceBetween={20}
                    freeMode={true}
                      // loopedSlides={course.length}
                    pagination={{ clickable: true }}
                    modules={[FreeMode , Autoplay, Pagination ,Navigation]}
                    autoplay = {{
                      delay : 2500,
                      disableOnInteraction : false,
                    }}
                    // breakpoints={
                    //  { 1024:{slidesPerView : 2}}
                    // }
                    // navigation = {true}
              >
            {
              course.map((courses , index)=>(
                <SwiperSlide 
                key={index}
            
                >

                  <Course_card course={courses} height={height} width={width}/>
                </SwiperSlide>
              ))
            }
          </Swiper>
        </div>):(
          <p className='text-center text-[30px] font-semibold capitalize'> no course found</p>
        )
      }
    </>
  )
}

export default CourseSlider

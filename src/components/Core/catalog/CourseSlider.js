import React from 'react';
import { FreeMode, Pagination, Navigation, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import CourseCard from './Course_card';


const CourseSlider = ({ course, height, width }) => {
  // console.log(course.length);
  return (
    <>
      {
        course?.length > 0 ? (<div>
          <Swiper
            key={course?.length}
            slidesPerView={1}
            loop={course?.length > 2}
            spaceBetween={20}
            pagination={{ clickable: true }}
            modules={[FreeMode, Autoplay, Pagination, Navigation]}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
          >
            {
              course.map((courses, index) => (
                <SwiperSlide
                  key={index}

                >

                  <CourseCard course={courses} height={height} width={width} />
                </SwiperSlide>
              ))
            }
          </Swiper>
        </div>) : (
          <p className='text-center text-[30px] font-semibold capitalize'> no course found</p>
        )
      }
    </>
  )
}

export default CourseSlider

import React, { useEffect, useState } from 'react';
import { Pagination, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { FaStar } from "react-icons/fa";
import "swiper/css";
import "swiper/css/pagination";
import { apiConnector } from "../services/apiconnector";
import { ratinsEndpoint } from "../services/apis";
import ReactStars from "react-rating-stars-component";

const ReviewSlider = () => {
    const [review, setReview] = useState([]);
    const transcateWords = 7;
    const { REVIEWS_DETAILS_API } = ratinsEndpoint;

    useEffect(() => {
        const fetchAllReview = async () => {
            const { data } = await apiConnector("GET", REVIEWS_DETAILS_API);
            if (data?.success) {
                setReview(data?.data);
            }
        };
        fetchAllReview();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Ensure enough slides for seamless looping in Swiper 11 (requires at least slidesPerView * 2 slides)
    let displayReviews = review;
    if (review.length > 0 && review.length < 8) {
        displayReviews = [];
        while (displayReviews.length < 8) {
            displayReviews = [...displayReviews, ...review];
        }
    }

    return (
        <div className='text-white mb-14 mt-8'>
            <div className='min-h-[190px] max-w-maxContent'>
                {review.length > 0 ? (
                    <Swiper
                        key={displayReviews.length}
                        modules={[Pagination, Autoplay]}
                        slidesPerView={1}
                        spaceBetween={24}
                        loop={displayReviews.length >= 2}
                        autoplay={{
                            delay: 2500,
                            disableOnInteraction: false,
                        }}
                        breakpoints={{
                            640: {
                                slidesPerView: 2,
                            },
                            768: {
                                slidesPerView: 3,
                            },
                            1024: {
                                slidesPerView: 4,
                            },
                        }}
                        className='w-full'
                    >
                        {displayReviews.map((item, index) => (
                            <SwiperSlide key={index}>
                                <div className='p-4 bg-richblack-800 flex flex-col gap-2 h-[180px] rounded-md'>
                                    <div className='flex gap-3 items-center'>
                                        <img
                                            src={
                                                item?.user?.image
                                                    ? item?.user?.image
                                                    : `https://api.dicebear.com/5.x/initials/svg?seed=${item?.user?.firstName || 'User'} ${item?.user?.lastName || ''}`
                                            }
                                            alt='profile pic'
                                            className='h-10 w-10 object-cover rounded-full'
                                        />
                                        <div>
                                            <p className='text-richblack-5 text-[16px] font-semibold'>
                                                {item?.user?.firstName} {item?.user?.lastName}
                                            </p>
                                            <p className='text-richblack-500 text-[14px]'>
                                                {item?.user?.email}
                                            </p>
                                        </div>
                                    </div>

                                    <p className="text-[15px] font-medium text-richblack-5">
                                        {item?.course?.courseName}
                                    </p>
                                    <p className="text-[13px] font-medium text-richblack-100">
                                        {
                                            item?.review && item.review.split(" ").length > transcateWords
                                                ? `${item.review.split(" ").slice(0, transcateWords).join(" ")}...`
                                                : item?.review
                                        }
                                    </p>

                                    <div className='flex items-center gap-2 mt-auto'>
                                        <p className='text-yellow-50 font-semibold'>
                                            {Number(item?.rating || 0).toFixed(1)}
                                        </p>

                                        <ReactStars
                                            count={5}
                                            value={Number(item?.rating || 0)}
                                            size={20}
                                            edit={false}
                                            activeColor="#ffd700"
                                            emptyIcon={<FaStar />}
                                            fullIcon={<FaStar />}
                                        />
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                ) : (
                    <div className='flex justify-center items-center h-[180px] text-richblack-300'>
                        <p>Loading reviews...</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ReviewSlider;

import React, { useEffect, useState } from 'react'
import { FreeMode, Pagination, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { apiConnector } from "../services/apiconnector";
import { ratinsEndpoint } from "../services/apis";
// import RatingStars from '../components/Common/RatingStars';
import { Rating } from 'react-simple-star-rating'
const ReviewSlider = () => {
    const [review, setReview] = useState([]);
    // const transcateWords = 15;
    const { REVIEWS_DETAILS_API } = ratinsEndpoint;

    useEffect(() => {
        const fetchAllReview = async () => {
            const { data } = await apiConnector("GET", REVIEWS_DETAILS_API);
            console.log("review data", data);
            // if()
            // const {data} = response;
            if (data?.success) {
                setReview(data?.data);
                console.log("data.data", data.data);
            }
            console.log("printiting review", review);
        }
        fetchAllReview();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <div className='text-white'>
            <div className='h-[190px] max-w-maxContent'>
                <Swiper
                    slidesPerView={4}
                    spaceBetween={24}
                    loop={true}
                    freeMode={true}
                    autoplay={{
                        delay: 250,
                    }}
                    modules={{
                        FreeMode, Pagination, Autoplay
                    }}
                    className='w-full'
                >
                    {
                        review.map((review, index) => (
                            <SwiperSlide key={index}>
                                <img src={review?.user?.image ? review?.user?.image
                                    :
                                    `https://api.dicebear.com/5.x/initials/svg?seed=${review?.user?.firstName} ${review?.user?.lastName}`}
                                    alt='profile pic'
                                    className='h-9 w-9 object-cover rounded-full'
                                />
                                <p>
                                    {review?.user?.firstName} {review?.user?.lastName}
                                </p>
                                <p>
                                    {review?.course?.courseName}
                                </p>
                                <p>
                                    {
                                        review?.review
                                    }
                                </p>
                                <p>
                                    {
                                        review?.rating.toFixed(1)
                                    }
                                </p>
                                <Rating
                                    iconsCount={5}
                                    initialValue={review.rating}
                                    size={24}
                                    readonly={true}
                                />
                            </SwiperSlide>
                        ))
                    }

                </Swiper>
            </div>
        </div>
    )
}

export default ReviewSlider

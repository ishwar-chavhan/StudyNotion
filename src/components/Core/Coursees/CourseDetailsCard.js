import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useSearchParams } from 'react-router-dom'
import copy from 'copy-to-clipboard';
import { ACCOUNT_TYPE } from '../../../utils/constants';
import { toast } from 'react-toastify';
import { addToCart  } from '../../../slice/cartSlice';
const CourseDetailsCard = ({course , setConfirmationModal , handleBuyCourse }) => {
    const {user} = useSelector((state)=>state.profile);
 const { cart } = useSelector((state) => state.cart)
    const {token} = useSelector((state)=>state.auth);
    // const [confirmationModal , setConfirmationModal] = useState()
    const navigate = useNavigate();
    const dispatch = useDispatch();
    // const {courseId} = useParams();


    const handleAddToCart = ()=>{
        // console.log("carts---->" , cart);
        // console.log("course--->" , course)
        if(cart.some((item) => item._id === course._id)){
            console.log()
            toast.error("course is already is added to cart");
            return;
        }

        if(user && user?.accountType === ACCOUNT_TYPE.INSTRUCTOR){
            toast.error("you are an instructor , you cant buy course"); 
            return;           
        }
        if(token){
            dispatch(addToCart(course));
             toast.success("course added to cart");
            return;
        }
         setConfirmationModal({
                                   text1: "you are not logged in",
                                   text2: "please log in to purchase the course",
                                   btn1Text: "login",
                                   btn2Text: "Cancel",
                                   btn1Handler: () => navigate("/login"),
                                   btn2Handler: () => setConfirmationModal(null)
                               })
   
    }

    const handleShare = ()=>{
        copy(window.location.href);
        toast.success("link copied to clipboard")
    }

  return (
    <div className=' min-h-max flex flex-col rounded-lg bg-richblack-600'>
        <img
        src={course.thumbnail}
        alt='course thumbnail'
        className='max-h-[300px] min-h-[250px] rounded-t-lg w-[400px]  '
        />

       <div className='p-5 flex flex-col gap-4'>
         <p className='text-[30px] font-bold'>
           Rs. {course.price}
        </p>
        <div className=' flex flex-col items-start gap-3'>
            <button
            className='bg-yellow-50 p-3 w-full font-semibold rounded-lg text-richblack-800'
            onClick={
                user && course?.studentEnrolled?.includes(user?._id)  ?
                (()=>navigate("/dashboard/enrolled-courses")) 
                :
                (handleBuyCourse)
            }
            >
                {
                    user && course?.studentEnrolled?.includes(user?._id)  ? "Go to course" 
                    : 
                    "Buy now"
                }
            </button>
            
                {
                    
                    (!course?.studentEnrolled?.includes(user?._id)) && (
                        <button onClick={handleAddToCart} className='px-6 py-3 rounded-lg text-richblack-5 font-semibold bg-richblack-800 w-full'>
                            Add To Cart
                        </button>
                    )
                }
          
        </div>
        <div>
            <p className='text-center text-richblack-25 text-[14px]'>
                30 Day Money-Back Guarantee              
            </p>
            <p className='text-[18px] mb-1 '>
                This Course Includes : 
            </p>
            <div className='flex flex-col ml-2 text-richblack-50'>
                {
                    course?.instructions.map((items , index)=>(
                        <p key={index}>
                            <span >
                               {`${index+1})`}  {items}
                            </span>
                        </p>
                    ))

                }
            </div>
        </div>
        <div className='mx-auto'>
            <button
            className=' flex gap-2 p-6 text-yellow-50 hover:text-yellow-200'
            onClick={handleShare}
            >
                Share
            </button>
        </div>
       </div>
    </div>
  )
}

export default CourseDetailsCard

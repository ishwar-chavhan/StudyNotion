import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import IconButton from './IconButton';
import { FaRegEdit } from "react-icons/fa";
const MyProfile = () => {


    const {user} = useSelector((state) => state.profile);
    const navigate = useNavigate();
    console.log(user);
    return (
    <div className='text-white flex flex-col gap-5'> 
        <h1 className='text-[36px] font-inter font-semibold'>
             My Profile
        </h1>

          {/* section 1 */}
        <div  className='bg-richblack-800 p-6 rounded-xl'>
            <div className='flex  justify-between items-center w-[100%] mx-auto'>
                <div className='flex gap-4 items-center'>
                    <img src={user?.image} alt={`profile-${user?.firstName}`} className='aspect-square w-[78px] 
                    rounded-full object-cover '/>
                    <div>
                        <p className='text-[1.5rem] text-richblack-5 font-inter font-semibold'>{user?.firstName + " " + user?.lastName}</p>
                        <p className='text-[14px] py-2 text-richblack-300'>{user?.email}</p>
                    </div>
                </div>
                <IconButton
                text={"Edit"}
                customClasses="py-2 px-5 flex flex-row gap-2 items-center bg-yellow-50 rounded-lg text-black "
                iconsPresent={<FaRegEdit />}
                onclick={()=>{
                    navigate("/dashboard/settings")
                }} 
                />
            </div>
        </div>


        {/* section 2 */}
        <div className='flex flex-col gap-4 bg-richblack-800 p-6 rounded-xl '>
            <div className='flex justify-between'>
                <p  className='text-[1.5rem] text-richblack-5 font-inter font-semibold'>About</p>
                <IconButton 
                text = "Edit"
                  customClasses="py-2 px-5 flex flex-row gap-2 items-center bg-yellow-50 rounded-lg text-black "
                iconsPresent={<FaRegEdit />}
                onclick={()=>{
                    navigate("/dashboard/settings");
                }}
                
                />
            </div>
            <p  className='text-[14px] py-2 text-richblack-300'>
                {
                    user?.additionDetails?.about ?? "write something about yourself"
                }
            </p>

        </div>

        {/* section 3 */}
        <div className='flex flex-col gap-8 bg-richblack-800 p-6 rounded-xl '>
            <div className='flex justify-between'>
                <p className='text-[1.5rem] text-richblack-5 font-inter font-semibold' >personal details</p>
                <IconButton
                text = "Edit"
                customClasses="py-2 px-5 flex flex-row gap-2 items-center bg-yellow-50 rounded-lg text-black "
                iconsPresent={<FaRegEdit />}
                onclick={()=>{
                    navigate("/dashboard/settings");
                }}
                />
            </div>
            <div className='grid grid-cols-2 gap-x-96 gap-y-12  place-content-evenly'>
                 <div className='space-y-2' >
                    <p className='tetx-[14px] text-richblack-600'>First Name</p>
                    <p  className='tetx-[14px] p-3 bg-richblack-700 rounded-lg' >{user?.firstName}</p>
                 </div>
                <div className='space-y-2'>
                    <p className='tetx-[14px] text-richblack-600'>Email</p>
                    <p className='tetx-[14px] p-3 bg-richblack-700 rounded-lg'>{user?.email}</p>
                 </div>
                <div className='space-y-2'>
                    <p className='tetx-[14px] text-richblack-600'>Gender</p>
                    <p  className='tetx-[14px] p-3 bg-richblack-700 rounded-lg'>{user?.additionDetails.gender ?? "Add Gender q"}</p>
                 </div>
                <div className='space-y-2'>
                    <p className='tetx-[14px] text-richblack-600'>Last Name</p>
                    <p className='tetx-[14px] p-3 bg-richblack-700 rounded-lg'>{user?.lastName}</p>
                 </div>
                <div className='space-y-2'>
                    <p className='tetx-[14px] text-richblack-600'>Phone Number</p>
                    <p  className='tetx-[14px] p-3 bg-richblack-700 rounded-lg'>{user?.additionDetails?.contactNumber ?? "Add Contact Number"}</p>
                </div>
                 <div className='space-y-2'>
                    <p className='tetx-[14px] text-richblack-600'>Date Of Birth</p>
                    <p  className='tetx-[14px] p-3 bg-richblack-700 rounded-lg'>{user?.additionDetails?.dateOfBirth ?? "Add Date Of Birth"}</p>
                </div>
            </div>
        </div>
    
    </div>
  )
}

export default MyProfile

import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { changeProfileImage } from '../../../../services/operation/profileApi';
import { MdOutlineFileUpload } from "react-icons/md";
import ProfileInfo from './ProfileInfo';
import ChangePass from './ChangePass';


const ChangeSetting = () => {
    const { user } = useSelector((state) => state.profile);
    const {token} = useSelector((state)=>state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [profileImage , setProfileImage] = useState(null);
    const fileInputRef = useRef(null);



    if (!user) return null;

    function handlerChange(e){
        const file = e.target.files[0];
        if(file){
            setProfileImage(file);
        }
    }

    function submitHandler(e) {
        e.preventDefault();
        const formData = new FormData();
        formData.append("imageFile", profileImage)
        dispatch(changeProfileImage(formData, token, navigate));

    }

    return (
       <div>
         <div >
           
            <div  className='flex  gap-5 bg-richblack-800 p-6 rounded-xl '>
                <img
                    src={user?.image}
                    alt={`profile-${user?.firstName}`}
                    className="aspect-square w-[78px] rounded-full object-cover"
                />

                <form onSubmit={submitHandler} className='flex flex-col justify-around'>
                    <label>Change Profile Picture</label>

                    <div className=' flex gap-5'>
                        <input
                            type="file"
                            ref={fileInputRef}
                            accept=".jpg,.jpeg,.png"
                            name="imageFile"
                            onChange={handlerChange}
                            className='hidden z-10 '
                        />
                        <div className='py-2 px-4 bg-yellow-50 rounded-xl
                         text-richblack-800 font-inter font-medium'
                          onClick={() => fileInputRef.current.click()}>

                            Select
                        </div>

                        <button type="submit" className='flex gap-3 py-2 px-4 bg-richblack-600 rounded-xl text-richblack-50 items-center'>
                            Upload 
                            <MdOutlineFileUpload size={21}/>
                        </button>
                    </div>
                </form>
            </div>
        </div>


        <div className='h-[50px]'></div>
        
        <ProfileInfo/>

        <div className='h-[50px]'></div>

        <ChangePass/>

       </div>
    );
};
export default ChangeSetting

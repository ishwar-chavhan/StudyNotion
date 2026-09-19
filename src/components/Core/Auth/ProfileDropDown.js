import React , {useState} from 'react'
import { useSelector } from 'react-redux'
import { MdKeyboardArrowDown } from "react-icons/md";
import { IoLogInOutline } from "react-icons/io5";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { VscDashboard } from "react-icons/vsc";
import {logOut} from "../../../services/operation/authApi";
const ProfileDropDown = () => {
  const {user} = useSelector((state)=>state.profile)
  const [open , setOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  if(!user) return null;
 


  return (
    <div className='group relative'>
    <div className='grid grid-cols-2 gap-1 items-center group' onClick={()=>setOpen(!open)} >
      <img  src={user.image} alt="profileImage" className='rounded-full' width={30}/>
      <MdKeyboardArrowDown className='text-white' size={30} />  
    </div>
    {
     open && (
       <div className='text-white flex flex-col j] bg-richblack-700 absolute z-50 rounded-lg p-2 right-2 top-[40px] w-[120px] gap-3 '>
            <div className='flex gap-2 items-center' onClick={()=>{setOpen(!open); dispatch(logOut(navigate)) }} >
                  <IoLogInOutline />
                  <p>Log Out</p>
            </div>
            <Link to="/dashboard/myprofile" className='flex gap-2 items-center' onClick={()=>setOpen(!open)}>
              <VscDashboard />
              <p>dashboard</p>
            </Link>
      </div>
     )
    }
    </div>
  )
}

export default ProfileDropDown;

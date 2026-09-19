import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'
import Sidebar from '../Core/dashboard/Sidebar'
// import { Outlet  } from 'react-router-dom'

const Dashboard = () => {
  
    const { loading : authLoading } = useSelector((state) => state.auth);
    const { loading : profileLoading} = useSelector((state) => state.profile);

    if(profileLoading || authLoading){
        return (
            <div className='mt-12'>
                Loading
            </div>
        )
    }

   return (
    <div className='flex relative text-white min-h-[calc(100vh-3.5rem)]'>
        <Sidebar />
        <div className='h-[calc(100vh-3.5rem)] overflow-auto flex-1'>
            <div className='mx-auto w-11/12 max-w-[1000px] py-10'>
                <Outlet />
            </div>
        </div>
    </div>
  )
}

export default Dashboard

import React, { useState } from 'react';
import { logOut } from '../../../services/operation/authApi';
import { sidebarLinks } from '../../../data/dashboard-links';
import { useDispatch, useSelector } from 'react-redux';
import SideBarLink from './SideBarLink';
import { useNavigate } from 'react-router-dom';
import { IoLogInOutline } from "react-icons/io5";
import ConfirmationModal from './ConfirmationModal';

const Sidebar = () => {
    const { user, loading: profileLoading } = useSelector((state) => state.profile);
    const { loading: authLoading } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [confirmationModal, setConfirmationModal] = useState(null);

    if (authLoading || profileLoading) {
        return (
            <div className='mt-10'>
                ....loading
            </div>
        )
    }

    return (
        <div className='text-white   '>
            <div className='flex min-w-[222px] flex-col border-r-[1px] border-r-richblack-400 h-[calc(100vh-3.5rem)] bg-richblack-800 py-10'>
                <div className='flex flex-col'>
                    {sidebarLinks.map((link) => {
                        if (link.type && user?.accountType !== link.type) return null;

                        return <SideBarLink link={link} iconName={link.icon} key={link.id} />;
                    })}
                </div>

                <div className='mx-auto mt-6 h-[1px] mb-6 w-10/12 bg-richblack-600'></div>

                <div className='flex flex-col gap-1'>
                    <SideBarLink
                        link={{ name: 'Settings', path: '/dashboard/settings' }}
                        iconName='VscSettingsGear'
                    />

                    <button
                        onClick={() => setConfirmationModal({
                            text1: 'are you sure',
                            text2: 'you will be logged out of your account',
                            btn1Text: 'LogOut',
                            btn2Text: 'Cancel',
                            btn1Handler: () => dispatch(logOut(navigate)),
                            btn2Handler: () => setConfirmationModal(null)
                        })}
                        className='text-sm font-medium '
                    >
                    <div className='flex px-8 py-2  flex-row items-center gap-x-3'>
                            <IoLogInOutline className='text-lg' />
                            <p>LogOut</p>
                    </div>
                    </button>
                   
                </div>
            </div>
            {

                confirmationModal && <ConfirmationModal modalData={confirmationModal} />
            }
           {
            confirmationModal &&  <div className='absolute bg-[#5f5f5f83] top-0 right-0 left-0 bottom-0 -z-0 transition-all duration-200 backdrop-blur-sm' onClick={() => setConfirmationModal(null)}></div>
           }
        </div>
    )
}

export default Sidebar;

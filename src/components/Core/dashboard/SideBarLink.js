import React from 'react'
import * as Icons from "react-icons/vsc"
import { NavLink, useLocation, matchPath } from 'react-router-dom';

const SideBarLink = ({ link, iconName }) => {
    const Icon = Icons[iconName];
    const location = useLocation();

    const matchRoute = (route) => {
        return matchPath({ path: route}, location.pathname);
    }

  return (
    <NavLink to={link.path}  
    className={` relative  px-8 py-2 text-sm ${matchRoute(link.path) ? "bg-yellow-5 text-richblack-800" : "bg-opacity-0"}`}>
       
        <span className={`absolute left-0 top-0  h-full w-[0.2rem0 bg-yellow-600
        ${matchRoute(link.path) ? "" : "bg-opacity-0"}
        `}></span>

        <div className='flex items-center gap-x-3'>
            <Icon className="text-lg"/>
            <span>
                {link.name}
            </span>
        </div>  


    </NavLink>
  )
}

export default SideBarLink

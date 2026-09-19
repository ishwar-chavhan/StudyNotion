import React, { useEffect, useState } from 'react';
import logo from "../../assets/Logo/Logo-Full-Light.png";
import { Link, matchPath } from 'react-router-dom';
import { NavbarLinks } from '../../data/navbar-links';
import { useLocation } from 'react-router-dom';
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useSelector } from 'react-redux';
import ProfileDropDown from '../Core/Auth/ProfileDropDown';
import { categories } from '../../services/apis';
import { apiConnector } from '../../services/apiconnector';
import { FaArrowDown } from "react-icons/fa";

// const subLinks = [
//     {
//         title : "python",
//         link : "/catelog/python"
//     },
//     {
//         title : "web dev",
//         link : "/catelog/web-development"
//     }
// ]


const NavBar = ({setLoginType}) => {
    
    function clickHandler(value){
        setLoginType(value);
    }

    const {token } = useSelector((state)=>state.auth);
    const {user } = useSelector((state)=>state.profile);
    const {totalItems} = useSelector((state) => state.cart);

    const [subLinks , setSubLink] = useState([]);

    const fetchSubLink = async () => {
            try{
                const result = await apiConnector("GET" , categories.CATEGORIES_API);
                const datas = result?.data?.data?.filter((ct)=>ct.name.split(" ").join("-"))
                console.log("datas",datas);
                setSubLink(result?.data?.data);
            }catch(error){
                console.log(error);
                console.log("could not fetch the catefory list")
            }
        }



        useEffect(()=>{
            fetchSubLink();
        },[])


    
    const location = useLocation();
    const matchRoute = (route)=>{
        return matchPath({path : route} , location.pathname)
    }

  return (
    <div className='flex h-14 justify-center items-center
      border-b-[1px] border-b-richblack-700'>

        <div className='flex w-11/12 max-w-maxContent 
        justify-between items-center'>
          <Link to="/">
                <img src={logo} width={160} height={32} 
                loading='lazy' alt='logo of StudyNotion'  />
          </Link>

          <nav className='relative'>
            <ul className='flex  gap-x-6 text-richblack-25'>
                {
                    NavbarLinks.map((link , index)=>(
                                <li key={index}>
                                {
                                    link.title === "Catalog" ? (<div>
                                        <div className='flex relative items-center group gap-2'> 
                                            {link.title}
                                           <FaArrowDown />

                                            <div className='invisible absolute left-[50%] -top-[120px] max-h-[300px] overflow-scroll overflow-x-hidden z-30 translate-x-[-50%] 
                                            translate-y-[50%] flex flex-col gap-1 rounded-md
                                             bg-richblack-5 p-4 text-richblack-900 opacity-0 transition-all duration-200
                                              group-hover:visible group-hover:opacity-100 lg:w-[300px]'>
                                                <div className='absolute left-[56.8%] -top-28 h-6 w-6 rotate-45 rounded bg-richblack-5 z-10'>
                                                    
                                                </div>
                                                {
                                                    subLinks.length ? (
                                                            subLinks?.map((subLink , index) => {
                                                                return(
                                                                    <Link to = {`/catalog/${subLink.name.split(" ").join("-").toLowerCase()}`} key={index}  className='p-3
                                                                     text-richblack-800 rounded border text-lg font-semibold
                                                                      border-richblack-25 
                                                                    '>
                                                                        <p>
                                                                            {
                                                                               subLink.name
                                                                            }
                                                                        </p>
                                                                    </Link>
                                                                )
                                                            })
                                                    ) :
                                                    (
                                                        <div>
                                                            </div>
                                                    )
                                                }
                                            </div>


                                        </div>
                                       
                                    </div>) : (
                                        <Link to={link?.path}>
                                            <p className={`${matchRoute(link?.path) ?
                                                 "text-yellow-25" : "text-richblack-25"} `}>
                                                {link.title}
                                            </p>
                                        </Link>
                                    )
                                }
                            </li>  
                    ))

                }
              
            </ul>
        </nav>

        <div className='flex gap-x-4 items-center'>
             {
                user && user.accountType !== "Instructor" && (
                    <Link to="/dashboard/cart" className="relative">
                            <AiOutlineShoppingCart className="text-2xl text-richblack-100" />
                            {totalItems > 0 && (
                                <span className="absolute -bottom-2 -right-2 grid h-5 w-5 place-items-center 
                                overflow-hidden rounded-full bg-richblack-600 text-center text-xs font-bold
                                 text-yellow-100">
                                {totalItems}
                                </span>
                            )}
                    </Link>
                )
             }

             {
                token === null && (
                    <Link to = "/login">
                        <button className='border border-richblack-700
                         bg-richblack-800 px-[12px] py-[8px]
                          text-richblack-100 rounded-md' onClick={()=>clickHandler("login")}>
                            Log in
                        </button>
                    </Link>
                ) 
             }
             {
                token === null && (
                    <Link to = "/signup">
                        <button className='border border-richblack-700
                         bg-richblack-800 px-[12px] 
                        py-[8px] text-richblack-100 rounded-md' onClick={()=>clickHandler("signup")}>
                            Sign Up
                        </button>
                    </Link>
                )
             }

             {
                token !== null  && <ProfileDropDown/>
             }
        </div>

        </div>

    </div>
  )
}

export default NavBar

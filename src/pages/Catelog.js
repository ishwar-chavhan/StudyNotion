import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { apiConnector } from '../services/apiconnector';
import { categories } from '../services/apis';
import Course_card from '../components/Core/catalog/Course_card';
import CourseSlider from '../components/Core/catalog/CourseSlider';
import FooterPartOne from "../HomePage/FooterPartOne"
import gteCatelogPageData from '../services/operation/pageAndCoomponentData';

const Catelog = () => {
    const {
        CATEGORIES_API
    } = categories;
    const {catalogName} = useParams();
    const [catalogPageData , setCatalogPageDate] = useState(null);
    const [categoryId , setCategoryId] = useState("");
    
    // fetched all category
    useEffect(()=>{
        const getCategories = async() =>{
            const response =  await apiConnector("GET" , CATEGORIES_API );
            const category_id =  response?.data?.data?.filter((ct)=>ct.name.split(" ").join("-").toLowerCase() === catalogName )[0]._id;
            setCategoryId(category_id);
        }
        getCategories();
    } , [catalogName]);

    useEffect(()=>{
        const getCategoryDetails = async ()=>{
            try{
                const res = await gteCatelogPageData(categoryId);
                console.log("printing respinse of getCategoryDetails" , res);
                setCatalogPageDate(res);
            }catch(err){
                console.log(err);
            }
        }
        if(categoryId){
            getCategoryDetails();
        }
    }, [categoryId])

  return (
  <div>
    <div className='w-screen bg-richblack-800 pt-5 pb-[55px]'>
            <div className='text-white pt-5 w-11/12 max-w-maxContent mx-auto'>
                        <div className='flex justify-between  '>
                            <div className='w-[70%] flex flex-col gap-2'>
                                            <p className='text-richblack-300 flex items-center gap-2'>
                                                Home / Catalog / 
                                                <span className='text-yellow-50'>{catalogPageData?.data?.selectedCategory?.name}</span>
                                            </p>
                                            <p className='text-[30px] font-semibold text-richblack-5 font-inter'>{catalogPageData?.data?.selectedCategory?.name}</p>
                                            {/* <p>{catalogPageData?.data?.selectedCategory?.description}</p> */}
                                            <p className='text-[14px]  text-richblack-200 font-inter'>Python is a general-purpose, versatile, and powerful programming language.
                                                It’s a great first language because Python code is concise and easy to read. Whatever 
                                                you want to do, python can do it. From web development to machine
                                                learning to data science, Python is the language for you.</p>
                                            </div>
                                                <div className='space-y-2'>
                                                    <h2 className='text-[18px] font-semibold text-richblack-5'>Related resources</h2>
                                                    <ul className='list-disc ml-4 text-[14px] text-richblack-100'>
                                                        <li>Doc {catalogPageData?.data?.selectedCategory?.name}</li>
                                                        <li>Cheatsheets</li>
                                                        <li>Articles</li>
                                                        <li>Community Forums</li>
                                                        <li>Projects</li>
                                                    </ul>
                                </div>
                        </div>
            </div>
   </div>
   <div className='w-screen bg-richblack-900 pt-[60px]'>
            <div className='text-white pt-5 w-11/12 max-w-maxContent mx-auto'>
                        <div className=''>
                {/* Section 1  */}
                                <div className='flex flex-col gap-5 '>
                                     <h2 className='text-[30px] font-semibold border-b border-richblack-400 pb-2'>
                                        Courses to get you started
                                     </h2>
                                        {/* <div className='flex gap-x-3'>
                                            <p>MostPopular</p>
                                        </div> */}
                                        
                                    <div>
                                        <CourseSlider
                                        height={"200px"}
                                         width = {"400px"}
                                        course = {catalogPageData?.data?.selectedCategory?.course}
                                        />
                                    </div>
                                </div>
                                {/* section 2 */}
                                <div className='mt-16 flex flex-col gap-5 '>
                                    <p className='text-[30px] font-semibold border-b border-richblack-400 pb-2'>Top Course in <spna>{catalogPageData?.data?.selectedCategory?.name}</spna></p>
                                    <p>
                                        <CourseSlider
                                        height={"200px"}
                                        width = {"400px"} 
                                        course = {catalogPageData?.data?.differentCategories?.course}
                                        />
                                    </p>
                                </div>
                                {/* section 3 */}
                                <div  className='mt-16 flex flex-col gap-5 '>
                                    <p  className='text-[30px] font-semibold border-b border-richblack-400 pb-2'>Frequently Bought</p>
                                    <div className='py-8'>
                                        <div className='grid grid-cols lg:grid-cols-2 gap-5'>
                                            {
                                                catalogPageData?.data?.mostSellingCourse?.map((course,index)=>(
                                                   <div >
                                                            <Course_card
                                                            course={course}
                                                            key={index}
                                                            width = {"600px"}
                                                            height={"300px"}
                                                            />
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    </div>
                                </div>
                        </div>
            </div>

   </div>

   <div className='w-screen bg-richblack-800 pt-5 pb-[55px]'>
      <FooterPartOne/>
   </div>
   
  </div>
  )
}

export default Catelog


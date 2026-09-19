import React from 'react'
import { toast } from 'react-toastify';
import { catalogDataEndpoint } from '../apis';
import { apiConnector } from '../apiconnector';

const {
    CATALOGPAGEDATA_API
    
} = catalogDataEndpoint;

const gteCatelogPageData =async  (categoryId) => {
    let result = [];
    const toastId = toast.loading("...loading");
    try{
        const response = await apiConnector("POST" , CATALOGPAGEDATA_API , {
            categoryId : categoryId 
        }) 

        if(!response?.data?.success){
            throw new Error(" could not fetch category page data");
        }
        result = response?.data;
        console.log("got data -------------->")
         toast.success("getCatelogPageData successfully");
    }catch(error){
        console.log("error in getCatelogPageData ",error);
          toast.error("error in CATALOGPAGEDATA_API");
        //   result = error.response?.data;
    }
    toast.dismiss(toastId)
    return result;
}

export default gteCatelogPageData;


const Category = require("../models/Category");
const Course = require("../models/course");
const mongoose = require("mongoose");
function getRandomInt(max) {
    return Math.floor(Math.random() * max)
  }
exports.createCategory = async (req, res)=>{
    try{

        const {name , description} = req.body;
        if(!name || !description){
            return res.status(400).json({
                success : false,
                message : "All field are required"
            })
        }

        const categoryDetails = await Category.create({
            name : name,
            description : description
        });
        console.log(categoryDetails);

        return res.status(200).json({
            success : true,
            message : "Category created successfully"
        })
        

    }catch(error){
        return res.status(500).json({
            success : false,
            message : error.message
        })
    }
}

exports.showAllCategories  = async (req , res)=>{
    try{
        const allCategories = await Category.find(
            {} , 
            {name : true , description : true}
        );

        return res.status(200).json({
            success : true,
            message : "all categories returned successfully",
             data: allCategories,
        });

    }catch(error){
        
        return res.status(500).json({
            success : false,
            message : error.message
        });

    }
}


exports.categoryPageDetails = async (req , res)=>{
    try{
        const {categoryId} = req.body;
// console.log("categoryId:", categoryId);
// console.log("length:", categoryId?.length);
// console.log("isValid:", mongoose.Types.ObjectId.isValid(categoryId));
       const updatedCategoryId = new mongoose.Types.ObjectId(categoryId);
        console.log("level 1")
        if(!updatedCategoryId){
            return res.json({
                success : false,
                message : "categoryId not received"
            })
        }
         console.log("level 2")
        const selectedCategory = await Category.findById(updatedCategoryId)
                                       .populate({
                                                        path: "course",
                                                        match: { status: "Published" },
                                                        populate: {
                                                        path: "instructor",
                                                        }})

        if(!selectedCategory){
            return res.status(404).json({
                success : false,
                message : "data not found"
            });
        };
         console.log("level 3")
        const categoriesExceptSelected = await Category.find({
                                    _id : {$ne : updatedCategoryId},
                                     }).populate({
                                                        path: "course",
                                                        match: { status: "Published" },
                                                        populate: {
                                                        path: "instructor",
                                                        }});


            const randomCategory =
            categoriesExceptSelected[
                getRandomInt(categoriesExceptSelected.length)
            ];
             console.log("level 4")
        let differentCategories = await Category.findOne(
                                            { _id: randomCategory._id}
                                        ).populate({
                                                    path: "course",
                                                    match: { status: "Published" },
                                                    populate: {
                                                    path: "instructor",
                                                    }})
    

        const allCategories = await  Category.find().populate({
                                                                path: "course",
                                                                match: { status: "Published" },
                                                                populate: {
                                                                path: "instructor",
                                                                }})
 console.log("level 5")
        const allCourse = allCategories.flatMap((category)=>category.course);  
        const mostSellingCourse = allCourse
        .sort((a, b) => b.sold - a.sold)
        .slice(0, 10);
        // TODO :-> HW top selling course
 console.log("level 6")
        return res.status(200).json({
            success : true,
            message : "all category data is fetched",
            data : {
                selectedCategory,
                differentCategories,
                mostSellingCourse
            }
        });

        
    }catch(error){
        console.log(error);
        return res.status(500).json({
            success :false,
            message : error.message
        })
    }
}
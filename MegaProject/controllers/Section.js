const Course = require("../models/course");
const Section = require("../models/section");
const subSection = require("../models/subSection");

exports.createSection = async (req , res)=>{
    try{
        const { sectionName , courseId} = req.body;

        if(!sectionName || !courseId){
            return res.status(400).json({
                success : false,
                message : "missing properties"
            })
        }

        const newSection = await Section.create({
            sectionName,
        });

        const updatedCourseDetails = await Course.findByIdAndUpdate(
                                                                courseId ,
                                                                {
                                                                    $push : {
                                                                        courseContent : newSection._id,
                                                                    }
                                                                },
                                                                {new : true}
                                                            ).populate({
                                                                path : "courseContent",
                                                                populate : {
                                                                    path : "subSection",
                                                                    model : "subSection"
                                                                }
                                                            })



        // HW   :-> use populate to replace secrtion and  sub-section both in the updatedCourseDetails


        return res.status(200).json({
            success : true,
            message : "section created successfully",
            updatedCourseDetails
        })

    }catch(error){
        return res.status(500).json({
            success : false,
            message : "unable to create section pls try again",
            error : error.message,
        })
    }
}


exports.updateSection = async (req ,res)=>{
    try{
        const{sectionName , sectionId , courseId} = req.body;
        if(!sectionName || !sectionId){
            return res.status(400).json({
                success : true,
                message : "missing properties"
            })
        }

        const section = await Section.findByIdAndUpdate(sectionId , {sectionName} , {new : true});

        const course = await Course.findById(courseId).populate({
            path : "courseContent",
            populate :{
                path : "subSection",
            }
        }).exec();

        return res.status(200).json({
            success : true,
            message : "section updated successfully",
            data : course
        })

    }catch(error){
        return res.status(500).json({
            success : false,
            message : " unble to update section please try again",
            error : error.message
        })

    }
}

exports.deleteSection = async (req , res)=>{
    try{ 
        const {sectionId , courseId} = req.body;
        await Course.findByIdAndUpdate(courseId, {
			$pull: {
				courseContent: sectionId,
			}
		})

        const section = await Section.findById(sectionId);
        if(!section) {
                    return res.status(404).json({
                        success:false,
                        message:"Section not Found",
                    })
                }

          await subSection.deleteMany({_id : {$in : section.subSection}})
          await Section.findByIdAndDelete(sectionId);
        // TODO :-> do we need to delete the entry from the course schema??
          
        const course = await Course.findById(courseId).populate({
                path:"courseContent",
                populate: {
                    path: "subSection",
                      model : "subSection"
                }
            })
            .exec();
        
        return res.status(200).json({
            success : true,
            message : "section deleted successfully",
            data : course
        })


    }catch(error){

        return res.status(500).json({
            success : false,
            message : "unable to delete section ,please try again",
            error : error.message,
        })

    }
}

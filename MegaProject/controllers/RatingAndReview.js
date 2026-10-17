const RatingAndReview = require("../models/RatingAndReview");
const Course = require("../models/course");

exports.creatRating = async (req , res)=>{
    try{
        const userId = req.user.id;

        const {rating , review , courseId} = req.body;
        const courseDetails = await Course.findOne(
            {
                _id : courseId,
                studentEnrolled : {$elemMatch : {$eq : userId}} 
            });

        if(!courseDetails){
            return res.status(404).json({
                success : false,
                message : "Student is not enrolled in the course",
                courseDetails : courseDetails,
                userId : userId
            });
        };

        const alreadyReviewed = await RatingAndReview.findOne({
            user : userId,
            course : courseId,
        });
        if(alreadyReviewed){
            return res.status(403).json({
                success : false,
                message : "course already reviewed by user",
            })
        };
        const ratingReviews = await RatingAndReview.create({
            user : userId,
            rating ,
            review,
            course : courseId,
        })
      const updatedCourseDetails =   await Course.findByIdAndUpdate({_id : courseId} , 
            {
                $push : {
                    ratingAndreviews : ratingReviews._id,
                }
            },
            {
                new : true, 
            }
        )

        return res.status(200).json({
            success : true,
            message : "rating and review created successfully",
            ratingReviews
        })


    }catch(error){
        return res.status(500).json({
            success : false ,
        })

    }
}

exports.getAverageRating = async (req , res)=>{
    try{
        const courseId = req.body.courseId;
        const result = await RatingAndReview.aggregate(
          [  {
                $match : {
                    course : new mongoose.Types.objectId(courseId),
                }
            },{
                $group : {
                    _id : null,
                    averageRating : {$avg : "$rating"},
                }
            }
        ]);
        
        if(result.length > 0){
            return res.status(200).json({
                success : true ,
                averageRating : rating[0].averageRating,
            })
        }

        return res.status(200).json({
            success : false,
            message : "average rating is 0 , no rating given till now",
            averageRating : 0
        });
    }catch(error){
        return res.status(500).json({
            success : false,
        });
    }
}



exports.getAllRating = async (req , res) =>{
    try{
        const allReviews = await RatingAndReview.find({})
                                .sort({rating : "desc"})
                                .populate(
                                    {
                                      path : "user" ,
                                      select : "firstName lastName email image", 
                                    }
                                )
                                .populate({
                                    path : "course",
                                    select : "courseName",
                                })
                                .exec();

     return res.status(200).json({
        success : true,
        message : "all review fetched successfully",
        data : allReviews
     }
     )
     
    }catch(error){
        return res.status(500).json({
            success : false,
        })
    }
}
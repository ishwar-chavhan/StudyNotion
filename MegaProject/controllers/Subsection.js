const subSection = require("../models/subSection");
const Section = require("../models/section");
const { uploadImageToCloudinary } = require("../utils/imageUploader");

exports.createSubSection = async (req, res) => {
    try {
        console.log("reached level1")
        const { sectionId, title, courseId, description } = req.body;
        const video = req.files.video;
        const id = req.user.id;
        console.log("reached level2")

        if (!sectionId || !title || !description) {
            return res.status(400).json({
                success: false,
                message: "all field are required"
            })
        }
        console.log("reached level3")

        const uploadDetails = await uploadImageToCloudinary(video, process.env.FOLDER_NAME);
        console.log("reached level4", uploadDetails)

        const subSectionDetails = await subSection.create({
            title: title,
            timeDuration: `${uploadDetails.duration || 0}`,
            description: description,
            videoUrl: uploadDetails.secure_url,
        })
        console.log("reached level5")

        const updateSection = await Section.findByIdAndUpdate(
            { _id: sectionId },
            {
                $push: {
                    subSection: subSectionDetails._id,
                }
            },
            {
                new: true
            }
        ).populate("subSection").exec();




        console.log("reached level6")

        return res.status(200).json({
            success: true,
            message: "sub section created successfully",
            data: updateSection,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "section can not be created at this moment pls try later",
            error: error.message,
        })
    }
}


exports.updateSubSection = async (req, res) => {
    try {
        console.log("level1")
        const { subSectionId, title, sectionId, description } = req.body;
        const video = req.files.video;
        console.log("level2")
        const uploadDetails = await uploadImageToCloudinary(video, process.env.FOLDER_NAME);
        console.log("level3")
        const updatedSubSection = await subSection.findByIdAndUpdate(subSectionId,
            {

                title: title,
                description: description,
                timeDuration: uploadDetails.duration,
                videoUrl: uploadDetails.secure_url,

            }
        )
        console.log("level4")
        const updatedSection = await Section.findById(sectionId).populate("subSection").exec();
        console.log("level5")
        return res.status(200).json({
            success: true,
            message: "subsection updated successfully",
            data: updatedSection
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "subSection can not be updated please try again later",
            error: error.message
        })
    }
}


exports.deleteSubSection = async (req, res) => {
    try {
        const { subSectionId, sectionId } = req.body;
        console.log("subsection ids", subSectionId);
        console.log("section ids", sectionId);

        await subSection.findByIdAndDelete(subSectionId);
        console.log("level1")
        const SubSection = await Section.findOneAndUpdate({ _id: sectionId },
            {
                $pull: { subSection: subSectionId }
            });

        console.log("level4")
        const updatedSection = await Section.findById(sectionId).populate("subSection").exec();

        console.log("level3")
        if (!SubSection) {
            return res
                .status(404)
                .json({ success: false, message: "SubSection not found" })
        }

        console.log("level4")
        return res.status(200).json({
            success: true,
            message: "subsection has been delete successfully",
            data: updatedSection
        }
        )
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "sub section connot deleted please try again later"
        })
    }
}
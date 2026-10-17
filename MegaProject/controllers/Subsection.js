const subSection = require("../models/subSection");
const Section = require("../models/section");
const { uploadImageToCloudinary } = require("../utils/imageUploader");

exports.createSubSection = async (req, res) => {
    try {
        const { sectionId, title, courseId, description } = req.body;
        const video = req.files.video;
        const id = req.user.id;

        if (!sectionId || !title || !description) {
            return res.status(400).json({
                success: false,
                message: "all field are required"
            })
        }

        const uploadDetails = await uploadImageToCloudinary(video, process.env.FOLDER_NAME);

        const subSectionDetails = await subSection.create({
            title: title,
            timeDuration: `${uploadDetails.duration || 0}`,
            description: description,
            videoUrl: uploadDetails.secure_url,
        })

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





        return res.status(200).json({
            success: true,
            message: "sub section created successfully",
            data: updateSection,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "section can not be created at this moment pls try later",
        })
    }
}


exports.updateSubSection = async (req, res) => {
    try {
        const { subSectionId, title, sectionId, description } = req.body;
        const video = req.files.video;
        const uploadDetails = await uploadImageToCloudinary(video, process.env.FOLDER_NAME);
        const updatedSubSection = await subSection.findByIdAndUpdate(subSectionId,
            {

                title: title,
                description: description,
                timeDuration: uploadDetails.duration,
                videoUrl: uploadDetails.secure_url,

            }
        )
        const updatedSection = await Section.findById(sectionId).populate("subSection").exec();
        return res.status(200).json({
            success: true,
            message: "subsection updated successfully",
            data: updatedSection
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "subSection can not be updated please try again later",
        })
    }
}


exports.deleteSubSection = async (req, res) => {
    try {
        const { subSectionId, sectionId } = req.body;

        await subSection.findByIdAndDelete(subSectionId);
        const SubSection = await Section.findOneAndUpdate({ _id: sectionId },
            {
                $pull: { subSection: subSectionId }
            });

        const updatedSection = await Section.findById(sectionId).populate("subSection").exec();

        if (!SubSection) {
            return res
                .status(404)
                .json({ success: false, message: "SubSection not found" })
        }

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
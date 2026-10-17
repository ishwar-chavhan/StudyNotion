const subSection = require("../models/subSection");
const courseProgress = require("../models/courseProgress");
exports.updateCourseProgress = async (req, res) => {
    try {
        const { courseId, subSectionId } = req.body;
        const userId = req.user.id;

        const subsection = await subSection.findById(subSectionId);
        if (!subsection) {
            return res.status(404).json({
                success: false,
                error: "invalid subsection"
            })
        }

        let curseprogress = await courseProgress.findOne({
            courseId: courseId,
            userId: userId,
        });
        if (!curseprogress) {
            return res.status(404).json({
                success: false,
                error: "course progress doen not exist"
            })
        } else {
            // check for recompleting video or sectionId
            if (curseprogress.completedVideo.includes(subSectionId)) {
                return res.status(404).json({
                    success: false,
                    error: "subsection is already completed"
                })
            }

            curseprogress.completedVideo.push(subSectionId);
        }
        await curseprogress.save();
        return res.json({
            success: true,
            message: "video completed success fully"
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
        })

    }
}
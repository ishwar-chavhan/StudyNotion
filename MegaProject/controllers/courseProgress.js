const subSection = require("../models/subSection");
const courseProgress = require("../models/courseProgress");
exports.updateCourseProgress = async (req, res) => {
    try {
        console.log("curseprogress level 1")
        const { courseId, subSectionId } = req.body;
        const userId = req.user.id;

        const subsection = await subSection.findById(subSectionId);
        if (!subsection) {
            return res.status(404).json({
                success: false,
                error: "invalid subsection"
            })
        }
        console.log("curseprogress level 2")

        let curseprogress = await courseProgress.findOne({
            courseId: courseId,
            userId: userId,
        });
        console.log("curseprogress level 3")
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
        console.log("curseprogress level 4")
        await curseprogress.save();
        console.log("curseprogress level 5")
        return res.json({
            success: true,
            message: "video completed success fully"
        })

    } catch (error) {
        console.log("error of updateCourseProgress", error);
        return res.status(500).json({
            success: false,
            error: error.message,
        })

    }
}
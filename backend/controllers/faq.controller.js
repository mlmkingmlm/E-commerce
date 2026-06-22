import cloudinary from "../config/cloudinary.js";
import faqModule from "../models/faq.module.js";

export const createFaq = async (req, res) => {
    try {
        const { question, answer, active } = req.body;

        const faq = await faqModule.create(
            {
                question,
                answer,
                active
            }
        );

        res.status(201).json({
            success: true,
            message: "Faq Added Successfully",
            faq
        })
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

export const getFaq = async (req, res) => {
    try {
        const data = await faqModule.find();

        res.status(200).json({
            success: true,
            resultObj: data
        })
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}



export const updateFaq = async (req, res) => {
    try {
        const { id } = req.params;

        // ✅ Step 1: get old data
        const oldData = await faqModule.findById(id);

        let updateData = {
            question: req.body.question,
            answer: req.body.answer,
            active: req.body.active,
        };

        // ✅ Step 5: update DB
        const data = await faqModule.findByIdAndUpdate(
            id,
            updateData,
            { new: true }
        );

        res.status(200).json({
            success: true,
            message: "Faq Updated Successfully",
            data
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const deleteFaq = async (req, res) => {
    try {
        const { id } = req.params;

        const data = await faqModule.findById(id);

        if (!data) {
            return res.status(404).json({
                success: false,
                message: "Faq Not Found"
            });
        }

        // ✅ DB delete first (fast)
        await faqModule.findByIdAndDelete(id);

        // ✅ response immediately
        res.status(200).json({
            success: true,
            message: "Brand Deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
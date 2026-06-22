import mainCategoryModel from "../models/mainCategory.model.js";

export const createMainCategory = async (req, res) => {
    try {
        const { name, active } = req.body;

        const Category = await mainCategoryModel.create(
            {
                name,
                active,
                pic: req.file.path
            }
        );

        res.status(201).json({
            success: true,
            message: "Main-Category Created Successfully",
            Category
        })
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

export const getMainCategory = async (req, res) => {
    try {
        const data = await mainCategoryModel.find();

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

import cloudinary from "../config/cloudinary.js";

export const updateMainCategory = async (req, res) => {
    try {
        const { id } = req.params;

        // ✅ Step 1: get old data
        const oldData = await mainCategoryModel.findById(id);

        let updateData = {
            name: req.body.name,
            active: req.body.active
        };

        // ✅ Step 2: if new image uploaded
        if (req.file) {

            // 🔥 Step 3: delete old image
            if (oldData.pic) {
                const publicId = oldData.pic
                    .split("/")
                    .slice(-2) // ecommerce/abc123.jpg
                    .join("/")
                    .split(".")[0]; // ecommerce/abc123

                await cloudinary.uploader.destroy(publicId);
            }

            // ✅ Step 4: save new image
            updateData.pic = req.file.path;
        }

        // ✅ Step 5: update DB
        const data = await mainCategoryModel.findByIdAndUpdate(
            id,
            updateData,
            { new: true }
        );

        res.status(200).json({
            success: true,
            message: "Updated Successfully",
            data
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const deleteMainCategory = async (req, res) => {
    try {
        const { id } = req.params;

        const data = await mainCategoryModel.findById(id);

        if (!data) {
            return res.status(404).json({
                success: false,
                message: "Not Found"
            });
        }

        // ✅ DB delete first (fast)
        await mainCategoryModel.findByIdAndDelete(id);

        // ✅ response immediately
        res.status(200).json({
            success: true,
            message: "Deleted successfully"
        });

        // 🔥 Cloudinary delete in background (no await)
        if (data.pic) {
            const publicId = data.pic.split("/").slice(-2).join("/").split(".")[0];
            cloudinary.uploader.destroy(publicId); // ❌ no await
        }

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
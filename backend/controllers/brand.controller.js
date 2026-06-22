import cloudinary from "../config/cloudinary.js";
import brandModule from "../models/brand.module.js";

export const createBrand = async (req, res) => {
    try {
        const { name, active } = req.body;

        const brand = await brandModule.create(
            {
                name,
                active,
                pic: req.file.path,
            }
        );

        res.status(201).json({
            success: true,
            message: "Brand Added Successfully",
            brand
        })
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

export const getBrand = async (req, res) => {
    try {
        const data = await brandModule.find();

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



export const updateBrand = async (req, res) => {
    try {
        const { id } = req.params;

        // ✅ Step 1: get old data
        const oldData = await brandModule.findById(id);

        let updateData = {
            name: req.body.name,
            active: req.body.active,
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
        const data = await brandModule.findByIdAndUpdate(
            id,
            updateData,
            { new: true }
        );

        res.status(200).json({
            success: true,
            message: "Brand Updated Successfully",
            data
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const deleteBrand = async (req, res) => {
    try {
        const { id } = req.params;

        const data = await brandModule.findById(id);

        if (!data) {
            return res.status(404).json({
                success: false,
                message: "Brand Not Found"
            });
        }

        // ✅ DB delete first (fast)
        await brandModule.findByIdAndDelete(id);

        // ✅ response immediately
        res.status(200).json({
            success: true,
            message: "Brand Deleted successfully"
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
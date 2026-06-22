import productModel from "../models/product.model.js";
import Product from "../models/product.model.js";
import cloudinary from "../config/cloudinary.js";

export const createProduct = async (req, res) => {
    try {
        const images = req.files.map(file => file.path) // 🔥 important

        const product = await Product.create({
            ...req.body,
            color: req.body.color,
            size: req.body.size,
            pic: images
        })

        res.status(201).json({
            success: true,
            message: "Product Created Successfully",
            product
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export const getProducts = async (req, res) => {
    const data = await productModel.find();

    res.status(200).json({
        success: true,
        resultObj: data
    })
}

export const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;

        // ✅ check product exists
        const oldProduct = await productModel.findById(id);
        if (!oldProduct) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        // ✅ whitelist fields
        const allowedFields = [
            "name",
            "basePrice",
            "discount",
            "finalPrice",
            "stockQuantity",
            "description",
            "color",
            "size",
            "brand",
            "subcategory",
            "maincategory",
            "active"
        ];

        let updateData = {};

        // ✅ filter only allowed fields
        allowedFields.forEach((key) => {
            if (req.body[key] !== undefined) {
                updateData[key] = req.body[key];
            }
        });

        // ✅ image update
        if (req.file) {

            // delete old image
            if (oldProduct.pic) {
                const publicId = oldProduct.pic
                    .split("/")
                    .slice(-2)
                    .join("/")
                    .split(".")[0];

                await cloudinary.uploader.destroy(publicId);
            }

            updateData.pic = req.file.path;
        }

        // ✅ update product
        const updatedProduct = await productModel.findByIdAndUpdate(
            id,
            updateData,
            {
                new: true,
                runValidators: true
            }
        );

        res.status(200).json({
            success: true,
            message: "Product updated successfully",
            data: updatedProduct
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;

        const data = await productModel.findById(id);

        if (!data) {
            return res.status(404).json({
                success: false,
                message: "Not Found"
            });
        }

        // ✅ DB delete first (fast)
        await productModel.findByIdAndDelete(id);

        // ✅ response immediately
        res.status(200).json({
            success: true,
            message: "Deleted successfully"
        });

        // 🔥 Cloudinary delete in background (no await)
        if (data.pic) {
            const images = Array.isArray(data.pic) ? data.pic : [data.pic];

            images.forEach(img => {
                const publicId = img.split("/").slice(-2).join("/").split(".")[0];
                cloudinary.uploader.destroy(publicId);
            });
        }

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


import Cart from "../models/cart.module.js";

export const addToCart = async (req, res) => {
    try {

        const {
            productId,
            quantity,
            size,
            color,
        } = req.body

        const existingItem = await Cart.findOne({
            user: req.user._id,
            product: productId,
            size,
            color,
        })

        if (existingItem) {

            existingItem.quantity += quantity || 1

            await existingItem.save()

            return res.status(200).json({
                success: true,
                message: "Cart quantity updated",
            })
        }

        const item = await Cart.create({
            user: req.user._id,
            product: productId,
            quantity: quantity || 1,
            size,
            color,
        })

        res.status(201).json({
            success: true,
            message: "Added to cart",
            item,
        })

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

export const getCart = async (req, res) => {
    try {

        const data = await Cart.find({
            user: req.user._id,
        }).populate("product")

        res.status(200).json({
            success: true,
            resultObj: data,
        })

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

export const updateCart = async (req, res) => {
    try {
        console.log(req.body);

        const { id } = req.params;
        const { quantity } = req.body;

        const item = await Cart.findByIdAndUpdate(
            id,
            { quantity },
            { new: true }
        );

        res.status(200).json({
            success: true,
            resultObj: item
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

export const deleteCart = async (req, res) => {
    let { id } = req.params;

    let data = await Cart.findByIdAndDelete(id);

    if (data) {
        res.status(200).json({
            success: true,
            message: "Cart Item Deleted successfully",
            data
        });
    }

    res.status(404).json({
        success:false,
        message:"Cart item not found"
    })
}
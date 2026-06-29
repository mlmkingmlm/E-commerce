import CheckoutModel from "../Models/checkout.module.js";

export const createOrder = async (req, res) => {
    try {
        const {
            user,
            address,
            products,
            subtotal,
            shipping,
            total,
            paymentMode
        } = req.body;

        const order = await CheckoutModel.create({
            user,
            address,
            products,
            subtotal,
            shipping,
            total,
            paymentMode,
            paymentStatus: "Pending",
            orderStatus: "Order Placed"
        });

        res.status(201).json({
            success: true,
            message: "Order Placed Successfully",
            resultObj: order
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const getUserOrders = async (req, res) => {
    try {
        const orders = await CheckoutModel
            .find({ user: req.user._id })
            .populate("address")
            .populate("products.product")
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            resultObj: orders
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const cancelOrder = async (req, res) => {
    try {
        const { id } = req.params;

        const order = await CheckoutModel.findByIdAndUpdate(
            id,
            { orderStatus: "Cancelled" },
            { new: true }
        );

        res.status(200).json({
            success: true,
            message: "Order Cancelled Successfully",
            resultObj: order
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
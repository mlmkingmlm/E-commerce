import mongoose from "mongoose";

const checkoutSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        address: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Address",
            required: true
        },

        products: [
            {
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Product",
                    required: true
                },

                name: {
                    type: String,
                    required: true
                },

                price: {
                    type: Number,
                    required: true
                },

                qty: {
                    type: Number,
                    required: true
                },

                total: {
                    type: Number,
                    required: true
                }
            }
        ],

        subtotal: {
            type: Number,
            required: true
        },

        shipping: {
            type: Number,
            default: 0
        },

        total: {
            type: Number,
            required: true
        },

        paymentMode: {
            type: String,
            enum: ["COD", "Net Banking", "UPI", "Card"],
            default: "COD"
        },

        paymentStatus: {
            type: String,
            enum: ["Pending", "Paid", "Failed", "Refunded"],
            default: "Pending"
        },

        orderStatus: {
            type: String,
            enum: [
                "Order Placed",
                "Confirmed",
                "Packed",
                "Shipped",
                "Out For Delivery",
                "Delivered",
                "Cancelled"
            ],
            default: "Order Placed"
        }
    },
    {
        timestamps: true
    }
);

export default mongoose.model("Checkout",checkoutSchema);
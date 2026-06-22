import mongoose from "mongoose";

const wishListSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true
        }
    },
    { timestamps: true }
);

// Same product duplicate add na ho
wishListSchema.index({ user: 1, product: 1 }, { unique: true })

const Wishlist = mongoose.model("Wishlist", wishListSchema)

export default Wishlist;
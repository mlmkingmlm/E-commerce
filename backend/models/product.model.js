// models/product.model.js

import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },

    maincategory: { type: String, required: true },
    subcategory: { type: String, required: true },

    brand: { type: String, required: true },

    color: [{ type: String }],
    size: [{ type: String }],

    basePrice: { type: Number, required: true },
    discount: { type: Number, default: 0 },
    finalPrice: { type: Number },

    stock: { type: Boolean, default: true },
    stockQuantity: { type: Number, default: 0 },

    description: { type: String },

    pic: [{ type: String }],

    active: { type: Boolean, default: true }
  },
  { timestamps: true }
);

const productModel = mongoose.model("Product", productSchema);

export default productModel;
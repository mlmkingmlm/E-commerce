import mongoose, { Schema } from "mongoose";

const subCategorySchema = new Schema({
    name: { type: String, required: true },
    pic: { type: String, required: true },
    active: {
        type: Boolean,
        required: true
    },
    mainCategory_id: { type: String, required: true }
});

const subCategoryModel = mongoose.model("Subcategory", subCategorySchema);

export default subCategoryModel;
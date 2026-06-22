import mongoose, { Schema } from "mongoose";

const featureSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    icon: {
        type: String,
        required: true,
        trim: true
        // e.g. "bi bi-truck"
    },
    active: {
        type: Boolean,
        required: true,
        default: true
    }
}, { timestamps: true });

const Feature = mongoose.model("Feature", featureSchema);

export default Feature;
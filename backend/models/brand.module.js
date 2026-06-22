import mongoose, { Schema } from "mongoose";

const brandSchema = new Schema({
    name: { type: String, required: true },
    pic: { type: String, required: true },
    active: {
        type: Boolean,
        required: true
    },
});

const brandModule = mongoose.model("Brand", brandSchema);

export default brandModule;
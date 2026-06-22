import mongoose, { Schema } from "mongoose";

const mainCategorySchema = new Schema({
    name: {type:String, required:true},
    pic:{type:String, required:true},
    active:{
        type:Boolean,
        required:true
    }
});

const mainCategoryModel = mongoose.model("MainCategory", mainCategorySchema);

export default mainCategoryModel;
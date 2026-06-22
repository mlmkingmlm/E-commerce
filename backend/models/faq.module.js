import mongoose, { Schema } from "mongoose";

const faqSchema = new Schema({
    question: { type: String, required: true },
    answer: { type: String, required: true },
    active: {
        type: Boolean,
        required: true
    },
});

const faqModule = mongoose.model("Faq", faqSchema);

export default faqModule;
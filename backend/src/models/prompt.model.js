import mongoose from "mongoose";

const PromptSchema = mongoose.Schema({
    chat: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    prompt: {
        type: Array,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    role: {
        type: String,
        default: "system"
    },
    LastActivity: {
        type: Date,
        default: Date.now()
    }
});

const PromptModel = mongoose.model("prompts", PromptSchema);

export default PromptModel;
import mongoose from "mongoose";

const Messageschema = mongoose.Schema({
    message: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    role: {
        type: String,
        enum: ["user", "model", "system"],
        required: true
    },
    lastactivity: {
        type: Date,
        default: Date.now()
    }
},
)

const Messagemodel = mongoose.model("messages", Messageschema);

export default Messagemodel;
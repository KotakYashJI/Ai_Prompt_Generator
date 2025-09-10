import mongoose from "mongoose";

const Chatschema = mongoose.Schema({
    chat: {
        type: String,
        required: true,
        default:"New Chat"
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }
});

const Chatmodel = mongoose.model("chats",Chatschema);

export default Chatmodel;
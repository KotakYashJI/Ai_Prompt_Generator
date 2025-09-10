import mongoose from "mongoose";

const Userschema = mongoose.Schema({
    fullname: {
        firstname: {
            type: String,
            required: true
        },
        lastname: {
            type: String,
            required: true
        }
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

const Usermodel = mongoose.model("Users", Userschema);

export default Usermodel;
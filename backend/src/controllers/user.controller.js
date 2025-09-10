import Usermodel from "../models/user.model.js";
import jwt from "jsonwebtoken"
import bcryptjs from "bcryptjs"

export const registeruser = async (req, res) => {
    const { firstname, lastname, email, password } = req.body;
    const isuserexist = await Usermodel.findOne({
        $or: [
            {
                fullname: {
                    firstname: firstname,
                    lastname: lastname
                }
            },
            {
                email: email
            }
        ]
    });
    if (isuserexist) {
        return res.status(500).json({
            message: "User already exist"
        });
    }
    const hashpassword = await bcryptjs.hash(password, 10);
    const newuser = await Usermodel.create({
        fullname: {
            firstname: firstname,
            lastname: lastname
        },
        email: email,
        password: hashpassword
    });
    const user = { id: newuser._id };
    const token = jwt.sign(user, process.env.JWT_TOKEN);
    res.cookie("token", token);
    res.status(201).json({
        message: "User register",
        newuser
    });
}

export const loginuser = async (req, res) => {
    const { email, password } = req.body;
    const isuserexist = await Usermodel.findOne({ email: email });
    if (!isuserexist) return res.status(404).json({
        message: "User not found"
    });
    const ispassword = await bcryptjs.compare(password, isuserexist.password);
    if (!ispassword) return res.status(400).json({
        message: "Invalid password"
    });
    const user = { id: isuserexist._id };
    const token = jwt.sign(user, process.env.JWT_TOKEN);
    res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "None",
        maxAge: 24 * 60 * 60 * 1000
    });
    res.status(200).json({
        message: "User login",
        isuserexist
    });
}

export const logedinuser = async (req, res) => {
    const token = req.cookies?.token;
    if (!token) return res.status(401).json({
        message: "Unauthorized please login"
    });
    try {
        const isuser = jwt.verify(token, process.env.JWT_TOKEN);
        if (!isuser) return res.status(401).json({
            message: "Unauthorized"
        });
        const user = await Usermodel.findById(isuser.id).select("-password");
        res.status(200).json({
            message: "User found",
            user
        });
    } catch (error) {
        return res.status(401).json({
            message: "Unauthorized"
        });
    }
}
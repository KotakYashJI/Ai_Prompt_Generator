import jwt from "jsonwebtoken"
import Usermodel from "../models/user.model.js";

export const authenticateuser = async (req, res, next) => {
    const token = req.cookies.token;
    if (!token) return res.status(404).json({
        message: "token not found please login"
    });
    const user = jwt.verify(token, process.env.JWT_TOKEN);
    const userexist = await Usermodel.findOne({ _id: user.id });
    if (!userexist) return res.status(404).json({
        message: "user not found please register"
    });
    req.user = userexist;
    next();
}
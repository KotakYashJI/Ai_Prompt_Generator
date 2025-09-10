import { Server } from "socket.io"
import { GeneratePrompt } from "../services/prompt.service.js";
import { GenerateAnswer } from "../services/answer.service.js";
import cookie from "cookie"
import jwt from "jsonwebtoken"
import Usermodel from "../models/user.model.js";
import Messagemodel from "../models/message.model.js";
import PromptModel from "../models/prompt.model.js";

export const SocketServer = (httpserver) => {
    const io = new Server(httpserver, {
        cors: {
            origin: "https://ai-prompt-generator-rosy-five.vercel.app",
            credentials: true
        }
    });

    io.use(async (socket, next) => {
        const rawcookies = socket.handshake.headers?.cookie || "";
        const cookies = cookie.parse(rawcookies);
        const token = cookies.token;
        if (!token) return next(new Error("token not found please login first"));
        try {
            const user = jwt.verify(token, process.env.JWT_TOKEN);
            const userexist = await Usermodel.findOne({
                _id: user.id
            });
            if (!userexist) return next(new Error("user not found"));
            socket.user = userexist;
            next();
        } catch (error) {
            return next(new Error(error.message));
        }
    });

    io.on("connection", (socket) => {
        console.log("A user is Connected", socket.id);
        socket.on("ai-message", async (data) => {
            const prompt = await GeneratePrompt(data);
            socket.emit("ai-prompt", prompt);
            const answer = await GenerateAnswer(prompt);
            socket.emit("prompt-answer", answer);
        })
        socket.on("disconnect", () => {
            console.log("A user is DisConnected", socket.id);
        })
    });
}
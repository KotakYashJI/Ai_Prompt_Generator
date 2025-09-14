import { Server } from "socket.io"
import { GeneratePrompt } from "../services/prompt.service.js";
import { GenerateAnswer } from "../services/answer.service.js";
import cookie from "cookie"
import jwt from "jsonwebtoken"
import Usermodel from "../models/user.model.js";
import Messagemodel from "../models/message.model.js";
import PromptModel from "../models/prompt.model.js";
import { sendanswer, sendquestion } from "../controllers/message.controller.js";

export const SocketServer = (httpserver) => {
    const io = new Server(httpserver, {
        cors: {
            origin: process.env.Socket_Origin,
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
            const question = data;
            const user = socket.user._id;
            const newquestion = await sendquestion({ question, user });
            let memory = await Messagemodel.find({
                $and: [
                    {
                        user: user
                    },
                    {
                        role: "user"
                    }
                ]
            }).sort({ createdAt: -1 }).limit(20).lean();
            memory = memory.reverse();
            memory = [...memory, newquestion];
            const stm = memory.map((item) => {
                return {
                    role: item.role,
                    parts: [{ text: item.message }]
                }
            });
            const prompt = await GeneratePrompt(stm);
            const newprompt = await PromptModel.create({
                prompt: prompt,
                user: user,
                role: "model"
            });
            let allprompts = await PromptModel.find({ user: user }).sort({ createdAt: -1 }).limit(20).lean();
            allprompts = allprompts.reverse();
            allprompts = [...allprompts,newprompt];
            const pstm = allprompts.map((item) => {
                return {
                    role: item.role,
                    parts: [{ text: Array.isArray(item.prompt) ? item.prompt.join(" ") : item.prompt }]
                }
            });
            socket.emit("ai-prompt", prompt);
            const answer = await GenerateAnswer(pstm);
            const newanswer = await sendanswer({ answer, user });
            socket.emit("prompt-answer", answer);
        })
        socket.on("disconnect", () => {
            console.log("A user is DisConnected", socket.id);
        })
    });
}
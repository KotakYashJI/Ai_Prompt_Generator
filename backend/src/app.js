import express from "express"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import Userroute from "./routes/user.route.js"
import Chatroute from "./routes/chat.route.js"
import Messageroute from "./routes/message.route.js"
import cors from "cors"

dotenv.config();
const app = express();

app.use(cors({
    origin: process.env.Socket_Origin,
    credentials: true,
}));

app.use(express.json());

app.use(cookieParser());

app.use("/user", Userroute);

app.use("/api/chat", Chatroute);

app.use("/api/message", Messageroute);

export default app;
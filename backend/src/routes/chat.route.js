import express from "express"
import { createchat, deletechat, getallchats, getsinglechat } from "../controllers/chat.controller.js";
import { authenticateuser } from "../middleware/auth.middleware.js";

const route = express.Router();

route.post("/",authenticateuser,createchat);

route.get("/",authenticateuser,getallchats);

route.get("/id",getsinglechat);

route.post("/:id",deletechat);

export default route;
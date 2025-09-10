import express from "express"
import { getallanswers, getallquestions } from "../controllers/message.controller.js";

const router = express.Router();

router.get("/questions/:chatid",getallquestions);

router.get("/answers/:chatid",getallanswers);

export default router;
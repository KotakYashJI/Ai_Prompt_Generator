import express from "express"
import { logedinuser, loginuser, registeruser } from "../controllers/user.controller.js";

const router = express.Router();

router.post("/register",registeruser);

router.post("/login",loginuser);

router.get("/logedinuser",logedinuser);

export default router;
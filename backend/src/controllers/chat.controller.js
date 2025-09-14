import Chatmodel from "../models/chat.model.js";
import { chatwords } from "../services/chatwords.service.js";

export const createchat = async (req, res) => {
    const user = req.user;
    try {
        const newchat = await Chatmodel.create({
            user: user._id
        });
        req.chat = newchat;
        res.status(201).json({
            message: "Chat created successfully",
            newchat
        });
    } catch (error) {
        res.status(500).json({
            message: error
        });
    }
}

export const getallchats = async (req, res) => {
    const userid = req.user._id;
    try {
        const allchats = await Chatmodel.find({ user: userid });
        console.log(allchats);
        res.status(200).json({
            message: "All Chat's",
            allchats
        });
    } catch (error) {
        res.status(500).json({
            message: error
        });
    }
}

export const getsinglechat = async (req, res) => {
    const chatid = req.params.id;
    try {
        const singlechat = await Chatmodel.findOne({ _id: chatid });
        res.status(200).json({
            message: "Single Chat found",
            singlechat
        });
    } catch (error) {
        res.status(500).json({
            message: error
        });
    }
}

export const deletechat = async (req, res) => {
    const chatid = req.params.id;
    try {
        const deletedchat = await Chatmodel.deleteOne({
            _id: chatid
        });
        res.status(200).json({
            message: "chat deleted",
            deletedchat
        });
    } catch (error) {
        res.status(500).json({
            message: error
        })
    }
}

export const updatechats = async (req, res) => {
    console.log(req);
}
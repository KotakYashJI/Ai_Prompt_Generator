import messageModel from "../models/message.model.js"

export const sendquestion = async ({ question, user }) => {
    try {
        const newquestion = await messageModel.create({
            message: question,
            user: user,
            role: "user"
        });
        return newquestion;
    } catch (error) {
        return error
    }
}

export const sendanswer = async ({ answer, user }) => {
    try {
        const newanswer = await messageModel.create({
            message: answer,
            user: user,
            role: "model"
        });
        return newanswer
    } catch (error) {
        return error;
    }
}

export const getallquestions = async (req, res) => {
    const chatid = req.params.chatid;
    try {
        const questions = await messageModel.find({
            chat: "68b959e5939baa70ccb565dd",
            role: "user"
        });
        res.status(200).json({
            message: "Question's",
            questions
        });
    } catch (error) {
        res.status(500).json({
            message: error
        });
    }
}

export const getallanswers = async (req, res) => {
    const chatid = req.params.chatid;
    try {
        const answers = await messageModel.find({
            chat: "68b959e5939baa70ccb565dd",
            role: "model"
        });
        res.status(200).json({
            message: "Answer's",
            answers
        });
    } catch (error) {
        res.status(500).json({
            message: error
        });
    }
}
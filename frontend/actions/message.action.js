import { loadanswers, loadquestions, updateloading } from "@/slices/message.slice";
import { io } from "socket.io-client";
import API from "../API/index.js"

let questions = [];
let answers = [];
let socket;
let initailized = false;

async function initsocket() {
    if (initailized) return socket;

    socket = io("https://ai-prompt-answer-generator.onrender.com", {
        withCredentials: true
    });

    initailized = true;
    return socket;
}

export const sendmessage = (message) => async (dispatch) => {
    const sock = await initsocket();
    questions = [...questions, message];
    sock.emit("ai-message", message);
    dispatch(loadquestions(questions));
};

export const LoadAnswers = () => async (dispatch) => {
    const sock = await initsocket();
    sock.off("prompt-answer");
    sock.on("prompt-answer", (answer) => {
        answers = [...answers, answer];
        dispatch(loadanswers(answers));
        dispatch(updateloading(false));
    });
}

export const UpdateLoading = (loading) => (dispatch) => {
    dispatch(updateloading(loading));
}

export const singlechatmessages = (chatid) => async (dispatch) => {
    const [questions, answers] = await Promise.all([
        API.get(`/api/message/questions/${chatid}`),
        API.get(`/api/message/answers/${chatid}`)
    ]);
    dispatch(loadquestions(questions.data.questions));
    dispatch(loadanswers(answers.data.answers));
}
import { loadanswers, loadquestions, updateloading } from "@/slices/message.slice";
import { io } from "socket.io-client";
import API from "../API/index.js"
import { creatchat, updatechat } from "./chat.action.js";

let questions = [];
let answers = [];
let socket;
let initailized = false;
let count = 0;

async function initsocket() {
    if (initailized) return socket;

    socket = io("http://localhost:5000", {
        withCredentials: true
    });

    initailized = true;
    return socket;
}

export const sendmessage = (message) => async (dispatch) => {
    const sock = await initsocket();
    // if (count < 1) {
    //     dispatch(creatchat());
    //     count++;
    // }
    questions = [...questions, message];
    // try {
    //     dispatch(updatechat(questions));
    // } catch (error) {
    //     console.log(error);
    // }
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
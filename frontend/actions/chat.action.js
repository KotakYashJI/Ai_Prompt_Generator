import { toast } from "react-toastify";
import API from "../API/index.js";
import { loadchats, loadsinglechat } from "@/slices/chat.slice.js";

function generaterandomId(length) {
    const array = new Uint8Array(length);
    crypto.getRandomValues(array);
    return Array.from(array, b => b.toString(36).padStart(2, '0')).join('').substr(0, length);
}

export const creatchat = () => async (dispatch) => {
    try {
        const newchat = await API.post("/api/chat");
        //console.log(newchat.data.newchat);
        const Allchats = await API.get("/api/chat");
        dispatch(loadchats(Allchats.data.allchats));
        // toast.success("chat created", {
        //     autoClose: true,
        //     closeButton: false,
        //     closeOnClick: false,
        //     draggable: false,
        //     pauseOnHover: false
        // });
    } catch (error) {
        // toast.error(error.response.data.message, {
        //     autoClose: true,
        //     closeButton: false,
        //     closeOnClick: false,
        //     draggable: false,
        //     pauseOnHover: false
        // });
        location.href = "http://localhost:3000/user/login";
    }
};

export const loadallchats = () => async (dispatch) => {
    try {
        const Allchats = await API.get("/api/chat");
        dispatch(loadchats(Allchats.data.allchats));
    } catch (error) {
        console.log(error);
    }
}

export const getsinglechat = (chatid) => async (dispatch) => {
    try {
        const singlechat = await API.get(`/api/chat/${chatid}`);
        dispatch(loadsinglechat(singlechat.data.singlechat));
    } catch (error) {
        console.log(error);
    }
}

export const deletechat = (chatid) => async (dispatch) => {
    try {
        await API.post(`/api/chat/${chatid}`);
        const Allchats = await API.get("/api/chat");
        dispatch(loadchats(Allchats.data.allchats));
        // toast.error("chat deleted", {
        //     autoClose: true,
        //     closeButton: false,
        //     closeOnClick: false,
        //     draggable: false,
        //     pauseOnHover: false
        // })
    } catch (error) {
        console.log(error);
    }
}

export const updatechat = (text) => async (dispatch) => {
    try {
        const updatedchat = await API.patch("/api/chat/update", text);
        console.log(updatedchat);
    } catch (error) {
        console.log(error);
    }
}
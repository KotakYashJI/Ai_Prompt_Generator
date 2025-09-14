import { toast } from "react-toastify";
import API from "../API/index.js";
import { loadusers } from "@/slices/user.slice.js";
import Address from "@/srcApi.js";

export const registeruser = (user) => async (dispatch) => {
    try {
        const newuser = await API.post("/user/register", user);
        dispatch(loadusers(newuser.data.newuser));
        toast.success(newuser.data.message, {
            autoClose: true,
            closeButton: false,
            closeOnClick: false,
            draggable: false,
            pauseOnHover: false
        });
        location.href = `${Address}`;
    } catch (error) {
        toast.error(error.response.data.message, {
            autoClose: true,
            closeButton: false,
            closeOnClick: false,
            draggable: false,
            pauseOnHover: false
        });
    }
}

export const loginuser = (user) => async (dispatch) => {
    try {
        const loginuser = await API.post("/user/login", user);
        console.log(loginuser);
        dispatch(loadusers(loginuser.data.isuserexist));
        location.href = `${Address}`;
        toast.success(loginuser.data.message, {
            autoClose: true,
            closeButton: false,
            closeOnClick: false,
            draggable: false,
            pauseOnHover: false
        });
    } catch (error) {
        toast.error(error.response.data.message,
            {
                autoClose: true,
                closeButton: false,
                closeOnClick: false,
                draggable: false,
                pauseOnHover: false
            }
        );
    }
}

export const loadloginuser = () => async (dispatch) => {
    try {
        const loggedinuser = await API.get("/user/logedinuser");
        dispatch(loadusers(loggedinuser.data.user));
    } catch (error) {
        location.href = `${Address}/user/login`
        dispatch(loadusers(null));
        toast.error(error.response.data.message, {
            autoClose: true,
            closeButton: false,
            closeOnClick: false,
            draggable: false,
            pauseOnHover: false
        });
    }
}
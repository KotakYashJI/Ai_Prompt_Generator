import { configureStore } from "@reduxjs/toolkit";
import messageslice from "../slices/message.slice"
import userslice from "../slices/user.slice"
import chatslice from "../slices/chat.slice"

const store = configureStore({
    reducer: {
        chats: chatslice,
        messages: messageslice,
        users: userslice
    },
});

export default store;
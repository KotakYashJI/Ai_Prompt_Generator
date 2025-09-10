import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    AllChats: [],
    SingleChat: []
};

const chatSlice = createSlice({
    name: "chat",
    initialState,
    reducers: {
        loadchats: (state, action) => {
            state.AllChats = action.payload;
        },
        loadsinglechat: (state, action) => {
            state.SingleChat = action.payload;
        }
    }
});

export const { loadchats,loadsinglechat } = chatSlice.actions;

export default chatSlice.reducer;
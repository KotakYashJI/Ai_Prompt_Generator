import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    questions: [],
    answers: [],
    loading: false,
};

const messageSlice = createSlice({
    name: "messages",
    initialState,
    reducers: {
        loadquestions: (state, action) => {
            state.questions = action.payload;
        },
        loadanswers: (state, action) => {
            state.answers = action.payload;
        },
        updateloading: (state, action) => {
            state.loading = action.payload;
        }
    },
});

export const { loadquestions, loadanswers,updateloading } = messageSlice.actions;

export default messageSlice.reducer;
import axios from "axios";

const api = axios.create({
    baseURL: "https://ai-prompt-answer-generator.onrender.com",
    withCredentials: true
});

export default api;
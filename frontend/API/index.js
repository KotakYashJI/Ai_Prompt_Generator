import axios from "axios";

const api = axios.create({
    baseURL: "https://ai-prompt-generator-w5a6.onrender.com",
    withCredentials: true
});

export default api;
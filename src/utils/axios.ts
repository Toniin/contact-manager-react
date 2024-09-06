import axios from "axios";

export const contactsAPI = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
    }
});

contactsAPI.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("Token");

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);
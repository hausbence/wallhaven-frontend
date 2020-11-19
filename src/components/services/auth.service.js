import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8762/user-service/auth/";


const register = (username, email, password) => {
    return axios.post(API_URL + "signup", {
        username,
        email,
        password,
    });
};

const login = (username, password) => {
    return axios
        .post(API_URL + "signin", {
            username,
            password,
        }, {headers: authHeader()})
        .then((response) => {
            if (response.data.accessToken) {
            }

            return response.data;
        });
};


export default {
    register,
    login,
};

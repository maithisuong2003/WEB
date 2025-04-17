import axios from "axios";

export const REST_API_BASE_URL = "http://localhost:8080/laptopshop/v0.1";

export const loginToken = (accountName, password) => axios.post(`${REST_API_BASE_URL}/auth/login`, { accountName, password });


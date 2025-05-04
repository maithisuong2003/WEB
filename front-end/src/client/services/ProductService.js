import axios from "axios";

export const REST_API_BASE_URL = "http://localhost:8080/sugarnest/v0.1";

export const listProducts = (page) => axios.get(`${REST_API_BASE_URL}/products?page=${page}`);
export const getProduct = (id) => axios.get(`${REST_API_BASE_URL}/products/${id}`);
export const getProductByCategory = (category, limit) => axios.get(`${REST_API_BASE_URL}/products/category/${category}/limit/${limit}`);
export const getTopSellingProduct = (limit) => axios.get(`${REST_API_BASE_URL}/products/top-selling/${limit}`);
export const getLatestProduct = (limit) => axios.get(`${REST_API_BASE_URL}/products/latest/${limit}`);
export const getMostViewedProduct = (limit) => axios.get(`${REST_API_BASE_URL}/products/most-viewed/${limit}`);
export const getRecommendedProducts = (category, limit) => axios.get(`${REST_API_BASE_URL}/products/recommended/${category}/limit/${limit}`);
export const listCategories = () => axios.get(`${REST_API_BASE_URL}/categories/all`);
export const loginToken = (accountName, password) => axios.post(`${REST_API_BASE_URL}/auth/login`, { accountName, password });


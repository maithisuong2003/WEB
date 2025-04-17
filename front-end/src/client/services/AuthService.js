import axios from "axios";
import { REST_API_BASE_URL } from "./ProductService";


export const loginToken = (accountName, password) => axios.post(`${REST_API_BASE_URL}/auth/login`, { accountName, password });
export const logoutToken = (token) => axios.post(`${REST_API_BASE_URL}/auth/logout`, { token });
export const hasPermission = (requiredPermission) => {
  const user = JSON.parse(localStorage.getItem('user'));

  if (user) {
    if (user.roles) {
      const roles = user.roles;
      for (let role of roles) {
        if (role.permissions.some(permission => permission.name === requiredPermission)) {
          return true;
        }
      }

      return false;
    }
  }
};
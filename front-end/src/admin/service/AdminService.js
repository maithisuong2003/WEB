import axios from "axios";

export const REST_API_BASE_URL = "http://localhost:8080/latopshop/v0.1";

export const loginToken = (accountName, password) => axios.post(`${REST_API_BASE_URL}/auth/login`, { accountName, password });
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
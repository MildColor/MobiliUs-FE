import axios from "axios";

const config = {
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    accept: "application/json",
  },
};

export const api = axios.create(config);

// api.interceptors.request.use(function (config) {
//   return config;
// });

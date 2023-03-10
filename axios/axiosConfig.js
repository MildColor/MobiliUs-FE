import axios from "axios";
// import { REACT_APP_BASE_URL } from "@env";
import Constants from "expo-constants";

const apiUrl = Constants.expoConfig.extra.apiUrl;

const config = {
  baseURL: apiUrl,
  headers: {
    "Content-Type": "application/json",
    accept: "application/json",
  },
};

export const api = axios.create(config);

// api.interceptors.request.use(function (config) {
//   return config;
// });

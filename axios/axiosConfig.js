import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
// import { REACT_APP_BASE_URL } from "@env";
import Constants from "expo-constants";

const apiUrl = Constants.expoConfig.extra.API_URL;

const config = {
  baseURL: apiUrl,
  headers: {
    "Content-Type": "application/json",
    accept: "application/json",
  },
};

export const api = axios.create(config);

api.interceptors.request.use(async function (config) {
  try {
    const accessToken = await AsyncStorage.getItem("accessToken");
    if (!config) {
      config = {};
    }
    if (!config.headers) {
      config.headers = {};
    }
    config.headers.Authorization = accessToken;
    return config;
  } catch (error) {
    console.log("interceptors error", error);
    return config;
  }
});

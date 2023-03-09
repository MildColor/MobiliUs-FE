import { api } from "./axiosConfig";

export const busApis = {
  getBusArrival: async (stationNum) =>
    await api.get(`/traffic/bus/arrival?stationNum=${stationNum}`),

  getSearchBusStation: async (stationName) =>
    await api.get(`/traffic/search/busStation?keyword=${stationName}`),
};

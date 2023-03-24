import { api } from "./axiosConfig";

export const busApis = {
  getBusArrival: async (stationNum) =>
    await api.get(`/traffic/bus/arrival?stationNum=${stationNum}`),

  getSearchBusStation: async (stationName) =>
    await api.get(`/traffic/search/busStation?keyword=${stationName}`),

  getNearbyBusStation: async ({ longitude, latitude, distance }) =>
    await api.get(
      `/traffic/nearby/busStation?x=${longitude}&y=${latitude}&distance=${distance}`
    ),
};

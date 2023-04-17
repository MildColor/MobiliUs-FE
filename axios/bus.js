import { api } from "./axiosConfig";

export const busApis = {
  getBusArrival: async (stationNum) =>
    await api.get(`/bus/arrival/seoul?stationNum=${stationNum}`),

  getSearchBusStation: async (stationName) =>
    await api.get(`/bus/search/busStation?station=${stationName}`),

  getNearbyBusStation: async ({ longitude, latitude, distance }) =>
    await api.get(
      `/bus/nearby/busStation?x=${longitude}&y=${latitude}&distance=${distance}`
    ),
};

import { api } from "./axiosConfig";

export const busApis = {
  getBusArrival: async ({ stationId, localState }) =>
    await api.get(
      `/bus/arrival?stationId=${stationId}&localState=${localState}`
    ),

  getSearchBusStation: async (stationName) =>
    await api.get(`/bus/search/busStation?station=${stationName}`),

  getNearbyBusStation: async ({ longitude, latitude, distance }) =>
    await api.get(
      `/bus/nearby/busStation?x=${longitude}&y=${latitude}&distance=${distance}`
    ),
};

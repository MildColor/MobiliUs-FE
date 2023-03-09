import { api } from "./axiosConfig";

export const subwayApis = {
  getSubwayArrival: async (stationName) =>
    await api.get(`/traffic/subway/arrival?keyword=${stationName}`),
};

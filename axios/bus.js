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

  postBusStationBookmark: async ({
    stationId,
    stationName,
    latitude,
    longitude,
    localState,
  }) => {
    console.log(
      "post",
      stationId,
      stationName,
      latitude,
      longitude,
      localState
    );
    return await api.post(`/bus/bookmark`, {
      stationId,
      stationName,
      latitude,
      longitude,
      localState,
    });
  },

  getBookmarkBusStation: async () => await api.get(`/bus/bookmark/show`),
};

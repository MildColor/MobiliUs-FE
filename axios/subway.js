import { api } from "./axiosConfig";

export const subwayApis = {
  // 지하철 도착정보
  getSubwayArrival: async (station) =>
    await api.get(`/subway/arrival?station=${station}`),
  // 지하철 역 검색
  getSubwayStation: async (station) =>
    await api.get(`/subway/search/subwayStation?station=${station}`),

  // 호선별 지하철 역 목록 정보
  // getSubwayStationOfLine: async (subwayLine) =>
  //   await api.get(`/subway/find/stationList?subwayLine=${subwayLine}`),
};

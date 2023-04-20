import { useQuery } from "@tanstack/react-query";
import { busApis } from "../../../axios/bus";

export const useGetSearchBusStation = (stationName) => {
  return useQuery({
    queryKey: ["getSearchBusArrival", stationName],
    queryFn: async () => {
      return await busApis.getSearchBusStation(stationName);
    },
    onError: async (error) => {
      console.log("getSearchBusStation", error);
    },
  });
};

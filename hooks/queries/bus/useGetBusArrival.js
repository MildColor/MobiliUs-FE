import { useQuery } from "@tanstack/react-query";
import { busApis } from "../../../axios/bus";

export const useGetBusArrival = (stationNum) => {
  return useQuery({
    queryKey: ["getBusArrival", stationNum],
    queryFn: async () => {
      return await busApis.getBusArrival(stationNum);
    },
  });
};

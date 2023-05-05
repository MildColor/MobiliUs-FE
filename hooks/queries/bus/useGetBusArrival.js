import { useQuery } from "@tanstack/react-query";
import { busApis } from "../../../axios/bus";

export const useGetBusArrival = ({ stationId, localState }) => {
  return useQuery({
    queryKey: ["getBusArrival", stationId, localState],
    queryFn: async () => {
      return await busApis.getBusArrival({ stationId, localState });
    },
    onError: async (error) => {
      console.log("getBusArrival", error);
    },
    refetchInterval: 10000,
  });
};

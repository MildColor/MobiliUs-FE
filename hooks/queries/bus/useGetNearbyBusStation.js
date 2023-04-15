import { useQuery } from "@tanstack/react-query";
import { busApis } from "../../../axios/bus";

export const useGetNearbyBusStation = ({ longitude, latitude, distance }) => {
  return useQuery({
    queryKey: ["getNearbyBusArrival", longitude, latitude, distance],
    queryFn: async () => {
      return await busApis.getNearbyBusStation({
        longitude,
        latitude,
        distance,
      });
    },
    onError: async (error) => {
      console.log("getNearbyBusStation", error);
    },
  });
};

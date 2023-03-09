import { useQuery } from "@tanstack/react-query";
import { subwayApis } from "../../../axios/subway";

export const useGetSubwayArrival = (stationName) => {
  return useQuery({
    queryKey: ["getSubwayArrival ", stationName],
    queryFn: async () => {
      return await subwayApis.getSubwayArrival(stationName);
    },
  });
};

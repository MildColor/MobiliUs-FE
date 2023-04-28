import { useQuery } from "@tanstack/react-query";
import { subwayApis } from "../../../axios/subway";

export const useGetSubwayArrival = (station) => {
  return useQuery({
    queryKey: ["getSubwayArrival ", station],
    queryFn: async () => {
      // const {
      //   data: { stationName, subwayList },
      // } = await subwayApis.getSubwayArrival(station);
      // return { stationName, subwayList };
      return await subwayApis.getSubwayArrival(station);
    },
    refetchInterval: 10000,
  });
};

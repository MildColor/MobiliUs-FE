import { useQuery } from "@tanstack/react-query";
import { subwayApis } from "../../../axios/subway";

export const useGetSubwayArrival = (station) => {
  return useQuery({
    queryKey: ["getSubwayArrival ", station],
    queryFn: async () => {
      // const {
      //   data: { stationList },
      // } = await subwayApis.getSubwayArrival(station);
      return await subwayApis.getSubwayArrival(station);
    },
  });
};

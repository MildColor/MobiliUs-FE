import { useQuery } from "@tanstack/react-query";
import { subwayApis } from "../../../axios/subway";

export const useGetSubwayStation = (station) => {
  return useQuery({
    queryKey: ["getSubwayStation ", station],
    queryFn: async () => {
      const {
        data: { stationList },
      } = await subwayApis.getSubwayStation(station);

      return stationList;
    },
  });
};

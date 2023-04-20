import { useQuery } from "@tanstack/react-query";
import { subwayApis } from "../../../axios/subway";

export const useGetSubwayStation = (station) => {
  return useQuery({
    queryKey: ["getSubwayStation ", station],
    queryFn: async () => {
      return await subwayApis.getSubwayStation(station);
    },
  });
};

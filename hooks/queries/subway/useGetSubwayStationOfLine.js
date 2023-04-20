import { useQuery } from "@tanstack/react-query";
import { subwayApis } from "../../../axios/subway";

export const useGetSubwayStationOfLine = (subwayLine) => {
  return useQuery({
    queryKey: ["getSubwayStationOfLine ", subwayLine],
    queryFn: async () => {
      const {
        data: { stationList },
      } = await subwayApis.getSubwayStationOfLine(subwayLine);
      return stationList;
    },
  });
};

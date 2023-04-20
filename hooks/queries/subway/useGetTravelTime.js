import { useQuery } from "@tanstack/react-query";
import { subwayApis } from "../../../axios/subway";

export const useGetTravelTime = ({
  departurePoint,
  departureLine,
  destinationPoint,
  destinationLine,
}) => {
  return useQuery({
    queryKey: [
      "getSubwayStation ",
      departurePoint,
      departureLine,
      destinationPoint,
      destinationLine,
    ],
    queryFn: async () => {
      const { data } = await subwayApis.getTravelTime({
        departurePoint,
        departureLine,
        destinationPoint,
        destinationLine,
      });
      return data;
    },
  });
};

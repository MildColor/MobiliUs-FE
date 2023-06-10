import { useMutation, useQueryClient } from "@tanstack/react-query";
import { busApis } from "../../../axios/bus";

export const usePostBusStationBookmarkMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload) => {
      console.log("payload: " + payload);
      return await busApis.postBusStationBookmark(payload);
    },
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({
        queryKey: ["getBusArrival"],
      });
      queryClient.invalidateQueries({
        queryKey: ["getBookmarkBusStation"],
      });
    },
    onError: (error) => {
      console.log("bookmark error: " + error);
    },
  });
};

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { subwayApis } from "../../../axios/subway";

export const usePostSubwayBookmarkMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload) => {
      console.log("payload: " + payload);
      return await subwayApis.postSubwayBookmark(payload);
    },
    onSuccess: (data, variables, context) => {
      //   queryClient.invalidateQueries({ queryKey: ["getBusArrival"] });
    },
    onError: (error) => {
      console.log("bookmark error: " + error);
    },
  });
};

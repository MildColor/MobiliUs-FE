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
      queryClient.invalidateQueries({ queryKey: ["getTravelTime"] });
      queryClient.invalidateQueries({ queryKey: ["getBookmarkSubway"] });
    },
    onError: (error) => {
      console.log("bookmark error: " + error);
    },
  });
};

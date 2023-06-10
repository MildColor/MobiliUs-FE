import { useQuery } from "@tanstack/react-query";
import { busApis } from "../../../axios/bus";
import { subwayApis } from "../../../axios/subway";

export const useGetSubwayBookmark = () => {
  return useQuery({
    queryKey: ["getBookmarkSubway"],
    queryFn: async () => {
      return await subwayApis.getBookmarkSubway();
    },
    onSuccess: async (data) => {},
    onError: async (error) => {
      console.log("getBookmarkSubway", error);
    },
  });
};

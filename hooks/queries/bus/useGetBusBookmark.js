import { useQuery } from "@tanstack/react-query";
import { busApis } from "../../../axios/bus";

export const useGetBusBookmark = () => {
  return useQuery({
    queryKey: ["getBookmarkBusStation"],
    queryFn: async () => {
      return await busApis.getBookmarkBusStation();
    },
    onError: async (error) => {
      console.log("getBookmarkBusStation", error);
    },
  });
};

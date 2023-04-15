import { Text } from "react-native";
import { useGetSubwayArrival } from "../hooks/queries/subway/useGetSubwayArrival";
import { useGetSubwayStation } from "../hooks/queries/subway/useGetSubwayStation";
import { useGetSubwayStationOfLine } from "../hooks/queries/subway/useGetSubwayStationOfLine";

import React from "react";

function SubwayMain() {
  const { data: subwayArrivalData } = useGetSubwayArrival("금정역");
  const { data: subwayStationData } = useGetSubwayStation("서울");
  const { data: subwayStationOfLineData } = useGetSubwayStationOfLine("1호선");

  console.log("subwayArrival", subwayArrivalData);
  console.log("subwayStation", subwayStationData);
  console.log("subwayStationOfLine", subwayStationOfLineData);

  return <Text>SubwayMain</Text>;
}

export default SubwayMain;

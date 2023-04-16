import React, { useContext } from "react";
import { useGetSubwayArrival } from "../hooks/queries/subway/useGetSubwayArrival";
import { useGetSubwayStation } from "../hooks/queries/subway/useGetSubwayStation";
import { useGetSubwayStationOfLine } from "../hooks/queries/subway/useGetSubwayStationOfLine";
import { LocationContext } from "../contexts/Location/LocationContext";
import MylocationMarker from "../components/common/marker/MylocationMarker";
import MapViewLayout from "../components/Layout/MapViewLayout";

function SubwayMain() {
  const { location, setLocation } = useContext(LocationContext);
  console.log(location);

  const { data: subwayArrivalData } = useGetSubwayArrival("금정역");
  const { data: subwayStationData } = useGetSubwayStation("서울");
  const { data: subwayStationOfLineData } = useGetSubwayStationOfLine("1호선");

  console.log("subwayArrival", subwayArrivalData);
  console.log("subwayStation", subwayStationData);
  console.log("subwayStationOfLine", subwayStationOfLineData);

  return (
    <MapViewLayout
      region={{
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      }}
    >
      <MylocationMarker
        coordinate={{
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        }}
        title={"내 위치"}
      />
    </MapViewLayout>
  );
}

export default SubwayMain;

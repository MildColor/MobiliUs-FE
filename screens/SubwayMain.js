import React, { useContext, useMemo, useState } from "react";
import { useGetSubwayArrival } from "../hooks/queries/subway/useGetSubwayArrival";
import { useGetSubwayStation } from "../hooks/queries/subway/useGetSubwayStation";
import { useGetSubwayStationOfLine } from "../hooks/queries/subway/useGetSubwayStationOfLine";
import { LocationContext } from "../contexts/Location/LocationContext";
import MylocationMarker from "../components/common/marker/MylocationMarker";
import MapViewLayout from "../components/Layout/MapViewLayout";
import { Marker } from "react-native-maps";
import Overlay from "../components/common/overlay/Overlay";
import Input from "../components/common/Input/Input";
import { debouncer } from "../utils/debouncing";
import { TextInput } from "react-native";
import BusSearchBar from "../components/subway/SubwayOverlay/BusSearchBar";

function SubwayMain() {
  const { location, setLocation } = useContext(LocationContext);
  console.log(location);

  const [markers, setMarkers] = useState([]);

  // const { data: subwayArrivalData } = useGetSubwayArrival(searchWord);
  const { data: subwayStationData } = useGetSubwayStation("서울");
  // const { data: subwayStationOfLineData } = useGetSubwayStationOfLine("1호선");

  console.log("subwayStation", subwayStationData);
  // console.log("subwayStationOfLine", subwayStationOfLineData);

  return (
    <>
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

        {markers.map((marker, idx) => {
          return (
            <Marker
              key={marker.id}
              coordinate={{
                latitude: marker.latitude,
                longitude: marker.longitude,
              }}
              title={marker.stationName}
              // onPress={() => {
              // console.log("stationNum ", marker.stationNum);
              // setStationNum(marker.stationNum);
              // setIsOpenBusArrival(true);
              // }}
            />
          );
        })}
      </MapViewLayout>
      <BusSearchBar />
    </>
  );
}

export default SubwayMain;

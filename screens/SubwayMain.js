import React, { useContext, useEffect, useMemo, useState } from "react";
import { useGetSubwayArrival } from "../hooks/queries/subway/useGetSubwayArrival";
import { useGetSubwayStation } from "../hooks/queries/subway/useGetSubwayStation";
import { useGetSubwayStationOfLine } from "../hooks/queries/subway/useGetSubwayStationOfLine";
import { LocationContext } from "../contexts/Location/LocationContext";
import MylocationMarker from "../components/common/Marker/MylocationMarker";
import MapViewLayout from "../components/Layout/MapViewLayout";
import { Callout, Marker } from "react-native-maps";
import SubwaySearchBar from "../components/subway/SubwayOverlay/SubwaySearchBar";
import SubwayCalloutView from "../components/common/Callout/SubwayCalloutView";
import RouteSettingOverlay from "../components/subway/SubwayOverlay/RouteSettingOverlay";
import { ARRIVAL_BUTTON, DEPARTURE_BUTTON } from "../constants/selectedButton";
import { useGetTravelTime } from "../hooks/queries/subway/useGetTravelTime";

function SubwayMain() {
  const { location, setLocation } = useContext(LocationContext);
  // console.log(location);

  const [markers, setMarkers] = useState([]);

  // console.log(markers);

  const [focusedRegion, setFocusedRegion] = useState({
    latitude: location?.coords.latitude,
    longitude: location?.coords.longitude,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });

  const [subwayRoute, setSubwayRoute] = useState({
    departure: {},
    arrival: {},
  });
  const [selectedButtonId, setSelectedButtonId] = useState("");

  // const { data: subwayArrivalData } = useGetSubwayArrival(searchWord);
  // const { data: subwayStationData } = useGetSubwayStation("서울");
  // const { data: subwayStationOfLineData } = useGetSubwayStationOfLine("1호선");
  const { data: travelInfo } = useGetTravelTime({
    departurePoint: subwayRoute.departure.stationName,
    departureLine: subwayRoute.departure.subwayLine,
    destinationPoint: subwayRoute.arrival.stationName,
    destinationLine: subwayRoute.arrival.subwayLine,
  });
  console.log("travelInfo", travelInfo);
  console.log(subwayRoute.departure.stationName);
  console.log(subwayRoute);

  // console.log("subwayStation", subrwayStationData);
  // console.log("subwayStationOfLine", subwayStationOfLineData);

  useEffect(() => {
    if (location) {
      setFocusedRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
    }
  }, []);

  const onPressMarker = (marker) => {
    console.log("marker", marker);
    if (selectedButtonId === DEPARTURE_BUTTON) {
      setSubwayRoute({ ...subwayRoute, departure: { ...marker } });
    }

    if (selectedButtonId === ARRIVAL_BUTTON) {
      setSubwayRoute({ ...subwayRoute, arrival: { ...marker } });
    }
  };

  // console.log("subwayRoute", subwayRoute);
  return (
    <>
      <MapViewLayout region={focusedRegion}>
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
              onPress={() => onPressMarker(marker)}
            >
              {/* <Callout>
                <SubwayCalloutView {...marker} />
              </Callout> */}
            </Marker>
          );
        })}
      </MapViewLayout>
      <SubwaySearchBar
        setMarkers={setMarkers}
        setFocusedRegion={setFocusedRegion}
      />

      <RouteSettingOverlay
        selectedButtonId={selectedButtonId}
        setSelectedButtonId={setSelectedButtonId}
        subwayRoute={subwayRoute}
      />
    </>
  );
}

export default SubwayMain;

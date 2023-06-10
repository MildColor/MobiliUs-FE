import React, { useContext, useEffect, useMemo, useState } from "react";
import { Marker, Polyline } from "react-native-maps";
import { useGetSubwayArrival } from "../hooks/queries/subway/useGetSubwayArrival";
import { LocationContext } from "../contexts/Location/LocationContext";
import MylocationMarker from "../components/common/Marker/MylocationMarker";
import MapViewLayout from "../components/Layout/MapViewLayout";
import SubwaySearchBar from "../components/subway/SubwayOverlay/SubwaySearchBar";
import RouteSettingOverlay from "../components/subway/SubwayOverlay/RouteSettingOverlay";
import { ARRIVAL_BUTTON, DEPARTURE_BUTTON } from "../constants/selectedButton";
import { useGetTravelTime } from "../hooks/queries/subway/useGetTravelTime";
import SubwayArrivalOverlay from "../components/subway/SubwayOverlay/SubwayArrivalOverlay";
import RouteTimeListOverlay from "../components/subway/SubwayOverlay/RouteTimeListOverlay";

function SubwayMain() {
  const { location, setLocation } = useContext(LocationContext);

  const [markers, setMarkers] = useState([]);
  const [stationName, setStationName] = useState("");
  const [decodedPolyline, setDecodedPolyline] = useState([]);
  const [isOpenOverlay, setIsOpenOverlay] = useState({
    subwayArrival: false,
    routeTime: false,
  });

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

  // 이부분 null point exception
  // 요청 보낸거에 해당하는게 아무것도 없거나, 요청을 아무것도 안보내거나(null)
  const { data: subwayArrivalData } = useGetSubwayArrival(stationName);

  const { data: travelTime } = useGetTravelTime({
    departurePoint: subwayRoute.departure.stationName,
    departureLine: subwayRoute.departure.subwayLine,
    destinationPoint: subwayRoute.arrival.stationName,
    destinationLine: subwayRoute.arrival.subwayLine,
  });

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

  const onPressMarker = async (marker) => {
    if (selectedButtonId === DEPARTURE_BUTTON) {
      setSubwayRoute({ ...subwayRoute, departure: { ...marker } });
    }

    if (selectedButtonId === ARRIVAL_BUTTON) {
      setSubwayRoute({ ...subwayRoute, arrival: { ...marker } });
    }

    setIsOpenOverlay((prev) => {
      return { ...prev, subwayArrival: true };
    });
  };

  const onPressMap = () => {
    setIsOpenOverlay((prev) => {
      return { ...prev, subwayArrival: false };
    });
  };

  return (
    <>
      <MapViewLayout region={focusedRegion} onPress={() => onPressMap()}>
        <MylocationMarker title={"내 위치"} />

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
            ></Marker>
          );
        })}

        <Polyline
          coordinates={decodedPolyline}
          strokeColor="#6040B2"
          strokeWidth={6}
        />
      </MapViewLayout>
      <SubwaySearchBar
        setMarkers={setMarkers}
        setFocusedRegion={setFocusedRegion}
        setStationName={setStationName}
        setIsOpenOverlay={setIsOpenOverlay}
      />

      <RouteSettingOverlay
        selectedButtonId={selectedButtonId}
        setSelectedButtonId={setSelectedButtonId}
        subwayRoute={subwayRoute}
        setSubwayRoute={setSubwayRoute}
      />

      {isOpenOverlay.subwayArrival && subwayArrivalData?.data && (
        <SubwayArrivalOverlay subwayArrivalData={subwayArrivalData?.data} />
      )}

      {travelTime &&
        !isOpenOverlay.subwayArrival &&
        isOpenOverlay.routeTime && (
          <RouteTimeListOverlay
            travelTime={travelTime}
            setDecodedPolyline={setDecodedPolyline}
          />
        )}
    </>
  );
}

export default SubwayMain;

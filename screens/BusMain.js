import { useContext, useEffect, useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MapView, {
  Circle,
  PROVIDER_GOOGLE,
  Marker,
  Polyline,
} from "react-native-maps";
import * as Location from "expo-location";
import { StatusBar } from "expo-status-bar";

import { useGetNearbyBusStation } from "../hooks/queries/bus/useGetNearbyBusStation";

import MylocationMarker from "../components/common/Marker/MylocationMarker";
import SearchBarOverlay from "../components/bus/BusOverlay/SearchBarOverlay";
import BusArrivalListOverlay from "../components/bus/BusOverlay/BusArrivalListOverlay";
import RangeButtonsOverlay from "../components/bus/BusOverlay/RangeButtonsOverlay";
import { LocationContext } from "../contexts/Location/LocationContext";
import MapViewLayout from "../components/Layout/MapViewLayout";

function BusMain() {
  // location context, 내 위치 저장
  const { location, setLocation } = useContext(LocationContext);
  // console.log(location);
  // 마커 찍기
  const [markers, setMarkers] = useState([]);
  // 위치 찍기
  // const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  // 검색하기
  const [stationNum, setStationNum] = useState("");

  const [focusedRegion, setFocusedRegion] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });

  const [isOpenBusArrival, setIsOpenBusArrival] = useState(false);
  const [radius, setRadius] = useState(0);

  const { data: nearbyBusStations } = useGetNearbyBusStation({
    latitude: location?.coords?.latitude ?? 37.5559,
    longitude: location?.coords?.longitude ?? 126.9723,
    distance: radius,
  });

  // console.log("nearbyBusStations", nearbyBusStations?.data?.stationList);

  // console.log("markers", markers);

  useEffect(() => {
    if (nearbyBusStations) {
      setMarkers([...nearbyBusStations?.data?.stationList]);
    }
  }, [nearbyBusStations?.data?.stationList]);

  useEffect(() => {
    (async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          setErrorMsg("Permission to access location was denied");
          return;
        }

        let location = await Location.getCurrentPositionAsync({});
        setLocation(location);
        setFocusedRegion({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        });
      } catch (e) {
        setErrorMsg("Permission to access location was denied");
        Alert.alert("현 위치를 찾을 수 없습니다.");
      }
    })();
  }, []);

  return (
    <>
      <MapViewLayout
        region={focusedRegion}
        onPress={() => setIsOpenBusArrival(false)}
      >
        <MylocationMarker
          coordinate={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          }}
          title={"내 위치"}
          radius={radius}
        />

        {markers.map((marker, idx) => {
          return (
            <Marker
              key={marker.stationId}
              coordinate={{
                latitude: marker.latitude,
                longitude: marker.longitude,
              }}
              title={marker.stationName}
              onPress={() => {
                console.log("stationNum ", marker.stationNum);
                setStationNum(marker.stationNum);
                setIsOpenBusArrival(true);
              }}
            />
          );
        })}
      </MapViewLayout>
      <SearchBarOverlay
        setMarkers={setMarkers}
        setFocusedRegion={setFocusedRegion}
        setIsOpenBusArrival={setIsOpenBusArrival}
      />
      <RangeButtonsOverlay
        setRadius={setRadius}
        setFocusedRegion={setFocusedRegion}
      />

      {isOpenBusArrival && <BusArrivalListOverlay stationNum={stationNum} />}
    </>
  );
}

export default BusMain;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
  errorView: {
    display: "flex",
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
});

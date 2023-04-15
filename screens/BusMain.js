import { StatusBar } from "expo-status-bar";
import { Circle, PROVIDER_GOOGLE } from "react-native-maps";

import { Marker, Polyline } from "react-native-maps";
import MapView from "react-native-maps";

import { Alert, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useState } from "react";
import * as Location from "expo-location";
import MylocationMarker from "../components/common/marker/MylocationMarker";
import { useGetNearbyBusStation } from "../hooks/queries/bus/useGetNearbyBusStation";

import SearchBarOverlay from "../components/bus/BusOverlay/SearchBarOverlay";
import BusArrivalListOverlay from "../components/bus/BusOverlay/BusArrivalListOverlay";
import RangeButtonsOverlay from "../components/bus/BusOverlay/RangeButtonsOverlay";

function BusMain() {
  // 마커 찍기
  const [markers, setMarkers] = useState([]);
  // 위치 찍기
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  // 검색하기
  const [stationNum, setStationNum] = useState("");

  const [focusedItem, setFocusedItem] = useState(null);

  const [isOpenBusArrival, setIsOpenBusArrival] = useState(false);
  const [radius, setRadius] = useState(0);

  const { data: nearbyBusStations, refetch: refetchNearbyStation } =
    useGetNearbyBusStation({
      latitude: location?.coords?.latitude ?? 37.5559,
      longitude: location?.coords?.longitude ?? 126.9723,
      distance: radius,
    });

  console.log("nearbyBusStations", nearbyBusStations?.data?.stationList);

  console.log("markers", markers);

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
      } catch (e) {
        setErrorMsg("Permission to access location was denied");
        Alert.alert("현 위치를 찾을 수 없습니다.");
      }
    })();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {location !== null ? (
        <>
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
            region={focusedItem}
            provider={PROVIDER_GOOGLE}
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
                    setStationNum(marker.stationNum);
                    setIsOpenBusArrival(true);
                  }}
                />
              );
            })}
          </MapView>

          <SearchBarOverlay
            setMarkers={setMarkers}
            setFocusedItem={setFocusedItem}
            setIsOpenBusArrival={setIsOpenBusArrival}
          />
          <RangeButtonsOverlay setRadius={setRadius} />

          {isOpenBusArrival && (
            <BusArrivalListOverlay stationNum={stationNum} />
          )}
        </>
      ) : (
        <View style={styles.errorView}>
          <Text>{errorMsg}</Text>
        </View>
      )}

      <StatusBar style="auto" />
    </SafeAreaView>
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

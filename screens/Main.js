import { StatusBar } from "expo-status-bar";
import { Circle, PROVIDER_GOOGLE } from "react-native-maps";

import { Marker, Polyline } from "react-native-maps";
import MapView from "react-native-maps";

import { Alert, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useState } from "react";
import * as Location from "expo-location";
import SearchBarOverlay from "../components/common/overlay/SearchBarOverlay";
import MylocationMarker from "../components/common/marker/MylocationMarker";

import { useGetSearchBusStation } from "../hooks/queries/bus/useGetSearchBusStation";
import { useGetBusArrival } from "../hooks/queries/bus/useGetBusArrival";
import BusArrivalListOverlay from "../components/common/overlay/BusArrivalListOverlay";
import RangeButtonsOverlay from "../components/common/overlay/RangeButtonsOverlay";
import { useGetNearbyBusStation } from "../hooks/queries/bus/useGetNearbyBusStation";

function Main() {
  // 마커 찍기
  const [markers, setMarkers] = useState([]);
  // 위치 찍기
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  // 검색하기
  const [searchWord, setSearchWord] = useState("");
  const [stationNum, setStationNum] = useState("");

  const [selectedItem, setSelectedItem] = useState(null);
  const [busArrival, setBusArrival] = useState([]);
  const [isOpenBusArrival, setIsOpenBusArrival] = useState(false);
  const [radius, setRadius] = useState(0);

  const { data: searchBusStationDatas } = useGetSearchBusStation(searchWord);
  const { data: busArrivalDatas } = useGetBusArrival(stationNum);
  const { data: nearbyBusStationDatas, refetch: refetchNearbyStation } =
    useGetNearbyBusStation({
      // latitude: 37.3720324398,
      latitude: location?.coords?.latitude ?? 37.5559,
      // longitude: 126.9420278569,
      longitude: location?.coords?.longitude ?? 126.9723,
      distance: radius,
    });

  // console.log("busArrival", busArrivalDatas?.data?.busList);
  console.log(
    "nearbyBusStationDatas",
    nearbyBusStationDatas?.data?.stationList
  );

  console.log("markers", markers);

  useEffect(() => {
    if (searchBusStationDatas) {
      setMarkers([...searchBusStationDatas?.data?.stationList]);
    }
  }, [searchBusStationDatas?.data?.stationList]);

  useEffect(() => {
    if (busArrivalDatas) {
      setBusArrival([...busArrivalDatas?.data?.busList]);
    }
  }, [busArrivalDatas?.data?.busList]);

  useEffect(() => {
    if (nearbyBusStationDatas) {
      setMarkers([...nearbyBusStationDatas?.data?.stationList]);
    }
  }, [nearbyBusStationDatas?.data?.stationList]);

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
            region={selectedItem}
            provider={PROVIDER_GOOGLE}
            onPress={() => setIsOpenBusArrival(false)}
          >
            <Marker
              coordinate={{
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
              }}
              title={"내 위치"}
            >
              <MylocationMarker />
            </Marker>

            <Circle
              center={{
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
              }}
              radius={radius}
              strokeWidth={2}
              strokeColor={"rgba(249, 172, 56, 0.8)"}
              fillColor={"rgba(249, 172, 56, 0.2)"}
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
            setSearchWord={setSearchWord}
            setSelectedItem={setSelectedItem}
            setIsOpenBusArrival={setIsOpenBusArrival}
            data={searchBusStationDatas?.data?.stationList}
          />
          <RangeButtonsOverlay setRadius={setRadius} />

          {isOpenBusArrival && <BusArrivalListOverlay data={busArrival} />}
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

export default Main;

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

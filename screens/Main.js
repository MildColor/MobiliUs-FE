import { StatusBar } from "expo-status-bar";
import { PROVIDER_GOOGLE } from "react-native-maps";

import { Marker, Polyline } from "react-native-maps";
import MapView from "react-native-maps";

import { Alert, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useState } from "react";
import * as Location from "expo-location";
import SearchBarOverlay from "../components/common/overlay/SearchBarOverlay";
import MylocationMarker from "../components/common/marker/MylocationMarker";

import { useGetSearchBusStation } from "../hooks/queries/bus/useGetSearchBusStation";

function Main() {
  const [markers, setMarkers] = useState([]);
  // 내위치 찍기
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  // 검색하기
  const [searchWord, setSearchWord] = useState("");

  const { data: searchBusStationDatas } = useGetSearchBusStation(searchWord);
  console.log(searchWord);

  useEffect(() => {
    if (searchBusStationDatas) {
      setMarkers([...searchBusStationDatas?.data?.stationList]);
    }
  }, [searchBusStationDatas?.data?.stationList]);

  console.log("data", searchBusStationDatas);
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
            provider={PROVIDER_GOOGLE}
          >
            <Marker
              coordinate={{
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
              }}
              title={"내 위치"}
            >
              <MylocationMarker></MylocationMarker>
            </Marker>
            {markers.map((marker, idx) => {
              return (
                <Marker
                  key={idx}
                  coordinate={{
                    latitude: marker.latitude,
                    longitude: marker.longitude,
                  }}
                  title={marker.stationName}
                />
              );
            })}
          </MapView>
          <SearchBarOverlay
            searchWord={searchWord}
            setSearchWord={setSearchWord}
          />
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

// [
//   {
//     latlng: { latitude: 37.5665, longitude: 126.978 },
//     title: "title1",
//     description: "description1",
//   },
//   {
//     latlng: { latitude: 36.815, longitude: 127.11 },
//     title: "title2",
//     description: "description2",
//   },
//   {
//     latlng: { latitude: 37.321, longitude: 126.83 },
//     title: "title3",
//     description: "description3",
//   },
//   {
//     latlng: { latitude: 39.019604, longitude: 125.752832 },
//     title: "title4",
//     description: "description4",
//   },
//   {
//     latlng: { latitude: 37.5665, longitude: 127.978 },
//     title: "title4",
//     description: "description4",
//   },
// ];

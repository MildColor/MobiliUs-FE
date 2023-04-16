import React, { useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import MapView, {
  Circle,
  PROVIDER_GOOGLE,
  Marker,
  Polyline,
} from "react-native-maps";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

import { useGetSubwayArrival } from "../hooks/queries/subway/useGetSubwayArrival";
import { useGetSubwayStation } from "../hooks/queries/subway/useGetSubwayStation";
import { useGetSubwayStationOfLine } from "../hooks/queries/subway/useGetSubwayStationOfLine";
import { LocationContext } from "../contexts/Location/LocationContext";
import MylocationMarker from "../components/common/marker/MylocationMarker";

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
    <SafeAreaView style={styles.container}>
      {/* {location !== null ? ( */}
      <>
        <MapView
          style={styles.map}
          // initialRegion={{
          //   latitude: location.coords.latitude,
          //   longitude: location.coords.longitude,
          //   latitudeDelta: 0.01,
          //   longitudeDelta: 0.01,
          // }}
          region={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
          provider={PROVIDER_GOOGLE}
        >
          <MylocationMarker
            coordinate={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            }}
            title={"내 위치"}
          />

          {/* {markers.map((marker, idx) => {
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
            })} */}
        </MapView>
      </>
      {/* // ) : (
      //   <View style={styles.errorView}>
      //     <Text>{errorMsg}</Text>
      //   </View>
      // )} */}

      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

export default SubwayMain;

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

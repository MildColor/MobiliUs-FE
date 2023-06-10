import { useContext, useEffect, useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import MapView, {
  Circle,
  PROVIDER_GOOGLE,
  Marker,
  Polyline,
} from "react-native-maps";
import * as Location from "expo-location";

import { useGetNearbyBusStation } from "../hooks/queries/bus/useGetNearbyBusStation";

import MylocationMarker from "../components/common/Marker/MylocationMarker";
import SearchBarOverlay from "../components/bus/BusOverlay/SearchBarOverlay";
import BusArrivalListOverlay from "../components/bus/BusOverlay/BusArrivalListOverlay";
import RangeButtonsOverlay from "../components/bus/BusOverlay/RangeButtonsOverlay";
import { LocationContext } from "../contexts/Location/LocationContext";
import MapViewLayout from "../components/Layout/MapViewLayout";
import { BookmarkContext } from "../contexts/Bookmark/BookmarkContext";

function BusMain() {
  // location context, 내 위치 저장
  const { location, setLocation } = useContext(LocationContext);
  const { busBookmark, setBusBookmark } = useContext(BookmarkContext);

  console.log(busBookmark);
  // 마커 찍기
  const [markers, setMarkers] = useState([]);
  const [errorMsg, setErrorMsg] = useState(null);

  // 검색하기
  const [station, setStation] = useState({ stationId: "", localState: "" });

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

  useEffect(() => {
    if (nearbyBusStations) {
      setMarkers([...nearbyBusStations?.data?.stationList]);
    }
  }, [nearbyBusStations?.data?.stationList]);

  useEffect(() => {
    if (busBookmark !== null) {
      setStation({
        stationId: busBookmark.stationId,
        localState: busBookmark.localState,
      });
      setMarkers([{ ...busBookmark }]);
      setIsOpenBusArrival(true);
    }
  }, [busBookmark]);

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

  useEffect(() => {
    (async () => {
      try {
        await Location.watchPositionAsync(
          {
            distanceInterval: 1,
            accuracy: Location.Accuracy.High,
            timeInterval: 1000,
          },
          (LocationObject) => {
            setLocation(LocationObject);
          }
        );
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);

  const onPressMap = () => {
    setIsOpenBusArrival(false);
  };

  const onPressMarker = (marker) => {
    setStation({ stationId: marker.stationId, localState: marker.localState });
    setIsOpenBusArrival(true);
  };
  return (
    <>
      <MapViewLayout region={focusedRegion} onPress={() => onPressMap()}>
        <MylocationMarker title={"내 위치"} radius={radius} />

        {markers.map((marker, idx) => {
          return (
            <Marker
              key={marker.stationId}
              coordinate={{
                latitude: marker.latitude,
                longitude: marker.longitude,
              }}
              title={marker.stationName}
              onPress={() => onPressMarker(marker)}
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

      {isOpenBusArrival && (
        <BusArrivalListOverlay
          stationId={station.stationId}
          localState={station.localState}
        />
      )}
      <Text>{location.coords.latitude + " " + location.coords.longitude}</Text>
    </>
  );
}

export default BusMain;

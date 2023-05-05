import React, { useEffect, useState } from "react";

import Overlay from "../../common/Overlay/Overlay";
import styled from "styled-components";
import {
  Dimensions,
  FlatList,
  PixelRatio,
  Text,
  TouchableOpacity,
} from "react-native";
import polyline from "@mapbox/polyline";

function RouteTimeListOverlay({ travelTime, setDecodedPolyline }) {
  const [itemSize, setItemSize] = useState(
    PixelRatio.roundToNearestPixel(Dimensions.get("window").width)
  );
  const [travelTimeArray, setTravelTimeArray] = useState([{ ...travelTime }]);

  useEffect(() => {
    if (travelTime) {
      setTravelTimeArray([{ ...travelTime }]);

      const decodedPolyline = travelTime.polylineList
        .map((polylineStr) => polyline.decode(polylineStr))
        .flat(1)
        .map(([x, y]) => ({ latitude: x, longitude: y }));

      setDecodedPolyline([...decodedPolyline]);
    }
  }, [travelTime]);

  useEffect(() => {
    const handleResize = () => {
      setItemSize(
        PixelRatio.roundToNearestPixel(Dimensions.get("window").width)
      );
    };
    const widthChageListener = Dimensions.addEventListener(
      "change",
      handleResize
    );
    return () => widthChageListener.remove("change", handleResize);
  }, []);

  const renderItem = ({ item }) => {
    return (
      <ItemWrapper width={itemSize}>
        <Text numberOfLines={1} ellipsizeMode="tail">
          출발지 : {item.departure}
        </Text>
        <Text numberOfLines={1} ellipsizeMode="tail">
          출발시간 : {item.departureTime}
        </Text>
        <Text numberOfLines={1} ellipsizeMode="tail">
          도착지 : {item.destination}
        </Text>
        <Text numberOfLines={1} ellipsizeMode="tail">
          도착시간 : {item.arrivalTime}
        </Text>
        <Text numberOfLines={1} ellipsizeMode="tail">
          예상 소요시간 : {item.durationTime}
        </Text>
      </ItemWrapper>
    );
  };

  return (
    <Overlay height="150px" bottom="15px" xPadding="0">
      <ListHeader>예상소요시간</ListHeader>
      <ArrivalFlatList
        horizontal={true}
        renderItem={renderItem}
        data={travelTimeArray}
        keyExtractor={(item, idx) => idx}
        showsHorizontalScrollIndicator={true}
        pagingEnabled
        snapToInterval={itemSize}
        snapToAlignment={"start"}
        decelerationRate={"fast"}
        bounces={false}
      />
    </Overlay>
  );
}

export default RouteTimeListOverlay;

const ArrivalFlatList = styled(FlatList)`
  height: 100%;
`;

const ListHeader = styled(Text)`
  width: 100%;
  font-size: 20px;
  font-weight: 700;
  margin: 0 0px 5px 15px;
`;

const ItemWrapper = styled(TouchableOpacity)`
  height: 100%;
  width: ${({ width }) => width - 20}px;
  border-radius: 15px;
  background-color: white;
  padding: 10px;
  margin: 0 10px;
`;

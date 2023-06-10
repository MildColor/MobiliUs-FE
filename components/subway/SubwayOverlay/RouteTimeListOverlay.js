import React, { useEffect, useState } from "react";

import Overlay from "../../common/overlay/Overlay";
import styled from "styled-components";
import {
  Dimensions,
  FlatList,
  PixelRatio,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import polyline from "@mapbox/polyline";

import { usePostSubwayBookmarkMutation } from "../../../hooks/queries/subway/usePostSubwayBookmarkMutation";
import Icon from "react-native-vector-icons/FontAwesome";

function RouteTimeListOverlay({ travelTime, setDecodedPolyline }) {
  const [itemSize, setItemSize] = useState(
    PixelRatio.roundToNearestPixel(Dimensions.get("window").width)
  );
  const [travelTimeArray, setTravelTimeArray] = useState([{ ...travelTime }]);

  const { mutate: subwayBookmarkMutate } = usePostSubwayBookmarkMutation();
  console.log("travelTime", travelTime?.bookmarkState);

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

  const onPressStar = (travelTimeArray) => {
    console.log("travelTimeArray" + travelTimeArray[0]);

    const {
      departure,
      destination,
      departureLine,
      destinationLine,
      bookmarkState,
    } = travelTimeArray[0];

    subwayBookmarkMutate({
      departure,
      destination,
      departureLine,
      destinationLine,
    });
  };

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
        <StarIcon
          name={travelTime?.bookmarkState ? "star" : "star-o"}
          size={25}
          color="#F9AC38"
          onPress={() => onPressStar(travelTimeArray)}
        />
      </ItemWrapper>
    );
  };

  return (
    <Overlay height="150px" bottom="15px" xPadding="0">
      <HeaderWrapper>
        <ListHeader>예상소요시간</ListHeader>
      </HeaderWrapper>
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
  font-size: 20px;
  font-weight: 700;
`;

const ItemWrapper = styled(TouchableOpacity)`
  height: 100%;
  width: ${({ width }) => width - 20}px;
  border-radius: 15px;
  background-color: white;
  padding: 10px;
  margin: 0 10px;
  position: relative;
`;

const HeaderWrapper = styled(View)`
  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
`;

const StarIcon = styled(Icon)`
  position: absolute;
  right: 5px;
  top: 5px;
`;

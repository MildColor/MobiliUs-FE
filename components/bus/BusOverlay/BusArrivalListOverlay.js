import React, { useState } from "react";
import {
  FlatList,
  Image,
  Modal,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import styled from "styled-components/native";
import Icon from "react-native-vector-icons/FontAwesome";

import { useGetBusArrival } from "../../../hooks/queries/bus/useGetBusArrival";
import Overlay from "../../common/Overlay/Overlay";
import * as Item from "../../common/FlatList/Item/ListItem";
import { usePostBusStationBookmarkMutation } from "../../../hooks/queries/bus/usePostBusStationBookmarkMutation";

const BusArrivalListOverlay = ({ stationId, localState }) => {
  const { data: busArrivals } = useGetBusArrival({ stationId, localState });
  const { mutate: busStationBookmarkMutate } =
    usePostBusStationBookmarkMutation();

  const onPressStar = ({
    stationId,
    stationName,
    latitude,
    longitude,
    localState,
  }) => {
    console.log("onPressStar");
    busStationBookmarkMutate({
      stationId,
      stationName,
      latitude,
      longitude,
      localState,
    });
  };

  console.log("busArrival", busArrivals?.data);

  const renderItem = ({ item }) => {
    console.log("renderItem", item);
    return (
      // <Text>
      //   {item?.busNumber + " " + item?.arrivalMsg1 + " " + item?.locationNow}
      // </Text>
      <Wrapper>
        <Item.ListText width="25%" numberOfLines={1} ellipsizeMode="tail">
          {item.busNumber}
        </Item.ListText>
        <Item.ListText numberOfLines={1} ellipsizeMode="tail">
          {item.arrivalMsg1}
        </Item.ListText>
        <Item.ListText numberOfLines={1} ellipsizeMode="tail">
          {item.locationNow !== "null" ? item.locationNow : "정보 없음"}
        </Item.ListText>
      </Wrapper>
    );
  };

  return (
    <Overlay height="70%" bottom="40px" xPadding="7%">
      <TouchableOpacity style={{ alignSelf: "flex-end" }}>
        <Icon
          name={busArrivals?.data?.bookmarkState ? "star" : "star-o"}
          size={25}
          color="#F9AC38"
          onPress={() => onPressStar(busArrivals?.data)}
        ></Icon>
      </TouchableOpacity>
      <ArrivalListFlatList
        renderItem={renderItem}
        data={busArrivals?.data?.busArrivalList}
        keyExtractor={(item, idx) =>
          `${item.routeId + item.locationNow + idx + item.busNumber}`
        }
        ListHeaderComponent={
          <>
            <Item.Wrapper>
              <HeaderText
                numberOfLines={1}
                ellipsizeMode="tail"
                fontSize="12px"
                fontWeight="400"
              >
                버스번호
              </HeaderText>
              <HeaderText numberOfLines={1} ellipsizeMode="tail" width="35%">
                도착예정
              </HeaderText>
              <HeaderText numberOfLines={1} ellipsizeMode="tail" width="35%">
                현재 위치
              </HeaderText>
            </Item.Wrapper>
          </>
        }
      />
    </Overlay>
  );
};

export default BusArrivalListOverlay;

const ArrivalListFlatList = styled(FlatList)`
  width: 100%;
  background-color: white;
  border-radius: 15px;
`;

const HeaderText = styled(Text)`
  font-size: 15px;
  font-weight: 700;
  text-align: center;
  width: ${({ width }) => width ?? "30%"};
`;

export const Wrapper = styled(TouchableOpacity)`
  display: flex;
  flex-direction: row;
  padding: 0 10px;
  margin: 13px 0;
  width: 100%;
`;

// export const ItemListText = styled(Text)`
//   width: ${({ width }) => width ?? "37%"};
//   font-size: ${({ fontSize }) => fontSize ?? "12px"};
//   font-weight: ${({ fontWeight }) => fontWeight ?? "400"};
//   color: black;
//   /* ${({ variant }) => {
//     switch (variant) {
//       case "header":
//         return css`
//           font-size: 18px;
//           font-weight: 700;
//           text-align: center;
//           width: ${({ width }) => width};
//         `;
//       //   default:
//       //     return css``;
//     }
//   }}; */
// `;

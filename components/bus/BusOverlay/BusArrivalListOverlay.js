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
import { useGetBusArrival } from "../../../hooks/queries/bus/useGetBusArrival";
import Overlay from "../../common/overlay/Overlay";

const BusArrivalListOverlay = ({ stationNum }) => {
  const { data: busArrivals } = useGetBusArrival(stationNum);

  const renderItem = ({ item }) => {
    return (
      <ItemWrapper>
        <ItemBusNumberText numberOfLines={1} ellipsizeMode="tail">
          {item.busNumber}
        </ItemBusNumberText>
        <ItemNameText numberOfLines={1} ellipsizeMode="tail">
          {item.arrivalMsg1}
        </ItemNameText>
        <ItemNameText numberOfLines={1} ellipsizeMode="tail">
          {item.direction}
        </ItemNameText>
      </ItemWrapper>
    );
  };

  return (
    <Overlay height="70%" bottom="40px" xPadding="7%">
      <ArrivalListFlatList
        renderItem={renderItem}
        data={busArrivals?.data?.busList}
        keyExtractor={(item, idx) =>
          `${item.busRouteId + item.direction + idx}`
        }
        ListHeaderComponent={
          <>
            <ItemWrapper>
              <HeaderBustNumberText numberOfLines={1} ellipsizeMode="tail">
                버스번호
              </HeaderBustNumberText>
              <HeaderNameText numberOfLines={1} ellipsizeMode="tail">
                도착예정
              </HeaderNameText>
              <HeaderNameText numberOfLines={1} ellipsizeMode="tail">
                방면
              </HeaderNameText>
            </ItemWrapper>
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

const ItemWrapper = styled(TouchableOpacity)`
  display: flex;
  flex-direction: row;
  padding-left: 10px;
  padding-right: 10px;
  margin-top: 13px;
  margin-bottom: 13px;
`;

const ItemBusNumberText = styled(Text)`
  font-size: 12px;
  width: 25%;
`;

const ItemNameText = styled(Text)`
  font-size: 12px;
  width: 37%;
`;

const HeaderBustNumberText = styled(ItemBusNumberText)`
  font-size: 18px;
  font-weight: 700;
  text-align: center;
`;
const HeaderNameText = styled(ItemNameText)`
  font-size: 18px;
  font-weight: 700;
  text-align: center;
`;

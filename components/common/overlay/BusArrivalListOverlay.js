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

const BusArrivalListOverlay = ({ data }) => {
  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => {}}>
        <ItemWrapperView>
          <ItemBusNumberText numberOfLines={1} ellipsizeMode="tail">
            {item.busNumber}
          </ItemBusNumberText>
          <ItemNameText numberOfLines={1} ellipsizeMode="tail">
            {item.arrivalMsg1}
          </ItemNameText>
          <ItemNameText numberOfLines={1} ellipsizeMode="tail">
            {item.direction}
          </ItemNameText>
        </ItemWrapperView>
      </TouchableOpacity>
    );
  };

  return (
    <Container>
      <ArrivalListFlatList
        renderItem={renderItem}
        data={data}
        keyExtractor={(item, idx) =>
          `${item.busRouteId + item.direction + idx}`
        }
        ListHeaderComponent={
          <>
            <ItemWrapperView>
              <HeaderBustNumberText numberOfLines={1} ellipsizeMode="tail">
                버스번호
              </HeaderBustNumberText>
              <HeaderNameText numberOfLines={1} ellipsizeMode="tail">
                도착예정
              </HeaderNameText>
              <HeaderNameText numberOfLines={1} ellipsizeMode="tail">
                방면
              </HeaderNameText>
            </ItemWrapperView>
          </>
        }
      />
    </Container>
  );
};

export default BusArrivalListOverlay;

const Container = styled(View)`
  display: flex;
  align-items: center;
  position: absolute;
  width: 100%;
  height: 70%;
  bottom: 50px;
  padding-left: 7%;
  padding-right: 7%;
  margin-top: 10px;
`;

const ArrivalListFlatList = styled(FlatList)`
  width: 100%;
  background-color: white;
  border-radius: 15px;
`;

const ItemWrapperView = styled(View)`
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

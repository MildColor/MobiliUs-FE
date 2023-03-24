import React, { useCallback, useMemo, useState } from "react";
import {
  FlatList,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import styled from "styled-components/native";
import { debouncer } from "../../../utils/debouncing";
import Constants from "expo-constants";
import RangeButton from "../button/RangeButton";

const SearchBarOverlay = ({
  setMarkers,
  setSearchWord,
  setSelectedItem,
  setIsOpenBusArrival,
  data,
}) => {
  const apiUrl = Constants.expoConfig.extra.API_URL;

  const [isOpenList, setIsOpenList] = useState(false);
  const debouncingSearchWord = useMemo(
    () => debouncer((value) => setSearchWord(value), 500),
    []
  );

  const onChangeText = (text) => {
    debouncingSearchWord(text);
  };

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          setIsOpenList(false);
          setMarkers([{ ...item }]);
          setSelectedItem({
            latitude: item.latitude,
            longitude: item.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          });
        }}
      >
        <ItemWrapperView>
          <ItemNameText numberOfLines={1} ellipsizeMode="tail">
            {item.stationName}
          </ItemNameText>
        </ItemWrapperView>
      </TouchableOpacity>
    );
  };

  return (
    <Container>
      <SearchInput
        placeholder="정류장 검색"
        onChangeText={onChangeText}
        onPressIn={() => {
          setIsOpenList(true);
          setIsOpenBusArrival(false);
        }}
      />

      <Text>{apiUrl ?? "아 왜"}</Text>

      {isOpenList && data?.length !== 0 && (
        <>
          <StationListFlatList
            renderItem={renderItem}
            data={data}
            keyExtractor={(item) => item.stationId}
          />
          <CloseButton onPress={() => setIsOpenList(!isOpenList)}>
            <CloseButtonImage
              source={require("../../../assets/arrows/upArrow.png")}
            />
          </CloseButton>
        </>
      )}
    </Container>
  );
};

export default SearchBarOverlay;

const Container = styled(View)`
  display: flex;
  align-items: center;
  position: absolute;
  width: 100%;
  height: 70%;
  top: 30px;
  padding-left: 13%;
  padding-right: 13%;
  margin-top: 10px;
`;

const SearchInput = styled(TextInput)`
  width: 100%;
  height: 40px;
  background-color: gainsboro;
  border-radius: 15px;
  padding-left: 15px;
  padding-right: 15px;
  margin-top: 10px;
`;

const StationListFlatList = styled(FlatList)`
  width: 100%;
  background-color: white;
  border-radius: 15px;
`;

const ItemWrapperView = styled(View)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  padding-left: 10px;
  padding-right: 10px;
  margin-top: 13px;
  margin-bottom: 13px;
`;

const ItemNameText = styled(Text)`
  font-size: 15px;
  width: 100%;
`;

const CloseButton = styled(TouchableOpacity)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 20px;
  background-color: white;
  margin-top: 5px;
  border-radius: 10px;
`;

const CloseButtonImage = styled(Image)`
  width: 15px;
  height: 15px;
`;

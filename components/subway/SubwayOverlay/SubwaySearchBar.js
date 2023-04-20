import React, { useEffect, useMemo, useState } from "react";
import { useGetSubwayArrival } from "../../../hooks/queries/subway/useGetSubwayArrival";
import { debouncer } from "../../../utils/debouncing";
import Overlay from "../../common/overlay/Overlay";
import Input from "../../common/Input/Input";
import { FlatList, Image, Text, TouchableOpacity } from "react-native";
import { useGetSearchBusStation } from "../../../hooks/queries/bus/useGetSearchBusStation";
import { useGetSubwayStation } from "../../../hooks/queries/subway/useGetSubwayStation";
import { subwayApis } from "../../../axios/subway";
import styled from "styled-components";

function SubwaySearchBar({ setMarkers, setFocusedRegion }) {
  const [searchWord, setSearchWord] = useState(null);
  const [isOpenList, setIsOpenList] = useState(false);

  // const { data: subwayArrivalData } = useGetSubwayArrival(searchWord);
  const { data: subwayStationData } = useGetSubwayStation(searchWord);

  // console.log("subwayStationData", subwayStationData?.data);

  const debouncingSearchWord = useMemo(
    () => debouncer((value) => setSearchWord(value), 500),
    []
  );

  const onChangeText = (text) => {
    debouncingSearchWord(text);
  };

  const onPressItem = (item) => {
    setIsOpenList(false);
    setMarkers([{ ...item }]);
    setFocusedRegion({
      latitude: item.latitude,
      longitude: item.longitude,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    });
  };

  const onPressInput = () => {
    setIsOpenList(true);
  };

  useEffect(() => {
    if (subwayStationData) {
      setMarkers([...subwayStationData?.data?.stationList]);
    }
  }, [subwayStationData?.data?.stationList]);

  const renderItem = ({ item }) => {
    return (
      <ItemWrapper onPress={() => onPressItem(item)}>
        <ItemNameText numberOfLines={1} ellipsizeMode="tail">
          {item.stationName}
        </ItemNameText>
      </ItemWrapper>
    );
  };

  return (
    <Overlay height="70%" top="40px" xPadding="13%">
      <Input
        placeholder="정거장 검색"
        onChangeText={onChangeText}
        onPressIn={onPressInput}
      />
      {isOpenList && subwayStationData?.data.stationList?.length !== 0 && (
        <>
          <StationFlatList
            renderItem={renderItem}
            data={subwayStationData?.data.stationList}
            keyExtractor={(item) => item.id}
            ListHeaderComponent={<></>}
          />
          <CloseButton onPress={() => setIsOpenList(!isOpenList)}>
            <CloseButtonImage
              source={require("../../../assets/arrows/upArrow.png")}
            />
          </CloseButton>
        </>
      )}
    </Overlay>
  );
}

export default SubwaySearchBar;

const StationFlatList = styled(FlatList)`
  width: 100%;
  background-color: white;
  border-radius: 15px;
  margin-top: 55px;
`;

const ItemWrapper = styled(TouchableOpacity)`
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
  background-color: white;
  width: 100%;
  height: 20px;
  margin-top: 5px;
  border-radius: 10px;
`;

const CloseButtonImage = styled(Image)`
  width: 15px;
  height: 15px;
`;

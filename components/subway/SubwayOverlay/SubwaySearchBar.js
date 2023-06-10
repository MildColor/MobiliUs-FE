import React, { useEffect, useMemo, useState } from "react";
import { debouncer } from "../../../utils/debouncing";
import Input from "../../common/Input/Input";
import { FlatList, Image, Text, TouchableOpacity } from "react-native";
import { useGetSubwayStation } from "../../../hooks/queries/subway/useGetSubwayStation";
import styled from "styled-components";
import Overlay from "../../common/overlay/Overlay";
import getSubwayLineIcon from "../../../utils/getSubwayLineIcon";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

function SubwaySearchBar({
  setMarkers,
  setFocusedRegion,
  setStationName,
  setIsOpenOverlay,
}) {
  const [searchWord, setSearchWord] = useState(null);
  const [isOpenList, setIsOpenList] = useState(false);

  const { data: subwayStationData } = useGetSubwayStation(searchWord);
  console.log("subwayStationData", subwayStationData?.data);
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
    setStationName(item.stationName);
  };

  const onPressInput = () => {
    setIsOpenList(true);
    setIsOpenOverlay((prev) => {
      return { ...prev, routeTime: false, subwayArrival: false };
    });
    console.log("onPressInput");
  };

  const onPressOutInput = () => {
    setIsOpenOverlay((prev) => {
      return { ...prev, routeTime: true, subwayArrival: false };
    });
    console.log("onPressOutInput");
  };

  useEffect(() => {
    if (subwayStationData) {
      setMarkers([...subwayStationData?.data?.stationList]);
    }
  }, [subwayStationData?.data?.stationList]);

  const renderItem = ({ item }) => {
    const iconInfo = getSubwayLineIcon(item);
    console.log("iconInfo", iconInfo);
    return (
      <ItemWrapper
        onPress={() => onPressItem(item)}
        subwayLine={item.subwayLine}
      >
        <Icon name={iconInfo.iconname} size={18} color={iconInfo.iconcolor} />

        <ItemNameText
          numberOfLines={1}
          ellipsizeMode="tail"
          subwayLine={item.subwayLine}
        >
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
        onPressOut={onPressOutInput}
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
  align-items: center;
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

import React, { useEffect, useState } from "react";
import Overlay from "../../common/overlay/Overlay";
import styled from "styled-components";
import { Dimensions, FlatList, PixelRatio, Text, View } from "react-native";

const subwayArrivalDatas = {
  stationName: "금정",
  subwayList: [
    {
      arrivalArea: "당고개행 - 범계방면",
      id: 1,
      arrivalMsg: "금정 도착",
      currentLocation: "금정",
    },
    {
      arrivalArea: "광운대행 - 명학방면",
      id: 2,
      arrivalMsg: "전역 도착",
      currentLocation: "군포",
    },
    {
      arrivalArea: "청량리행 - 명학방면 (급행)",
      id: 3,
      arrivalMsg: "[6]번째 전역 (수원)",
      currentLocation: "수원",
    },
    {
      arrivalArea: "당고개행 - 범계방면",
      id: 4,
      arrivalMsg: "전역 도착",
      currentLocation: "산본",
    },
    {
      arrivalArea: "광운대행 - 명학방면",
      id: 5,
      arrivalMsg: "[4]번째 전역 (성균관대)",
      currentLocation: "성균관대",
    },
  ],
};

function SubwayArrivalOverlay({ subwayArrivalData }) {
  console.log("subwayArrivalData", subwayArrivalData);

  const [itemSize, setItemSize] = useState(
    PixelRatio.roundToNearestPixel(Dimensions.get("window").width)
  );

  useEffect(() => {
    const handleResize = () => {
      setItemSize(
        PixelRatio.roundToNearestPixel(Dimensions.get("window").width)
      );
    };
    Dimensions.addEventListener("change", handleResize);
    return () => {
      Dimensions.removeEventListener("change", handleResize);
    };
  }, []);

  const renderItem = ({ item }) => {
    console.log("item", item);

    return (
      <ItemWrapper width={itemSize}>
        <Text> 도착지 : {item.arrivalArea}</Text>
        <Text>{item.arrivalMsg}</Text>
        <Text>현위치 : {item.currentLocation}</Text>
      </ItemWrapper>
    );
  };

  return (
    <Overlay height="150px" bottom="15px" xPadding="7%">
      <ListHeader>도착정보</ListHeader>
      <ArrivalFlatList
        // horizontal={true}
        renderItem={renderItem}
        data={subwayArrivalData?.subwayList}
        keyExtractor={(item) => item.id}
        showsHorizontalScrollIndicator={true}
        pagingEnabled
        ListEmptyComponent={<View>L</View>}
        snapToInterval={itemSize}
        snapToAlignment={"start"}
        decelerationRate={"fast"}
        bounces={false}
      />
    </Overlay>
  );
}

export default SubwayArrivalOverlay;

const ArrivalFlatList = styled(FlatList)`
  width: 100%;
  /* background-color: white; */
  border-radius: 15px;
  /* margin-top: 55px; */
  background-color: white;
`;

const ListHeader = styled(Text)`
  width: 100%;
  font-size: 20px;
  font-weight: 700;
  margin: 0 10px 10px 5px;
`;

const ItemWrapper = styled(View)`
  width: 100%;
  padding: 10px;
`;

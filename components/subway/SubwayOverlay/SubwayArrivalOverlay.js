import React, { useEffect, useState } from "react";
import Overlay from "../../common/Overlay/Overlay";
import styled from "styled-components";
import { Dimensions, FlatList, PixelRatio, Text, View } from "react-native";
import { flexRow } from "../../../styles/mixins";

function SubwayArrivalOverlay({ subwayArrivalData }) {
  // console.log("subwayArrivalData", subwayArrivalData);

  const [itemSize, setItemSize] = useState(
    PixelRatio.roundToNearestPixel(Dimensions.get("window").width)
  );

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
    // console.log("item", item);

    return (
      <ItemWrapper width={itemSize}>
        <ItemListText width="30%" numberOfLines={1} ellipsizeMode="tail">
          {item.arrivalArea}
        </ItemListText>
        <ItemListText numberOfLines={1} ellipsizeMode="tail">
          {item.locationNow}
        </ItemListText>
        <ItemListText numberOfLines={1} ellipsizeMode="tail">
          {item.arrivalMsg}
        </ItemListText>
      </ItemWrapper>
    );
  };

  return (
    <Overlay height="150px" bottom="15px" xPadding="7%">
      <ListHeader>도착정보 : {subwayArrivalData?.stationName}</ListHeader>
      <ArrivalFlatList
        renderItem={renderItem}
        data={subwayArrivalData?.subwayArrivalList}
        keyExtractor={(item) => item.id}
        showsHorizontalScrollIndicator={true}
        pagingEnabled
        snapToInterval={itemSize}
        snapToAlignment={"start"}
        decelerationRate={"fast"}
        bounces={false}
        ListHeaderComponent={
          <>
            <ItemWrapper>
              <HeaderText
                numberOfLines={1}
                ellipsizeMode="tail"
                fontSize="12px"
                fontWeight="400"
              >
                도착지
              </HeaderText>
              <HeaderText numberOfLines={1} ellipsizeMode="tail" width="35%">
                현위치
              </HeaderText>
              <HeaderText numberOfLines={1} ellipsizeMode="tail" width="35%">
                메시지
              </HeaderText>
            </ItemWrapper>
          </>
        }
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
  margin: 0 0px 5px 10px;
`;

const ItemWrapper = styled(View)`
  ${flexRow}
  width: 100%;
  padding: 10px;
`;

const HeaderText = styled(Text)`
  font-size: 15px;
  font-weight: 700;
  text-align: center;
  width: ${({ width }) => width ?? "30%"};
`;

export const ItemListText = styled(Text)`
  width: ${({ width }) => width ?? "35%"};
  font-size: ${({ fontSize }) => fontSize ?? "12px"};
  font-weight: ${({ fontWeight }) => fontWeight ?? "400"};
  text-align: center;
  color: black;
  /* ${({ variant }) => {
    switch (variant) {
      case "header":
        return css`
          font-size: 18px;
          font-weight: 700;
          text-align: center;
          width: ${({ width }) => width};
        `;
      //   default:
      //     return css``;
    }
  }}; */
`;

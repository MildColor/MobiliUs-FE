import React, { useContext, useState } from "react";
import {
  FlatList,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import styled from "styled-components";
import { rangeTextsArray } from "../../../constants/buttonTexts";
import RangeButton from "../../common/button/RangeButton";
import { LocationContext } from "../../../contexts/Location/LocationContext";
import Overlay from "../../common/overlay/Overlay";

function RangeButtonsOverlay({ setRadius, setFocusedRegion }) {
  const { location } = useContext(LocationContext);

  const [selectedId, setSelectedId] = useState();

  const onPressItem = (item) => {
    setSelectedId(item.id);
    setRadius(item.range);
    setFocusedRegion({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    });
  };

  const renderItem = ({ item }) => {
    const borderColor = item.id === selectedId ? "#F9AC38" : "white";
    const color = item.id === selectedId ? "#F9AC38" : "black";

    return (
      <ButtonDivider>
        <RangeButton
          item={item}
          onPress={() => onPressItem(item)}
          color={color}
          borderColor={borderColor}
        >
          {item.text}
        </RangeButton>
      </ButtonDivider>
    );
  };

  return (
    <Overlay height="30px" top="95px" xPadding="13%">
      <ButtonsFlatList
        horizontal={true}
        data={rangeTextsArray}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </Overlay>
  );
}

export default RangeButtonsOverlay;

const ButtonsFlatList = styled(FlatList)`
  width: 100%;
`;
const ButtonDivider = styled(View)`
  flex: 1;
  margin-right: 5px;
`;

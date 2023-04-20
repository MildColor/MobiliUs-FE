import React, { useRef, useState } from "react";
import Overlay from "../../common/overlay/Overlay";
import { View } from "react-native";
import { flexRow } from "../../../styles/mixins";
import RangeButton from "../../common/Button/RangeButton";
import styled from "styled-components";
import Icon from "react-native-vector-icons/FontAwesome";
import {
  ARRIVAL_BUTTON,
  DEPARTURE_BUTTON,
} from "../../../constants/selectedButton";

function RouteSettingOverlay({
  selectedButtonId,
  setSelectedButtonId,
  subwayRoute,
}) {
  const handleOnPress = (buttonId) => {
    setSelectedButtonId(buttonId);
  };

  return (
    <Overlay height="40px" top="100px" xPadding="13%">
      <Container>
        <RangeButton
          id="departureButton"
          onPress={() => handleOnPress(DEPARTURE_BUTTON)}
          color={selectedButtonId === DEPARTURE_BUTTON ? "#F9AC38" : "black"}
          borderColor={
            selectedButtonId === DEPARTURE_BUTTON ? "#F9AC38" : "black"
          }
        >
          {subwayRoute.departure.stationName ?? "출발"}
        </RangeButton>
        <Icon name="long-arrow-right" size={30} color="#F9AC38" />
        <RangeButton
          id="arrivalButton"
          onPress={() => handleOnPress(ARRIVAL_BUTTON)}
          color={selectedButtonId === ARRIVAL_BUTTON ? "#F9AC38" : "black"}
          borderColor={
            selectedButtonId === ARRIVAL_BUTTON ? "#F9AC38" : "black"
          }
        >
          {subwayRoute.arrival.stationName ?? "도착"}
        </RangeButton>
      </Container>
    </Overlay>
  );
}

export default RouteSettingOverlay;

const Container = styled(View)`
  ${flexRow}
  align-items: center;
  justify-content: space-evenly;
  width: 100%;
  height: 100%;
  background-color: white;
  border-radius: 15px;
`;

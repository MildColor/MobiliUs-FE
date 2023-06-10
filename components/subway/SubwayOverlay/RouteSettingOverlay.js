import React, { useRef, useState } from "react";
import { View } from "react-native";
import { flexRow } from "../../../styles/mixins";
import RangeButton from "../../common/button/RangeButton";
import styled from "styled-components";
import Icon from "react-native-vector-icons/FontAwesome";
import {
  ARRIVAL_BUTTON,
  DEPARTURE_BUTTON,
} from "../../../constants/selectedButton";
import Overlay from "../../common/overlay/Overlay";

function RouteSettingOverlay({
  selectedButtonId,
  setSelectedButtonId,
  subwayRoute,
  setSubwayRoute,
}) {
  const handleOnPress = (buttonId) => {
    setSelectedButtonId(buttonId);
  };

  const onPressReverse = () => {
    setSubwayRoute({
      ...subwayRoute,
      departure: { ...subwayRoute.arrival },
      arrival: { ...subwayRoute.departure },
    });
  };

  return (
    <Overlay height="40px" top="100px" xPadding="13%">
      <Container>
        <ButtonDivider width="40%">
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
        </ButtonDivider>
        <ButtonDivider width="20%">
          <Icon
            name="refresh"
            size={25}
            color="#F9AC38"
            onPress={onPressReverse}
          />
        </ButtonDivider>
        <ButtonDivider width="40%">
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
        </ButtonDivider>
      </Container>
    </Overlay>
  );
}

export default RouteSettingOverlay;

const Container = styled(View)`
  ${flexRow}
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background-color: white;
  border-radius: 15px;
`;

const ButtonDivider = styled(View)`
  flex: 1;
  height: 100%;
  width: ${({ width }) => width};
  align-items: center;
  justify-content: center;
`;

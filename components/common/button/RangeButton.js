import React from "react";
import { Text, TouchableOpacity } from "react-native";
import styled from "styled-components";

export function RangeButton({ onPress, item, children, color, borderColor }) {
  return (
    <Container onPress={onPress} borderColor={borderColor}>
      <ButtonText color={color}>{children}</ButtonText>
    </Container>
  );
}

export default RangeButton;

const Container = styled(TouchableOpacity)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 25px;
  background-color: white;
  border-radius: 12px;
  margin-right: 7px;
  border-color: ${(props) => props.borderColor};
  border-width: 2px;
`;
const ButtonText = styled(Text)`
  color: ${(props) => props.color};
  font-weight: 600;
`;

import React, { forwardRef } from "react";
import { Text, TouchableOpacity } from "react-native";
import styled from "styled-components";

const RangeButton = forwardRef((props, ref) => {
  return (
    <Container
      onPress={props.onPress}
      borderColor={props.borderColor}
      ref={ref}
    >
      <ButtonText color={props.color} numberOfLines={1} ellipsizeMode="tail">
        {props.children}
      </ButtonText>
    </Container>
  );
});

export default RangeButton;

const Container = styled(TouchableOpacity)`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  /* width: 100px; */
  max-width: 100px;
  min-width: 50px;
  height: 25px;
  border-radius: 12px;
  border-color: ${(props) => props.borderColor};
  border-width: 2px;
  padding: 0px 5px;
`;
const ButtonText = styled(Text)`
  color: ${(props) => props.color};
  font-weight: 600;
`;

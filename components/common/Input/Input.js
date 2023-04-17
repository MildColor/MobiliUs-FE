import React from "react";
import { TextInput } from "react-native-paper";
import styled from "styled-components";

function Input({
  width,
  height,
  bgColor,
  onChangeText,
  placeholder,
  ...props
}) {
  return (
    <StInput onChangeText={onChangeText} placeholder={placeholder} {...props} />
  );
}

export default Input;

const StInput = styled(TextInput)`
  width: 100%;
  height: 40px;
  background-color: gainsboro;
  border-radius: 15px;
  padding: 0 15px;
  margin-top: 10px;
`;

import React from "react";

import * as Style from "./ListItem.styles";
import styled from "styled-components";
import { Text } from "react-native";

export function Wrapper({ children, ...props }) {
  return <Style.Wrapper {...props}>{children}</Style.Wrapper>;
}

export function ListText({
  children,
  width = "37%",
  fontSize = "12px",
  fontWeight = "400",
  ...props
}) {
  <Style.ListText
    // width={width}
    // fontSize={fontSize}
    // fontWeight={fontWeight}
    {...props}
  >
    {children}
  </Style.ListText>;
}

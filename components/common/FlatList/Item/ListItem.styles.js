import React from "react";
import { Text, TouchableOpacity } from "react-native";

import styled from "styled-components/native";

export const Wrapper = styled(TouchableOpacity)`
  display: flex;
  flex-direction: row;
  padding: 0 10px;
  margin: 13px 0;
  width: 100%;
`;

export const ListText = styled(Text)`
  width: ${({ width }) => width ?? "37%"};
  font-size: ${({ fontSize }) => fontSize ?? "12px"};
  font-weight: ${({ fontWeight }) => fontWeight ?? "400"};
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
      default:
        return css``;
    }
  }}; */
`;

// export const HeaderItemText = styled(ItemText)`
//   font-size: 18px;
//   font-weight: 700;
//   text-align: center;
//   width: ${({ width }) => width};
// `;

import React from "react";
import { View } from "react-native";
import styled from "styled-components";

function Overlay({
  children,
  width = "100%",
  height,
  top,
  xPadding = 0,
  yPadding = 0,
  ...props
}) {
  return (
    <OverlayWrapper
      width={width}
      height={height}
      top={top}
      xPadding={xPadding}
      yPadding={yPadding}
      {...props}
    >
      {children}
    </OverlayWrapper>
  );
}

export default Overlay;

const OverlayWrapper = styled(View)`
  display: flex;
  position: absolute;
  align-items: center;
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  top: ${(props) => props.top};
  padding: ${({ xPadding, yPadding }) => `${xPadding + " " + yPadding} `};
`;

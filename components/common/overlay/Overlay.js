import React from "react";
import { View } from "react-native";
import styled from "styled-components";

function Overlay({
  children,
  width = "100%",
  height,
  top = "auto",
  bottom = "auto",
  xPadding = 0,
  yPadding = 0,
  ...props
}) {
  return (
    <OverlayWrapper
      width={width}
      height={height}
      top={top}
      bottom={bottom}
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
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  top: ${({ top }) => top};
  bottom: ${({ bottom }) => bottom};
  padding: ${({ xPadding, yPadding }) => `${yPadding + " " + xPadding} `};
`;

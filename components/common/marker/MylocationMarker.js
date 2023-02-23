import React from "react";
import { View, Image } from "react-native";
import styled from "styled-components/native";

const MylocationMarker = () => {
  return (
    <ImageContainer>
      <StImage source={{ uri: "https://ifh.cc/g/BqGBlm.png" }}></StImage>
    </ImageContainer>
  );
};

export default MylocationMarker;

const ImageContainer = styled(View)`
  height: 45px;
  width: 45px;
`;

const StImage = styled(Image)`
  height: 45px;
  width: 45px;
`;

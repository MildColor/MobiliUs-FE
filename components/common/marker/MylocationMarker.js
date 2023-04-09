import React from "react";
import { View, Image } from "react-native";
import { Marker } from "react-native-maps";
import styled from "styled-components/native";

const MylocationMarker = ({ coordinate, title }) => {
  return (
    <Marker
      coordinate={{
        latitude: coordinate.latitude,
        longitude: coordinate.longitude,
      }}
      title={title}
    >
      <ImageContainer>
        <StImage source={{ uri: "https://ifh.cc/g/BqGBlm.png" }}></StImage>
      </ImageContainer>
    </Marker>
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

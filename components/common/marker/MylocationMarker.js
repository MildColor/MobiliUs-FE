import React from "react";
import { View, Image } from "react-native";
import { Circle, Marker } from "react-native-maps";
import styled from "styled-components/native";

const MylocationMarker = ({ coordinate, title, radius = 0 }) => {
  return (
    <>
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

      <Circle
        center={{
          latitude: coordinate.latitude,
          longitude: coordinate.longitude,
        }}
        radius={radius}
        strokeWidth={2}
        strokeColor={"rgba(249, 172, 56, 0.8)"}
        fillColor={"rgba(249, 172, 56, 0.2)"}
      />
    </>
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

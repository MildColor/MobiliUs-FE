import React, { useContext } from "react";
import { View, Image } from "react-native";
import { Circle, Marker } from "react-native-maps";
import styled from "styled-components/native";
import { LocationContext } from "../../../contexts/Location/LocationContext";

const MylocationMarker = ({ title, radius = 0 }) => {
  const { location } = useContext(LocationContext);

  return (
    <>
      <Marker
        coordinate={{
          latitude: location?.coords?.latitude,
          longitude: location?.coords?.longitude,
        }}
        title={title}
      >
        <StImage source={{ uri: "https://ifh.cc/g/BqGBlm.png" }}></StImage>
      </Marker>

      <Circle
        center={{
          latitude: location?.coords?.latitude,
          longitude: location?.coords?.longitude,
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

const StImage = styled(Image)`
  height: 45px;
  width: 45px;
`;

import React from "react";
import MapView, {
  Circle,
  PROVIDER_GOOGLE,
  Marker,
  Polyline,
} from "react-native-maps";
import { SafeAreaView } from "react-native-safe-area-context";
import styled from "styled-components";
import { StatusBar } from "expo-status-bar";

function MapViewLayout({ children, region, onPress }) {
  return (
    <MapViewContainer>
      <StMapView region={region} provider={PROVIDER_GOOGLE} onPress={onPress}>
        {children}
      </StMapView>
      <StatusBar style="auto" />
    </MapViewContainer>
  );
}

export default MapViewLayout;

const MapViewContainer = styled(SafeAreaView)`
  flex: 1;
`;

const StMapView = styled(MapView)`
  width: 100%;
  height: 100%;
`;

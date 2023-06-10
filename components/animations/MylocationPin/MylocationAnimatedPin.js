import React, { useRef, useEffect } from "react";
import { Button, StyleSheet, View } from "react-native";
import LottieView from "lottie-react-native";
import styled from "styled-components/native";

function MylocationAnimatedPin() {
  const animation = useRef(null);

  return (
    <LottieView
      autoPlay
      loop
      ref={animation}
      style={{
        width: 35,
        height: 35,
        backgroundColor: "rgba(255, 255, 255, 0)",
      }}
      source={require("../../../assets/animations/location-pin-animation.json")}
    />
  );
}

export default MylocationAnimatedPin;

const AnimationView = styled.View`
  flex: 1;
  background-color: white;
  align-items: center;
  justify-content: center;
`;

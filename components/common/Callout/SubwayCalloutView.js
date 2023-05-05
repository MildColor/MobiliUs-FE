import React from "react";
import { Text, View } from "react-native";
import { CalloutSubview } from "react-native-maps";
import styled from "styled-components";

function SubwayCalloutView({ ...props }) {
  // console.log("makers", props);
  return (
    <CalloutWrapper>
      <ItemWrapper>
        <Text>출발</Text>
      </ItemWrapper>
      <ItemWrapper>
        <Text>도착</Text>
      </ItemWrapper>
    </CalloutWrapper>
  );
}

export default SubwayCalloutView;

const CalloutWrapper = styled(View)`
  display: flex;
  flex-direction: row;
  width: 90px;
  height: 35px;
  background-color: white;
  border-radius: 5px;
`;
const ItemWrapper = styled(View)`
  display: flex;
  flex-direction: column;
  align-items: center;
  /* justify-content: center; */
  width: 50%;
  height: 100%;
`;

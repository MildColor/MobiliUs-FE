import React, { useContext } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AuthContext } from "../contexts/Auth/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styled from "styled-components";
import { flexRow } from "../styles/mixins";
import { useNavigation } from "@react-navigation/native";

function Profile() {
  const { signOut } = useContext(AuthContext);
  const navigation = useNavigation();

  const onPressLogout = async () => {
    await AsyncStorage.removeItem("accessToken");
    signOut();
  };

  const onPressBusBookmark = () => {
    navigation.navigate("BusBookmark");
  };
  const onPressSubwayBookmark = () => {
    navigation.navigate("SubwayBookmark");
  };

  return (
    <SafeAreaView>
      <Container>
        <Button onPress={onPressLogout}>
          <Image
            source={require("../assets/logo/google/google-mini-logo.png")}
            resizeMode="contain"
          />
          <LogoText>SIGN OUT GOOGLE</LogoText>
        </Button>
        <Button onPress={onPressBusBookmark}>
          <LogoText>BUS BOOKMARK</LogoText>
        </Button>
        <Button onPress={onPressSubwayBookmark}>
          <LogoText>SUBWAY BOOKMARK</LogoText>
        </Button>
      </Container>
    </SafeAreaView>
  );
}

export default Profile;

const Container = styled(View)`
  height: 100%;
  justify-content: center;
  align-items: center;
`;

const Button = styled(TouchableOpacity)`
  ${flexRow}
  align-items: center;
  width: 250px;
  height: 50px;
  padding: 8px;
  margin: 5px auto;
  border-width: 1px;
  border-radius: 12px;
  border-color: black;
`;
const LogoText = styled(Text)`
  font-size: 18px;
  font-weight: 600;
  margin: 0 auto;
`;

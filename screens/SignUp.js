import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import styled from "styled-components/native";
import { flexRow } from "../styles/mixins";

function SignUp() {
  const navigation = useNavigation();
  const onPressGoogleLogin = () => {
    return navigation.navigate("GoogleLogin");
  };

  return (
    <>
      <SafeAreaView>
        <Container>
          <LogoImage
            source={require("../assets/logo/mobillius/basic-logo.png")}
            resizeMode="contain"
          />
          <TextContainer>
            <MainText>안녕하세요! </MainText>
            <MainText>MobilliUs 입니다.</MainText>
            <SubText>더 많은 서비스를 위해 로그인 해주세요.</SubText>
          </TextContainer>

          <GoogleSignInButton onPress={() => onPressGoogleLogin()}>
            <Image
              source={require("../assets/logo/google/google-mini-logo.png")}
              resizeMode="contain"
            />
            <LogoText>SIGN WITH GOOGLE</LogoText>
          </GoogleSignInButton>
        </Container>
      </SafeAreaView>
    </>
  );
}

export default SignUp;

const Container = styled(View)`
  height: 100%;
  width: 100%;
  background-color: white;
  padding: 10% 20px;
`;

const LogoImage = styled(Image)`
  width: 120px;
  height: 120px;
`;

const TextContainer = styled(View)``;

const MainText = styled(Text)`
  font-size: 24px;
  font-weight: bold;
`;

const SubText = styled(Text)`
  font-size: 16px;
  margin-top: 10px;
`;

const LogoText = styled(Text)`
  font-size: 18px;
  font-weight: 600;
  margin: 0 auto;
`;

const GoogleSignInButton = styled(TouchableOpacity)`
  ${flexRow}
  align-items: center;
  width: 250px;
  height: 50px;
  padding: 8px;
  margin: 0 auto;
  border-width: 1px;
  border-radius: 12px;
  border-color: black;
  top: 50%;
`;
// const styles = StyleSheet.create({
//   shadowProp: {
//     shadowColor: "#171717",
//     shadowOffset: { width: -2, height: 4 },
//     shadowOpacity: 0.2,
//     shadowRadius: 3,
//   },
// });

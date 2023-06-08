import React, { useContext } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { WebView } from "react-native-webview";
import Constants from "expo-constants";
import { Alert } from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "../../../contexts/Auth/AuthContext";

const runFirst = `window.ReactNativeWebView.postMessage("this is message from web");`;

function GoogleLogin() {
  const { API_URL, client_id, redirect_uri } = Constants.expoConfig.extra;

  const { signIn } = useContext(AuthContext);

  function LogInProgress(data) {
    const exp = "code=";
    let condition = data.indexOf(exp);

    if (condition != -1) {
      let url = data.substring(condition + exp.length);
      let request_code = url.split("&")[0];
      sendRequestCode(request_code);
    }
  }

  const sendRequestCode = async (request_code) => {
    try {
      const res = await axios.get(
        `${API_URL}/members/google/login?code=${request_code}`
      );

      const {
        data,
        headers: { authorization },
        status,
      } = res;

      const accessToken = authorization;
      const refreshToken = res.headers["refresh-token"];

      if (status === 200) {
        await AsyncStorage.setItem("accessToken", accessToken);
        await AsyncStorage.setItem("refreshToken", refreshToken);
        signIn(accessToken);
      }
    } catch (error) {
      Alert.alert("Error", `${error}`, [
        {
          text: "Error",
          style: "cancel",
        },
      ]);
    }
  };

  return (
    <WebView
      originWhitelist={["*"]}
      scalesPageToFit={false}
      source={{
        uri: `https://accounts.google.com/o/oauth2/v2/auth/oauthchooseaccount?client_id=${client_id}&redirect_uri=${redirect_uri}&response_type=code&scope=https://www.googleapis.com/auth/userinfo.profile+https://www.googleapis.com/auth/userinfo.email`,
      }}
      injectedJavaScript={runFirst}
      javaScriptEnabled={true}
      userAgent="Chrome/110.0.0.0 Mobile"
      onMessage={(event) => {
        LogInProgress(event.nativeEvent["url"]);
      }}
    />
  );
}

export default GoogleLogin;

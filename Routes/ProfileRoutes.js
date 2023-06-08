import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Profile from "../screens/Profile";
import BusBookmark from "../screens/Bookmark/BusBookmark";
import SubwayBookmark from "../screens/Bookmark/SubwayBookmark";

const ProfileStack = createNativeStackNavigator();

function ProfileRoutes() {
  return (
    <ProfileStack.Navigator initialRouteName="Profile">
      <ProfileStack.Screen
        name="Profile"
        component={Profile}
        options={{ headerShown: false }}
      />
      <ProfileStack.Screen
        name="BusBookmark"
        component={BusBookmark}
        options={{ headerShown: false }}
      />
      <ProfileStack.Screen
        name="SubwayBookmark"
        component={SubwayBookmark}
        options={{ headerShown: false }}
      />
    </ProfileStack.Navigator>
  );
}

export default ProfileRoutes;

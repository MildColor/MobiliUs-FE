import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";

import BusMain from "./screens/BusMain";
import SubwayMain from "./screens/SubwayMain";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import LocationProvider from "./contexts/Location/LocationProvider";
import SignUp from "./screens/SignUp";
import GoogleLogin from "./screens/Oauth/google/GoogleLogin";
import { useContext, useEffect, useMemo, useReducer } from "react";
import { AuthContext } from "./contexts/Auth/AuthContext";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Profile from "./screens/Profile";
import SplashScreen from "./components/SplashScreen/SplashScreen";
import ProfileRoutes from "./Routes/ProfileRoutes";
import BookmarkProvider from "./contexts/Bookmark/BookmarkProvider";

const queryClient = new QueryClient();
const Tab = createMaterialBottomTabNavigator();
const Stack = createNativeStackNavigator();

export default function App() {
  const [state, dispatch] = useReducer(
    (prevState, action) => {
      switch (action.type) {
        case "RESTORE_TOKEN":
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case "SIGN_IN":
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
          };
        case "SIGN_OUT":
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
    }
  );

  useEffect(() => {
    const bootstrapAsync = async () => {
      let accessToken;

      try {
        accessToken = await AsyncStorage.getItem("accessToken");
      } catch (e) {
        console.log("Couldn't get access token");
      }

      dispatch({ type: "RESTORE_TOKEN", token: accessToken });
    };

    bootstrapAsync();
  }, []);

  const authContext = useMemo(
    () => ({
      signIn: async (accessToken) => {
        dispatch({ type: "SIGN_IN", token: accessToken });
      },
      signOut: () => dispatch({ type: "SIGN_OUT" }),
      signUp: async (accessToken) => {
        dispatch({ type: "SIGN_IN", token: accessToken });
      },
    }),
    []
  );

  if (state.isLoading) {
    return <SplashScreen />;
  }
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <AuthContext.Provider value={authContext}>
          <LocationProvider>
            <NavigationContainer>
              {state.userToken == null ? (
                <Stack.Navigator>
                  <Stack.Screen
                    name="SignUp"
                    component={SignUp}
                    options={{
                      headerShown: false,
                    }}
                  />

                  <Stack.Screen
                    name="GoogleLogin"
                    component={GoogleLogin}
                    options={{
                      headerShown: false,
                    }}
                  />
                </Stack.Navigator>
              ) : (
                <BookmarkProvider>
                  <Tab.Navigator initialRouteName="Bus" shifting={true}>
                    <Tab.Screen
                      name="Bus"
                      component={BusMain}
                      options={{
                        headerShown: false,
                        tabBarIcon: ({ color, size = 26 }) => (
                          <MaterialCommunityIcons
                            name="bus"
                            color={color}
                            size={size}
                          />
                        ),
                      }}
                    />
                    <Tab.Screen
                      name="Subway"
                      component={SubwayMain}
                      options={{
                        headerShown: false,
                        tabBarIcon: ({ color, size = 26 }) => (
                          <MaterialCommunityIcons
                            name="subway-variant"
                            color={color}
                            size={size}
                          />
                        ),
                      }}
                    />
                    <Tab.Screen
                      name="My Page"
                      component={ProfileRoutes}
                      options={{
                        headerShown: false,
                        tabBarIcon: ({ color, size = 26 }) => (
                          <MaterialCommunityIcons
                            name="account"
                            color={color}
                            size={size}
                          />
                        ),
                      }}
                    />
                  </Tab.Navigator>
                </BookmarkProvider>
              )}
            </NavigationContainer>
          </LocationProvider>
        </AuthContext.Provider>
      </QueryClientProvider>
    </>
  );
}

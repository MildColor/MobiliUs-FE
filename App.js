import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";

import BusMain from "./screens/BusMain";
import SubwayMain from "./screens/SubwayMain";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import LocationProvider from "./contexts/Location/LocationProvider";

const queryClient = new QueryClient();
const Tab = createMaterialBottomTabNavigator();

export default function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <LocationProvider>
          <NavigationContainer>
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
            </Tab.Navigator>
          </NavigationContainer>
        </LocationProvider>
      </QueryClientProvider>
    </>
  );
}

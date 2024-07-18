import React, { useEffect } from "react";
import { Tabs } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import * as SplashScreen from "expo-splash-screen";
import {
  useFonts,
  SpaceGrotesk_400Regular,
} from "@expo-google-fonts/space-grotesk";
import * as NavigationBar from "expo-navigation-bar";
import { AccountProvider } from "../../context/accountsContext";

const TabLayout = () => {
  const [fontsLoaded] = useFonts({
    SpaceGrotesk_400Regular,
  });
  NavigationBar.setVisibilityAsync("hidden");

  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
    }
    prepare();
  }, []);

  if (!fontsLoaded) {
    return null;
  } else {
    SplashScreen.hideAsync();
  }

  return (
    <AccountProvider>
      <Tabs
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, size }) => {
            let iconName;

            if (route.name === "index") {
              iconName = focused ? "home" : "home-outline";
            } else if (route.name === "accounts") {
              iconName = focused ? "wallet" : "wallet-outline";
            } else if (route.name === "budgets") {
              iconName = focused ? "pie-chart" : "pie-chart-outline";
            } else if (route.name === "settings") {
              iconName = focused ? "settings" : "settings-outline";
            }

            return <Ionicons name={iconName} size={size} color={"#EEF0F2"} />;
          },
          tabBarStyle: {
            backgroundColor: "#416788",
            height: 90,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            padding: 10,
          },
          tabBarIconStyle: { color: "#EEF0F2", paddingBottom: 0 },
          tabBarLabelStyle: {
            color: "#EEF0F2",
            paddingBottom: 15,
            fontFamily: "SpaceGrotesk_400Regular",
          },
        })}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            headerShown: false,
          }}
        />
        <Tabs.Screen
          name="accounts"
          options={{
            title: "Accounts",
            headerShown: false,
          }}
        />
        <Tabs.Screen
          name="budgets"
          options={{
            title: "Budgets",
            headerShown: false,
          }}
        />
        <Tabs.Screen
          name="settings"
          options={{
            title: "Settings",
            headerShown: false,
          }}
        />
      </Tabs>
    </AccountProvider>
  );
};

export default TabLayout;

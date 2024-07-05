import React, { useEffect, useState } from "react";
import { Stack } from "expo-router/stack";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createTables } from "../db/database";

export default function RootLayout() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const initializeDatabase = async () => {
      await createTables();
    };

    const checkUser = async () => {
      const user = await AsyncStorage.getItem("user");
      setIsAuthenticated(!!user);
    };

    initializeDatabase();
    checkUser();
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      router.replace("(tabs)");
    } else {
      router.replace("welcome");
    }
  }, [isAuthenticated]);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="welcome" />
      <Stack.Screen name="login" />
      <Stack.Screen name="register" />
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
}

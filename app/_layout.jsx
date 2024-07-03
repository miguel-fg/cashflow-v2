import React, { useEffect, useState } from "react";
import { Stack } from "expo-router/stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createTables } from "../db/database";

export default function RootLayout() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

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

  return (
    <Stack screenOptions={{ headerShown: false }}>
      {!isAuthenticated ? (
        <>
          <Stack.Screen name="index" />
          <Stack.Screen name="login" />
          <Stack.Screen name="register" />
        </>
      ) : (
        <Stack.Screen name="(tabs)" />
      )}
    </Stack>
  );
}

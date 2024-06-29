import React, { useEffect } from "react";
import { Stack } from "expo-router/stack";
import { createTables } from "../db/database";

export default function RootLayout() {
  useEffect(() => {
    const initializeDatabase = async () => {
      await createTables();
    };
    initializeDatabase();
  }, []);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="login" />
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
}

import { Stack } from 'expo-router/stack';
import { Text, View } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState, useCallback } from "react"

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();


export default function Layout() {


  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 1000)
  }, []);


  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="showMoment" options={{ headerShown: false }} />
    </Stack>
  );
}

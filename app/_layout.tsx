import { Stack } from 'expo-router/stack';
import { Text, View } from 'react-native';

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="showMoment" options={{ headerShown: false }} />
    </Stack>
  );
}

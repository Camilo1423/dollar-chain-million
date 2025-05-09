import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import "react-native-reanimated";
import "../src/presentation/css/global.css";
import { StatusBar } from "react-native";

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require("../src/presentation/assets/fonts/SpaceMono-Regular.ttf"),
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <>
      <Stack screenOptions={{
        headerStyle: {
          backgroundColor: '#111827',
        },
        headerTintColor: '#111827',
      }}>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="crypto/[id]" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar barStyle="light-content" backgroundColor="#111827" />
    </>
  );
}

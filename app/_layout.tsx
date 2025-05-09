import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { StatusBar } from "react-native";
import "react-native-reanimated";
import "../src/presentation/css/global.css";

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
      <Stack>
        <Stack.Screen name="favorites/index" options={{ headerShown: false }} />
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="crypto/[id]" options={{ headerShown: false }} />

        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar barStyle="light-content" backgroundColor="#111827" />
    </>
  );
}

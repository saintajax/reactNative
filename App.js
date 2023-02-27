import { View } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import { useCallback } from "react";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";

import useRoute from "./src/hooks/router";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded] = useFonts({
    "Roboto-Regular": require("./src/fonts/Roboto/Roboto-Regular.ttf"),
    "Roboto-Medium": require("./src/fonts/Roboto/Roboto-Medium.ttf"),
  });
  const routing = useRoute(true);

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View onLayout={onLayoutRootView} style={{ flex: 1 }}>
      <NavigationContainer>{routing}</NavigationContainer>
    </View>
  );
}

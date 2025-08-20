import React, { useEffect } from "react";
import { StyleSheet, Dimensions } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
  runOnJS,
} from "react-native-reanimated";
import Wave from "../components/Wave";


const { width, height } = Dimensions.get("window");

interface SplashScreenProps {
  onFinish: () => void;
}

export default function SplashScreen({ onFinish }: SplashScreenProps) {
  const opacity = useSharedValue(0);
  const bgFade = useSharedValue(1); // controls wave visibility

  useEffect(() => {
    // Fade in text
    opacity.value = withTiming(1, { duration: 1200, easing: Easing.ease });

    // Transition after a delay
    setTimeout(() => {
      bgFade.value = withTiming(0, { duration: 1000 }, (finished) => {
        if (finished) runOnJS(onFinish)();
      });
    }, 1800);
  }, []);

  const textStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  const waveStyle = useAnimatedStyle(() => ({
    opacity: bgFade.value,
  }));

  return (
    <Animated.View style={[styles.container]}>
      {/* Animated Waves as background */}
      <Animated.View style={[StyleSheet.absoluteFill, waveStyle]}>
        <Wave
          color="#00A0A0"
          amplitude={20}
          frequency={0.02}
          verticalOffset={200}
          speed={4000}
          opacity={1}
          fullHeight={height}
        />
        <Wave
          color="#009090"
          amplitude={25}
          frequency={0.025}
          verticalOffset={210}
          speed={5000}
          opacity={0.6}
          fullHeight={height}
        />
      </Animated.View>

      {/* Safely text */}
      <Animated.Text style={[styles.text, textStyle]}>safely</Animated.Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width,
    height,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff", 
  },
  text: {
    fontFamily: "SpaceGrotesk_700Bold",
    fontSize: 42,
    color: "#00A0A0",
  },
});

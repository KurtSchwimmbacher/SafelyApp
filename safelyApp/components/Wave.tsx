import React, { useEffect } from "react";
import { Dimensions } from "react-native";
import Svg, { Path } from "react-native-svg";
import Animated, {
  useSharedValue,
  useAnimatedProps,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

const { width } = Dimensions.get("window");
const AnimatedPath = Animated.createAnimatedComponent(Path);

interface WaveProps {
  color: string;
  amplitude?: number;
  frequency?: number;
  verticalOffset?: number;
  speed?: number;
  opacity?: number;
  fullHeight: number; // New prop for full screen height fill
}

const Wave: React.FC<WaveProps> = ({
  color,
  amplitude = 20,
  frequency = 0.02,
  verticalOffset = 0,
  speed = 4000,
  opacity = 1,
  fullHeight,
}) => {
  const waveOffset = useSharedValue(0);

  useEffect(() => {
    waveOffset.value = withRepeat(withTiming(2 * Math.PI, { duration: speed }), -1, false);
  }, [speed]);

  const animatedProps = useAnimatedProps(() => {
    let path = `M0 ${verticalOffset}`;
    for (let x = 0; x <= width; x += 5) {
      const y = amplitude * Math.sin(frequency * x + waveOffset.value) + verticalOffset;
      path += ` L${x} ${y}`;
    }
    // Close path to fill to the bottom of the screen
    path += ` L${width} ${fullHeight} L0 ${fullHeight} Z`;
    return { d: path };
  });

  return (
    <Svg
      style={{ position: "absolute", top: 0, left: 0, width: '100%' }}
      width={width}
      height={fullHeight} // Set to full screen height
    >
      <AnimatedPath animatedProps={animatedProps} fill={color} opacity={opacity} />
    </Svg>
  );
};

export default Wave;
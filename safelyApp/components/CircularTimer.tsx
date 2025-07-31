import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Svg, { Circle, Line } from 'react-native-svg';
import { PanGestureHandler } from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  runOnJS,
} from 'react-native-reanimated';

const { width } = Dimensions.get('window');
const SIZE = width * 0.8;
const STROKE_WIDTH = 20;
const RADIUS = (SIZE - STROKE_WIDTH) / 2;
const CENTER = SIZE / 2;

const angleToPosition = (angle: number) => {
  const rads = ((angle - 90) * Math.PI) / 180;
  return {
    x: CENTER + RADIUS * Math.cos(rads),
    y: CENTER + RADIUS * Math.sin(rads),
  };
};

const angleToMinutes = (angle: number) => {
  const normalized = (angle + 360) % 360;
  return Math.round((normalized / 360) * 120);
};

export default function CircularTimer() {
  const [minutes, setMinutes] = useState(0);

  const angle = useSharedValue(0);
  const knobX = useSharedValue(CENTER);
  const knobY = useSharedValue(CENTER - RADIUS);

const gestureHandler = useAnimatedGestureHandler({
  onActive: (event) => {
    const dx = event.x - CENTER;
    const dy = event.y - CENTER;
    const rawAngle = Math.atan2(dy, dx) * (180 / Math.PI) + 90;
    angle.value = rawAngle;

    const rads = ((rawAngle - 90) * Math.PI) / 180;
    knobX.value = CENTER + RADIUS * Math.cos(rads);
    knobY.value = CENTER + RADIUS * Math.sin(rads);

    runOnJS(setMinutes)(angleToMinutes(rawAngle));
  },
});


  const knobStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: knobX.value - 15 },
        { translateY: knobY.value - 15 },
      ],
    };
  });

  // Render static line from center to knob
  const staticKnobPos = angleToPosition(angle.value);

  return (
    <View style={styles.wrapper}>
      <Svg width={SIZE} height={SIZE}>
        <Circle
          cx={CENTER}
          cy={CENTER}
          r={RADIUS}
          stroke="#ddd"
          strokeWidth={STROKE_WIDTH}
          fill="#fff"
        />
        <Line
          x1={CENTER}
          y1={CENTER}
          x2={staticKnobPos.x}
          y2={staticKnobPos.y}
          stroke="#888"
          strokeWidth={3}
        />
      </Svg>

      <View style={styles.centerText}>
        <Text style={{ fontSize: 36 }}>{minutes}</Text>
        <Text>minutes</Text>
      </View>

      <PanGestureHandler onGestureEvent={gestureHandler}>
        <Animated.View style={[styles.knob, knobStyle]} />
      </PanGestureHandler>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: SIZE,
    height: SIZE,
    justifyContent: 'center',
    alignItems: 'center',
  },
  knob: {
    position: 'absolute',
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#222',
  },
  centerText: {
    position: 'absolute',
    top: '40%',
    left: 0,
    right: 0,
    alignItems: 'center',
  },
});

import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle, useSharedValue, runOnJS } from 'react-native-reanimated';
import { Colors, Spacing, Typography } from '../styles/GlobalStyles';

interface CircularKnobProps {
  value: number; // Current value (0-60)
  onChange: (value: number) => void; // Callback for value updates
}

const CircularKnob: React.FC<CircularKnobProps> = ({ value, onChange }) => {
  const radius = 100; // Radius of the circle
  const strokeWidth = 20; // Thickness of the progress bar
  const knobSize = 20; // Size of the draggable knob
  const center = radius + strokeWidth / 2;
  const progress = useSharedValue(value / 60 * 360); // Angle in degrees (0-360)

  // Animated style for the knob position
  const knobStyle = useAnimatedStyle(() => {
    const angle = (progress.value - 90) * (Math.PI / 180); // -90 to start from top
    return {
      transform: [
        { translateX: radius * Math.cos(angle) },
        { translateY: radius * Math.sin(angle) },
      ],
    };
  });

  // Gesture handler using Gesture.Pan()
  const gesture = Gesture.Pan()
    .onUpdate((event) => {
      const { translationX, translationY } = event;
      let newAngle = progress.value + Math.atan2(translationY, translationX) * (180 / Math.PI);
      newAngle = ((newAngle % 360) + 360) % 360; // Normalize to 0-360
      progress.value = newAngle;
      runOnJS(onChange)(Math.round((newAngle / 360) * 60)); // Convert to minutes (0-60)
    })
    .onEnd(() => {
      // Optional: Snap to nearest increment if needed
    });

  return (
    <View style={styles.container}>
      <Svg height={radius * 2 + strokeWidth} width={radius * 2 + strokeWidth}>
        {/* Background circle */}
        <Circle
          cx={center}
          cy={center}
          r={radius}
          stroke={Colors.darker}
          strokeWidth={strokeWidth}
          fill="none"
        />
        {/* Progress circle */}
        <Circle
          cx={center}
          cy={center}
          r={radius}
          stroke={Colors.primary}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={[2 * Math.PI * radius * (value / 60), 2 * Math.PI * radius]}
          strokeDashoffset={-Math.PI * radius / 2} // Start from top
        />
      </Svg>
      <GestureDetector gesture={gesture}>
        <Animated.View style={[styles.knob, knobStyle, { top: center - knobSize / 2, left: center - knobSize / 2 }]}>
          <Svg height={knobSize} width={knobSize}>
            <Circle cx={knobSize / 2} cy={knobSize / 2} r={knobSize / 2} fill={Colors.primary} />
          </Svg>
        </Animated.View>
      </GestureDetector>
      <Text style={styles.sliderText}>
        {value}
        {'\n'}
        <Text style={styles.timerUnit}>Minutes</Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: Spacing.md,
    position: 'relative',
  },
  knob: {
    position: 'absolute',
    width: 20,
    height: 20,
  },
  sliderText: {
    ...Typography.title,
    fontSize: 48,
    textAlign: 'center',
    color: Colors.black,
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -50 }, { translateY: -50 }],
  },
  timerUnit: {
    fontSize: 18,
    fontWeight: 'normal' as const,
  },
});

export default CircularKnob;
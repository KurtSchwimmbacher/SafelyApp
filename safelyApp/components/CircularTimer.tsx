// components/CircularTimer.tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, PanResponder, Dimensions } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

const { width } = Dimensions.get('window');
const SIZE = width * 0.8;
const STROKE_WIDTH = 30;
const RADIUS = (SIZE - STROKE_WIDTH) / 2;

const CircularTimer = () => {
  const [minutes, setMinutes] = useState(0);

  return (
    <View style={styles.container}>
      <View style={styles.neumorphicCircle}>
        <Svg width={SIZE} height={SIZE}>
          <Circle
            cx={SIZE / 2}
            cy={SIZE / 2}
            r={RADIUS}
            stroke="#E0E0E0"
            strokeWidth={STROKE_WIDTH}
            fill="white"
          />
        </Svg>
        <View style={styles.textContainer}>
          <Text style={styles.time}>{minutes}</Text>
          <Text style={styles.label}>Minutes</Text>
        </View>
        {/* Knob will go here */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { alignItems: 'center', justifyContent: 'center', flex: 1 },
  neumorphicCircle: {
    width: SIZE,
    height: SIZE,
    borderRadius: SIZE / 2,
    backgroundColor: '#F2F2F2',
    justifyContent: 'center',
    alignItems: 'center',
    shadowOffset: { width: -6, height: -6 },
    shadowOpacity: 1,
    shadowRadius: 6,
    shadowColor: '#FFFFFF',
    elevation: 10,
  },
  textContainer: {
    position: 'absolute',
    alignItems: 'center',
  },
  time: {
    fontSize: 42,
    fontWeight: 'bold',
    fontFamily: 'YesevaOne-Regular',
  },
  label: {
    fontSize: 18,
    fontWeight: '600',
    fontFamily: 'JosefinSans-Regular',
  },
});

export default CircularTimer;

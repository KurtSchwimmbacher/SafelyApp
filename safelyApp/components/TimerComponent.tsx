import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { Colors, Spacing, Typography } from '../styles/GlobalStyles';

const TimerComponent: React.FC = () => {
  const [minutes, setMinutes] = useState(17);

  const updateMinutes = (change: number) => {
    const newMinutes = Math.max(0, Math.min(60, minutes + change));
    setMinutes(newMinutes);
  };

  return (
    <View style={styles.container}>
      <View style={styles.timerContainer}>
        <Svg height="250" width="250" viewBox="0 0 200 200">
          <Circle
            cx="100"
            cy="100"
            r="90"
            stroke={Colors.darker}
            strokeWidth="20"
            fill="none"
          />
          <Circle
            cx="100"
            cy="100"
            r="90"
            stroke={Colors.primary}
            strokeWidth="20"
            fill="none"
            strokeDasharray={[2 * Math.PI * 90 * (minutes / 60), 2 * Math.PI * 90]}
          />
          <Text style={styles.timerText}>
            {minutes}
            {'\n'}
            <Text style={styles.timerUnit}>Minutes</Text>
          </Text>
        </Svg>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={() => updateMinutes(-1)}>
            <Text style={styles.buttonText}>-</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => updateMinutes(1)}>
            <Text style={styles.buttonText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};


export default TimerComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Spacing.lg,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  timerContainer: {
    position: 'relative',
    alignItems: 'center',
  },
  timerText: {
    ...Typography.title,
    fontSize: 48,
    position: 'absolute',
    top: '30%',
    textAlign: 'center',
    color: Colors.black,
  },
  timerUnit: {
    fontSize: 18,
    fontWeight: 'normal',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 80,
    marginTop: Spacing.md,
  },
  button: {
    backgroundColor: Colors.primary,
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: Colors.white,
    fontSize: 20,
  },
});


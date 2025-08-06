import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Alert } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { Colors, Spacing, Typography } from '../styles/GlobalStyles';
import { saveTimer } from '../services/timersService';


const TimerComponent: React.FC = () => {
  const [minutes, setMinutes] = useState(17);
  const [timerName, setTimerName] = useState('');

  const updateMinutes = (change: number) => {
    const newMinutes = Math.max(0, Math.min(60, minutes + change));
    setMinutes(newMinutes);
  };

  const handleSaveTimer = async () => {
    try {
      await saveTimer(minutes, timerName);
      Alert.alert('Success', `Timer${timerName ? ` "${timerName}"` : ''} saved to your profile!`);
      setTimerName(''); // Reset name after save
    } catch (error) {
      Alert.alert('Error', 'Failed to save timer. Please try again.');
    }
  };

  return (
    <View style={styles.container}>

      <TextInput
        style={styles.input}
        placeholder="Timer Name"
        value={timerName}
        onChangeText={setTimerName}
      />

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

        <TouchableOpacity style={[styles.button, styles.saveButton]} onPress={handleSaveTimer}>
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
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
    top: '130%',
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
    marginTop: Spacing.md,
  },
  saveButton: {
    width: 100,
    marginTop: Spacing.lg,
  },
  buttonText: {
    color: Colors.white,
    fontSize: 20,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: Colors.midDark,
    borderRadius: Spacing.sm,
    paddingHorizontal: Spacing.sm,
    marginTop: Spacing.md,
    width: '80%',
    fontSize: Spacing.md,
    color: Colors.midDark,
    fontFamily: 'JosefinSans_400Regular',
  },
});
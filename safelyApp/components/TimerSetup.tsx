import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { Colors, GlobalStyles, Spacing, Typography } from '../styles/GlobalStyles';

interface TimerSetupProps {
  minutes: number;
  timerName: string;
  checkIns: string;
  checkInContact: string;
  setMinutes: (minutes: number) => void;
  setTimerName: (name: string) => void;
  setCheckIns: (checkIns: string) => void;
  setCheckInContact: (contact: string) => void;
  handleSaveTimer: () => Promise<void>;
}

const TimerSetup: React.FC<TimerSetupProps> = ({
  minutes,
  timerName,
  checkIns,
  checkInContact,
  setMinutes,
  setTimerName,
  setCheckIns,
  setCheckInContact,
  handleSaveTimer
}) => {
  const updateMinutes = (change: number) => {
    const newMinutes = Math.max(0, Math.min(60, minutes + change));
    setMinutes(newMinutes);
  };

  return (
    <View style={[GlobalStyles.container, {width:'100%', alignItems:'center'}]}>
      <TextInput
        style={[styles.input, {marginBottom: 5}]}
        placeholder="Timer Name"
        value={timerName}
        onChangeText={setTimerName}
      />
      
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
          strokeDashoffset={(-0.25 * 2 * Math.PI * 270)}
        />
        <Text style={styles.timerText}>
          {minutes}
          {'\n'}
          <Text style={styles.timerUnit}>Minutes</Text>
        </Text>
      </Svg>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => updateMinutes(-1)}>
          <Text style={GlobalStyles.buttonText}>-</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => updateMinutes(1)}>
          <Text style={GlobalStyles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>
      
      <TextInput
        style={[styles.input, {marginBottom: 10}]}
        placeholder="Number of Check-ins"
        value={checkIns}
        onChangeText={setCheckIns}
        keyboardType="number-pad"
      />

      <TextInput
        style={[styles.input, {marginBottom: 10}]}
        placeholder="Check-in Contact (e.g., email or phone)"
        value={checkInContact}
        onChangeText={(text) => {
          setCheckInContact(text);
        }}
      />

      <TouchableOpacity style={[GlobalStyles.fullWidthButton, { marginTop: Spacing.lg, width: '100%' }]} onPress={handleSaveTimer}>
        <Text style={GlobalStyles.buttonText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
};

export default TimerSetup;

const styles = StyleSheet.create({
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
    width: 100,
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
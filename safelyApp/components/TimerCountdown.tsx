import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, ScrollView } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import Wave from './Wave';
import { Colors, Spacing, Typography, GlobalStyles, Shadows, Radius } from '../styles/GlobalStyles';
import { interpolateColor } from 'react-native-reanimated';
import EditTimerModal from './EditTimerModal';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { styles } from '../styles/componentStyles/TimerCountdown.styles';
import { TimerCountdownProps } from '../types/componentTypes/TimerCountdown.types';

const TimerCountdown: React.FC<TimerCountdownProps> = ({
  secondsRemaining,
  initialSeconds,
  nextCheckIn,
  nextCheckInTime,
  showCheckInButton,
  formatTime,
  handleCheckIn,
  timerId,
  timerName,
  currentMinutes,
  checkIns,
  checkInContact,
  onTimerUpdated,
  onTimerDeleted,
}) => {
  const screenHeight = Dimensions.get('window').height;
  const translateY = useSharedValue(0);

  useEffect(() => {
    const progress = secondsRemaining / initialSeconds;
    translateY.value = withTiming((1 - progress) * screenHeight, { duration: 1000 });
  }, [secondsRemaining, initialSeconds]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  const animatedTextStyle = useAnimatedStyle(() => {
    const progress = secondsRemaining / initialSeconds;
    return {
      color: interpolateColor(
        progress,
        [0, 1],
        [Colors.darkest, Colors.lightest]
      ),
    };
  });

  const [isEditVisible, setEditVisible] = useState(false);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.editButton, { justifyContent: 'flex-end' }]}
        onPress={() => setEditVisible(true)}
      >
        <MaterialCommunityIcons name="pencil" size={24} color={Colors.dark} />
      </TouchableOpacity>
      <Animated.View style={[styles.waveContainer, animatedStyle]}>
        <Wave
          color={Colors.base}
          amplitude={25}
          verticalOffset={screenHeight * 0.048}
          opacity={1}
          speed={4000}
          fullHeight={screenHeight}
        />
        <Wave
          color={Colors.base}
          amplitude={30}
          verticalOffset={screenHeight * 0.049}
          opacity={0.7}
          speed={5000}
          fullHeight={screenHeight}
        />
        <Wave
          color={Colors.base}
          amplitude={35}
          verticalOffset={screenHeight * 0.05}
          opacity={0.5}
          speed={6000}
          fullHeight={screenHeight}
        />
      </Animated.View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.contentWrapper}>
          <Animated.Text style={[styles.countdownText, Typography.heading, animatedTextStyle]}>
            {formatTime(secondsRemaining)}
          </Animated.Text>
          {nextCheckIn !== null && nextCheckInTime !== null && (
            <View style={styles.nextCheckInContainer}>
              <Text style={[styles.nextCheckInText, Typography.body]}>
                Next Check-in: {nextCheckInTime}
              </Text>
            </View>
          )}
          {showCheckInButton && (
            <TouchableOpacity
              style={[GlobalStyles.fullWidthButton, styles.checkInButton, Shadows.subtle]}
              onPress={handleCheckIn}
              activeOpacity={0.7}
            >
              <Text style={[Typography.subheading, GlobalStyles.buttonText]}>Check In</Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>

      <EditTimerModal
        visible={isEditVisible}
        onClose={() => setEditVisible(false)}
        timerId={timerId}
        currentName={timerName || ''}
        currentMinutes={currentMinutes}
        currentCheckIns={parseInt(checkIns) || 0}
        currentContact={checkInContact || ''}
        onTimerUpdated={onTimerUpdated}
        onTimerDeleted={onTimerDeleted}
      />
    </View>
  );
};

export default TimerCountdown;


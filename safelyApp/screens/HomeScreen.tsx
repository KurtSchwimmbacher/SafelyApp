import React from 'react';
import { View, Text, SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import { Colors, Spacing, Typography } from '../styles/GlobalStyles';
import TimerComponent from '../components/TimerComponent';

const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={[styles.heading, Typography.heading]}>
          Set Your Safety Timer
        </Text>
        <View style={styles.timerContainer}>
          <TimerComponent />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  scrollContent: {
    flexGrow: 1,
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.lg,
  },
  heading: {
    color: Colors.darker,
    textAlign: 'center',
    marginBottom: Spacing.lg,
  },
  timerContainer: {
    flex: 1,
    width: '100%',
  },
});
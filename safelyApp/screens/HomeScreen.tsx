import React from 'react';
import { View, SafeAreaView, ScrollView } from 'react-native';
import TimerComponent from '../components/TimerComponent';
import { styles } from '../styles/screenStyles/HomeScreen.styles';


const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.timerContainer}>
          <TimerComponent />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
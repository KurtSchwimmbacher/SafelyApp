import React from "react";
import { View, Text, StyleSheet} from "react-native";
import { Colors, Spacing, Typography } from "../styles/GlobalStyles";
import TimerComponent from "../components/TimerComponent";
import { SafeAreaView } from "react-native-safe-area-context";

const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.heading}>Set Your Safety Timer</Text>
      <TimerComponent />
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Spacing.lg,
    justifyContent: "center",
    backgroundColor: Colors.white,
  },
  heading: {
    ...Typography.title,
    textAlign: "center",
    marginBottom: Spacing.xl,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: Spacing.xl,
  },
  staticButton: {
    backgroundColor: Colors.primary,
    color: Colors.white,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.xl,
    borderRadius: Spacing.sm,
    fontWeight: "bold",
  },
});

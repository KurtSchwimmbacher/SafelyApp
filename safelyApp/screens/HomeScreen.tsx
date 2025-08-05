import React from "react";
import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import { Colors, Spacing, Typography } from "../styles/GlobalStyles";

const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.heading}>Set Your Safety Timer</Text>


      {/* Static control buttons */}
      <View style={styles.buttonRow}>
        <Text style={styles.staticButton}>Start</Text>
        <Text style={styles.staticButton}>Reset</Text>
      </View>
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

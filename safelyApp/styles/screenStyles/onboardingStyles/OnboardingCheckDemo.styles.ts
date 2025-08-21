import { StyleSheet } from "react-native";
import { Colors, Radius, Shadows, Spacing } from "../../GlobalStyles";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    padding: Spacing.md,
    justifyContent: "center",
    alignItems: "center",
  },
  progressContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: Spacing.lg,
  },
  progressDot: {
    width: 10,
    height: 10,
    borderRadius: Radius.full,
    marginHorizontal: Spacing.xs,
  },
  progressDotActive: {
    backgroundColor: Colors.base,
  },
  progressDotInactive: {
    backgroundColor: Colors.lighter,
  },
  stepContainer: {
    width: "100%",
    alignItems: "center",
    backgroundColor: Colors.lightest,
    borderRadius: Radius.md,
    padding: Spacing.lg,
    ...Shadows.subtle,
  },
  stepTitle: {
    color: Colors.darker,
    textAlign: "center",
    marginBottom: Spacing.sm,
  },
  instruction: {
    color: Colors.dark,
    textAlign: "center",
    marginBottom: Spacing.md,
  },
  timerContainer: {
    width: "110%",
    alignItems: "center",
    position: "relative",
  },
  waveContainer: {
    position: "absolute",
    top: 0,
    left: -8,
    right: 0,
    bottom: 0,
    zIndex: -2,
  },
  contentWrapper: {
    borderRadius: Radius.md,
    padding: Spacing.md,
    alignItems: "center",
    width: "100%",
  },
  countdownText: {
    color: Colors.darker,
    marginBottom: Spacing.sm,
    textAlign: "center",
    width: "100%",
  },
  nextCheckInText: {
    color: Colors.dark,
    textAlign: "center",
    marginBottom: Spacing.sm,
  },
  buttonContainer: {
    width: "100%",
    alignItems: "center",
  },
  checkInButton: {
    width: "100%",
    paddingVertical: Spacing.md,
    borderRadius: Radius.md,
    alignItems: "center",
    justifyContent: "center",
  },
  missCheckInButton: {
    width: "100%",
    paddingVertical: Spacing.md,
    borderRadius: Radius.md,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.dark, 
  },
  completeButton: {
    width: "100%",
    paddingVertical: Spacing.md,
    borderRadius: Radius.md,
    alignItems: "center",
    justifyContent: "center",
  },
  disabledButton: {
    opacity: 0.6,
  },
});
import { StyleSheet } from "react-native";
import { Colors, Radius, Spacing } from "../GlobalStyles";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    padding: 0,
  },
  waveContainer: {
    position: 'absolute',
    top: 0,
    left: -10,
    right: 0,
    bottom: 0,
    zIndex: -2,
  },
  scrollContent: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
  },
  contentWrapper: {
    borderRadius: Radius.md,
    padding: Spacing.md,
    alignItems: 'center',
    width: '100%',
  },
  countdownText: {
    color: Colors.darker,
    marginBottom: Spacing.sm,
    textAlign: 'center',
    width: '100%',
  },
  nextCheckInContainer: {
    width: '100%',
    borderRadius: Radius.sm,
    padding: Spacing.md,
    marginBottom: Spacing.sm,
    alignItems: 'center',
  },
  nextCheckInText: {
    color: Colors.dark,
    textAlign: 'center',
  },
  checkInButton: {
    width: '100%',
    paddingVertical: Spacing.md,
    borderRadius: Radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  editButton: {
    zIndex: 1,
    backgroundColor: Colors.lighter,
    padding: Spacing.md,
    borderRadius: Radius.full,
  },
});
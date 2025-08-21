import { StyleSheet } from "react-native";
import { Colors, Radius, Spacing } from "../GlobalStyles";

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
  },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: Spacing.md,
    width: '100%',
  },
  otpInput: {
    width: 44,
    height: 44,
    borderBottomWidth: 1,
    borderBottomColor: Colors.lighter,
    borderRadius: Radius.sm,
    color: Colors.darker,
    marginHorizontal: Spacing.xs,
    backgroundColor: Colors.white,
    lineHeight: 24,
    textAlignVertical: 'center',
  },
  disabledButton: {
    backgroundColor: Colors.lighter,
    opacity: 0.6,
  },
  link: {
    marginTop: Spacing.sm,
  },
  submitButton: {
    marginTop: Spacing.xl,
  },
});
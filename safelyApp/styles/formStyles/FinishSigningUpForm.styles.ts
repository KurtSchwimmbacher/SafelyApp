import { StyleSheet } from "react-native";
import { Colors, Spacing } from "../GlobalStyles";

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
  },
  nameContainer: {
    width: '100%',
    marginBottom: Spacing.lg,
  },
  input: {
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: Colors.lighter,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.md,
    marginBottom: Spacing.lg,
    color: Colors.darker,
    height: 56
  },
  submitButton: {
    marginTop: Spacing.md,
  },
  disabledButton: {
    backgroundColor: Colors.lighter,
    opacity: 0.6,
  },
});
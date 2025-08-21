import { StyleSheet } from "react-native";
import { Colors, Radius, Spacing, Typography } from "../GlobalStyles";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.lightest,
    padding: Spacing.md,
    gap: Spacing.md,
  },
  centeredContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.white,
  },
  card: {
    backgroundColor: Colors.white,
    borderRadius: Radius.lg,
    padding: Spacing.lg,
    marginBottom: Spacing.sm,
  },
  sectionTitle: {
    ...Typography.subheading,
    color: Colors.dark,
    marginBottom: Spacing.sm,
  },
  sectionValue: {
    ...Typography.heading,
    color: Colors.base,
    fontWeight: '700',
  },
  timerNameItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    backgroundColor: Colors.lightest,
    borderRadius: Radius.md,
    marginBottom: Spacing.xs,
  },
  timerNameText: {
    ...Typography.body,
    color: Colors.darker,
  },
  timerCountText: {
    ...Typography.subheading,
    color: Colors.base,
  },
  emptyText: {
    ...Typography.body,
    color: Colors.dark,
    textAlign: 'center',
    marginTop: Spacing.md,
  },
  errorText: {
    ...Typography.body,
    color: Colors.darkest,
    textAlign: 'center',
    marginHorizontal: Spacing.lg,
  },
});
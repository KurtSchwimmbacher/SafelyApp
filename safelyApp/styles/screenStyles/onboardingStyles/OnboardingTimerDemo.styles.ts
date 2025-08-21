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
  inputContainer: {
    width: "100%",
    alignItems: "center",
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.lighter,
    paddingVertical: Spacing.md,
    marginBottom: Spacing.lg,
    color: Colors.darker,
    height: 52,
    textAlignVertical: "center",
    width: "100%",
  },
  circleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: Spacing.lg,
  },
  circleButton: {
    backgroundColor: Colors.base,
    width: 48,
    height: 48,
    borderRadius: Radius.full,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: Spacing.md,
  },
  checkInContainer: {
    width: "100%",
    marginBottom: Spacing.sm,
    alignItems: "center",
  },
  iconsContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.sm,
  },
  iconWrapper: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: Radius.full,
    backgroundColor: Colors.white,
    padding: Spacing.xs,
  },
  contactButton: {
    width: "100%",
    paddingVertical: Spacing.lg,
    backgroundColor: Colors.white,
    borderRadius: Radius.md,
    justifyContent: "center",
    alignItems: "center",
  },
  completeButton: {
    width: "100%",
    marginTop: Spacing.lg,
    paddingVertical: Spacing.lg,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: Colors.white,
    padding: Spacing.md,
  },
  modalHeading: {
    color: Colors.darker,
    textAlign: "center",
    marginBottom: Spacing.sm,
  },
  modalNote: {
    color: Colors.dark,
    textAlign: "center",
    marginBottom: Spacing.md,
  },
  contactItem: {
    paddingVertical: Spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: Colors.lighter,
  },
  modalCancelButton: {
    marginTop: Spacing.md,
    width: "100%",
  },
  disabledButton: {
    opacity: 0.6,
  },
  actionButton: {
    backgroundColor: Colors.base,
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    borderRadius: Radius.md,
    marginTop: Spacing.sm,
  },
  actionButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontFamily: "Inter_500Medium",
    textAlign: "center",
  },
});
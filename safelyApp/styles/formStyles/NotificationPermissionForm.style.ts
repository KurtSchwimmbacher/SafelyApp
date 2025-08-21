import { StyleSheet } from "react-native";
import { Colors, Spacing } from "../GlobalStyles";

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: Spacing.sm,
    padding: Spacing.md,
    marginVertical: Spacing.md,
    justifyContent: 'space-between',
  },
  submitButton: {
    marginTop: Spacing.md,
  },
});
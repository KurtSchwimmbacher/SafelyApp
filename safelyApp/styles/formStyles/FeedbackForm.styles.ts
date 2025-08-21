import { StyleSheet } from "react-native";
import { Spacing } from "../GlobalStyles";


export const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
  },
  submitButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: Spacing.md,
  },
  buttonIcon: {
    marginRight: Spacing.sm,
  },
});
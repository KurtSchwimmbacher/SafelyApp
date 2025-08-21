import { StyleSheet } from "react-native";
import { Colors, Spacing } from "../GlobalStyles";

export const styles = StyleSheet.create({
  signOutButton: {
    backgroundColor: Colors.lightest,
    padding: Spacing.xs,
    borderRadius: 50,
    marginTop: Spacing.md,
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
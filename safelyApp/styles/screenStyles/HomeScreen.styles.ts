import { StyleSheet } from "react-native";
import { Colors, Spacing } from "../GlobalStyles";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  scrollContent: {
    flexGrow: 1,
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
  },
  timerContainer: {
    flex: 1,
    width: '100%',
  },
});
import { StyleSheet } from "react-native";
import { Colors, Radius, Spacing } from "../GlobalStyles";

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
  },
  input: {
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: Colors.lighter,
    paddingVertical: Spacing.md, 
    paddingHorizontal: Spacing.md,
    marginBottom: Spacing.lg,
    color: Colors.darker,
    height: 56, 
    lineHeight: 32, 
  },
  errorText: {
    color: '#CC6666',
    fontFamily: 'Inter_400Regular',
    fontSize: 12,
    marginTop: Spacing.xs,
    alignSelf: 'flex-start',
  },
  submitButton: {
    marginTop: Spacing.md,
    marginBottom: Spacing.sm,
  },
  orBreaker: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: Spacing.sm,
    width: '60%',
  },
  line: {
    flex: 1,
    height: 1,
  },
  orText: {
    marginHorizontal: Spacing.xs,
  },
  socialButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: Spacing.md,
    marginTop: Spacing.sm,
  },
  socialButton: {
    backgroundColor: Colors.lightest,
    borderRadius: Radius.full,
    padding: Spacing.md,
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  disabledButton: {
    backgroundColor: Colors.lighter,
    opacity: 0.6,
  },
});
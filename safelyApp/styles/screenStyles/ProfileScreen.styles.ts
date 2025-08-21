import { Platform, StyleSheet } from "react-native";
import { Colors, Radius, Shadows, Spacing } from "../GlobalStyles";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    padding: Spacing.md,
  },
  content: {
    flex: 1,
    justifyContent: 'flex-start',
    gap: Spacing.lg,
  },
  heading: {
    color: Colors.base,
    textAlign: 'center',
  },
  field: {
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: Colors.lighter,
    paddingBottom: Spacing.md,
    marginBottom: Spacing.lg,
  },
  label: {
    color: Colors.dark,
    marginBottom: Spacing.xs,
  },
  value: {
    color: Colors.darker,
  },
  input: {
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: Colors.lighter,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.md,
    color: Colors.darker,
    height: 56,
    lineHeight: 32,
  },
  inputError: {
    borderBottomColor: '#CC6666',
  },
  errorText: {
    color: '#CC6666',
    fontFamily: 'Inter_400Regular',
    fontSize: 12,
    marginTop: Spacing.xs,
    alignSelf: 'flex-start',
  },
  toggleField: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingVertical: Spacing.md,
    marginBottom: Spacing.lg,
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
    marginTop: Spacing.sm,
  },
  saveButton: {
    backgroundColor: Colors.base,
    marginBottom: Spacing.sm,
  },
  deleteButton: {
    backgroundColor: '#FF3B30',
  },
  disabledButton: {
    backgroundColor: Colors.lighter,
    opacity: 0.6,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: Platform.select({ web: 'rgba(0, 0, 0, 0.5)', default: Colors.white }),
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: Platform.select({ web: '80%', default: '90%' }),
    maxWidth: 400,
    backgroundColor: Colors.white,
    borderRadius: Radius.lg,
    padding: Spacing.lg,
    ...Shadows.subtle,
    alignItems: 'center',
    gap: Spacing.md,
  },
  modalHeading: {
    color: Colors.base,
    textAlign: 'center',
  },
  modalText: {
    color: Colors.dark,
    textAlign: 'center',
  },
  confirmButton: {
    backgroundColor: '#FF3B30',
  },
  orBreaker: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: Spacing.sm,
    width: '60%',
    alignSelf: 'center',
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: Colors.lighter,
  },
  orText: {
    marginHorizontal: Spacing.xs,
  },
  cancelButton: {
    backgroundColor: Colors.lightest,
    borderRadius: Radius.full,
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  cancelButtonContent: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.md,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    paddingVertical: Spacing.sm,
  },
  buttonText: {
    marginLeft: Spacing.xs,
  },
  buttonIcon: {
    marginRight: Spacing.xs,
  },
});


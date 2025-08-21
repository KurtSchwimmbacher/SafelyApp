import { Dimensions, Platform, StyleSheet } from "react-native";
import { Colors, Radius, Shadows, Spacing } from "../GlobalStyles";

export const styles = StyleSheet.create({
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
  },
  heading: {
    color: Colors.base,
    marginBottom: Spacing.lg,
    textAlign: 'center',
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
  checkInContainer: {
    width: '100%',
    marginBottom: Spacing.lg,
    alignItems: 'center',
  },
  iconsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  iconWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: Radius.full,
    backgroundColor: Colors.white,
    padding: Spacing.xs,
  },
  durationContainer: {
    width: '100%',
    marginBottom: Spacing.lg,
    alignItems: 'center',
  },
  durationLabel: {
    color: Colors.dark,
    marginBottom: Spacing.sm,
  },
  pickerWrapper: {
    width: '100%',
    height: 60,
  },
  scrollContent: {
    paddingHorizontal: (Dimensions.get('window').width - 60) / 2,
  },
  minuteItem: {
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: Radius.md,
    backgroundColor: Colors.lightest,
    marginHorizontal: Spacing.xs,
  },
  selectedMinute: {
    backgroundColor: Colors.base,
    ...Shadows.subtle,
  },
  selectedText: {
    color: Colors.white,
  },
  contactButton: {
    width: '100%',
    paddingVertical: Spacing.lg,
    backgroundColor: Colors.white,
    borderRadius: Radius.md,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
  },
  submitButton: {
    backgroundColor: Colors.base,
    marginTop: Spacing.md,
    marginBottom: Spacing.sm,
  },
  deleteButton: {
    backgroundColor: '#FF3B30',
    marginTop: Spacing.sm,
    marginBottom: Spacing.sm,
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
  contactModalContainer: {
    flex: 1,
    backgroundColor: Colors.white,
    padding: Spacing.md,
  },
  modalHeading: {
    color: Colors.darker,
    textAlign: 'center',
    marginBottom: Spacing.md,
  },
  contactItem: {
    paddingVertical: Spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: Colors.lighter,
  },
  modalCancelButton: {
    marginTop: Spacing.md,
    width: '100%',
  },
});
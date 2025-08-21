import { StyleSheet } from "react-native";
import { Colors, Radius, Spacing } from "../GlobalStyles";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    padding: Spacing.md,
    justifyContent: 'flex-start',
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.lighter,
    paddingVertical: Spacing.md,
    marginBottom: Spacing.lg,  
    color: Colors.darker,
    height: 52,
    textAlignVertical: 'center',
  },
  circleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.lg, 
  },
  circleButton: {
    backgroundColor: Colors.base,
    width: 48,
    height: 48,
    borderRadius: Radius.full,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: Spacing.md,
  },
  contactButton: {
    width: '100%',
    paddingVertical: Spacing.lg,
    backgroundColor: Colors.white,
    borderRadius: Radius.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  saveButton: {
    width: '100%',
    marginTop: Spacing.sm,
    paddingVertical: Spacing.lg
  },
  modalContainer: {
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
    width: '100%'
  },
  disabledButton: {
    backgroundColor: Colors.lighter,
    opacity: 0.6,
  },
});

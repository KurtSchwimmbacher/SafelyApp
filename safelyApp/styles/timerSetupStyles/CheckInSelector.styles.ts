import { StyleSheet } from 'react-native';
import { Colors, Spacing, Radius } from '../GlobalStyles';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: Spacing.sm,
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
});

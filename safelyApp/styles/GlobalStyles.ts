import { StyleSheet, PixelRatio } from 'react-native';

// Monochromatic palette based on #00A0A0 (teal)
export const Colors = {
  white: '#F5FFFE', // Very light tint for backgrounds
  lightest: '#CCF0EE', // Light tint for secondary backgrounds
  lighter: '#99E1DC', // Lighter accent
  light: '#66D2CA', // Light accent
  base: '#00A0A0', // Primary base color
  dark: '#007A7A', // Darker shade for contrast
  darker: '#005454', // Dark shade for text
  darkest: '#002E2E', // Very dark for emphasis
  black: '#000A0A', // Near-black for deep contrast
};

// Consistent spacing for a minimal look
export const Spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
};

// Typography with Inter and Space Grotesk
export const Typography = {
  heading: {
    fontFamily: 'SpaceGrotesk_700Bold',
    fontSize: PixelRatio.getFontScale() * 28,
    color: Colors.darker,
    lineHeight: 36,
  },
  subheading: {
    fontFamily: 'SpaceGrotesk_400Regular',
    fontSize: PixelRatio.getFontScale() * 20,
    color: Colors.dark,
    lineHeight: 28,
  },
  body: {
    fontFamily: 'Inter_400Regular',
    fontSize: PixelRatio.getFontScale() * 16,
    color: Colors.darker,
    lineHeight: 24,
  },
  caption: {
    fontFamily: 'Inter_500Medium',
    fontSize: PixelRatio.getFontScale() * 14,
    color: Colors.dark,
    lineHeight: 20,
  },
  button: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: PixelRatio.getFontScale() * 16,
    color: Colors.white,
  },
};

// Border radii for smooth, modern edges
export const Radius = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  full: 9999,
};

// Shadows for subtle depth
export const Shadows = {
  subtle: {
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
};

export const GlobalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    padding: Spacing.md,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottom: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  top: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  button: {
    backgroundColor: Colors.base,
    paddingVertical: Spacing.lg,
    paddingHorizontal: Spacing.xl,
    borderRadius: Radius.lg,
    ...Shadows.subtle,
  },
  buttonText: {
    ...Typography.button,
    textAlign: 'center',
  },
  outlineButton: {
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.light,
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.lg,
    borderRadius: Radius.lg,
    ...Shadows.subtle,
  },
  outlineButtonText: {
    ...Typography.button,
    color: Colors.base,
    textAlign: 'center',
  },
  fullWidthButton: {
    width: '90%',
    backgroundColor: Colors.base,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    borderRadius: Radius.lg,
    ...Shadows.subtle,
  },
  outlineButtonFW: {
    width: '90%',
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.light,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    borderRadius: Radius.lg,
    ...Shadows.subtle,
  },
});
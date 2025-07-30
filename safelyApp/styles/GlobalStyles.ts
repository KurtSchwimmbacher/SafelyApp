import { StyleSheet } from 'react-native';

export const Colors = {
  white: '#C6FFF0',
  lightest: '#B2F5E4',
  lighter: '#9EEBD7', 
  light: '#8BE2CB',
  darkLight: '#77D8BE',
  midLight: '#4FC4A6',
  primaryLight: '#28B18D',
  primary: '#009D74',
  primaryDark: '#007E5D',
  midDark: '#005E46',
  dark: '#003F2E',
  darker: '#002F23',
  darkest: '#001F17',
  black: '#00100C',
};

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};

export const Typography = {
  title: {
    fontSize: 32,
    color: Colors.darker,
    fontFamily: 'YesevaOne_400Regular',
    
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 500,
    color: Colors.midDark,
  },
  body: {
    fontSize: 16,
    color: Colors.darkest,
  },
  muted: {
    fontSize: 14,
    color: Colors.darkLight,
  },
};

export const Radius = {
  sm: 4,
  md: 8,
  lg: 16,
  xl: 24,
  full: 9999, // For circular buttons
};




export const GlobalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    padding: Spacing.md,
  },
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottom:{
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
    backgroundColor: Colors.primary,
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.lg,
    borderRadius: 8,
  },
  buttonText: {
    color: Colors.white,
    fontSize: 24,
    textAlign: 'center',
    fontFamily: 'JosefinSans_400Regular',
  },

  fullWidthButton: {
    width: '80%',
    height: 50,
    justifyContent: 'center',
    backgroundColor: Colors.primary,
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.lg,
    borderRadius: Radius.full,
  }

});
import { colors } from './colors';

export const fonts = {
  black: 'Montserrat-Black',
  blackItalic: 'Montserrat-BlackItalic',
  bold: 'Montserrat-Bold',
  boldItalic: 'Montserrat-BoldItalic',
  extraBold: 'Montserrat-ExtraBold',
  extraBoldItalic: 'Montserrat-ExtraBoldItalic',
  extraLight: 'Montserrat-ExtraLight',
  extraLightItalic: 'Montserrat-ExtraLightItalic',
  italic: 'Montserrat-Italic',
  light: 'Montserrat-Light',
  lightItalic: 'Montserrat-LightItalic',
  medium: 'Montserrat-Medium',
  mediumItalic: 'Montserrat-MediumItalic',
  regular: 'Montserrat-Regular',
  semiBold: 'Montserrat-SemiBold',
  semiBoldItalic: 'Montserrat-SemiBoldItalic',
  thin: 'Montserrat-Thin',
  thinItalic: 'Montserrat-ThinItalic',
} as const;

export const fontSize = {
  xs: 10,
  sm: 12,
  md: 14,
  lg: 16,
  xl: 18,
  xxl: 22,
  hero: 26,
  display: 28,
} as const;

export const typography = {
  heading: {
    fontSize: fontSize.xxl,
    fontFamily: fonts.bold,
    color: colors.primary,
    letterSpacing: 0.2,
  },
  title: {
    fontSize: fontSize.lg,
    fontFamily: fonts.semiBold,
    color: colors.textDark,
  },
  subtitle: {
    fontSize: fontSize.sm + 1,
    fontFamily: fonts.regular,
    color: colors.textMedium,
  },
  body: {
    fontSize: fontSize.md,
    fontFamily: fonts.regular,
    color: colors.textDark,
  },
  caption: {
    fontSize: fontSize.sm - 1,
    fontFamily: fonts.medium,
    color: colors.textLight,
  },
  label: {
    fontSize: fontSize.xs,
    fontFamily: fonts.bold,
    color: colors.textMedium,
    letterSpacing: 0.8,
    textTransform: 'uppercase' as const,
  },
  price: {
    fontSize: fontSize.md,
    fontFamily: fonts.bold,
    color: colors.primary,
  },
  button: {
    fontSize: fontSize.md,
    fontFamily: fonts.semiBold,
    color: colors.white,
  },
} as const;

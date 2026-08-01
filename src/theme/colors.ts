/**
 * SareeLoom design tokens — single source of truth.
 * Derived from Home (Dashboard) screen visual language.
 */

export const colors = {
  // Brand
  primary: '#5D1725',
  primaryDark: '#3F0F19',
  primarySoft: '#F8F0F1',
  secondary: '#7A1F30',
  accent: '#C9A227',
  primaryGradient: ['#5D1725', '#3F0F19'] as string[],
  buttLinearGradient: ['#5D1725', '#7A1F30'] as string[],

  // Surfaces
  white: '#FFFFFF',
  black: '#000000',
  transparent: 'transparent',
  background: '#FDF8F4',
  backgroundLight: '#FDF8F4',
  baground: '#FDF8F4', // legacy alias
  inputColor: '#FFFFFF',
  card: '#FFFFFF',
  overlay: 'rgba(45, 20, 25, 0.35)',
  overlayDark: 'rgba(0, 0, 0, 0.55)',
  overlayLight: 'rgba(255, 255, 255, 0.4)',
  whiteAlpha10: 'rgba(255, 255, 255, 0.1)',
  whiteAlpha20: 'rgba(255, 255, 255, 0.2)',
  whiteAlpha60: 'rgba(255, 255, 255, 0.6)',
  whiteAlpha85: 'rgba(255, 255, 255, 0.85)',
  whiteAlpha90: 'rgba(255, 255, 255, 0.9)',
  whiteAlpha94: 'rgba(255, 255, 255, 0.94)',
  blackAlpha15: 'rgba(0, 0, 0, 0.15)',
  blackAlpha20: 'rgba(0, 0, 0, 0.2)',
  blackAlpha40: 'rgba(0, 0, 0, 0.4)',
  blackAlpha50: 'rgba(0, 0, 0, 0.5)',
  blackAlpha55: 'rgba(0, 0, 0, 0.55)',
  errorSoftAlpha: 'rgba(198, 40, 40, 0.1)',

  // Text
  textDark: '#2D2D2D',
  textMedium: '#6B6B6B',
  textLight: '#9A9A9A',
  textOnPrimary: '#FFFFFF',

  // Neutrals
  gray: '#A59F9F',
  grey: '#A59F9F',
  lightGray: '#F0EBE6',
  borderLight: '#E8E0D8',
  borderColor: '#E8E0D8',
  borderPrimary: '#5D1725',
  divider: '#E8E0D8',
  placeholder: '#9A9A9A',
  disabled: '#C8C0B8',
  imagePlaceholder: '#EDE6E0',

  // Semantic
  success: '#2E7D4F',
  successSoft: '#E8F5EE',
  error: '#C62828',
  errorSoft: '#FDE8E8',
  warning: '#E6A817',
  warningSoft: '#FFF4D8',
  info: '#4169E1',
  infoSoft: '#E8EEFF',
  star: '#C9A227',
  badgeTeal: '#1B6B5A',

  // System
  StatusBar: '#5D1725',
  buttonColor: '#5D1725',
};

export type ColorKey = keyof typeof colors;

/** Legacy alias used across the app — prefer `colors` for new code. */
export const color = colors;

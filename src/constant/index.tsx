import React from "react";

export const pathImage: { pathImage: string } = {
  pathImage: '../assets/images',

};
export const color = {
  // Brand Colors
  primary: '#F58021', // Note: Updating to standard app primary (orange) based on usage
  secondary: '#862E92',
  primaryGradient: ['#F58021', '#862E92'],

  // Base Colors
  white: '#FFFFFF',
  black: '#000000',
  transparent: 'transparent',

  // Grays & Text
  textDark: '#333333',
  textMedium: '#666666',
  textLight: '#999999',
  gray: '#A59F9F',
  lightGray: '#F0F0F0',
  backgroundLight: '#F5F5F5',
  borderLight: '#E0E0E0',

  // Semantic / Utility
  success: '#4CAF50',
  error: '#FF0000',
  warning: '#FF9800',
  star: '#FFD700',

  // Existing legacy colors (kept for compatibility)
  buttLinearGradient: ['#F58021', '#862E92'],
  baground: 'white',
  StatusBar: "#F58021",
  buttonColor: '#1F8695',
  borderColor: '#E9ECEF',
  borderPrimary: '#081041',
  inputColor: "white",
  grey: "#A59F9F",
}
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
};


export const navigationRef: any = React.createRef();



export const navigateToScreen = (screenName: any, props: any) => {
  navigationRef?.current?.navigate(screenName, props);
};

export const navigationBack = () => {
  navigationRef?.current?.goBack();
};

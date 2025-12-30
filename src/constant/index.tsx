import React from "react";

export const pathImage: { pathImage: string } = {
    pathImage: '../assets/images',

};

 

export const color = {
 buttLinearGradient : ['#F58021', '#862E92'],
    baground: 'white',
    StatusBar:"#F58021",
    buttonColor:'#1F8695',
    borderColor:'#E9ECEF',
    borderPrimary:'#081041',
    white:'#fff',
    inputColor:"white",
    grey:"#A59F9F",
    black:'#1A1A1A',
    primary:"#852D91",
    secondary:"#852D91",
    error:"red" ,
    gray:"#666" ,
 
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
 

 
export const navigateToScreen = (screenName:any, props:any) => {
  navigationRef?.current?.navigate(screenName, props);
};
 
export const navigationBack = () => {
  navigationRef?.current?.goBack();
};
 
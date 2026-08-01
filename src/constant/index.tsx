import React from 'react';

export {
  colors,
  color,
  fonts,
  fontSize,
  typography,
  spacing,
  radius,
  layout,
  shadows,
  commonStyles,
} from '../theme';

export const pathImage: { pathImage: string } = {
  pathImage: '../assets/images',
};

export const navigationRef: any = React.createRef();

export const navigateToScreen = (screenName: any, props?: any) => {
  navigationRef?.current?.navigate(screenName, props);
};

export const navigationBack = () => {
  navigationRef?.current?.goBack();
};

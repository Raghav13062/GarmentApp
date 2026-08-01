// src/utils.ts
import { Dimensions } from 'react-native';
import { color } from '../../constant';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export const vw = screenWidth / 100;
export const vh = screenHeight / 100;

export const getGradientColors = (colors?: string[]): [string, string] => {
  if (!colors || colors.length === 0) {
    return [color.primary, color.primaryDark];
  }
  if (colors.length === 1) {
    return [colors[0], colors[0]];
  }
  return [colors[0], colors[1]];
};

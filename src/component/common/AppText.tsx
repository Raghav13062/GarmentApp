import React from 'react';
import { Text, TextProps, StyleProp, TextStyle } from 'react-native';
import { typography } from '../../theme';

type Variant = keyof typeof typography;

interface AppTextProps extends TextProps {
  variant?: Variant;
  color?: string;
  style?: StyleProp<TextStyle>;
  children: React.ReactNode;
}

const AppText: React.FC<AppTextProps> = ({
  variant = 'body',
  color: textColor,
  style,
  children,
  ...rest
}) => {
  return (
    <Text
      allowFontScaling={false}
      style={[typography[variant], textColor ? { color: textColor } : null, style]}
      {...rest}
    >
      {children}
    </Text>
  );
};

export default AppText;

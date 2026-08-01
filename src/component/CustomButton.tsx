import React from 'react';
import {
  TouchableOpacity,
  Text,
  View,
  StyleSheet,
  StyleProp,
  ViewStyle,
  TextStyle,
  GestureResponderEvent,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { color, fonts, radius } from '../constant';

type AlignType = 'left' | 'center' | 'right';
type ButtonVariant = 'primary' | 'outline' | 'ghost';

interface CustomButtonProps {
  title: string;
  txtcolor?: string;
  leftIcon?: React.ReactNode;
  alignItm?: AlignType;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  height?: number;
  onPress?: (event: GestureResponderEvent) => void;
  disabled?: boolean;
  gradientStyle?: StyleProp<ViewStyle>;
  variant?: ButtonVariant;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  title,
  txtcolor,
  leftIcon,
  alignItm = 'center',
  style,
  textStyle,
  height = 48,
  onPress,
  disabled = false,
  gradientStyle,
  variant = 'primary',
}) => {
  const isOutline = variant === 'outline';
  const isGhost = variant === 'ghost';
  const labelColor =
    txtcolor || (isOutline || isGhost ? color.primary : color.white);

  if (isOutline || isGhost) {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onPress}
        disabled={disabled}
        style={[
          styles.button,
          { height, borderRadius: radius.md },
          isOutline && styles.outlineBtn,
          isGhost && styles.ghostBtn,
          style,
          disabled && styles.disabledBtn,
        ]}
      >
        <View style={styles.content}>
          {leftIcon && <View style={styles.icon}>{leftIcon}</View>}
          <Text
            allowFontScaling={false}
            style={[styles.text, { color: labelColor }, textStyle]}
          >
            {title}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      disabled={disabled}
      style={[styles.button, style, disabled && styles.disabledBtn]}
    >
      <LinearGradient
        colors={
          disabled
            ? [color.gray, color.gray]
            : color.buttLinearGradient
        }
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={[
          styles.gradient,
          { height, borderRadius: radius.md },
          gradientStyle,
        ]}
      >
        <View style={styles.content}>
          {leftIcon && <View style={styles.icon}>{leftIcon}</View>}
          <Text
            allowFontScaling={false}
            style={[styles.text, { color: labelColor }, textStyle]}
          >
            {title}
          </Text>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    overflow: 'hidden',
  },
  outlineBtn: {
    borderWidth: 1.5,
    borderColor: color.primary,
    backgroundColor: color.white,
    justifyContent: 'center',
  },
  ghostBtn: {
    backgroundColor: color.primarySoft,
    justifyContent: 'center',
  },
  gradient: {
    justifyContent: 'center',
  },
  content: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  icon: {
    position: 'absolute',
    left: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 15,
    fontFamily: fonts.semiBold,
    textAlign: 'center',
    maxWidth: '80%',
  },
  disabledBtn: {
    opacity: 0.6,
  },
});

export default CustomButton;

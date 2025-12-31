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
import { color, fonts } from '../constant';

type AlignType = 'left' | 'center' | 'right';

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
}

const CustomButton: React.FC<CustomButtonProps> = ({
  title,
  txtcolor = color.white,
  leftIcon,
  alignItm = 'center',
  style,
  textStyle,
  height = 52,
  onPress,
  disabled = false,
  gradientStyle,
}) => {
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
          { height, borderRadius: 8 },
          gradientStyle,
        ]}
      >
        <View style={styles.content}>
          {leftIcon && <View style={styles.icon}>{leftIcon}</View>}

          <Text
             style={[
              styles.text,
              { color: txtcolor },
              textStyle,
            ]}
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
    fontSize: 16,
    fontFamily: fonts.semiBold,
    textAlign: 'center',
    maxWidth: '80%', // 🔥 text cut issue solved
  },

  disabledBtn: {
    opacity: 0.6,
  },
});

export default CustomButton;

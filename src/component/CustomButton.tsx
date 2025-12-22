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
  disabled:any ,
  gradient:any
}

const CustomButton: React.FC<CustomButtonProps> = ({
  title,
  txtcolor = color.white,
  leftIcon,
  alignItm = 'center',
  style,
  textStyle,
  height = 48,
  onPress,
  disabled ,
  gradient
}) => {

  const alignment: Record<AlignType, 'flex-start' | 'center' | 'flex-end'> = {
    left: 'flex-start',
    center: 'center',
    right: 'flex-end',
  };

  return (
    <TouchableOpacity onPress={onPress} 
    disabled={disabled}
    style={[styles.button, { height }, style]}>
      <LinearGradient
        colors={color.buttLinearGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={[styles.gradient, { height, borderRadius: height / 6 },gradient]}
      >
        <View style={[styles.content, { justifyContent: alignment[alignItm] }]}>
          {leftIcon && <View style={styles.icon}>{leftIcon}</View>}
          <Text style={[styles.text, { color: txtcolor }, textStyle]}>
            {title}
          </Text>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: '100%',
  },
  gradient: {
    width: '100%',
    paddingHorizontal: 20,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    height: '100%',
    width: '100%',
  },
  icon: {
    marginRight: 10,
  },
  text: {
    fontSize: 18,
    fontFamily: fonts.semiBold,
  },
});

export default CustomButton;

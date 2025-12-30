import React, { useState } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TextInputProps,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
  Text,
} from 'react-native';
import Icon from './Icon';
import imageIndex from '../assets/imageIndex';
import { color, fonts } from '../constant';

interface CustomInputProps extends TextInputProps {
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  secureTextEntryToggle?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
  type?: string;
  onpress?: any,
  date?: string
}

const CustomInput: React.FC<CustomInputProps> = ({
  leftIcon,
  secureTextEntryToggle = false,
  containerStyle,
  type = "input",
  onpress,
  date,
  rightIcon,
  ...rest

}) => {
  const [hidePassword, setHidePassword] = useState(secureTextEntryToggle);

  return (
    <View style={[styles.container, containerStyle]}>
      {leftIcon && <View style={styles.leftIcon}>{leftIcon}</View>}
      {type == "date" ?
        <TouchableOpacity onPress={onpress} style={{ width: '93%',}}>
          <Text  allowFontScaling={false}  style={[styles.input, { width: '100%' }]}>{date}</Text>
        </TouchableOpacity>
        :
        <TextInput
         allowFontScaling={false}
          style={styles.input}
          placeholderTextColor="#A59F9F"
          secureTextEntry={hidePassword}
           returnKeyType="done"
          
          {...rest}
        />
      }
      {secureTextEntryToggle && (
        <TouchableOpacity onPress={() => setHidePassword(!hidePassword)}>
          <Icon
            source={hidePassword ? imageIndex.eye : imageIndex.eyeoff}
            size={20}
             colorIcon={color.primary}
          />
        </TouchableOpacity>
      )}
      {rightIcon && <View style={styles.leftIcon}>{rightIcon}</View>}

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: '#F7F8F8',
    paddingHorizontal: 15,
    height: 65,
    marginTop: 15,

    // Shadow for iOS
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.1,
    // shadowRadius: 6,

    // Shadow for Android
    // elevation: 5
  },
  leftIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    color: '#000',
    fontSize: 14,
    fontFamily:fonts.semiBold
  },
});

export default CustomInput;

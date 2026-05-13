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
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { color, fonts } from '../constant';

interface CustomInputProps extends TextInputProps {
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  secureTextEntryToggle?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
  type?: string;
  onpress?: any;
  date?: string;
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
      {type === "date" ? (
        <TouchableOpacity onPress={onpress} style={{ width: '93%' }}>
          <Text allowFontScaling={false} style={[styles.input, { width: '100%' }]}>{date}</Text>
        </TouchableOpacity>
      ) : (
        <TextInput
          allowFontScaling={false}
          style={styles.input}
          placeholderTextColor={color.gray}
          secureTextEntry={hidePassword}
          returnKeyType="done"
          {...rest}
        />
      )}
      {secureTextEntryToggle && (
        <TouchableOpacity 
          onPress={() => setHidePassword(!hidePassword)}
          style={styles.eyeIcon}
        >
          <MaterialIcon
            name={hidePassword ? 'visibility-off' : 'visibility'}
            size={22}
            color={color.primary}
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
  },
  leftIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    color: color.black,
    fontSize: 14,
    fontFamily: fonts.semiBold,
  },
  eyeIcon: {
    padding: 5,
  },
});

export default CustomInput;

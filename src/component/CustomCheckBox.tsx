import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import imageIndex from '../assets/imageIndex'; // Ensure you have check/uncheck icons here

interface CustomCheckboxProps {
  title?: string;
  checked?: boolean;
  onPress?: () => void;
}

const CustomCheckbox: React.FC<CustomCheckboxProps> = ({
  title,
  checked,
  onPress,
}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Image
        source={checked ? imageIndex.check : imageIndex.unCheck}
        style={styles.checkboxIcon} 
        resizeMode='cover'
      />
      <Text style={styles.label}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  checkboxIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    marginRight: 10,
  
  },
  label: {
    fontSize: 14,
    color: '#4A4A4A',
  },
});

export default CustomCheckbox;

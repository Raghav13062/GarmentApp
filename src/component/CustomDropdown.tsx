import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';

import { color } from '../constant';

interface DropdownItem {
  label: string;
  value: string;
}

interface CustomDropdownProps {
  data: DropdownItem[];
  placeholder?: string;
  onSelect: (value: string) => void;
  leftIcon?: React.ReactNode; // Add this
  search?:boolean;
}

const CustomDropdown: React.FC<CustomDropdownProps> = ({
  data,
  placeholder = 'Select',
  onSelect,
  leftIcon,
  search
}) => {
  const [value, setValue] = useState<string | null>(null);
  const [isFocus, setIsFocus] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.innerWrapper}>
        {leftIcon && <View style={styles.iconWrapper}>{leftIcon}</View>}
        <Dropdown
          style={[
            styles.dropdown,
            isFocus && styles.focusedDropdown,
            leftIcon && { paddingLeft: 40 }, // Add padding if icon is present
          ]}
          data={data}
          labelField="label"
          valueField="value"
          placeholderStyle={{ color: color.grey }}
          placeholder={placeholder}
          value={value}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={(item) => {
            setValue(item.value);
            onSelect(item.value);
          }}
          itemTextStyle={styles.itemText}
          selectedTextStyle={styles.selectedText}
          containerStyle={styles.dropdownContainer}
          search ={search}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginTop: 15,
  },
  innerWrapper: {
    position: 'relative',
    justifyContent: 'center',
  },
  iconWrapper: {
    position: 'absolute',
    zIndex: 10,
    left: 15,
  },
  dropdown: {
    height: 55,
    backgroundColor: '#fff',
    borderRadius: 15,
    paddingHorizontal: 15,
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: '#F7F8F8',
  },
  focusedDropdown: {},
  dropdownContainer: {
    borderRadius: 20,
    marginTop: 10,
    marginBottom: 15,
    paddingVertical: 11,
  },
  itemText: {
    fontSize: 16,
    color: 'black',
    lineHeight: 18,
  },
  selectedText: {
    fontSize: 16,
    color: '#000',
    lineHeight: 18,
    marginLeft:10
  },
});

export default CustomDropdown;

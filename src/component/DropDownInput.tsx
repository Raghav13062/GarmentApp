import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList, Keyboard } from 'react-native';

const CustomDropdownInput = ({
  data,
  placeholder,
  value,
  onChangeText,
  onSelectItem,
  inputStyle,
  dropdownStyle,
  itemStyle,
  placeholderTextColor = '#999',
}) => {
  const [filteredData, setFilteredData] = useState(data);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [inputValue, setInputValue] = useState(value || '');
  const dropdownRef = useRef(null);

  useEffect(() => {
    setInputValue(value || '');
  }, [value]);

  const handleInputChange = (text) => {
    setInputValue(text);
    onChangeText?.(text);
    
    if (text.length > 0) {
      const filtered = data.filter(item => item.label.toLowerCase().includes(text.toLowerCase()))
      setFilteredData(filtered);
    } else {
      setFilteredData(data);
    }
    
    setIsDropdownVisible(true);
  };

  const handleSelectItem = (item) => {
    setInputValue(item.label);
    setIsDropdownVisible(false);
    onSelectItem?.(item);
    Keyboard.dismiss();
  };

  const handleBlur = () => {
    setTimeout(() => {
      if (dropdownRef.current) {
        setIsDropdownVisible(false);
      }
    }, 200);
  };

  const handleFocus = () => {
    setIsDropdownVisible(true);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity 
      style={[styles.item, itemStyle]}
      onPress={() => handleSelectItem(item)}
    >
      <Text>{item.label}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container} ref={dropdownRef}>
      <TextInput
        style={[styles.input, inputStyle]}
        placeholder={placeholder}
        placeholderTextColor={placeholderTextColor}
        value={inputValue}
        onChangeText={handleInputChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
      
      {isDropdownVisible && filteredData.length > 0 && (
        <View style={[styles.dropdown, dropdownStyle]}>
          <FlatList
            data={filteredData}
            renderItem={renderItem}
            keyExtractor={(item) => item.value.toString()}
            keyboardShouldPersistTaps="always"
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    zIndex: 1,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    paddingHorizontal: 10,
  },
  dropdown: {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    maxHeight: 200,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    marginTop: 5,
    elevation: 3,
    zIndex: 10,
  },
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
});

export default CustomDropdownInput;
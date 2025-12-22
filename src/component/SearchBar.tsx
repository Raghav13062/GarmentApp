// components/SearchBar.js
import React from 'react';
import { View, TextInput, StyleSheet, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import imageIndex from '../assets/imageIndex';
import { color } from '../constant';

const SearchBar = () => {
  return (
    <View style={styles.container}>
      <Image
        source={imageIndex.search}
        style={{ width: 18, height: 18 }}
        resizeMode='contain'
      />

      <TextInput
        placeholder='Search "Jeans"'
        style={styles.input} 
        placeholderTextColor= {color.black}
      />

      <Icon name="notifications-outline" size={20} color={color.primary} />
      {/* <Icon name="heart-outline" size={20} color={color.primary} style={{ marginLeft: 10 }} />
      <Icon name="grid-outline" size={20} color={color.primary} style={{ marginLeft: 10 }} /> */}
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  container: {
  flexDirection: 'row',
    padding: 15,
    alignItems: 'center',
    borderRadius: 10,
    margin: 10,
    
     elevation: 8,
    
     shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
     
  
    backgroundColor: '#fff', // important for shadows
  },
  input: {
    flex: 1,
    marginLeft: 10,
    paddingVertical: 5,
  },
});

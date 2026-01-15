 import React from 'react';
import { View, TextInput, StyleSheet, Image, TouchableOpacity } from 'react-native';
 import imageIndex from '../assets/imageIndex';
import { color, navigateToScreen } from '../constant';
import ScreenNameEnum from '../routes/screenName.enum';
import { useNavigation } from '@react-navigation/native';

const SearchBar = () => {
  const navigator = useNavigation();
  return (
    <TouchableOpacity 
    onPress={()=>navigator.navigate(ScreenNameEnum.SearchProduct)}
    
    style={styles.container}>
      <Image
        source={imageIndex.search}
        style={{ width: 18, height: 18 }}
        resizeMode='contain'
      />

      <TextInput 
      editable={false}
        placeholder='Search "Jeans"'
        style={styles.input} 
        placeholderTextColor= {color.black}
      />

      {/* <Icon name="notifications-outline" size={20} color={color.primary} /> */}
      {/* <Icon name="heart-outline" size={20} color={color.primary} style={{ marginLeft: 10 }} />
      <Icon name="grid-outline" size={20} color={color.primary} style={{ marginLeft: 10 }} /> */}
    </TouchableOpacity>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  container: {
  flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
    borderRadius: 10,
     marginHorizontal:9,
     marginTop:11,
     marginBottom:15,
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

// components/HeaderBar.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
 import imageIndex from '../assets/imageIndex';
import { color } from '../constant';
import { useNavigation } from '@react-navigation/native';
import ScreenNameEnum from '../routes/screenName.enum';

const HeaderBar = () => {
  const navigator = useNavigation()
  return (
    <View style={styles.container}>
       {/* <Image source={imageIndex.locationCircle} 
       
       style={{ width: 21, height: 21 }} 
        /> */}
      <Text style={styles.address}>Hi John</Text>
      <TouchableOpacity style={{ marginLeft: 'auto' }} 
      
      onPress={()=>{
        navigator.navigate(ScreenNameEnum.EditProfile)
      }}
      >
              <Image  
              style={{
                width: 35,
                height: 35,
                borderRadius: 45,
              }}
              source={{
                uri:"https://i.pravatar.cc/500?img=12"
              }}/>

      </TouchableOpacity>
    </View>
  );
};

export default HeaderBar;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
     alignItems: 'center',
     marginHorizontal:13
   },
  address: {
     fontSize: 13,
    fontWeight: '500',
    color:  color.black, 
  },
});

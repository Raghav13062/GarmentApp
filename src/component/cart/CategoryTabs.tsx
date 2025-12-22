// components/CategoryTabs.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { color } from '../../constant';

const tabs = ["All", "Men", "Women", "Kids"];

const CategoryTabs = ({ selected, onSelect }) => {
  return (
    <View style={styles.container}>
      {tabs.map((item) => (
        <TouchableOpacity key={item} onPress={() => onSelect(item)}>
          <Text style={[styles.text, selected === item && styles.active]}>{item}</Text> 

          <View style={{
             height:2,
              borderRadius:10,
            backgroundColor:selected  === item  ? color.primary :color.white
          }}/>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default CategoryTabs;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginTop: 5,
    justifyContent: 'space-around',
    paddingVertical: 8,
    backgroundColor: '#fff', 
   },
  text: {
    fontSize: 14,
    color: color.primary,
        fontWeight: '500',

  },
  active: {
    color: color.black,
    fontWeight: '500',
        fontSize: 14,

  },
});

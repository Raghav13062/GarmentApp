import React from 'react';
import { View, TouchableOpacity, Image, StyleSheet, Text } from 'react-native';
import imageIndex from '../assets/imageIndex';
import { useNavigation } from '@react-navigation/native';
import { color } from '../constant';

interface RightIcon {
  icon: any;           // Icon image source
  onPress: () => void; // Press handler for the icon
  type?:string;
}

interface Props {
  navigation?: any;
  rightIcons?: RightIcon[];
  menuIcon?: any;
  label?: any;
  leftPress? :any
}

const CustomHeader: React.FC<Props> = ({ rightIcons = [], menuIcon, label , leftPress }) => {
  const navigation = useNavigation()
  return (
    <View style={styles.header}>
      {/* Left Menu Icon */}
      <TouchableOpacity onPress={() =>{leftPress == false ? null : navigation.goBack()}}>
        <Image source={menuIcon} style={styles.icon} resizeMode="contain" />
      </TouchableOpacity>
      <Text style={styles.txtHeading}>{label ? label : ""}</Text>
      {/* Right Icons */}
      <View style={styles.rightIconsContainer}>
        {rightIcons.map((item, index) => (
          <>
          {item?.type == "text"?
            <TouchableOpacity  key={index.toString()} onPress={item.onPress}>
            <Image source={imageIndex.notification} style={styles.iconR1} resizeMode="cover" />
         
          </TouchableOpacity>
        :
          <TouchableOpacity key={index.toString()} onPress={item.onPress}>
            <Image source={item.icon} style={styles.iconR} resizeMode="cover" />
          </TouchableOpacity>
}
          </>
        ))}
      </View>
    </View>
  );
};

export default CustomHeader;

const styles = StyleSheet.create({
  header: {
    height: 60,
    // paddingHorizontal: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  icon: {
    height: 35,
    width: 80,
     // marginLeft: 8,
  },
  iconR: {
    height: 25,
    width: 25,
    marginLeft: 12,
  },
   iconR1: {
    height: 35,
    width: 35,
    marginLeft: 8,
  },
  rightIconsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    minWidth:50
  },
  txtHeading: {
    fontWeight: '700',
    fontSize: 24,
    lineHeight: 36,
    color: '#000000',
    marginTop: 7,
  },
});

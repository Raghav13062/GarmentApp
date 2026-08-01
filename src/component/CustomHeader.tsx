import React from 'react';
import { View, TouchableOpacity, Image, StyleSheet, Text } from 'react-native';
import imageIndex from '../assets/imageIndex';
import { useNavigation } from '@react-navigation/native';
import { color, fonts, spacing } from '../constant';

interface RightIcon {
  icon: any;
  onPress: () => void;
  type?: string;
}

interface Props {
  navigation?: any;
  rightIcons?: RightIcon[];
  menuIcon?: any;
  label?: any;
  leftPress?: any;
}

const CustomHeader: React.FC<Props> = ({ rightIcons = [], menuIcon, label, leftPress }) => {
  const navigation = useNavigation();
  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={() => { leftPress == false ? null : navigation.goBack(); }}>
        <Image source={menuIcon} style={styles.icon} resizeMode="contain" />
      </TouchableOpacity>
      <Text style={styles.txtHeading}>{label ? label : ''}</Text>
      <View style={styles.rightIconsContainer}>
        {rightIcons.map((item, index) => (
          <React.Fragment key={index.toString()}>
            {item?.type == 'text' ? (
              <TouchableOpacity onPress={item.onPress}>
                <Image source={imageIndex.notification} style={styles.iconR1} resizeMode="cover" />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={item.onPress}>
                <Image source={item.icon} style={styles.iconR} resizeMode="cover" />
              </TouchableOpacity>
            )}
          </React.Fragment>
        ))}
      </View>
    </View>
  );
};

export default CustomHeader;

const styles = StyleSheet.create({
  header: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: color.background,
  },
  icon: {
    height: 35,
    width: 80,
  },
  iconR: {
    height: 25,
    width: 25,
    marginLeft: spacing.md,
  },
  iconR1: {
    height: 35,
    width: 35,
    marginLeft: spacing.sm,
  },
  rightIconsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    minWidth: 50,
  },
  txtHeading: {
    fontFamily: fonts.bold,
    fontSize: 22,
    lineHeight: 36,
    color: color.textDark,
    marginTop: 7,
  },
});

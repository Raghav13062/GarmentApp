import React from 'react';
import { View, TouchableOpacity, Image, StyleSheet, Text } from 'react-native';
import imageIndex from '../assets/imageIndex';
import { useNavigation } from '@react-navigation/native';
import { color, fonts, radius, spacing } from '../constant';

interface RightIcon {
  icon: any;
  onPress?: () => void;
  type?: string;
}

interface Props {
  navigation?: any;
  rightIcons?: RightIcon[];
  menuIcon?: any;
  label?: any;
  leftPress?: any;
}

const CustomBackHeader: React.FC<Props> = ({
  rightIcons = [{ icon: imageIndex.help }],
  menuIcon,
  label,
}) => {
  const navigation = useNavigation();

  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Image source={menuIcon} style={styles.icon} resizeMode="cover" />
      </TouchableOpacity>
      <Text style={styles.txtHeading}>{label ? label : ''}</Text>
      <View style={styles.rightIconsContainer}>
        {rightIcons.map((item, index) => (
          <React.Fragment key={index.toString()}>
            {item?.type == 'text' ? (
              <TouchableOpacity
                style={styles.textAction}
                onPress={item.onPress}
              >
                <Image
                  source={imageIndex.calendar}
                  tintColor={color.white}
                  style={styles.iconR1}
                  resizeMode="cover"
                />
                <Text style={styles.textActionLabel}>{item.icon}</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={item.onPress}>
                <Image source={item.icon} style={styles.iconR} resizeMode="contain" />
              </TouchableOpacity>
            )}
          </React.Fragment>
        ))}
      </View>
    </View>
  );
};

export default CustomBackHeader;

const styles = StyleSheet.create({
  header: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: color.background,
  },
  icon: {
    height: 30,
    width: 30,
  },
  iconR: {
    height: 25,
    width: 80,
    marginLeft: spacing.sm,
  },
  iconR1: {
    height: 20,
    width: 20,
    marginRight: spacing.sm,
  },
  rightIconsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    minWidth: 50,
  },
  txtHeading: {
    fontSize: 20,
    lineHeight: 36,
    color: color.textDark,
    marginLeft: 15,
    fontFamily: fonts.bold,
    textAlignVertical: 'center',
    flex: 1,
    textAlign: 'center',
  },
  textAction: {
    backgroundColor: color.primary,
    height: 33,
    paddingHorizontal: spacing.sm + 2,
    borderRadius: radius.md,
    alignItems: 'center',
    flexDirection: 'row',
  },
  textActionLabel: {
    color: color.white,
    fontFamily: fonts.bold,
  },
});

import React from 'react';
import { View, TextInput, StyleSheet, Image, TouchableOpacity } from 'react-native';
import imageIndex from '../assets/imageIndex';
import { color, fonts, radius, spacing, shadows } from '../constant';
import ScreenNameEnum from '../routes/screenName.enum';
import { useNavigation } from '@react-navigation/native';

const SearchBar = () => {
  const navigator = useNavigation();
  return (
    <TouchableOpacity
      style={styles.container}
    >
      <Image
        source={imageIndex.search}
        style={{ width: 18, height: 18 }}
        resizeMode='contain'
      />

      <TextInput
        editable={false}
        placeholder='Search "Jeans"'
        style={styles.input}
        placeholderTextColor={color.placeholder}
      />
    </TouchableOpacity>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: spacing.sm + 2,
    alignItems: 'center',
    borderRadius: radius.md,
    marginHorizontal: 9,
    marginTop: 11,
    marginBottom: 15,
    backgroundColor: color.card,
    borderWidth: 1,
    borderColor: color.borderLight,
    ...shadows.sm,
  },
  input: {
    flex: 1,
    marginLeft: 10,
    paddingVertical: 5,
    color: color.textDark,
    fontFamily: fonts.regular,
    fontSize: 14,
  },
});

import React from 'react';
import { TouchableOpacity, Text, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { color, fonts, radius, spacing } from '../../constant';

interface CategoryPillProps {
  label: string;
  active?: boolean;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}

const CategoryPill: React.FC<CategoryPillProps> = ({
  label,
  active = false,
  onPress,
  style,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={onPress}
      style={[styles.pill, active && styles.pillActive, style]}
    >
      <Text style={[styles.text, active && styles.textActive]}>{label}</Text>
    </TouchableOpacity>
  );
};

export default CategoryPill;

const styles = StyleSheet.create({
  pill: {
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.sm + 2,
    backgroundColor: color.lightGray,
    borderRadius: radius.pill,
    marginRight: spacing.md,
  },
  pillActive: {
    backgroundColor: color.primary,
  },
  text: {
    fontSize: 12,
    fontFamily: fonts.medium,
    color: color.textDark,
  },
  textActive: {
    color: color.white,
    fontFamily: fonts.semiBold,
  },
});

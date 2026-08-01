import React from 'react';
import { View, TouchableOpacity, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { color, fonts, spacing } from '../../constant';
import AppText from './AppText';

interface SectionHeaderProps {
  title: string;
  actionLabel?: string;
  onActionPress?: () => void;
  style?: StyleProp<ViewStyle>;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  actionLabel = 'VIEW ALL',
  onActionPress,
  style,
}) => {
  return (
    <View style={[styles.row, style]}>
      <AppText variant="heading" style={styles.title}>
        {title}
      </AppText>
      {!!onActionPress && (
        <TouchableOpacity onPress={onActionPress} activeOpacity={0.7} hitSlop={8}>
          <AppText variant="label" style={styles.action}>
            {actionLabel}
          </AppText>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default SectionHeader;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.md,
  },
  title: {
    fontSize: 18,
    flex: 1,
    paddingRight: spacing.sm,
  },
  action: {
    color: color.textMedium,
    fontFamily: fonts.bold,
  },
});

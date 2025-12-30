import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface ErrorTextProps {
  error?: string;
}

const ErrorText: React.FC<ErrorTextProps> = ({ error }) => {
  if (!error) return null;

  return (
    <View style={styles.errorContainer}>
      <Text allowFontScaling={false} style={styles.errorText}>
        {error}
      </Text>
    </View>
  );
};

export default ErrorText;

const styles = StyleSheet.create({
  errorContainer: {
    marginTop: 6,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
  },
});

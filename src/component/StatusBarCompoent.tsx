import React from 'react';
import { StatusBar, SafeAreaView, View } from 'react-native';
import { color } from '../constant';

type StatusBarComponentProps = {
  barStyle?: 'default' | 'light-content' | 'dark-content';
  backgroundColor?: string;
  translucent?: boolean;
};

const StatusBarComponent: React.FC<StatusBarComponentProps> = ({
  barStyle = 'dark-content',
  backgroundColor = color.borderPrimary,
  translucent = false,
}) => {
  return (
 
      <StatusBar
        barStyle={barStyle}
        backgroundColor={backgroundColor}
        translucent={translucent}
      />
 
  );
};

export default StatusBarComponent;

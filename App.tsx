import React, {FunctionComponent} from 'react';
import {LogBox, Text, TextInput} from 'react-native';

import 'react-native-gesture-handler';
import AppNavigator from './src/navigators/AppNavigator';

LogBox.ignoreAllLogs();
;(Text as any).defaultProps = {
  ...(Text as any).defaultProps,
  allowFontScaling: false,
};

;(TextInput as any).defaultProps = {
  ...(TextInput as any).defaultProps,
  allowFontScaling: false,
  underlineColorAndroid: "transparent",
};
const App: FunctionComponent<any> = () => <AppNavigator />;

export default App;
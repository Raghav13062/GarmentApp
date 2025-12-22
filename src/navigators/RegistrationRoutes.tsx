import 'react-native-gesture-handler';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NativeStackNavigationOptions } from '@react-navigation/native-stack';

import _routes from '../routes/routes';

import { RouteProp } from '@react-navigation/native';
import ScreenNameEnum from '../routes/screenName.enum';

// Define type for navigation params (you can customize this further)


export type RegistrationStackParamList = {
  [ScreenNameEnum.SPLASH_SCREEN]: undefined;
  [ScreenNameEnum.OnboardingScreen]: undefined;
  [ScreenNameEnum.ChooseRoleScreen]: undefined;
  [ScreenNameEnum.ReadyScreen]: undefined;
  [ScreenNameEnum.LoginScreen]: undefined;
  [ScreenNameEnum.SignUpScreen]: undefined;
  [ScreenNameEnum.OtpScreen]: undefined;
  [ScreenNameEnum.CreatePassword]: undefined;
  [ScreenNameEnum.PasswordReset]: undefined;
  [ScreenNameEnum.setting]: undefined;
  [ScreenNameEnum.language]: undefined;
  [ScreenNameEnum.personalInfo]: undefined;
  [ScreenNameEnum.changePassword]: undefined;

  "DrawerNavDriver":undefined;
  "DrawerNav":undefined;

};

const Stack = createNativeStackNavigator<RegistrationStackParamList>();

const screenOptions: NativeStackNavigationOptions = {
  headerShown: false,
  gestureEnabled: true,
  gestureDirection: 'horizontal',
};

const RegistrationRoutes: React.FC = () => {
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      {_routes.REGISTRATION_ROUTE.map((screen: { name: string | number | bigint | null | undefined; Component: React.ComponentType<{}> | React.ComponentType<{ route: RouteProp<RegistrationStackParamList, keyof RegistrationStackParamList>; navigation: any; }>; }) => (
        <Stack.Screen
          key={screen.name}
          name={screen.name as keyof RegistrationStackParamList}
          component={screen.Component}
        />
      ))}


    </Stack.Navigator>
  );
};

export default RegistrationRoutes;

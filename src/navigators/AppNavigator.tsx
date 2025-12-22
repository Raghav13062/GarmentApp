import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import RegistrationRoutes from './RegistrationRoutes';
import { store, persistor } from '../redux/store';
import Toast from 'react-native-toast-message';
import toastConfig from '../utils/customToast';
import { navigationRef } from '../constant';
 
const AppNavigator: React.FC = () => {
 
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <NavigationContainer ref={navigationRef}>
            {/* <NetworkStatusModal
              modalVisible={modalVisible}
              offlineText="No Internet! Please check your connection."
            /> */}
            <SafeAreaView style={{ flex: 1 }} edges={['bottom']}>
              <RegistrationRoutes />
            </SafeAreaView>
            <Toast config={toastConfig} />
          </NavigationContainer>
        </GestureHandlerRootView>
      </PersistGate>
    </Provider>
  );
};

export default AppNavigator;

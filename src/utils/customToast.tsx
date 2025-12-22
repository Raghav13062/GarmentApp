import React from 'react';
import {  StyleSheet, View} from 'react-native';
import Toast from 'react-native-toast-message';
import TextCompoent, { Size } from './Text';
import { color } from '../constant';
 
const toastConfig = {
  successResponse: ({text1}:any) => (
    <View style={styles.container}>
      <TextCompoent
        style={styles.titleStyle}
        size={Size.Small}
        color={'#000'}
        fontWeight="700">
        {text1}
      </TextCompoent>
    </View>
  ),
  errorResponse: ({text1} : any) => (
    <View style={styles.errorContainer}>
      <TextCompoent
        fontWeight="700"
        style={styles.titleStyle}
        size={Size.Small}
        color={'#fff'}>
        {text1}
      </TextCompoent>
    </View>
  ),
  normalResponse: ({text1}:any) => (
    <View style={styles.normalContainer}>
      <TextCompoent
        fontWeight="700"
        style={styles.titleStyle}
        size={Size.Small}
        color={'#000'}>
        {text1}
      </TextCompoent>
    </View>
  ),
};

export const successToast = (message, time = 1000) => {
  Toast.show({
    type: 'successResponse',
    text1: message,
    position: 'bottom',
    visibilityTime: time,
    topOffset: 150,
  });
};

export const errorToast = (message, time = 1000,position = 'top') => {
  Toast.show({
    type: 'errorResponse',
    text1: message,
       position: 'bottom',

    visibilityTime: time,
    topOffset: 150,
  });
};
export const normalToast = (message, time = 2000) => {
  Toast.show({
    type: 'normalResponse',
    text1: message,
    position: 'bottom',
    visibilityTime: time,
    topOffset: 50,
  });
};

export default toastConfig;

const styles = StyleSheet.create({
  titleStyle: {
    marginLeft: 15,
  },
  iconStyle: {
    width: 25,
    height: 25,
  },
  errorIconStyle: {
    width: 17,
    height: 17,
  },
  errorContainer: {
    height: 55,
    width: '93%',
    backgroundColor: '#ec3b3bff',
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 5,
    shadowColor: 'gray',
    shadowOffset: {
      height: 1,
      width: 0,
    },
    shadowOpacity: 0.35,
    shadowRadius: 6,
  },
  container: {
    height: 55,
    width: '93%',
    backgroundColor: '#fff',
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 5,
    borderLeftWidth: 10,
    borderLeftColor: '#81eb61ff',
    shadowColor: '#51B732',
    shadowOffset: {
      height: 1,
      width: 0,
    },
    shadowOpacity: 0.35,
    shadowRadius: 6,
  },
  normalContainer: {
    height: 55,
    width: '93%',
    backgroundColor: color.primary,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 5,
    borderLeftWidth: 10,
    borderLeftColor: '#4D3DB5',
    shadowColor: 'gray',
    shadowOffset: {
      height: 1,
      width: 0,
    },
    shadowOpacity: 0.35,
    shadowRadius: 6,
  },
});

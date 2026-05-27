import React from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Toast from 'react-native-toast-message';
import Icon from 'react-native-vector-icons/Ionicons';
import { color, fonts } from '../constant';

const TOAST_OFFSET = Platform.OS === 'ios' ? 58 : 42;

const toastTheme = {
  success: {
    icon: 'checkmark-circle',
    title: 'Success',
    accent: '#16A34A',
    bg: '#F0FDF4',
  },
  error: {
    icon: 'close-circle',
    title: 'Error',
    accent: '#DC2626',
    bg: '#FEF2F2',
  },
  info: {
    icon: 'information-circle',
    title: 'Info',
    accent: '#2563EB',
    bg: '#EFF6FF',
  },
  warning: {
    icon: 'warning',
    title: 'Warning',
    accent: '#D97706',
    bg: '#FFFBEB',
  },
};

const AppToast = ({ text1, text2, variant }: any) => {
  const theme = toastTheme[variant] || toastTheme.info;

  return (
    <View style={styles.shadowWrap}>
      <View style={styles.card}>
        <View style={[styles.accent, { backgroundColor: theme.accent }]} />

        <View style={[styles.iconBox, { backgroundColor: theme.bg }]}>
          <Icon name={theme.icon} size={24} color={theme.accent} />
        </View>

        <View style={styles.textWrap}>
          <Text allowFontScaling={false} numberOfLines={2} style={styles.title}>
            {text1 || theme.title}
          </Text>
          {!!text2 && (
            <Text allowFontScaling={false} numberOfLines={2} style={styles.message}>
              {text2}
            </Text>
          )}
        </View>

        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.closeButton}
          onPress={() => Toast.hide()}
        >
          <Icon name="close" size={18} color={color.textMedium} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const toastConfig = {
  success: (props: any) => <AppToast {...props} variant="success" />,
  error: (props: any) => <AppToast {...props} variant="error" />,
  info: (props: any) => <AppToast {...props} variant="info" />,
  warning: (props: any) => <AppToast {...props} variant="warning" />,
  successResponse: (props: any) => <AppToast {...props} variant="success" />,
  errorResponse: (props: any) => <AppToast {...props} variant="error" />,
  infoResponse: (props: any) => <AppToast {...props} variant="info" />,
  warningResponse: (props: any) => <AppToast {...props} variant="warning" />,
};

const showToast = (
  type: 'success' | 'error' | 'info' | 'warning',
  message: string,
  subtitle = '',
  time = 3500,
  position: 'top' | 'bottom' = 'top',
) => {
  Toast.show({
    type,
    text1: message,
    text2: subtitle,
    position,
    visibilityTime: time,
    autoHide: true,
    topOffset: TOAST_OFFSET,
    bottomOffset: 92,
  });
};

export const successToast = (message: string, subtitle = '', time = 3500) => {
  showToast('success', message, subtitle, time);
};

export const errorToast = (message: string, subtitle = '', time = 4200) => {
  showToast('error', message, subtitle, time);
};

export const infoToast = (message: string, subtitle = '', time = 3500) => {
  showToast('info', message, subtitle, time);
};

export const warningToast = (message: string, subtitle = '', time = 3800) => {
  showToast('warning', message, subtitle, time);
};

export const bottomSuccessToast = (message: string, subtitle = '', time = 3000) => {
  showToast('success', message, subtitle, time, 'bottom');
};

export const bottomErrorToast = (message: string, subtitle = '', time = 3800) => {
  showToast('error', message, subtitle, time, 'bottom');
};

export const showSuccess = (message: string) => successToast(message);
export const showError = (message: string) => errorToast(message);
export const showInfo = (message: string) => infoToast(message);
export const showWarning = (message: string) => warningToast(message);

export const ToastConfig = toastConfig;

export default toastConfig;

const styles = StyleSheet.create({
  shadowWrap: {
    width: '92%',
    alignSelf: 'center',
  },
  card: {
    minHeight: 64,
    backgroundColor: color.white,
    borderRadius: 14,
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.06)',
    shadowColor: color.black,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.16,
    shadowRadius: 14,
    elevation: 10,
  },
  accent: {
    width: 5,
    alignSelf: 'stretch',
  },
  iconBox: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 12,
    marginRight: 10,
  },
  textWrap: {
    flex: 1,
    paddingVertical: 12,
    paddingRight: 6,
  },
  title: {
    fontSize: 14,
    fontFamily: fonts.bold,
    color: color.textDark,
    lineHeight: 19,
  },
  message: {
    fontSize: 12,
    fontFamily: fonts.regular,
    color: color.textMedium,
    lineHeight: 17,
    marginTop: 2,
  },
  closeButton: {
    width: 38,
    height: 38,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 6,
  },
});

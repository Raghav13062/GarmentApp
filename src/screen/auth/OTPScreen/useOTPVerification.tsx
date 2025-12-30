import { useState, useEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { successToast, errorToast } from '../../../utils/customToast';
import { LoginApi } from '../../../Api/auth/authservice';
import { useDispatch } from 'react-redux';
import {
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';

const CELL_COUNT = 5;

export default function useOtpVerification() {
  const navigation = useNavigation<any>();
  const route: any = useRoute();
  const dispatch = useDispatch();

  const phone = route?.params?.phone ?? '';

  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(30);

  const ref = useBlurOnFulfill({ value: code, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value: code,
    setValue: setCode,
  });

  /* -------------------- RESEND TIMER -------------------- */
  useEffect(() => {
    if (resendTimer <= 0) return;

    const timer = setInterval(() => {
      setResendTimer(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [resendTimer]);

  /* -------------------- VERIFY OTP -------------------- */
  const handleVerifyOtp = async () => {
    if (code.length !== CELL_COUNT) {
      errorToast(`Please enter a valid ${CELL_COUNT}-digit OTP`);
      return;
    }

    setLoading(true);
    try {
      const payload = {
        phone,
        otp: code,
      };
console.log("payload ---",payload)
      const response = await LoginApi(
        payload,
        setLoading,
        dispatch,
        navigation
      );

      if (response?.status) {
        successToast('OTP verified successfully 🎉');
      } else {
        errorToast(response?.message || 'Invalid OTP');
      }
    } catch (error: any) {
      errorToast(
        error?.response?.data?.message || 'Something went wrong. Try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  /* -------------------- RESEND OTP -------------------- */
  const handleResendOtp = async () => {
    if (resendTimer > 0) return;

    try {
      setLoading(true);
      // await resendOtpApi({ phone });
      successToast('OTP sent successfully');
      setResendTimer(30);
      setCode('');
    } catch (error: any) {
      errorToast(
        error?.response?.data?.message || 'Unable to resend OTP'
      );
    } finally {
      setLoading(false);
    }
  };

  /* -------------------- CHANGE PHONE -------------------- */
  const handleChangePhone = () => {
    navigation.goBack();
  };

  return {
    phone,
    code,
    setCode,
    loading,
    resendTimer,
    ref,
    props,
    getCellOnLayoutHandler,
    handleVerifyOtp,
    handleResendOtp,
    handleChangePhone,
  };
}

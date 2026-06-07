import { useState, useEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { errorToast } from '../../../utils/customToast';
import { VerifyOtpApi, ResendOtpApi } from '../../../Api/auth/authservice';
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
  const phone = String(route?.params?.phone ?? '').replace(/\D/g, '').slice(0, 10);
  const staticOtp = '12345';

  const [code, setCode] = useState(staticOtp);
  const [loading, setLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(30);
  const ref = useBlurOnFulfill({ value: code, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value: code,
    setValue: setCode,
  });

  const handleResendOtp = async () => {
    // Prevent resend if timer is active
    if (resendTimer > 0 || loading) return;

    if (!phone) {
      errorToast('Phone number is required');
      return;
    }

    try {
      setLoading(true);

      const params = {
        phone,
        navigation,
      };

      await ResendOtpApi(params, setLoading);

      setResendTimer(30); // reset timer
      setCode(staticOtp);        // clear OTP input to static
    } catch (error: any) {
      console.error('Resend OTP error:', error);
      errorToast(error?.message || 'Failed to resend OTP');
    } finally {
      setLoading(false);
    }
  };

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
    const otp = staticOtp;
    const mobileNo = String(phone || '').replace(/\D/g, '').slice(0, 10);

    if (mobileNo.length !== 10) {
      errorToast('Phone number is required');
      return;
    }

    setLoading(true);
    try {
      const payload = {
        mobileNo,
        otp,
      };
      await VerifyOtpApi(
        payload,
        setLoading,
        dispatch,
        navigation
      );
    } catch (error: any) {
      errorToast(
        error?.response?.data?.message || 'Something went wrong. Try again.'
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

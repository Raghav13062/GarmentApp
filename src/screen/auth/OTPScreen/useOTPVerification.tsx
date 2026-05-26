import { useState, useEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { successToast, errorToast } from '../../../utils/customToast';
import { LoginApi, ResendOtpApi, VerifyOtpApi } from '../../../Api/auth/authservice';
import { useDispatch } from 'react-redux';
import {
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';

const CELL_COUNT = 6;

export default function useOtpVerification() {
  const navigation = useNavigation<any>();
  const route: any = useRoute();
  const dispatch = useDispatch();
  const phone = route?.params?.phone ?? '';
  const otp2 = route?.params?.otp ?? '';
  const isNewUser = route?.params?.isNewUser ?? false;

  const [code, setCode] = useState(otp2);
  const [fullName, setFullName] = useState('');
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
    setCode('');        // clear OTP input
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
    if (code.length !== CELL_COUNT) {
      errorToast(`Please enter a valid ${CELL_COUNT}-digit OTP`);
      return;
    }
    
    if (isNewUser && !fullName.trim()) {
      errorToast('Please enter your full name');
      return;
    }

    setLoading(true);
    try {
      const payload: any = {
        phone,
        otp2: code,
      };
      
      if (isNewUser) {
        payload.fullName = fullName.trim();
      }
      
        const response = await VerifyOtpApi(
        payload,
        setLoading,
        dispatch,
        navigation
      );

      if (response?.status) {
        successToast('OTP verified successfully 🎉');
      } 
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
    isNewUser,
    fullName,
    setFullName,
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

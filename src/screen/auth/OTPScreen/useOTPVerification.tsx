 import { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { navigateToScreen } from '../../../constant';
import ScreenNameEnum from '../../../routes/screenName.enum';
import { successToast } from '../../../utils/customToast';

interface RouteParams {
  phoneNumber: string;
}

export default function useOtpVerification() {
  const navigation = useNavigation();
  const route :any = useRoute();
  const { phoneNumber } = route?.params  ||"";

  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(30);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [resendTimer]);

  const handleVerifyOtp = async () => {
    // if (code.length !== 6) {
    //   Alert.alert('Error', 'Please enter 6-digit OTP');
    //   return;
    // }

    // setLoading(true);
    try {
successToast("OTP verified successfully");
      // await new Promise(resolve => setTimeout(resolve, 2000));
navigateToScreen(ScreenNameEnum.BottomTabs,);

       
       // navigation.navigate('Dashboard');
    } catch (error) {
      Alert.alert('Error', 'Invalid OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    if (resendTimer > 0) return;

    setLoading(true);
    try {
      // Resend OTP API call
      // await resendOtpApi(phoneNumber);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setResendTimer(30);
      Alert.alert('Success', 'OTP sent successfully!');
    } catch (error) {
      Alert.alert('Error', 'Failed to resend OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleChangePhone = () => {
    navigation.goBack();
  };

  return {
    phoneNumber,
    code,
    loading,
    resendTimer,
    setCode,
    handleVerifyOtp,
    handleResendOtp,
    handleChangePhone,
    navigation,
  };
}
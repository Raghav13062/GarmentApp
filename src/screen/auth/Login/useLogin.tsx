import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useDispatch } from 'react-redux';
import { RegistrationStackParamList } from '../../../navigators/RegistrationRoutes';
import { errorToast } from '../../../utils/customToast';
import { SetOtpApi } from '../../../Api/auth/authservice';

export default function useLogin() {
  const [mobileNo, setMobileNo] = useState('');
  const [mobileNoError, setMobileNoError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation<NativeStackNavigationProp<RegistrationStackParamList>>();
  const dispatch = useDispatch();

  const handleMobileNoChange = (value: string) => {
    // Only allow numbers
    const numericValue = value.replace(/[^0-9]/g, '');
    setMobileNo(numericValue);
    if (numericValue.length > 0 && numericValue.length < 10) {
      setMobileNoError('Mobile number must be 10 digits');
    } else {
      setMobileNoError('');
    }
  };

  const handleLogin = async () => {
    if (mobileNo.length !== 10) {
      setMobileNoError('Please enter a valid 10-digit mobile number');
      return;
    }

    try {
      const params = {
        phone: mobileNo,
      };
      await SetOtpApi(params, setLoading);
    } catch (error) {
      setLoading(false);
      errorToast("Login error occurred");
      console.error("Login error:", error);
    }
  };

  return {
    mobileNo,
    mobileNoError,
    loading,
    handleMobileNoChange,
    handleLogin,
    navigation,
  };
}

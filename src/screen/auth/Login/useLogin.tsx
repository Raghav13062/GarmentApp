import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useDispatch } from 'react-redux';
import { RegistrationStackParamList } from '../../../navigators/RegistrationRoutes';
import { SetOtpApi } from '../../../Api/auth/authservice';

export default function useLogin() {
  const [phone, setPhone] = useState('9345683953');
  const [phoneError, setPhoneError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation<NativeStackNavigationProp<RegistrationStackParamList>>();

  const handlePhoneChange = (value: string) => {
    const cleanedPhone = value.replace(/\D/g, '').slice(0, 10);
    setPhone(cleanedPhone);
    if (cleanedPhone.length < 10) {
      setPhoneError('Please enter a valid phone number');
    } else {
      setPhoneError('');
    }
  };

  const handleLogin = async () => {
    const mobileNo = phone.replace(/\D/g, '').slice(0, 10);

    if (mobileNo.length !== 10) {
      setPhoneError('Please enter a valid phone number');
      return;
    }

    try {
      const params = {
        phone: mobileNo,
      };
      await SetOtpApi(params, setLoading);
    } catch (error) {
      setLoading(false);
      console.error("Login error:", error);
    }
  };

  return {
    phone,
    phoneError,
    loading,
    handlePhoneChange,
    handleLogin,
    navigation,
  };
}

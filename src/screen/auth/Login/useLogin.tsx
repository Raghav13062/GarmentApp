import { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RegistrationStackParamList } from '../../../navigators/RegistrationRoutes';
import { validateMobileNumber, validatePassword } from '../../../utils/validation';
import { LoginCustomer } from '../../../Api/apiRequest';
import { navigateToScreen } from '../../../constant';
import ScreenNameEnum from '../../../routes/screenName.enum';

type UserType = 'User' | 'Driver';

export default function useLogin() {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [loading, setLoading] = useState(false);
  const [type, setType] = useState<UserType>('User');
  const [token, setToken] = useState('');
  const navigation = useNavigation<NativeStackNavigationProp<RegistrationStackParamList>>();
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const userType = await AsyncStorage.getItem('userType');
      setType(userType === 'Driver' ? 'Driver' : 'User');
    })();
  }, []);

  const handlePhoneChange = (value: string) => {
    setPhone(value.trim());
    const error = validateMobileNumber(value);
    setPhoneError(error);
  };

  const handlePasswordChange = (value: string) => {
    setPassword(value);
    const error = validatePassword(value);
    setPasswordError(error);
  };

  const handleLogin = async () => {
navigateToScreen(ScreenNameEnum.OtpScreen, { phone });
 
    
    // const trimmedPhone = phone.trim();
    // const trimmedPassword = password.trim();

    // if (trimmedPhone === '') return setPhoneError("Mobile number is required");
    // if (validateMobileNumber(trimmedPhone)) return setPhoneError("Please enter a valid mobile number");
    // if (trimmedPassword === '') return setPasswordError("Password is required");
    // if (trimmedPassword.length < 6) return setPasswordError("Password must be at least 6 characters");

    // try {
    //   const params = {
    //     phone,
    //     password,
    //     navigation,
    //     token,
    //   };
    //   await LoginCustomer(params, setLoading, dispatch);
    // } catch (error) {
    //   console.error("Login error:", error);
    // }
  };

  return {
    phone,
    password,
    phoneError,
    passwordError,
    loading,
    handlePhoneChange,
    handlePasswordChange,
    handleLogin,
    navigation,
    type
  };
}

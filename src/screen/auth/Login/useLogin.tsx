import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useDispatch } from 'react-redux';
import { RegistrationStackParamList } from '../../../navigators/RegistrationRoutes';
import { validateEmail, validatePassword } from '../../../utils/validation';
import { errorToast } from '../../../utils/customToast';
import { LoginApi } from '../../../Api/auth/authservice';

export default function useLogin() {
  const [email, setEmail] = useState('yasoni715@gmail.com');
  const [password, setPassword] = useState('password123');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation<NativeStackNavigationProp<RegistrationStackParamList>>();
  const dispatch = useDispatch();

  const handleEmailChange = (value: string) => {
    setEmail(value.trim());
    setEmailError(validateEmail(value.trim()));
  };

  const handlePasswordChange = (value: string) => {
    setPassword(value);
    setPasswordError(validatePassword(value));
  };

  const handleLogin = async () => {
    // const emailErr = validateEmail(email);
    // const passErr = validatePassword(password);

    // setEmailError(emailErr);
    // setPasswordError(passErr);

    // if (emailErr || passErr) return;

    try {
      const params = {
        email,
        password,
      };
      await LoginApi(params, setLoading, dispatch, navigation);
    } catch (error) {
      setLoading(false);
      errorToast("Login error occurred");
      console.error("Login error:", error);
    }
  };

  return {
    email,
    password,
    emailError,
    passwordError,
    loading,
    handleEmailChange,
    handlePasswordChange,
    handleLogin,
    navigation,
  };
}

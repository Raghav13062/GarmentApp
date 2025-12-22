// hooks/useSignup.ts

import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useDispatch } from 'react-redux';
import { RegistrationStackParamList } from '../../../navigators/RegistrationRoutes';
import { validateConfirmPassword, validateEmail, validateFirstName, validateLastName, validateMobileNumber, validatePassword } from '../../../utils/validation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SinupCustomer } from '../../../Api/apiRequest';

type UserType = 'User' | 'Driver';

export default function useSignup() {
  const navigation = useNavigation<NativeStackNavigationProp<RegistrationStackParamList>>();
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fname, setFname] = useState('')
  const [gst, setGst] = useState('')
  const [proof, setProof] = useState('')
  const [fnameError, setFnameError] = useState('')
  const [lNameError, setLNameError] = useState('')
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [phone, setPhone] = useState('')
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [phoneError, setPhoneError] = useState('')
  const [loading, setLoading] = useState(false);
  const [checked, setChecked] = useState(false)
  const [type, setType] = useState<UserType>('User');
  useEffect(() => {
    (async () => {
      const userType = await AsyncStorage.getItem('userType');
      setType(userType === 'Driver' ? 'Driver' : 'User');
    })();
  }, []);

  const handlefNameChange = (value: string) => {
    setFname(value);
    setFnameError(validateFirstName(value));
  };
  const handleProofChange = (value: string) => {
    setProof(value);
    // setLNameError(validateLastName(value));
  };
  const handleGSTChange = (value: string) => {
    setGst(value);
    // setLNameError(validateLastName(value));
  };
  const handleEmailChange = (value: string) => {
    setEmail(value);
    setEmailError(validateEmail(value));
  };
  const handlePhoneChange = (value: string) => {
    setPhone(value);
    setPhoneError(validateMobileNumber(value));
  };

  const handlePasswordChange = (value: string) => {
    setPassword(value);
    setPasswordError(validatePassword(value));
  };

  const handleConfirmPasswordChange = (value: string) => {
    setConfirmPassword(value);
    setConfirmPasswordError(validateConfirmPassword(password, value));
  };

  const handleSignup = async () => {
    // const emailErr = validateEmail(email);
    const passErr = validatePassword(password);
    // const confirmErr = validateConfirmPassword(password, confirmPassword);
    const fnameErr = validateFirstName(fname)
    // const lNameErr = validateLastName(lName)
    const phoneErr = validateMobileNumber(phone)

    setFnameError(fnameErr)
    // setLNameError(lNameErr)
    setPhoneError(phoneErr)
    // setEmailError(emailErr);
    setPasswordError(passErr);
    // setConfirmPasswordError(confirmErr);

    if (phoneErr || passErr || fnameErr) return;
    setLoading(true)
    try {
      const params = {
        password,
        phone,
        fname,
        proof,
        gst,
        navigation,
      };
      await SinupCustomer(params, setLoading);

      // Navigate on success
      // navigation.navigate('SomeScreen');
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return {
    email,
    password,
    confirmPassword,
    emailError,
    passwordError,
    confirmPasswordError,
    loading,
    handleEmailChange,
    handlePasswordChange,
    handleConfirmPasswordChange,
    handleSignup,
    navigation,
    checked,
    setChecked,
    type,
    fname,
    gst,
    proof,
    fnameError,
    lNameError,
    handlefNameChange,
    handleProofChange,
    handleGSTChange,
    phone,
    phoneError,
    handlePhoneChange
  };
}

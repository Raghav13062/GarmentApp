import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RegistrationStackParamList } from '../../../navigators/RegistrationRoutes';
import { validateEmail, validateFirstName, validateMobileNumber, validatePassword } from '../../../utils/validation';
import { RegisterApi } from '../../../Api/auth/authservice';
import { errorToast } from '../../../utils/customToast';

export default function useSignup() {
  const navigation = useNavigation<NativeStackNavigationProp<RegistrationStackParamList>>();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [mobileNo, setMobileNo] = useState('');
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');
  
  const [fullNameError, setFullNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [mobileNoError, setMobileNoError] = useState('');
  const [addressError, setAddressError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [checked, setChecked] = useState(true);

  const handleFullNameChange = (value: string) => {
    setFullName(value);
    setFullNameError(validateFirstName(value)); // Reuse validateFirstName for full name
  };

  const handleEmailChange = (value: string) => {
    setEmail(value.trim());
    setEmailError(validateEmail(value.trim()));
  };

  const handleMobileNoChange = (value: string) => {
    setMobileNo(value.trim());
    setMobileNoError(validateMobileNumber(value.trim()));
  };

  const handleAddressChange = (value: string) => {
    setAddress(value);
    setAddressError(value.trim() === '' ? 'Address is required' : '');
  };

  const handlePasswordChange = (value: string) => {
    setPassword(value);
    setPasswordError(validatePassword(value));
  };

  const handleSignup = async () => {
    const fullNameErr = validateFirstName(fullName);
    const emailErr = validateEmail(email);
    const mobileErr = validateMobileNumber(mobileNo);
    const addressErr = address.trim() === '' ? 'Address is required' : '';
    const passErr = validatePassword(password);

    setFullNameError(fullNameErr);
    setEmailError(emailErr);
    setMobileNoError(mobileErr);
    setAddressError(addressErr);
    setPasswordError(passErr);

    if (fullNameErr || emailErr || mobileErr || addressErr || passErr) {
      errorToast("Please fix the errors in the form");
      return;
    }

    if (!checked) {
      errorToast("Please agree to the Terms and Conditions");
      return;
    }

    try {
      const params = {
        fullName,
        email,
        mobileNo,
        address,
        password,
      };
      await RegisterApi(params, setLoading, navigation);
    } catch (e) {
      console.error("Signup error:", e);
      errorToast("An error occurred during signup");
    }
  };

  return {
    fullName,
    email,
    mobileNo,
    address,
    password,
    fullNameError,
    emailError,
    mobileNoError,
    addressError,
    passwordError,
    loading,
    checked,
    setChecked,
    handleFullNameChange,
    handleEmailChange,
    handleMobileNoChange,
    handleAddressChange,
    handlePasswordChange,
    handleSignup,
    navigation,
  };
}

import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useDispatch } from 'react-redux';
 import { RegistrationStackParamList } from '../../../navigators/RegistrationRoutes';
import { validateMobileNumber, validatePassword } from '../../../utils/validation';
 import { navigateToScreen } from '../../../constant';
import ScreenNameEnum from '../../../routes/screenName.enum';
import { errorToast, successToast } from '../../../utils/customToast';
import {   SetOtpApi } from '../../../Api/auth/authservice';
export default function useLogin() {
  const [phone, setPhone] = useState("8343513692");
   const [phoneError, setPhoneError] = useState('');
   const [loading, setLoading] = useState(false);
    const navigation = useNavigation<NativeStackNavigationProp<RegistrationStackParamList>>();
 
 

  const handlePhoneChange = (value: string) => {
    setPhone(value.trim());
    const error = validateMobileNumber(value);
    setPhoneError(error);
  };

 

  const handleLogin = async () => {

      const trimmedPhone = phone.trim();
    if (trimmedPhone === '') return setPhoneError("Mobile number is required");
    if (validateMobileNumber(trimmedPhone)) return setPhoneError("Please enter a valid mobile number");
    try {
      const params = {
        phone,
         navigation,
      };
       
      await SetOtpApi(params, setLoading,);
    } catch (error) {
      setLoading(false)
      errorToast(error ||"Login error:" )
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

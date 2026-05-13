import { useNavigation, CommonActions } from '@react-navigation/native';
import { useEffect, useRef, useState } from 'react';
import { GetProfile } from '../../../Api/auth/authservice';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { navigateToScreen } from '../../../constant';
import ScreenNameEnum from '../../../routes/screenName.enum';
import { logout } from '../../../redux/feature/authSlice';
import { clearCart } from '../../../redux/feature/cartSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { successToast } from '../../../utils/customToast';

export default function useProfile() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const userData = useSelector((state: any) => state.auth);
  const [profileImg, setProfileImg] = useState(null);
  const [showLogoutModal, setshowLogoutModal] = useState(false);

  const handleLogout = async () => {
    try {
      // 1. Clear Redux Store (Auth & Cart)
      dispatch(logout());
      dispatch(clearCart());

      // 2. Clear Local Storage
      await AsyncStorage.removeItem('token');
      await AsyncStorage.clear(); // Comprehensive clear

      // 3. Reset Navigation to Login (Prevents going back)
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: ScreenNameEnum.LoginScreen }],
        })
      );

      successToast('Logged out successfully');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };
  const [loading, setLoading] = useState(false);
// useEffect(() => {
//   GetProfile(setLoading,dispatch);
// }, []);

  return {
    loading,
  userData ,
  profileImg, setProfileImg ,
  showLogoutModal, setshowLogoutModal ,
  navigation ,
  handleLogout
  };
}

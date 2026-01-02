import { useNavigation } from '@react-navigation/native';
import { useEffect, useRef, useState } from 'react';
import { GetProfile } from '../../../Api/auth/authservice';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { navigateToScreen } from '../../../constant';
import ScreenNameEnum from '../../../routes/screenName.enum';
import { logout } from '../../../redux/feature/authSlice';
 
export default function useProfile() {
  const navigation = useNavigation();
const dispatch = useDispatch()
  const userData = useSelector((state: any) => state.auth);
  const [profileImg, setProfileImg] = useState(null);
const[showLogoutModal, setshowLogoutModal] = useState(false)
   const handleLogout = () => {
  dispatch(logout());
  navigateToScreen(ScreenNameEnum.OnboardingScreen);
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

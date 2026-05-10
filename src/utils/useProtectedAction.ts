import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import ScreenNameEnum from '../routes/screenName.enum';

export const useProtectedAction = () => {
  const navigation = useNavigation<any>();
  const isLogin = useSelector((state: any) => state.auth.isLogin);

  const executeProtected = (callback: () => void) => {
    if (isLogin) {
      callback();
    } else {
      // Not logged in, redirect to login
      navigation.navigate(ScreenNameEnum.LoginScreen);
    }
  };

  return executeProtected;
};

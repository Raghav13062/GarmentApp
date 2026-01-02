import { useNavigation } from '@react-navigation/native';
import { useEffect, useRef, useState } from 'react';
import { GetProfile } from '../../../Api/auth/authservice';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
 
export default function useDashboard() {
  const navigation = useNavigation();
const dispatch = useDispatch()
  const userData = useSelector((state: any) => state.auth);

  const [loading, setLoading] = useState(false);
useEffect(() => {
  GetProfile(setLoading,dispatch);
}, []);

  return {
    loading,
  userData
  };
}

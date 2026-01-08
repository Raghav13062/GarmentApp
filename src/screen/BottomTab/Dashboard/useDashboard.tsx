import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { GetProfile } from '../../../Api/auth/authservice';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { GetBannersHome, GetCategories } from '../../../Api/auth/ApiGetCategories';
 
export default function useDashboard() {
  const navigation: any = useNavigation();
  const dispatch = useDispatch()
  const userData = useSelector((state: any) => state.auth);
  const [categories, setCategories] = useState<any[]>([]);
    const [Banner, setBanner] = useState<any[]>([]);

 const  [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCategories();
    BannerApi()
  }, []);

  const fetchCategories = async () => {
    const data = await GetCategories(setLoading);
    if (data) {
       setCategories(data);
    }
  };

    const BannerApi = async () => {
    const data = await GetBannersHome(setLoading);
    if (data) {
        setBanner(data);
    }
  };
  useEffect(() => {
    GetProfile(setLoading, dispatch);
  }, []);
  return {
     userData,
    categories, setCategories,
    BannerApi,
    Banner, setBanner
   };
}

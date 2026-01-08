import { useNavigation } from '@react-navigation/native';
import { useEffect, useRef, useState } from 'react';
import { GetProfile } from '../../../Api/auth/authservice';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { GetCategories } from '../../../Api/auth/ApiGetCategories';
   
export default function useDashboard() {
  const navigation = useNavigation();
const dispatch = useDispatch()
  const userData = useSelector((state: any) => state.auth);
   const [categories, setCategories] = useState<any[]>([]);
  const [selectedTab, setSelectedTab] = useState("All");

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    const data = await GetCategories(setLoading);

    if (data) {
      // 🔹 Add "All" manually
      const updated = [{ name: "All" }, ...data];
      setCategories(updated);
    }
  };


  const [loading, setLoading] = useState(false);
useEffect(() => {
  GetProfile(setLoading,dispatch);
}, []);

 
 
  return {
    loading,
  userData,
  categories, setCategories,
  selectedTab, setSelectedTab
  };
}

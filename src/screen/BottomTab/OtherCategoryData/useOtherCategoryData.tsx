import { useNavigation, useRoute } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { GetCategoriesId } from '../../../Api/auth/ApiGetCategories';
import { errorToast } from '../../../utils/customToast';

export default function useOtherCategoryData() {
  const navigation: any = useNavigation();
  const route = useRoute<any>();
  const { item } = route.params;

  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState(null);
  const [userData, setUserData] = useState(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [cart, setCart] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);

  useEffect(() => {
    if (item?._id) {
      fetchCategoryData(item._id);
    }
  }, [item]);

const fetchCategoryData = async (id: string) => {
  setLoading(true);
  try {
    const data = await GetCategoriesId(id); // returns an array of categories
    console.log("Fetched Category Data:", data);

    if (data && Array.isArray(data)) {
     console.log("Category data is an array with length:", data);
        // Show all categories
        setProducts(data);
      }  
   
  } catch (error) {
    console.error('Error fetching category:', error);
    errorToast('Network error. Please try again.');
  } finally {
    setLoading(false);
  }
};


  return {
    loading,
    products,
    setProducts,
    category,
    userData,
    setUserData,
    viewMode,
    setViewMode,
    cart,
    setCart,
    cartCount,
    setCartCount,
    cartTotal,
    setCartTotal,
    navigation,
  };
}

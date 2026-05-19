import { useNavigation } from '@react-navigation/native';
import { useEffect, useMemo, useState, useRef, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GetProfile } from '../../../Api/auth/authservice';
import { GetAllBrandsProduct } from '../../../Api/auth/ApiGetCategories';
import { getHomePageData } from '../../../Api/auth/homeService';
import { GetCartApi } from '../../../Api/auth/cartService';
import { setCart } from '../../../redux/feature/cartSlice';

type GenderType = 'all' | 'men' | 'women' | 'kids' | 'Women' | 'Men' | 'Kids' | 'All';

const SAFE_ARRAY_LIMIT = 50; // 🔐 crash protection

export default function useDashboard() {
  const navigation: any = useNavigation();
  const dispatch = useDispatch();
  const userData = useSelector((state: any) => state.auth);

  const [loading, setLoading] = useState(false);
  const [homeData, setHomeData] = useState<any>(null);
  const [gender, setGender] = useState<GenderType>('all');
  const [BrandsProduct, setBrandsProduct] = useState<any>(null);

  const isFirstLoad = useRef(true);
  const activeRequest = useRef(0); // 🔐 prevent race condition

  const GetBrandsProduct = useCallback(async () => {
    try {
      const data = await GetAllBrandsProduct();
      if (data) {

        console.log('data-GetBrandsProduct', data)
        setBrandsProduct(data);
      }
    } catch (e) {
      console.log('Brands API Error', e);
    }
  }, []);

  const fetchCart = useCallback(async () => {
    try {
      const data = await GetCartApi();
      if (data) {
        const mappedItems = data.items.map((item: any) => ({
          id: item._id,
          productId: item.product?._id,
          title: item.product?.title || 'Product',
          image: item.product?.baseImages?.[0]?.replace(/\.avif$/i, '.webp') || 'https://via.placeholder.com/150',
          price: item.lineTotal || item.price,
          quantity: item.quantity,
          brand: item.product?.brand || 'Garment',
          category: item.product?.categoryId?.name || 'Apparel',
          originalPrice: item.mrp
        }));
        dispatch(setCart({
          items: mappedItems,
          totalItems: data.totalItems,
          totalPrice: data.totalPrice
        }));
      }
    } catch (e) {
      console.log('Cart API Error', e);
    }
  }, [dispatch]);

  /* ---------------- Fetch Home ---------------- */
  const fetchHome = useCallback(async (selectedGender: GenderType) => {
    const requestId = ++activeRequest.current;
    setLoading(true);

    try {
      const response = await getHomePageData("Women");

      // ignore old API responses
      if (requestId !== activeRequest.current) return;
      console.log('response', response)
      if (!response || !response.success || !Array.isArray(response.data?.sections)) {
        setHomeData(null);
        return;
      }

      setHomeData(response.data);

      if (isFirstLoad.current) {
        // Find if there's any implicit gender filter in sections (though current API seems to use query param)
        const genderSection = response.data.sections.find(
          (s: any) => s?.sectionType === 'GENDER_FILTER'
        );
        const apiGender = "Women";

        if (apiGender && apiGender !== gender) {
          setGender(apiGender as GenderType);
        }
        isFirstLoad.current = false;
      }
    } catch (e) {
      console.log('Home API Error', e);
      setHomeData(null);
    } finally {
      setLoading(false);
    }
  }, []);

  /* ---------------- Initial Load ---------------- */
  useEffect(() => {
    GetProfile(setLoading, dispatch);
    GetBrandsProduct();
    fetchCart();
  }, [dispatch, GetBrandsProduct, fetchCart]);

  /* ---------------- Home Data ---------------- */
  useEffect(() => {
    fetchHome("Women");
  }, [fetchHome]);

  /* ---------------- Sections (safe + sorted) ---------------- */
  const sections = useMemo(() => {
    if (!homeData?.sections || !Array.isArray(homeData.sections)) return [];
    return [...homeData.sections].sort(
      (a, b) => (a?.displayOrder ?? 0) - (b?.displayOrder ?? 0)
    );
  }, [homeData]);

  /* ---------------- Gender ---------------- */
  const genderSection = useMemo(
    () => sections.find((item: any) => item?.sectionType === 'GENDER_FILTER'),
    [sections]
  );

  const genderOptions: GenderType[] = useMemo(() => {
    const options = genderSection?.data?.options;
    return Array.isArray(options)
      ? options.filter(Boolean)
      : ['all', 'men', 'women', 'kids'];
  }, [genderSection]);

  /* ---------------- Categories ---------------- */
  const categories = useMemo(() => {
    const list = sections.find(
      (i: any) => i?.sectionType === 'CATEGORY_GRID'
    )?.data?.categories;

    return Array.isArray(list) ? list.slice(0, SAFE_ARRAY_LIMIT) : [];
  }, [sections]);

  /* ---------------- Banners ---------------- */
  const banners = useMemo(() => {
    // API response has SEARCH_BANNER which contains videoUrl or mediaImages
    const bannerSection = sections.find(
      (i: any) => i?.sectionType === 'SEARCH_BANNER' || i?.sectionType === 'BANNER_CAROUSEL'
    );

    if (bannerSection?.sectionType === 'BANNER_CAROUSEL') {
      return Array.isArray(bannerSection.data?.banners)
        ? bannerSection.data.banners.slice(0, SAFE_ARRAY_LIMIT)
        : [];
    }

    // If it's SEARCH_BANNER with images
    if (bannerSection?.data?.background?.mediaImages) {
      return bannerSection.data.background.mediaImages;
    }

    return [];
  }, [sections]);

  /* ---------------- Video Ad ---------------- */
  const videoAdUrl = useMemo(() => {
    const bannerSection = sections.find((i: any) => i?.sectionType === 'SEARCH_BANNER');
    return bannerSection?.data?.background?.videoUrl || null;
  }, [sections]);

  /* ---------------- Dynamic Product Sections ---------------- */
  const productSections = useMemo(() => {
    return sections
      .map((i: any) => {
        if (
          ['TOP_PICKS', 'NEW_ARRIVALS', 'TOP_PRODUCTS'].includes(i?.sectionType) &&
          Array.isArray(i?.data?.products)
        ) {
          let filteredProducts = i.data.products;

          // Apply local gender filter if needed
          if (gender && gender !== 'all') {
            filteredProducts = filteredProducts.filter(
              (p: any) =>
                !p.genderFilter ||
                p.genderFilter.toLowerCase() === gender.toLowerCase() ||
                p.genderFilter.toLowerCase() === 'all'
            );
          }

          return {
            ...i,
            data: {
              ...i.data,
              products: filteredProducts,
            },
          };
        }
        return i;
      })
      .filter(
        (i: any) =>
          ['TOP_PICKS', 'NEW_ARRIVALS', 'TOP_PRODUCTS'].includes(i?.sectionType) &&
          Array.isArray(i?.data?.products) &&
          i.data.products.length > 0
      );
  }, [sections, gender]);

  /* ---------------- Return ---------------- */
  return {
    navigation,
    loading,
    userData,
    gender,
    setGender,
    genderOptions,
    categories, // Circular categories for top bar
    banners,
    productSections,
    BrandsProduct,
    videoAdUrl,
    sections // All sections for dynamic body
  };
}

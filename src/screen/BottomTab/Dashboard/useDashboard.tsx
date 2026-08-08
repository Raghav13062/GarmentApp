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
const DUMMY_PRODUCT = (id: string, name: string, price: number, mrp: number) => ({
  _id: id,
  id,
  name,
  price,
  mrp,
  image: 'https://via.placeholder.com/400x500.png?text=' + encodeURIComponent(name),
  images: ['https://via.placeholder.com/400x500.png?text=' + encodeURIComponent(name)],
});

const DUMMY_SECTIONS = [
  {
    id: 'dummy-search-banner',
    sectionType: 'SEARCH_BANNER',
    title: '',
    data: {
      background: {
        mediaImages: [
          "https://cpimg.tistatic.com/12958691/b/4/ethnic-wedding-clutch-bag-for-women-with-peacock-design-10.png",
          'https://hakshi.com/cdn/shop/articles/Handbag_Gift_Guide_Perfect_Presents_for_Every_Occasion_4.png?v=1731402795',
          'https://hakshi.com/cdn/shop/articles/Handbag_Gift_Guide_Perfect_Presents_for_Every_Occasion_1.jpg?v=1751355776&width=1840',
          'https://via.placeholder.com/800x900.png?text=Kanjivaram+Collection',
        ],
        videoUrl: null,
      },
    },
  },
  {
    id: 'dummy-category-grid',
    sectionType: 'CATEGORY_GRID',
    title: 'Shop by Occasion',
    data: {
      categories: [
        { id: 'cat-1', name: 'Wedding', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTD8x1wjnKVt4G08jHz1B3B3nqFu_0668yIc3yf_ZJfh2x82UQedtuN1HGZ&s=10' },
        { id: 'cat-2', name: 'Festive', image: 'https://manvikapoor.com/cdn/shop/files/bageecha_saree3_800x1024_ibtidah_1200x.webp?v=1751888909' },
        { id: 'cat-3', name: 'Casual', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTD8x1wjnKVt4G08jHz1B3B3nqFu_0668yIc3yf_ZJfh2x82UQedtuN1HGZ&s=10' },
        { id: 'cat-4', name: 'Office Wear', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTD8x1wjnKVt4G08jHz1B3B3nqFu_0668yIc3yf_ZJfh2x82UQedtuN1HGZ&s=10' },
      ],
    },
  },
  {
    id: 'dummy-flash-sale',
    sectionType: 'FLASH_SALE',
    title: 'Flash Sale',
    data: {
      subtitle: 'Grab the best deals before they are gone',
      products: [
        DUMMY_PRODUCT('p1', 'Kanjivaram Silk Saree', 3499, 5999),
        DUMMY_PRODUCT('p2', 'Banarasi Silk Saree', 2999, 4999),
        DUMMY_PRODUCT('p3', 'Cotton Handloom Saree', 1499, 2299),
        DUMMY_PRODUCT('p4', 'Chiffon Printed Saree', 999, 1799),
      ],
    },
  },
  {
    id: 'dummy-top-picks',
    sectionType: 'TOP_PICKS',
    title: 'Top Picks',
    data: {
      products: [
        DUMMY_PRODUCT('p5', 'Organza Saree', 1999, 2999),
        DUMMY_PRODUCT('p6', 'Linen Saree', 1799, 2499),
        DUMMY_PRODUCT('p7', 'Georgette Saree', 1599, 2199),
        DUMMY_PRODUCT('p8', 'Tussar Silk Saree', 2199, 3199),
      ],
    },
  },
  {
    id: 'dummy-new-arrivals',
    sectionType: 'NEW_ARRIVALS',
    title: 'New Arrivals',
    data: {
      products: [
        DUMMY_PRODUCT('p9', 'Printed Georgette Saree', 1299, 1999),
        DUMMY_PRODUCT('p10', 'Embroidered Net Saree', 2599, 3499),
        DUMMY_PRODUCT('p11', 'Handblock Cotton Saree', 1199, 1699),
        DUMMY_PRODUCT('p12', 'Designer Party Wear Saree', 2999, 4299),
      ],
    },
  },
];
export default function useDashboard() {
  const navigation: any = useNavigation();
  const dispatch = useDispatch();
  const userData = useSelector((state: any) => state.auth);

  const [loading, setLoading] = useState(false);
  // 👇 Default state itself is dummy data — screen never renders blank,
  // even before the first API call resolves.
  const [homeData, setHomeData] = useState<any>({ sections: DUMMY_SECTIONS });
  const [gender, setGender] = useState<GenderType>('women');
  const [BrandsProduct, setBrandsProduct] = useState<any>(null);
  const [usingFallback, setUsingFallback] = useState(true);

  const isFirstLoad = useRef(true);
  const activeRequest = useRef(0); // 🔐 prevent race condition

  const GetBrandsProduct = useCallback(async () => {
    try {
      const data = await GetAllBrandsProduct();
      if (data) {
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
          title: item.product?.title || '',
          image: item.product?.baseImages?.[0]?.replace(/\.avif$/i, '.webp') || '',
          price: item.lineTotal || item.price,
          quantity: item.quantity,
          brand: item.product?.brand || '',
          category: item.product?.categoryId?.name || '',
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

  /* ---------------- Fetch Home (with dummy fallback) ---------------- */
  const fetchHome = useCallback(async (selectedGender: GenderType = 'women') => {
    const requestId = ++activeRequest.current;
    setLoading(true);

    try {
      const normalizedGender = String(selectedGender || 'women').toLowerCase() as GenderType;
      const response = await getHomePageData(normalizedGender);

      // ignore old API responses
      if (requestId !== activeRequest.current) return;

      const gotValidData =
        response &&
        response.success &&
        Array.isArray(response.data?.sections) &&
        response.data.sections.length > 0;

      if (!gotValidData) {
        console.log('Home API returned no usable data — falling back to dummy data');
        setHomeData({ sections: DUMMY_SECTIONS });
        setUsingFallback(true);
      } else {
        setHomeData(response.data);
        setUsingFallback(false);
      }

      if (isFirstLoad.current) {
        setGender(normalizedGender);
        isFirstLoad.current = false;
      }
    } catch (e) {
      console.log('Home API Error — falling back to dummy data', e);
      if (requestId === activeRequest.current) {
        setHomeData({ sections: DUMMY_SECTIONS });
        setUsingFallback(true);
      }
    } finally {
      if (requestId === activeRequest.current) {
        setLoading(false);
      }
    }
  }, []);

    useEffect(() => {
    GetProfile(setLoading, dispatch);
     GetBrandsProduct();
     fetchCart();
 }, [dispatch, GetBrandsProduct, fetchCart]);

  // /* ---------------- Home Data ---------------- */
 useEffect(() => {
    fetchHome(gender);
  }, [fetchHome, gender]);

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
      : [];
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
    sections, // All sections for dynamic body
    usingFallback, // true jab dummy data dikh raha ho
  };
}
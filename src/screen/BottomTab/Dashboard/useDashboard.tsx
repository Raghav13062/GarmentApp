import { useNavigation } from '@react-navigation/native';
import { useEffect, useMemo, useState, useRef, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GetProfile } from '../../../Api/auth/authservice';
import { GetCategories } from '../../../Api/auth/ApiGetCategories';
type GenderType = 'all' | 'men' | 'women' | 'kids';
const SAFE_ARRAY_LIMIT = 50; // 🔐 crash protection
export default function useDashboard() {
  const navigation: any = useNavigation();
  const dispatch = useDispatch();
  const userData = useSelector((state: any) => state.auth);

  const [loading, setLoading] = useState(false);
  const [homeData, setHomeData] = useState<any>(null);
  const [gender, setGender] = useState<GenderType>('all');

  const isFirstLoad = useRef(true);
  const activeRequest = useRef(0); // 🔐 prevent race condition

  /* ---------------- Fetch Home ---------------- */
  const fetchHome = useCallback(async (selectedGender: GenderType) => {
    const requestId = ++activeRequest.current;

    try {
      const data = await GetCategories(setLoading, selectedGender);

      // ignore old API responses
      if (requestId !== activeRequest.current) return;

      if (!data || !Array.isArray(data.sections)) {
        setHomeData(null);
        return;
      }

      setHomeData(data);

       if (isFirstLoad.current) {
        const apiGender =
          data.sections.find((s: any) => s?.type === 'GENDER_FILTER')
            ?.data?.selectedGender;

        if (apiGender && apiGender !== gender) {
          setGender(apiGender);
        }
        isFirstLoad.current = false;
      }
    } catch (e) {
      console.log('Home API Error', e);
      setHomeData(null);
    }
  }, [gender]);

  /* ---------------- Profile ---------------- */
  useEffect(() => {
    GetProfile(setLoading, dispatch);
  }, [dispatch]);

  /* ---------------- Home Data ---------------- */
  useEffect(() => {
    fetchHome(gender);
  }, [gender, fetchHome]);

  /* ---------------- Sections (safe + sorted) ---------------- */
  const sections = useMemo(() => {
    if (!homeData?.sections || !Array.isArray(homeData.sections)) return [];
    return [...homeData.sections].sort(
      (a, b) => (a?.displayOrder ?? 0) - (b?.displayOrder ?? 0)
    );
  }, [homeData]);

  /* ---------------- Gender ---------------- */
  const genderSection = useMemo(
    () => sections.find((item: any) => item?.type === 'GENDER_FILTER'),
    [sections]
  );

  const genderOptions: GenderType[] = useMemo(() => {
    const options = genderSection?.data?.options;
    return Array.isArray(options)
      ? options.filter(Boolean)
      : ['all', 'men', 'women'];
  }, [genderSection]);

  /* ---------------- Categories ---------------- */
  const categories = useMemo(() => {
    const list =
      sections.find((i: any) => i?.type === 'CATEGORIES')?.data?.categories;

    return Array.isArray(list) ? list.slice(0, SAFE_ARRAY_LIMIT) : [];
  }, [sections]);

  /* ---------------- Banners ---------------- */
  const banners = useMemo(() => {
    const list =
      sections.find((i: any) => i?.type === 'BANNER_CAROUSEL')?.data?.banners;

    return Array.isArray(list) ? list.slice(0, SAFE_ARRAY_LIMIT) : [];
  }, [sections]);

  /* ---------------- Top Products ---------------- */
  const topProducts = useMemo(() => {
    const list =
      sections.find((i: any) => i?.type === 'TOP_PRODUCTS')?.data?.products;

    return Array.isArray(list) ? list.slice(0, SAFE_ARRAY_LIMIT) : [];
  }, [sections]);

  /* ---------------- Return ---------------- */
  return {
    navigation,
    loading,
    userData,
    gender,
    setGender,
    genderOptions,
    categories,
    banners,
    topProducts,
  };
}

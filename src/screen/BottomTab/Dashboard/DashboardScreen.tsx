import React, { useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  FlatList,
  Image,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Animated, {
  FadeInUp,
  FadeInDown,
  useSharedValue,
} from 'react-native-reanimated';
import LinearGradient from 'react-native-linear-gradient';
import { color, fonts, navigateToScreen, radius, spacing } from '../../../constant';
import ScreenNameEnum from '../../../routes/screenName.enum';
import StatusBarComponent from '../../../component/StatusBarCompoent';
import ProductCard from '../../../component/cart/ProductCard';
import { CategoryPill, SectionHeader } from '../../../component/common';
import useDashboard from './useDashboard';
import VideoAd from './VideoAd';
import HeaderBar from '../../../component/HeaderBar';
import Loading from '../../../utils/Loader';

const { width } = Dimensions.get('window');

// ---------------------------------------------------------------------------
// NORMALIZER
// Backend responses often differ slightly from what the UI expects
// (sectionType vs type, products vs items/data, images vs mediaImages, etc).
// This layer coerces whatever the API sends into the shape the components
// below actually read, so data shows up even if field names differ.
// ---------------------------------------------------------------------------

const pickArray = (...candidates: any[]) => {
  for (const c of candidates) {
    if (Array.isArray(c)) return c;
  }
  return [];
};

const pickValue = (...candidates: any[]) => {
  for (const c of candidates) {
    if (c !== undefined && c !== null && c !== '') return c;
  }
  return undefined;
};

const normalizeProduct = (p: any) => {
  if (!p) return p;
  return {
    ...p,
    _id: pickValue(p._id, p.id, p.productId, p.product_id),
    id: pickValue(p.id, p._id, p.productId, p.product_id),
    name: pickValue(p.name, p.title, p.productName),
    price: pickValue(p.price, p.sellingPrice, p.selling_price, p.finalPrice),
    mrp: pickValue(p.mrp, p.mrpPrice, p.originalPrice, p.price),
    image: pickValue(
      p.image,
      p.images?.[0],
      p.thumbnail,
      p.imageUrl,
      p.image_url
    ),
    images: pickArray(p.images, p.image ? [p.image] : null, p.gallery),
  };
};

const normalizeSection = (section: any) => {
  if (!section) return null;

  const sectionType = pickValue(
    section.sectionType,
    section.section_type,
    section.type,
    section.section_key
  );

  const rawData = pickValue(section.data, section.payload, section.content, section);

  const background = pickValue(
    rawData?.background,
    rawData?.banner,
    section?.background
  );

  const mediaImages = pickArray(
    background?.mediaImages,
    background?.images,
    background?.media,
    rawData?.images,
    rawData?.banners
  );

  const categories = pickArray(
    rawData?.categories,
    rawData?.category,
    section?.categories
  );

  const rawProducts = pickArray(
    rawData?.products,
    rawData?.items,
    rawData?.data,
    section?.products,
    Array.isArray(rawData) ? rawData : null
  );

  return {
    id: pickValue(section.id, section._id, section.sectionId, `${sectionType}-${Math.random()}`),
    sectionType,
    title: pickValue(section.title, rawData?.title),
    data: {
      ...rawData,
      title: pickValue(rawData?.title, section.title),
      subtitle: pickValue(rawData?.subtitle, section.subtitle),
      background: background
        ? {
            ...background,
            mediaImages,
            videoUrl: pickValue(background?.videoUrl, background?.video_url, background?.video),
          }
        : undefined,
      categories: categories.map((c: any) => ({
        id: pickValue(c.id, c._id, c.categoryId),
        name: pickValue(c.name, c.title, c.categoryName),
        image: pickValue(c.image, c.imageUrl, c.icon),
      })),
      products: rawProducts.map(normalizeProduct),
    },
  };
};

const normalizeSections = (sections: any): any[] => {
  // Handle case where API wraps everything one level deeper, e.g. { data: { sections: [...] } }
  const list = pickArray(
    sections,
    sections?.sections,
    sections?.data,
    sections?.data?.sections
  );
  return list.map(normalizeSection).filter(Boolean);
};

// --- Enhanced Hero Slider with Dynamic Overlays ---

const HeroSlider = ({ sections }: { sections: any[] }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  const bannerSection = sections.find(s => s.sectionType === 'SEARCH_BANNER');
  const bannerData = bannerSection?.data?.background;

  if (!bannerData || !Array.isArray(bannerData.mediaImages) || bannerData.mediaImages.length === 0) {
    return null;
  }

  const carouselData = bannerData.mediaImages.map((img: string, idx: number) => ({
    type: 'image',
    url: img,
    id: `img-${idx}`,
  }));

  const handleScroll = (event: any) => {
    const scrollOffset = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollOffset / width);
    if (index !== activeIndex) setActiveIndex(index);
  };

  const renderSlide = ({ item }: any) => {
    return (
      <View style={styles.heroSlide}>
        <Image source={{ uri: item.url }} style={styles.heroImage} />

        <View style={styles.heroOverlay}>
          <Animated.Text
            entering={FadeInUp.delay(500).duration(800)}
            style={styles.heroGrandSale}
          >
            GRAND SALE
          </Animated.Text>
          <Animated.Text
            entering={FadeInUp.delay(700).duration(800)}
            style={styles.heroTitle}
          >
            Festive Sale: 40% Off{'\n'}Kanjivaram
          </Animated.Text>
          <Animated.View entering={FadeInDown.delay(900).duration(800)}>
            <TouchableOpacity style={styles.heroBtn}>
              <Text style={styles.heroBtnText}>Shop Now</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>

        <LinearGradient
          colors={[color.transparent, color.overlayDark]}
          style={[StyleSheet.absoluteFill, { top: '60%' }]}
        />
      </View>
    );
  };

  return (
    <View style={styles.heroContainer}>
      <FlatList
        ref={flatListRef}
        data={carouselData}
        renderItem={renderSlide}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        keyExtractor={(item) => item.id}
      />
      <View style={styles.pagination}>
        {carouselData.map((_, i) => (
          <View
            key={i}
            style={[
              styles.dot,
              activeIndex === i && styles.activeDot
            ]}
          />
        ))}
      </View>
    </View>
  );
};

const PILL_FILTERS = ['All Heritage', 'Banarasi', 'Kanjivaram'];

const PillFilters = () => {
  const [active, setActive] = useState(PILL_FILTERS[0]);
  return (
    <View style={styles.pillContainer}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.pillScroll}
      >
        {PILL_FILTERS.map(label => (
          <CategoryPill
            key={label}
            label={label}
            active={active === label}
            onPress={() => setActive(label)}
          />
        ))}
      </ScrollView>
    </View>
  );
};

const HotCategories = ({ categories }: any) => {
  if (!Array.isArray(categories) || categories.length === 0) return null;
  return (
    <View style={styles.hotCategoriesSection}>
      <SectionHeader title="Shop by Occasion" />
      <View style={styles.hotCatGrid}>
        {categories.map((cat: any, index: number) => (
          <Animated.View
            key={cat.id || index}
            entering={FadeInDown.delay(index * 100).duration(600)}
            style={styles.hotCatGridItem}
          >
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() =>
                navigateToScreen(ScreenNameEnum.OtherCategoryData, {
                  categoryId: cat.id,
                  categoryName: cat.name,
                })
              }
              style={styles.hotCatImageContainer}
            >
              {!!cat.image && (
                <Image source={{ uri: cat.image }} style={styles.hotCatGridImage} />
              )}
              <View style={styles.hotCatOverlay}>
                <Text style={styles.hotCatGridText}>{cat.name}</Text>
              </View>
            </TouchableOpacity>
          </Animated.View>
        ))}
      </View>
    </View>
  );
};

const OfferSection = ({ section, navigation, gender }: any) => {
  const title = section?.title || section?.data?.title || 'Flash Sale';
  const subtitle = section?.data?.subtitle || 'Grab the best deals';
  const products = Array.isArray(section?.data?.products) ? section.data.products : [];

  if (products.length === 0) return null;

  return (
    <View style={styles.flashSection}>
      <View style={styles.timerBanner}>
        <Text style={styles.timerLabel}>FLASH SALE</Text>
        <View style={styles.timerLine} />
        <View style={styles.timerRight}>
          <Text style={styles.timerEndsText}>ENDS IN</Text>
          <View style={styles.timerValueContainer}>
            <Text style={styles.timerValue}>12:00:00</Text>
          </View>
        </View>
        <View style={styles.couponBadge}>
          <Text style={styles.couponSub}>EXTRA</Text>
          <Text style={styles.couponValue}>20% OFF</Text>
        </View>
      </View>

      <View style={[styles.flashHeader, { marginTop: 20 }]}>
        <View style={{ flex: 1 }}>
          <View style={styles.shopTheSaleRow}>
            <Text style={styles.shopTheSaleText}>SHOP THE SALE</Text>
            <View style={[styles.headerLine, { backgroundColor: color.primary }]} />
          </View>
          <Text style={styles.flashTitle}>{title}</Text>
          <Text style={styles.flashSubtitle}>{subtitle}</Text>
        </View>
        <View style={styles.dontMissRow}>
          <Text style={styles.dontMissText}>DON'T MISS OUT</Text>
        </View>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.horizontalList}>
        {products.map((item: any, index: number) => (
          <View key={item?._id || item?.id || index} style={styles.horizontalCardWrapper}>
            <ProductCard
              item={item}
              onPress1={() =>
                navigation.navigate(ScreenNameEnum.ProductDetails, {
                  item,
                  productId: item?._id || item?.id,
                  gender,
                  relatedProducts: products,
                })
              }
            />
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const formatSectionTitle = (title: string = '') => {
  const normalizedTitle = title.replace(/_/g, ' ').trim().toLowerCase();

  const sectionNames: Record<string, string> = {
    'top picks': 'Top Picks For Women',
    'new arrivals': 'New Arrivals For Women',
    'top products': 'Trending Women’s Collection',
    'shop by category': 'Shop Women By Category',
  };

  if (sectionNames[normalizedTitle]) {
    return sectionNames[normalizedTitle];
  }

  return normalizedTitle
    .split(' ')
    .filter(Boolean)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

const getSectionRenderKey = (section: any) => {
  const title = formatSectionTitle(section?.data?.title || section?.title || '');
  return `${section?.sectionType || 'section'}-${title}`.toLowerCase();
};

const getSectionProducts = (section: any) => {
  return Array.isArray(section?.data?.products) ? section.data.products : [];
};

const DashboardScreen = () => {
  const {
    gender,
    loading,
    sections: rawSections,
    navigation,
  } = useDashboard();

  // Normalize once per render — handles differing API shapes safely.
  const sections = normalizeSections(rawSections);

  const scrollY = useSharedValue(0);
  const scrollViewRef = useRef<ScrollView>(null);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const isLogin = useSelector((reduxState: any) => reduxState.auth?.isLogin);
  const showGuestBanner = showBackToTop && !isLogin;
  const renderedSectionKeys = new Set<string>();

  // Debug: uncomment while diagnosing to see exactly what the API returned
  // and what it normalized to.
  // console.log('RAW sections from API:', JSON.stringify(rawSections, null, 2));
  // console.log('NORMALIZED sections:', JSON.stringify(sections, null, 2));

  const handleBackToTop = () => {
    scrollViewRef.current?.scrollTo({ y: 0, animated: true });
    scrollY.value = 0;
    setShowBackToTop(false);
  };

  const handleMainScroll = (e: any) => {
    const offsetY = e.nativeEvent.contentOffset.y;
    scrollY.value = offsetY;
    setShowBackToTop(offsetY > 350);
  };

  if (loading && sections.length === 0) {
    return (
      <SafeAreaView style={styles.loaderContainer}>
        <Loading fullScreen={false} size="large" color={color.primary} />
      </SafeAreaView>
    );
  }

  // Nothing came back even after loading finished — show an explicit
  // empty state instead of a silently blank screen.
  if (!loading && sections.length === 0) {
    return (
      <SafeAreaView style={styles.loaderContainer}>
        <Text style={{ fontFamily: fonts.medium, color: color.textMedium, fontSize: 14 }}>
          No data available right now. Pull to refresh or check back later.
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={[]}>
      <StatusBarComponent barStyle="dark-content" backgroundColor={color.background} translucent={true} />
      <View style={{ flex: 1, backgroundColor: color.background , marginTop:15}}>
        <HeaderBar scrollY={scrollY} />
        <ScrollView
          ref={scrollViewRef}
          showsVerticalScrollIndicator={false}
          onScroll={handleMainScroll}
          scrollEventThrottle={16}
          contentContainerStyle={{ paddingBottom: showGuestBanner ? 210 : 120 }}
        >
          <HeroSlider sections={sections} />
          {/* <PillFilters /> */}

          {sections.map((section: any, index: number) => {
            if (section.sectionType === 'SEARCH_BANNER') return null;

            if (section.sectionType === 'CATEGORY_GRID') {
              const categoryList = section.data?.categories || [];
              return <HotCategories key={section.id || index} categories={categoryList} />;
            }

            if (section.sectionType === 'OFFER' || section.sectionType === 'FLASH_SALE' || section.sectionType === 'BEST_OFFERS') {
              return <OfferSection key={section.id || index} section={section} navigation={navigation} gender={gender} />;
            }

            const products = getSectionProducts(section);

            if (products.length > 0) {
              const renderKey = getSectionRenderKey(section);
              if (renderedSectionKeys.has(renderKey)) return null;
              renderedSectionKeys.add(renderKey);

              const sectionTitle = formatSectionTitle(section.data?.title || section.title || 'Products');

              return (
                <View key={section.id || index} style={styles.dynamicSection}>
                  <SectionHeader title={sectionTitle} onActionPress={() => {}} />
                  <FlatList
                    data={products}
                    numColumns={2}
                    scrollEnabled={false}
                    columnWrapperStyle={{ justifyContent: 'space-between', paddingHorizontal: 16 }}
                    renderItem={({ item }) => (
                      <ProductCard
                        item={item}
                        onPress1={() =>
                          navigation.navigate(ScreenNameEnum.ProductDetails, {
                            item,
                            productId: item?._id || item?.id,
                            gender,
                            relatedProducts: products,
                          })
                        }
                      />
                    )}
                    keyExtractor={(item, productIndex) =>
                      String(item?._id || item?.id || item?.productId || `${section.id}-${productIndex}`)
                    }
                  />
                </View>
              );
            }
            return null;
          })}
          {sections.find(s => s.sectionType === "SEARCH_BANNER")?.data?.background?.videoUrl && (
            <VideoAd
              videoUrl={
                sections.find(s => s.sectionType === "SEARCH_BANNER")?.data?.background?.videoUrl
              }
            />
          )}
        </ScrollView>

        {showBackToTop && (
          <TouchableOpacity
            style={[styles.backToTop, showGuestBanner && styles.backToTopWithGuestBanner]}
            onPress={handleBackToTop}
            activeOpacity={0.85}
          >
            <Ionicons name="arrow-up" size={18} color={color.textDark} />
            <Text style={styles.backToTopText}>Back to top</Text>
          </TouchableOpacity>
        )}
        {showGuestBanner && (
          <View style={styles.guestBanner}>
            <LinearGradient
              colors={color.primaryGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 1 }}
              style={styles.guestAccent}
            />
            <View style={styles.guestContent}>
              <View style={styles.guestIconBox}>
                <Ionicons name="person-add" size={18} color={color.primary} />
              </View>
              <View style={styles.guestTextWrap}>
                <Text style={styles.guestTitle}>Login to unlock SareeLoom</Text>
                <Text style={styles.guestMessage} numberOfLines={2}>
                  Track orders, save your cart, get offers and manage your account.
                </Text>
              </View>
            </View>
            <TouchableOpacity
              activeOpacity={0.85}
              style={styles.loginButton}
              onPress={() => navigateToScreen(ScreenNameEnum.LoginScreen)}
            >
              <LinearGradient
                colors={color.primaryGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.loginGradient}
              >
                <Text style={styles.loginText}>Login</Text>
                <Ionicons name="arrow-forward" size={13} color={color.white} style={styles.loginArrow} />
              </LinearGradient>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default DashboardScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: color.background },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: color.background,
    paddingHorizontal: 30,
  },
  guestBanner: {
    position: 'absolute',
    left: 12,
    right: 12,
    bottom: 22,
    minHeight: 78,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: color.white,
    borderRadius: radius.xxl,
    paddingLeft: 0,
    paddingRight: 10,
    paddingVertical: 9,
    borderWidth: 1,
    borderColor: color.primarySoft,
    shadowColor: color.black,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 14,
    elevation: 10,
    overflow: 'hidden',
  },
  guestAccent: {
    width: 5,
    alignSelf: 'stretch',
    marginRight: 10,
  },
  guestContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    minWidth: 0,
  },
  guestIconBox: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: color.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  guestTextWrap: {
    flex: 1,
    minWidth: 0,
    paddingRight: 8,
  },
  guestTitle: {
    fontSize: 14,
    fontFamily: fonts.bold,
    color: color.textDark,
  },
  guestMessage: {
    fontSize: 11.5,
    fontFamily: fonts.medium,
    color: color.textMedium,
    lineHeight: 16,
    marginTop: 3,
  },
  loginButton: {
    width: 84,
    height: 38,
    borderRadius: 19,
    overflow: 'hidden',
  },
  loginGradient: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginText: {
    color: color.white,
    fontSize: 12,
    fontFamily: fonts.bold,
  },
  loginArrow: {
    marginLeft: 4,
  },
  heroContainer: { width, height: 450, position: 'relative' },
  heroSlide: { width, height: 450, position: 'relative' },
  heroImage: { width: '100%', height: '100%', resizeMode: 'cover' },
  heroOverlay: {
    position: 'absolute',
    top: 120,
    left: 20,
    right: 20,
    alignItems: 'flex-start',
    zIndex: 5,
  },
  heroGrandSale: {
    color: color.accent,
    fontSize: 11,
    fontFamily: fonts.bold,
    letterSpacing: 1.5,
    marginBottom: 8,
    textShadowColor: color.blackAlpha50,
    textShadowRadius: 4,
  },
  heroTitle: {
    color: color.black,
    fontSize: 26,
    fontFamily: fonts.extraLight,
    lineHeight: 34,
    textShadowColor: color.blackAlpha55,
    textShadowRadius: 5,
  },
  heroBtn: {
    backgroundColor: color.primary,
    paddingHorizontal: 24,
    paddingVertical: 11,
    borderRadius: radius.sm,
    marginTop: 20,
  },
  heroBtnText: {
    color: color.white,
    fontSize: 12,
    fontFamily: fonts.bold,
  },
  pagination: {
    position: 'absolute',
    bottom: 20,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: color.overlayLight,
    marginHorizontal: 4,
  },
  activeDot: { width: 20, backgroundColor: color.white },
  pillContainer: {
    paddingVertical: spacing.lg,
    backgroundColor: color.background,
  },
  pillScroll: { paddingHorizontal: spacing.lg },
  timerBanner: {
    backgroundColor: color.primaryDark,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: 15,
  },
  timerLabel: {
    color: color.white,
    fontSize: 12,
    fontFamily: fonts.bold,
    letterSpacing: 1.5,
  },
  timerLine: {
    width: 1,
    height: 18,
    backgroundColor: color.whiteAlpha20,
    marginHorizontal: 12,
  },
  timerRight: { flex: 1, flexDirection: 'row', alignItems: 'center' },
  timerEndsText: { color: color.whiteAlpha60, fontSize: 10, marginRight: 8 },
  timerValueContainer: {
    backgroundColor: color.whiteAlpha10,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  timerValue: { color: color.white, fontSize: 13, fontFamily: fonts.bold },
  couponBadge: {
    position: 'absolute',
    right: 15,
    top: -20,
    backgroundColor: color.accent,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: radius.sm,
    alignItems: 'center',
    transform: [{ rotate: '4deg' }],
    elevation: 8,
  },
  couponSub: { color: color.white, fontSize: 8, fontFamily: fonts.bold },
  couponValue: { color: color.white, fontSize: 14, fontFamily: fonts.bold },
  flashSection: {
    paddingTop: 25,
    backgroundColor: color.background,
    paddingBottom: 30,
  },
  flashHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  shopTheSaleRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 6 },
  shopTheSaleText: { fontSize: 10, fontFamily: fonts.bold, color: color.primary },
  headerLine: { height: 1, flex: 1, opacity: 0.3, marginLeft: 10 },
  flashTitle: {
    fontSize: 28,
    fontFamily: fonts.bold,
    color: color.primary,
    lineHeight: 32,
  },
  flashSubtitle: {
    fontSize: 22,
    fontFamily: fonts.bold,
    color: color.secondary,
  },
  dontMissRow: { alignItems: 'flex-end', justifyContent: 'center' },
  dontMissText: { fontSize: 10, fontFamily: fonts.bold, color: color.textDark },
  horizontalList: { paddingLeft: 20 },
  horizontalCardWrapper: { marginRight: 12, width: width * 0.42 },
  hotCategoriesSection: {
    paddingVertical: spacing.xl,
    backgroundColor: color.background,
  },
  hotCatGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
  },
  hotCatGridItem: { width: '48%', marginBottom: spacing.md },
  hotCatImageContainer: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: radius.lg,
    overflow: 'hidden',
    backgroundColor: color.white,
  },
  hotCatGridImage: { width: '100%', height: '100%', resizeMode: 'cover' },
  hotCatOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: color.overlay,
    justifyContent: 'center',
    alignItems: 'center',
  },
  hotCatGridText: {
    color: color.white,
    fontSize: 16,
    fontFamily: fonts.bold,
    letterSpacing: 0.5,
  },
  backToTop: {
    position: 'absolute',
    bottom: 25,
    left: 20,
    backgroundColor: color.white,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 25,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 8,
    borderWidth: 1,
    borderColor: color.borderLight,
  },
  backToTopWithGuestBanner: { bottom: 108 },
  backToTopText: {
    fontSize: 12,
    fontFamily: fonts.bold,
    color: color.textDark,
    marginLeft: 6,
  },
  dynamicSection: {
    paddingVertical: spacing.xl,
    backgroundColor: color.background,
  },
});
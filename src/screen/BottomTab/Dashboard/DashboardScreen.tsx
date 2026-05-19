import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  FlatList,
  TextInput,
  Image,
  ScrollView,
  Platform,
  ActivityIndicator,

} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Animated, {
  FadeInUp,
  FadeInDown,
  useAnimatedStyle,
  useSharedValue,
  interpolate,
  Extrapolate,
} from 'react-native-reanimated';
import LinearGradient from 'react-native-linear-gradient';
import { color, fonts, navigateToScreen } from '../../../constant';
import ScreenNameEnum from '../../../routes/screenName.enum';
import StatusBarComponent from '../../../component/StatusBarCompoent';
import ProductCard from '../../../component/cart/ProductCard';
import useDashboard from './useDashboard';
import VideoAd from './VideoAd';
import HeaderBar from '../../../component/HeaderBar';

const { width } = Dimensions.get('window');

// --- Enhanced Hero Slider with Dynamic Overlays ---



const HeroSlider = ({ sections }: { sections: any[] }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  const bannerSection = sections.find(s => s.sectionType === 'SEARCH_BANNER');
  const bannerData = bannerSection?.data?.background;

  if (!bannerData) return null;

  const carouselData = [
    // ...(bannerData.videoUrl ? [{ type: 'video', url: bannerData.videoUrl, id: 'vid-1' }] : []),
    ...(bannerData.mediaImages || []).map((img: string, idx: number) => ({ type: 'image', url: img, id: `img-${idx}` })),
  ];

  const handleScroll = (event: any) => {
    const scrollOffset = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollOffset / width);
    if (index !== activeIndex) setActiveIndex(index);
  };

  const renderSlide = ({ item }: any) => {
    return (
      <View style={styles.heroSlide}>
        {/* {item.type === 'video' ? (
          <VideoAd videoUrl={item.url} height={450} />
        ) : (
          <Image source={{ uri: item.url }} style={styles.heroImage} />
        )} */}

        <Image source={{ uri: item.url }} style={styles.heroImage} />


        {/* Slide-specific Overlay */}
        <View style={styles.heroOverlay}>

          <Animated.Text
            entering={FadeInUp.delay(500).duration(800)}
            style={styles.heroLoved}
          >
            Garment most loved
          </Animated.Text>
          <Animated.View
            entering={FadeInUp.delay(700).duration(800)}
            style={styles.heroPriceRow}
          >
            <Text style={[styles.heroFrom, {
              color: color.primary
            }]}>From</Text>
            <Text style={[styles.heroPrice, {
              color: "black"
            }]}>₹190</Text>
          </Animated.View>
          <Animated.View entering={FadeInDown.delay(900).duration(800)}>
            <TouchableOpacity style={styles.heroBtn}>
              <Text style={styles.heroBtnText}>SHOP THE EDIT</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>

        {/* Bottom Gradient for readability */}
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.6)']}
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
      {/* Pagination Dots */}
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

// --- Other Components ---

const HomeHeader = ({ scrollY }: { scrollY: any }) => {
  const isLogin = useSelector((state: any) => state.auth.isLogin);
  const userData = useSelector((state: any) => state.auth.userData);
  const cartCount = useSelector((state: any) => state.cart.totalItems || 0);
  const wishlistCount = useSelector((state: any) => state.wishlist.items?.length || 0);

  const addressText = isLogin && userData?.address
    ? `Deliver to ${userData.fullName}, ${userData.address}`
    : "Deliver to ashish mahant, Plot no. 114, lin...";

  const animatedHeaderStyle = useAnimatedStyle(() => {
    const translateY = interpolate(scrollY.value, [0, 50], [0, -5], Extrapolate.CLAMP);
    return { transform: [{ translateY }] };
  });

  return (
    <Animated.View style={[styles.headerContainer, animatedHeaderStyle]}>
      {/* Location / Delivery Bar */}
      <TouchableOpacity
        style={styles.deliveryContainer}
        onPress={() => navigateToScreen(ScreenNameEnum.Address, {})}
        activeOpacity={0.8}
      >
        <Ionicons name="location" size={18} color={color.primary} />
        <Text style={styles.deliveryText} numberOfLines={1}>
          {addressText}
        </Text>
        <Ionicons name="chevron-down" size={14} color={color.textMedium} style={{ marginLeft: 4 }} />
      </TouchableOpacity>

      {/* Search & Actions Bar */}
      <View style={styles.searchRow}>
        <TouchableOpacity
          style={styles.searchBarWrapper}
          activeOpacity={0.9}
          onPress={() => navigateToScreen(ScreenNameEnum.SearchProduct, {})}
        >
          <Ionicons name="search" size={20} color={color.textMedium} />
          <TextInput
            placeholder="Search for products, brands and more..."
            style={styles.searchInputInputField}
            placeholderTextColor="#999"
            editable={false}
            pointerEvents="none"
          />
        </TouchableOpacity>

        {/* Wishlist */}
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => navigateToScreen(ScreenNameEnum.WishList, {})}
          activeOpacity={0.7}
        >
          <Ionicons name="heart-outline" size={26} color={color.textDark} />
          {wishlistCount > 0 && (
            <View style={styles.badgeContainer}>
              <Text style={styles.badgeText}>{wishlistCount}</Text>
            </View>
          )}
        </TouchableOpacity>

        {/* Cart */}
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => navigateToScreen(ScreenNameEnum.ViewCartScreen, {})}
          activeOpacity={0.7}
        >
          <Ionicons name="bag-outline" size={26} color={color.textDark} />
          {cartCount > 0 && (
            <View style={styles.badgeContainer}>
              <Text style={styles.badgeText}>{cartCount}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};

const FlashSaleHeader = ({ title, subtitle }: any) => (
  <View style={styles.flashHeader}>
    <View style={{ flex: 1 }}>
      <View style={styles.shopTheSaleRow}>
        <Text style={styles.shopTheSaleText}>SHOP THE SALE</Text>
        <LinearGradient colors={color.primaryGradient} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.headerLine} />
      </View>
      <Text style={styles.flashTitle}>{title || 'FLASH SALE'}</Text>
      <Text style={styles.flashSubtitle}>{subtitle || 'UP TO 70% OFF'}</Text>
    </View>
    <TouchableOpacity style={styles.dontMissRow}>
      <Text style={styles.dontMissText}>DON'T MISS OUT</Text>
      <Ionicons name="arrow-forward" size={16} color={color.textDark} />
    </TouchableOpacity>
  </View>
);



const HotCategories = ({ categories }: any) => (
  <View style={styles.hotCategoriesSection}>
    <Text style={styles.sectionTitleCenter}>HOT CATEGORIES</Text>
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.hotCatList}>
      {categories.map((cat: any, index: number) => (
        <Animated.View key={index} entering={FadeInDown.delay(index * 100).duration(600)} style={styles.hotCatItem}>
          <TouchableOpacity activeOpacity={0.8} onPress={() => navigateToScreen(ScreenNameEnum.OtherCategoryData, { categoryId: cat._id, categoryName: cat.name })} style={styles.circularBg}>
            <Image source={{ uri: cat.image }} style={styles.hotCatImage} />
          </TouchableOpacity>
          <Text style={styles.hotCatText}>{cat.name}</Text>
        </Animated.View>
      ))}
    </ScrollView>
  </View>
);



const DashboardScreen = () => {
  const {
    gender,
    setGender,
    genderOptions,
    loading,
    sections = [],
    categories = [],
  } = useDashboard();

  const scrollY = useSharedValue(0);

  if (loading && sections.length === 0) {
    return (
      <SafeAreaView style={styles.loaderContainer}>
        <ActivityIndicator size="large" color={color.primary} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBarComponent />
      <HeaderBar />
      <ScrollView
        showsVerticalScrollIndicator={false}
        onScroll={(e) => { scrollY.value = e.nativeEvent.contentOffset.y; }}
        scrollEventThrottle={16}
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        <HeroSlider sections={sections} />
        <Animated.View entering={FadeInUp.delay(200).duration(800)} style={styles.flashSection}>
          <FlashSaleHeader title="FLASH" subtitle="SALE" />
          <FlatList
            data={sections.find(s => s.sectionType === 'TOP_PICKS')?.data?.products || []}
            showsHorizontalScrollIndicator={false}
            scrollEnabled={false}
            numColumns={2}
            columnWrapperStyle={{ justifyContent: 'space-between', paddingHorizontal: 16 }}
            renderItem={({ item }) => (
              <ProductCard item={item} onPress1={() => navigateToScreen(ScreenNameEnum.ProductDetails, { item, gender })} />
            )}
            keyExtractor={(item) => item.id || item._id}
          />
        </Animated.View>

        <HotCategories categories={categories} />

        {sections.map((section: any, index: number) => {
          if (['SEARCH_BANNER', 'TOP_PICKS',].includes(section.sectionType)) return null;
          if (section.sectionType === 'PRODUCT_GRID') {
            return (
              <View key={index} style={styles.dynamicSection}>
                <View style={styles.dynamicHeader}>
                  <Text style={styles.sectionTitleCenter}>{section.title}</Text>
                  <LinearGradient colors={color.primaryGradient} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.titleUnderline} />
                </View>
                <FlatList
                  data={section.data?.products || []}
                  numColumns={2}
                  scrollEnabled={false}
                  columnWrapperStyle={{ justifyContent: 'space-between', paddingHorizontal: 16 }}
                  renderItem={({ item }) => (
                    <ProductCard item={item} onPress1={() => navigateToScreen(ScreenNameEnum.ProductDetails, { item, gender })} />
                  )}
                  keyExtractor={(item) => item.id || item._id}
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

      <TouchableOpacity style={styles.backToTop}>
        <Ionicons name="arrow-up" size={18} color={color.textDark} />
        <Text style={styles.backToTopText}>Back to top</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default DashboardScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: color.white },
  loaderContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  headerContainer: { backgroundColor: color.white, paddingBottom: 8, zIndex: 10 },
  deliveryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF8F4',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginHorizontal: 16,
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#FFE0CC',
  },
  deliveryText: {
    fontSize: 13,
    color: color.textDark,
    fontFamily: fonts.medium,
    marginLeft: 6,
    flex: 1,
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  searchBarWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: color.lightGray,
    borderRadius: 8,
    height: 44,
    paddingHorizontal: 12,
  },
  searchInputInputField: {
    flex: 1,
    fontSize: 14,
    fontFamily: fonts.regular,
    color: color.textDark,
    marginLeft: 8,
    paddingVertical: 0,
  },
  iconButton: {
    marginLeft: 16,
    padding: 4,
    position: 'relative',
  },
  badgeContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: color.primary,
    borderRadius: 8,
    minWidth: 16,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 3,
  },
  badgeText: {
    color: color.white,
    fontSize: 9,
    fontFamily: fonts.bold,
    textAlign: 'center',
  },
  infoBar: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 16, paddingVertical: 12, backgroundColor: color.backgroundLight },
  infoItem: { flexDirection: 'row', alignItems: 'center' },
  infoTextContainer: { marginLeft: 6 },
  infoTitle: { fontSize: 10, fontFamily: fonts.bold, color: color.textDark },
  infoSub: { fontSize: 8.5, fontFamily: fonts.regular, color: color.textMedium },

  // Hero Slider Styles
  heroContainer: { width: width, height: 450, position: 'relative' },
  heroSlide: { width: width, height: 450, position: 'relative' },
  heroImage: { width: '100%', height: '100%', resizeMode: 'cover' },
  heroOverlay: { position: 'absolute', top: 50, left: 0, right: 0, alignItems: 'center', zIndex: 5 },
  heroNewUsers: { fontSize: 22, fontFamily: fonts.bold, letterSpacing: 4, textShadowColor: 'rgba(0, 0, 0, 0.4)', textShadowOffset: { width: 0, height: 1 }, textShadowRadius: 3 },
  heroLoved: { color: color.white, fontSize: 15, fontFamily: fonts.medium, marginTop: 60, textShadowColor: 'rgba(0, 0, 0, 0.5)', textShadowRadius: 4 },
  heroPriceRow: { flexDirection: 'row', alignItems: 'baseline', marginTop: 10 },
  heroFrom: { color: color.white, fontSize: 34, fontFamily: fonts.bold, marginRight: 10 },
  heroPrice: { color: color.white, fontSize: 70, fontFamily: fonts.bold },
  heroBtn: { backgroundColor: color.white, paddingHorizontal: 30, paddingVertical: 12, borderRadius: 2, marginTop: 30 },
  heroBtnText: { color: color.primary, fontSize: 14, fontFamily: fonts.bold, letterSpacing: 1 },
  pagination: { position: 'absolute', bottom: 20, width: '100%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' },
  dot: { width: 6, height: 6, borderRadius: 3, backgroundColor: 'rgba(255,255,255,0.4)', marginHorizontal: 4 },
  activeDot: { width: 20, backgroundColor: color.white },

  timerBanner: { backgroundColor: color.secondary, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 15 },
  timerLabel: { color: color.white, fontSize: 12, fontFamily: fonts.bold, letterSpacing: 1.5 },
  timerLine: { width: 1, height: 18, backgroundColor: 'rgba(255,255,255,0.2)', marginHorizontal: 12 },
  timerRight: { flex: 1, flexDirection: 'row', alignItems: 'center' },
  timerEndsText: { color: 'rgba(255,255,255,0.6)', fontSize: 10, marginRight: 8 },
  timerValueContainer: { backgroundColor: 'rgba(255,255,255,0.1)', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 4 },
  timerValue: { color: color.white, fontSize: 13, fontFamily: fonts.bold },
  couponBadge: { position: 'absolute', right: 15, top: -20, backgroundColor: color.primary, paddingHorizontal: 12, paddingVertical: 8, borderRadius: 6, alignItems: 'center', transform: [{ rotate: '4deg' }], elevation: 8 },
  couponSub: { color: color.white, fontSize: 8, fontFamily: fonts.bold },
  couponValue: { color: color.white, fontSize: 14, fontFamily: fonts.bold },
  flashSection: { paddingTop: 25, backgroundColor: color.backgroundLight, paddingBottom: 30, borderBottomLeftRadius: 30, borderBottomRightRadius: 30 },
  flashHeader: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20, marginBottom: 20 },
  shopTheSaleRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 6 },
  shopTheSaleText: { fontSize: 10, fontFamily: fonts.bold, color: color.primary },
  headerLine: { height: 1, flex: 1, opacity: 0.3, marginLeft: 10 },
  flashTitle: { fontSize: 32, fontFamily: fonts.bold, color: color.secondary, lineHeight: 34 },
  flashSubtitle: { fontSize: 26, fontFamily: fonts.bold, color: color.secondary },
  dontMissRow: { alignItems: 'flex-end', justifyContent: 'center' },
  dontMissText: { fontSize: 10, fontFamily: fonts.bold, color: color.textDark },
  horizontalList: { paddingLeft: 20 },
  horizontalCardWrapper: { marginRight: 12, width: width * 0.42 },
  priceDropSection: { paddingVertical: 40 },
  sectionTitleCenter: { fontSize: 22, fontFamily: fonts.bold, color: color.textDark, textAlign: 'center', marginBottom: 25, textTransform: 'uppercase' },
  priceDropRow: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 16 },
  priceDropCard: { width: (width - 48) / 2, aspectRatio: 0.85, borderRadius: 12, overflow: 'hidden' },
  cardGradient: { flex: 1, padding: 15, justifyContent: 'center', alignItems: 'center' },
  cardSubtitle: { fontSize: 12, fontFamily: fonts.bold, color: color.secondary },
  cardPrice: { fontSize: 38, fontFamily: fonts.bold, color: color.primary },
  cardPriceLarge: { fontSize: 28, fontFamily: fonts.bold, color: color.primary },
  cardSmallText: { fontSize: 10, color: color.textMedium, marginTop: 2, marginBottom: 15 },
  shopNowBtn: { backgroundColor: color.primary, paddingHorizontal: 18, paddingVertical: 8, borderRadius: 20 },
  shopNowText: { color: color.white, fontSize: 12, fontFamily: fonts.bold },
  freeBadge: { position: 'absolute', top: -15, right: -15, backgroundColor: color.success, width: 54, height: 54, borderRadius: 27, justifyContent: 'center', transform: [{ rotate: '12deg' }], borderWidth: 2, borderColor: color.white },
  freeText: { color: color.white, fontSize: 11, fontFamily: fonts.bold },
  hotCategoriesSection: { paddingVertical: 30 },
  hotCatList: { paddingLeft: 20 },
  hotCatItem: { marginRight: 20, alignItems: 'center' },
  circularBg: { width: 85, height: 85, borderRadius: 42.5, backgroundColor: color.backgroundLight, justifyContent: 'center', alignItems: 'center', overflow: 'hidden', borderWidth: 1, borderColor: color.borderLight },
  hotCatImage: { width: '100%', height: '100%', resizeMode: 'contain' },
  hotCatText: { marginTop: 10, fontSize: 12, fontFamily: fonts.semiBold, color: color.textDark },
  backToTop: { position: 'absolute', bottom: 25, left: 20, backgroundColor: color.white, paddingHorizontal: 14, paddingVertical: 10, borderRadius: 25, flexDirection: 'row', alignItems: 'center', elevation: 8 },
  backToTopText: { fontSize: 12, fontFamily: fonts.bold, color: color.textDark, marginLeft: 6 },
  dynamicSection: { paddingVertical: 30 },
  dynamicHeader: { alignItems: 'center', marginBottom: 25 },
  titleUnderline: { width: 40, height: 3, marginTop: 8, borderRadius: 2 },
});

import React, { useState, useEffect, useRef } from 'react';
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
            entering={FadeInUp.delay(300).duration(800)}
            style={[styles.heroNewUsers, { color: '#E0C068' }]}
          >
            NEW USERS PERKS
          </Animated.Text>
          <Animated.Text
            entering={FadeInUp.delay(500).duration(800)}
            style={styles.heroLoved}
          >
            savana's most loved
          </Animated.Text>
          <Animated.View
            entering={FadeInUp.delay(700).duration(800)}
            style={styles.heroPriceRow}
          >
            <Text style={styles.heroFrom}>From</Text>
            <Text style={styles.heroPrice}>₹190</Text>
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

const HomeHeader = ({ scrollY }: { scrollY: Animated.SharedValue<number> }) => {
  const animatedHeaderStyle = useAnimatedStyle(() => {
    const translateY = interpolate(scrollY.value, [0, 50], [0, -5], Extrapolate.CLAMP);
    return { transform: [{ translateY }] };
  });

  return (
    <Animated.View style={[styles.headerContainer, animatedHeaderStyle]}>
      <View style={styles.searchBar}>
        <TextInput
          placeholder="Swim wear 🔥"
          style={styles.searchInput}
          placeholderTextColor="#999"
        />
        <TouchableOpacity style={styles.headerIconButton}>
          <Ionicons name="camera-outline" size={24} color="#333" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.searchButton}>
          <Ionicons name="search" size={22} color="#fff" />
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
        <View style={styles.headerLine} />
      </View>
      <Text style={styles.flashTitle}>{title || 'FLASH SALE'}</Text>
      <Text style={styles.flashSubtitle}>{subtitle || 'UP TO 70% OFF'}</Text>
    </View>
    <TouchableOpacity style={styles.dontMissRow}>
      <Text style={styles.dontMissText}>DON'T MISS OUT</Text>
      <Ionicons name="arrow-forward" size={16} color="#333" />
    </TouchableOpacity>
  </View>
);



const HotCategories = ({ categories }: any) => (
  <View style={styles.hotCategoriesSection}>
    <Text style={styles.sectionTitleCenter}>HOT CATEGORIES</Text>
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.hotCatList}>
      {categories.map((cat: any, index: number) => (
        <Animated.View key={index} entering={FadeInDown.delay(index * 100).duration(600)} style={styles.hotCatItem}>
          <TouchableOpacity activeOpacity={0.8} style={styles.circularBg}>
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
      <StatusBarComponent barStyle="dark-content" backgroundColor="#fff" />
      <HomeHeader scrollY={scrollY} />

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
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalList}
            renderItem={({ item }) => (
              <View style={styles.horizontalCardWrapper}>
                <ProductCard item={item} onPress1={() => navigateToScreen(ScreenNameEnum.ProductDetails, { item, gender })} />
              </View>
            )}
            keyExtractor={(item) => item.id || item._id}
          />
        </Animated.View>

        <HotCategories categories={categories} />

        {sections.map((section: any, index: number) => {
          if (['SEARCH_BANNER', 'TOP_PICKS', 'GENDER_FILTER'].includes(section.sectionType)) return null;
          if (section.sectionType === 'PRODUCT_GRID') {
            return (
              <View key={index} style={styles.dynamicSection}>
                <View style={styles.dynamicHeader}>
                  <Text style={styles.sectionTitleCenter}>{section.title}</Text>
                  <View style={styles.titleUnderline} />
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
      </ScrollView>

      <TouchableOpacity style={styles.backToTop}>
        <Ionicons name="arrow-up" size={18} color="#333" />
        <Text style={styles.backToTopText}>Back to top</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default DashboardScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  loaderContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  headerContainer: { backgroundColor: '#fff', paddingBottom: 5, zIndex: 10 },
  searchBar: {
    flexDirection: 'row', alignItems: 'center', borderWidth: 1.5, borderColor: '#000',
    borderRadius: 6, height: 46, marginHorizontal: 16, marginVertical: 10, paddingLeft: 12,
  },
  searchInput: { flex: 1, fontSize: 15, color: '#333', fontFamily: fonts.regular },
  headerIconButton: { paddingHorizontal: 10 },
  searchButton: { backgroundColor: '#000', height: '100%', width: 46, justifyContent: 'center', alignItems: 'center' },
  infoBar: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 16, paddingVertical: 12, backgroundColor: '#FBFBFB' },
  infoItem: { flexDirection: 'row', alignItems: 'center' },
  infoTextContainer: { marginLeft: 6 },
  infoTitle: { fontSize: 10, fontFamily: fonts.bold, color: '#111' },
  infoSub: { fontSize: 8.5, fontFamily: fonts.regular, color: '#888' },

  // Hero Slider Styles
  heroContainer: { width: width, height: 450, position: 'relative' },
  heroSlide: { width: width, height: 450, position: 'relative' },
  heroImage: { width: '100%', height: '100%', resizeMode: 'cover' },
  heroOverlay: { position: 'absolute', top: 50, left: 0, right: 0, alignItems: 'center', zIndex: 5 },
  heroNewUsers: { fontSize: 22, fontFamily: fonts.bold, letterSpacing: 4, textShadowColor: 'rgba(0, 0, 0, 0.4)', textShadowOffset: { width: 0, height: 1 }, textShadowRadius: 3 },
  heroLoved: { color: '#fff', fontSize: 15, fontFamily: fonts.medium, marginTop: 60, textShadowColor: 'rgba(0, 0, 0, 0.5)', textShadowRadius: 4 },
  heroPriceRow: { flexDirection: 'row', alignItems: 'baseline', marginTop: 10 },
  heroFrom: { color: '#fff', fontSize: 34, fontFamily: fonts.bold, marginRight: 10 },
  heroPrice: { color: '#fff', fontSize: 70, fontFamily: fonts.bold },
  heroBtn: { backgroundColor: '#FEF9E7', paddingHorizontal: 30, paddingVertical: 12, borderRadius: 2, marginTop: 30 },
  heroBtnText: { color: '#333', fontSize: 14, fontFamily: fonts.bold, letterSpacing: 1 },
  pagination: { position: 'absolute', bottom: 20, width: '100%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' },
  dot: { width: 6, height: 6, borderRadius: 3, backgroundColor: 'rgba(255,255,255,0.4)', marginHorizontal: 4 },
  activeDot: { width: 20, backgroundColor: '#fff' },

  timerBanner: { backgroundColor: '#1E4636', flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 15 },
  timerLabel: { color: '#fff', fontSize: 12, fontFamily: fonts.bold, letterSpacing: 1.5 },
  timerLine: { width: 1, height: 18, backgroundColor: 'rgba(255,255,255,0.2)', marginHorizontal: 12 },
  timerRight: { flex: 1, flexDirection: 'row', alignItems: 'center' },
  timerEndsText: { color: 'rgba(255,255,255,0.6)', fontSize: 10, marginRight: 8 },
  timerValueContainer: { backgroundColor: 'rgba(255,255,255,0.1)', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 4 },
  timerValue: { color: '#fff', fontSize: 13, fontFamily: fonts.bold },
  couponBadge: { position: 'absolute', right: 15, top: -20, backgroundColor: '#FF6F00', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 6, alignItems: 'center', transform: [{ rotate: '4deg' }], elevation: 8 },
  couponSub: { color: '#fff', fontSize: 8, fontFamily: fonts.bold },
  couponValue: { color: '#fff', fontSize: 14, fontFamily: fonts.bold },
  flashSection: { paddingTop: 25, backgroundColor: '#EDF4FF', paddingBottom: 30, borderBottomLeftRadius: 30, borderBottomRightRadius: 30 },
  flashHeader: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20, marginBottom: 20 },
  shopTheSaleRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 6 },
  shopTheSaleText: { fontSize: 10, fontFamily: fonts.bold, color: '#246BD4' },
  headerLine: { height: 1, flex: 1, backgroundColor: 'rgba(36, 107, 212, 0.3)', marginLeft: 10 },
  flashTitle: { fontSize: 32, fontFamily: fonts.bold, color: '#154A91', lineHeight: 34 },
  flashSubtitle: { fontSize: 26, fontFamily: fonts.bold, color: '#154A91' },
  dontMissRow: { alignItems: 'flex-end', justifyContent: 'center' },
  dontMissText: { fontSize: 10, fontFamily: fonts.bold, color: '#444' },
  horizontalList: { paddingLeft: 20 },
  horizontalCardWrapper: { marginRight: 12, width: width * 0.42 },
  priceDropSection: { paddingVertical: 40 },
  sectionTitleCenter: { fontSize: 22, fontFamily: fonts.bold, color: '#111', textAlign: 'center', marginBottom: 25, textTransform: 'uppercase' },
  priceDropRow: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 16 },
  priceDropCard: { width: (width - 48) / 2, aspectRatio: 0.85, borderRadius: 12, overflow: 'hidden' },
  cardGradient: { flex: 1, padding: 15, justifyContent: 'center', alignItems: 'center' },
  cardSubtitle: { fontSize: 12, fontFamily: fonts.bold, color: '#B7950B' },
  cardPrice: { fontSize: 38, fontFamily: fonts.bold, color: '#E67E22' },
  cardPriceLarge: { fontSize: 28, fontFamily: fonts.bold, color: '#117A65' },
  cardSmallText: { fontSize: 10, color: '#777', marginTop: 2, marginBottom: 15 },
  shopNowBtn: { backgroundColor: '#E67E22', paddingHorizontal: 18, paddingVertical: 8, borderRadius: 20 },
  shopNowText: { color: '#fff', fontSize: 12, fontFamily: fonts.bold },
  freeBadge: { position: 'absolute', top: -15, right: -15, backgroundColor: '#27AE60', width: 54, height: 54, borderRadius: 27, justifyContent: 'center', transform: [{ rotate: '12deg' }], borderWidth: 2, borderColor: '#fff' },
  freeText: { color: '#fff', fontSize: 11, fontFamily: fonts.bold },
  hotCategoriesSection: { paddingVertical: 30 },
  hotCatList: { paddingLeft: 20 },
  hotCatItem: { marginRight: 20, alignItems: 'center' },
  circularBg: { width: 85, height: 85, borderRadius: 42.5, backgroundColor: '#FEF9E7', justifyContent: 'center', alignItems: 'center', overflow: 'hidden', borderWidth: 1, borderColor: '#F9E79F' },
  hotCatImage: { width: '100%', height: '100%', resizeMode: 'contain' },
  hotCatText: { marginTop: 10, fontSize: 12, fontFamily: fonts.semiBold, color: '#444' },
  backToTop: { position: 'absolute', bottom: 25, left: 20, backgroundColor: '#fff', paddingHorizontal: 14, paddingVertical: 10, borderRadius: 25, flexDirection: 'row', alignItems: 'center', elevation: 8 },
  backToTopText: { fontSize: 12, fontFamily: fonts.bold, color: '#333', marginLeft: 6 },
  dynamicSection: { paddingVertical: 30 },
  dynamicHeader: { alignItems: 'center', marginBottom: 25 },
  titleUnderline: { width: 40, height: 3, backgroundColor: color.primary, marginTop: 8, borderRadius: 2 },
});

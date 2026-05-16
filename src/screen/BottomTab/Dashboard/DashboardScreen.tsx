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
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import Animated, { 
  FadeInUp, 
  FadeInDown, 
  useAnimatedStyle, 
  useSharedValue, 
  withSpring,
  interpolate,
  Extrapolate,
  FadeInRight,
} from 'react-native-reanimated';
import LinearGradient from 'react-native-linear-gradient';
import { color, fonts, navigateToScreen } from '../../../constant';
import ScreenNameEnum from '../../../routes/screenName.enum';
import StatusBarComponent from '../../../component/StatusBarCompoent';
import ProductCard from '../../../component/cart/ProductCard';
import useDashboard from './useDashboard';

const { width } = Dimensions.get('window');

// --- Enhanced Hero Slider with Dynamic Overlays ---

const HERO_SLIDES = [
  {
    id: 'h1',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1000&auto=format&fit=crop',
    tag: 'NEW USERS PERKS',
    title: "savana's most loved",
    price: '190',
    btnText: 'SHOP THE EDIT',
    tagColor: '#E0C068',
  },
  {
    id: 'h2',
    image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=1000&auto=format&fit=crop',
    tag: 'SEASONAL FAVORITES',
    title: 'limited edition sets',
    price: '299',
    btnText: 'EXPLORE NOW',
    tagColor: '#AED581',
  },
  {
    id: 'h3',
    image: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=1000&auto=format&fit=crop',
    tag: 'SUMMER VIBES',
    title: 'resort wear collection',
    price: '449',
    btnText: 'VIEW LOOKBOOK',
    tagColor: '#81D4FA',
  },
];

const HeroSlider = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  const handleScroll = (event: any) => {
    const scrollOffset = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollOffset / width);
    if (index !== activeIndex) setActiveIndex(index);
  };

  const renderSlide = ({ item, index }: any) => {
    return (
      <View style={styles.heroSlide}>
        <Image source={{ uri: item.image }} style={styles.heroImage} />
        {/* Slide-specific Overlay */}
        <View style={styles.heroOverlay}>
          <Animated.Text 
            entering={FadeInUp.delay(300).duration(800)}
            style={[styles.heroNewUsers, { color: item.tagColor }]}
          >
            {item.tag}
          </Animated.Text>
          <Animated.Text 
            entering={FadeInUp.delay(500).duration(800)}
            style={styles.heroLoved}
          >
            {item.title}
          </Animated.Text>
          <Animated.View 
            entering={FadeInUp.delay(700).duration(800)}
            style={styles.heroPriceRow}
          >
            <Text style={styles.heroFrom}>From</Text>
            <Text style={styles.heroPrice}>₹{item.price}</Text>
          </Animated.View>
          <Animated.View entering={FadeInDown.delay(900).duration(800)}>
            <TouchableOpacity style={styles.heroBtn}>
               <Text style={styles.heroBtnText}>{item.btnText}</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.heroContainer}>
      <FlatList
        ref={flatListRef}
        data={HERO_SLIDES}
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
        {HERO_SLIDES.map((_, i) => (
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

      <View style={styles.infoBar}>
        {[
          { icon: 'return-up-back', title: 'Easy returns', sub: 'Free pick up' },
          { icon: 'flash', title: 'Fast delivery', sub: '4000+ styles' },
          { icon: 'gift', title: 'Free shipping', sub: 'For orders 990+' },
        ].map((item, i) => (
          <View key={i} style={styles.infoItem}>
            <Ionicons name={`${item.icon}-outline` as any} size={15} color="#333" />
            <View style={styles.infoTextContainer}>
              <Text style={styles.infoTitle}>{item.title}</Text>
              <Text style={styles.infoSub}>{item.sub}</Text>
            </View>
          </View>
        ))}
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

const PriceDropCorner = () => (
  <View style={styles.priceDropSection}>
    <Text style={styles.sectionTitleCenter}>PRICE DROP CORNER</Text>
    <View style={styles.priceDropRow}>
      <TouchableOpacity activeOpacity={0.9} style={styles.priceDropCard}>
        <LinearGradient colors={['#FEF9E7', '#FDEBD0']} style={styles.cardGradient}>
          <Text style={styles.cardSubtitle}>ALL UNDER</Text>
          <Text style={styles.cardPrice}>₹500</Text>
          <Text style={styles.cardSmallText}>Everything iconic</Text>
          <View style={styles.shopNowBtn}>
            <Text style={styles.shopNowText}>SHOP NOW</Text>
          </View>
        </LinearGradient>
      </TouchableOpacity>
      
      <TouchableOpacity activeOpacity={0.9} style={styles.priceDropCard}>
        <LinearGradient colors={['#E8F8F5', '#D1F2EB']} style={styles.cardGradient}>
          <View style={styles.freeBadge}><Text style={styles.freeText}>FREE</Text></View>
          <Text style={styles.cardPriceLarge}>BUY 1</Text>
          <Text style={styles.cardPriceLarge}>GET 1</Text>
          <Text style={styles.cardSmallText}>Accessories & Jewellery</Text>
          <View style={[styles.shopNowBtn, { backgroundColor: '#16A085' }]}>
            <Text style={styles.shopNowText}>SHOP NOW</Text>
          </View>
        </LinearGradient>
      </TouchableOpacity>
    </View>
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

const CountdownBanner = () => (
  <View style={styles.timerBanner}>
    <View style={styles.timerLeft}>
      <Text style={styles.timerLabel}>LIMITED - TIME STEALS</Text>
      <View style={styles.timerLine} />
    </View>
    <View style={styles.timerRight}>
      <Text style={styles.timerEndsText}>Ends in</Text>
      <View style={styles.timerValueContainer}>
        <Text style={styles.timerValue}>57h : 47m : 46s</Text>
      </View>
    </View>
    <Animated.View entering={FadeInRight.delay(500).springify()} style={styles.couponBadge}>
      <Text style={styles.couponSub}>COUPON</Text>
      <Text style={styles.couponValue}>20% OFF</Text>
    </Animated.View>
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
        <HeroSlider />
        <CountdownBanner />

        <Animated.View entering={FadeInUp.delay(200).duration(800)} style={styles.flashSection}>
          <FlashSaleHeader title="FLASH SALE" subtitle="UP TO 70% OFF" />
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

        <PriceDropCorner />
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

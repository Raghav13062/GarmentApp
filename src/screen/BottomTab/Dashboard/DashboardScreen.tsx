import React from 'react';
import {
  View,
  FlatList,
  ScrollView,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Image,
} from 'react-native';
import Animated, { FadeInUp, FadeInDown } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import HeaderBar from '../../../component/HeaderBar';
import CategoryTabs from '../../../component/cart/CategoryTabs';
import StatusBarComponent from '../../../component/StatusBarCompoent';
import CustomCarousel from '../../../component/CustomCarousel';
import ProductCard from '../../../component/cart/ProductCard';
import TopBrands from '../TopBrands/TopBrands';
import VideoAd from './VideoAd';
import { color, navigateToScreen } from '../../../constant';
import ScreenNameEnum from '../../../routes/screenName.enum';
import useDashboard from './useDashboard';
import { styles } from './style';
import FastImage from 'react-native-fast-image';

const HomeScreen = () => {
  const {
    gender,
    setGender,
    genderOptions = [],
    loading,
    BrandsProduct,
    sections = [],
    categories = [] // Top circular categories
  } = useDashboard();

  /* ------------------ Loader ------------------ */

  if (loading && sections.length === 0) {
    return (
      <SafeAreaView style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#FF3F6C" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBarComponent barStyle={"light-content"} backgroundColor={color.black} />
      <HeaderBar
        genderOptions={genderOptions}
        currentGender={gender}
        setGender={setGender}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ backgroundColor: '#fff' }}
        contentContainerStyle={{ paddingBottom: 80 }}
      >
        {/* ---------------- Top Categories (Circular) ---------------- */}


        {sections.map((section: any, index: number) => {
          const delay = 200 + index * 100;

          switch (section.sectionType) {
            case 'SEARCH_BANNER':
              const background = section.data?.background;
              const hasVideo = background?.mediaType === 'VIDEO' && background?.videoUrl;
              const hasImages = Array.isArray(background?.mediaImages) && background?.mediaImages.length > 0;

              return (
                <View key={section.id || `banner-${index}`}>
                  {hasImages ? (
                    <Animated.View entering={FadeInUp.duration(800).delay(delay)} style={styles.bannerWrapper}>
                      <CustomCarousel
                        banners={background.mediaImages}
                        autoPlay
                        autoPlayInterval={3000}
                        height={320} // Taller for premium feel
                      />
                    </Animated.View>
                  ) : hasVideo ? (
                    <Animated.View entering={FadeInUp.duration(800).delay(delay)}>
                      <VideoAd videoUrl={background.videoUrl} />
                    </Animated.View>
                  ) : null}


                </View>
              );

            case 'CATEGORY_GRID':
              const cats = section.data?.categories;
              if (!Array.isArray(cats) || cats.length === 0) return null;
              return (
                <Animated.View key={section.id || `grid-${index}`} entering={FadeInUp.duration(800).delay(delay)} style={styles.gridSection}>
                  <View style={styles.premiumHeader}>
                    <Text style={styles.sectionTitle}>{section.title || 'Shop by Category'}</Text>
                  </View>
                  <View style={styles.gridContainer}>
                    {cats.map((cat: any, idx: number) => (
                      <TouchableOpacity
                        key={idx}
                        style={styles.gridItem}
                        activeOpacity={0.7}
                        onPress={() => navigateToScreen(ScreenNameEnum.OtherCategoryData, {
                          categoryId: cat.id,
                          categoryName: cat.name
                        })}
                      >
                        <View style={styles.gridImageContainer}>
                          <Image source={{ uri: cat.image }} style={styles.gridImage} />
                        </View>
                        <Text style={styles.gridText}>{cat.name}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </Animated.View>
              );

            case 'TOP_PICKS':
            case 'NEW_ARRIVALS':
            case 'TOP_PRODUCTS':
            case 'PRODUCT_GRID':
            case 'PRODUCT_3X2':
              const products = section.data?.products;
              if (!Array.isArray(products) || products.length === 0) return null;
              const is3x2 = section.templateType === 'PRODUCT_3X2';

              return (
                <Animated.View
                  key={section.id || `products-${index}`}
                  entering={FadeInUp.duration(800).delay(delay)}
                  style={styles.productSection}
                >
                  <View style={styles.premiumHeader}>
                    <View style={styles.headerTitleRow}>
                      <Text style={styles.sectionTitle}>{section.title || section.data?.title || 'Products'}</Text>
                      {(section.sectionType === 'TOP_PICKS' || is3x2) && (
                        <View style={styles.offerBadge}>
                          <Text style={styles.offerText}>TRENDING</Text>
                        </View>
                      )}
                    </View>
                    <TouchableOpacity>
                      <Text style={styles.viewAll}>View All</Text>
                    </TouchableOpacity>
                  </View>

                  <FlatList
                    data={products.slice(0, is3x2 ? 6 : 8)}
                    numColumns={2}
                    keyExtractor={item => String(item?.id || item?._id || Math.random())}
                    scrollEnabled={false}
                    columnWrapperStyle={{ justifyContent: 'space-between', paddingHorizontal: 16 }}
                    renderItem={({ item }) => (
                      <ProductCard
                        item={item}
                        onPress1={() =>
                          navigateToScreen(ScreenNameEnum.ProductDetails, {
                            item: item,
                            gender,
                          })
                        }
                      />
                    )}
                  />
                </Animated.View>
              );

            default:
              return null;
          }
        })}

        {/* ---------------- Top Brands ---------------- */}
        {BrandsProduct && (
          <Animated.View entering={FadeInUp.duration(800).delay(sections.length * 100 + 300)} style={styles.productSection}>
            <View style={styles.premiumHeader}>
              <Text style={styles.sectionTitle}>Top Brands</Text>
              <TouchableOpacity>
                <Text style={styles.viewAll}>View All</Text>
              </TouchableOpacity>
            </View>
            <TopBrands brands={BrandsProduct} title="Top Brands" />
          </Animated.View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

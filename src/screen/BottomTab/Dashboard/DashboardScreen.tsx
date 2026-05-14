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
    categories = [],
    banners = [],
    productSections = [],
    loading,
    BrandsProduct,
    videoAdUrl
  } = useDashboard();

  /* ------------------ Render Helpers ------------------ */

  const renderEmpty = (text: string) => (
    <View style={styles.emptyContainer}>
      <FastImage
        style={{
          width: 200,
          height: 200,
        }}
        source={{
          uri: 'https://i.pinimg.com/originals/39/79/6a/39796ac6bf7fb5abd5814c8f61bf3ab1.gif',
          priority: FastImage.priority.normal,
        }}
        resizeMode={FastImage.resizeMode.cover}
      />
      <Text style={styles.emptyText}>{text}</Text>
    </View>
  );

  /* ------------------ Loader ------------------ */

  if (loading && !gender) {
    return (
      <SafeAreaView style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="black" />
      </SafeAreaView>
    );
  }
  const banners1 = [
    'https://img.freepik.com/free-vector/flat-horizontal-sale-banner-template-with-photo_23-2149000923.jpg',
    'https://img.freepik.com/free-vector/flat-horizontal-sale-banner-template-with-photo_23-2149000923.jpg'
  ]
  return (
    <SafeAreaView style={styles.container}>
      <StatusBarComponent barStyle={"dark-content"} backgroundColor={color.black} />
      <HeaderBar
        genderOptions={genderOptions}
        currentGender={gender}
        setGender={setGender}
      />

      <ScrollView showsVerticalScrollIndicator={false} style={{ backgroundColor: '#fff' }}>

        {/* ---------------- Top Categories (Horizontal) ---------------- */}
        {/* {categories.length > 0 && (
          <Animated.View entering={FadeInDown.duration(600).delay(100)}>
            <CategoryTabs categories={categories} />
          </Animated.View>
        )} */}

        {/* ---------------- Main Banner ---------------- */}
        {banners1.length > 0 && (
          <Animated.View entering={FadeInUp.duration(700).delay(200)} style={styles.bannerWrapper}>
            <CustomCarousel
              banners={banners1}
              autoPlay
              autoPlayInterval={3000}
              height={260}
            />
          </Animated.View>
        )}

        {/* ---------------- Promotional Info Banner ---------------- */}
        <Animated.View entering={FadeInUp.duration(700).delay(300)}>
          <TouchableOpacity style={styles.promoBanner} activeOpacity={0.9}>
            <Image
              source={{ uri: 'https://img.freepik.com/free-vector/flat-horizontal-sale-banner-template-with-photo_23-2149000923.jpg' }}
              style={styles.promoImage}
              resizeMode="cover"
            />
          </TouchableOpacity>
        </Animated.View>

        {/* ---------------- Second Category Grid ---------------- */}
        {categories.length > 4 && (
          <Animated.View entering={FadeInUp.duration(800).delay(400)} style={styles.gridSection}>
            <View style={styles.gridContainer}>
              {categories.slice(0, 8).map((cat: any, idx: number) => (
                <TouchableOpacity key={idx} style={styles.gridItem} activeOpacity={0.7}>
                  <View style={styles.gridImageContainer}>
                    <Image source={{ uri: cat.image }} style={styles.gridImage} />
                  </View>
                  <Text style={styles.gridText}>{cat.name}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </Animated.View>
        )}

        {/* ---------------- Dynamic Product Sections ---------------- */}
        {productSections.map((section: any, index: number) => (
          <Animated.View
            key={section.id || index}
            entering={FadeInUp.duration(800).delay(500 + index * 100)}
            style={styles.productSection}
          >
            <View style={styles.premiumHeader}>
              <View style={styles.headerTitleRow}>
                <Text style={styles.sectionTitle}>{section.title || section.data?.title || 'Products'}</Text>
                <View style={styles.offerBadge}>
                  <Text style={styles.offerText}>MIN. 50% OFF</Text>
                </View>
              </View>
              <TouchableOpacity>
                <Text style={styles.viewAll}>View All</Text>
              </TouchableOpacity>
            </View>

            <FlatList
              data={section.data?.products?.slice(0, 6)}
              numColumns={2}
              keyExtractor={item => String(item?.id || item?._id)}
              scrollEnabled={false}
              columnWrapperStyle={{ justifyContent: 'space-between', paddingHorizontal: 16 }}
              contentContainerStyle={{ paddingBottom: 10 }}
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
        ))}

        {/* ---------------- Top Brands ---------------- */}
        {BrandsProduct && (
          <Animated.View entering={FadeInUp.duration(800).delay(700)} style={styles.productSection}>
            <View style={styles.premiumHeader}>
              <Text style={styles.sectionTitle}>Top Brands</Text>
              <Text style={styles.viewAll}>View All</Text>
            </View>
            <TopBrands brands={BrandsProduct} title="Top Brands" />
          </Animated.View>
        )}

        {/* ---------------- Video Ad ---------------- */}
        {videoAdUrl && (
          <Animated.View entering={FadeInUp.duration(800).delay(800)} style={styles.productSection}>
            <VideoAd videoUrl={videoAdUrl} />
          </Animated.View>
        )}

        <View style={{ height: 60 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

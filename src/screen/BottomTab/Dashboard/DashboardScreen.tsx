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
import { SafeAreaView } from 'react-native-safe-area-context';
import HeaderBar from '../../../component/HeaderBar';
import CategoryTabs from '../../../component/cart/CategoryTabs';
import StatusBarComponent from '../../../component/StatusBarCompoent';
import SearchBar from '../../../component/SearchBar';
import CustomCarousel from '../../../component/CustomCarousel';
import ProductCard from '../../../component/cart/ProductCard';
import TopBrands from '../TopBrands/TopBrands';
import VideoAd from './VideoAd';
import { navigateToScreen } from '../../../constant';
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
    topProducts = [],
    loading,  
    BrandsProduct
  } = useDashboard();
 
  /* ------------------ Render Helpers ------------------ */

  const renderEmpty = (text: string) => (
    <View style={styles.emptyContainer}>
                     
  <FastImage
                style={{
                width: 200,   // adjust according to your design
  height: 200,  // adjust according to your design
                }}
    source={{
      uri: "https://i.pinimg.com/originals/39/79/6a/39796ac6bf7fb5abd5814c8f61bf3ab1.gif",
      priority: FastImage.priority.normal,
    }}
    resizeMode={FastImage.resizeMode.cover}
  />
        <Text style={styles.emptyText}>{text}</Text>

    </View>
  );

  // /* ------------------ Loader ------------------ */

  // if (loading) {
  //   return (
  //     <SafeAreaView style={styles.loaderContainer}>
  //       <ActivityIndicator size="large" color="black" />
  //     </SafeAreaView>
  //   );
  // }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBarComponent />
      <HeaderBar />
      <SearchBar />

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* ---------------- Gender Tabs ---------------- */}
        {genderOptions.length > 0 ? (
          <ScrollView horizontal showsHorizontalScrollIndicator={false}
          style={{
            marginLeft:4
          }}
          >
            {genderOptions.map(item => {
              const isActive = gender === item;
              return (
                <TouchableOpacity
                  key={item}
                  style={[
                    styles.genderTab,
                    isActive && styles.genderActiveTab,
                  ]}
                  onPress={() => setGender(item)}
                >
                  <Text
                    style={[
                      styles.genderText,
                      isActive && styles.genderActiveText,
                    ]}
                  >
                    {item?.toUpperCase()}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        ) : (
          renderEmpty('No gender options found')
        )}

        {/* ---------------- Categories ---------------- */}
        {categories.length > 0 ? (
          <CategoryTabs categories={categories} />
        ) : (
          renderEmpty('No categories available')
        )}

        {/* ---------------- Banner ---------------- */}
        {banners.length > 0 && (
          <View style={styles.sectionContainer}>
            <CustomCarousel
              banners={banners}
              autoPlay
              autoPlayInterval={3000}
              height={180}
            />
          </View>
        )}

        {/* ---------------- Top Products ---------------- */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Top Selling Products</Text>
          <Text style={styles.viewAll}>View All</Text>
        </View>

        <FlatList
          data={topProducts}
          numColumns={2}

          keyExtractor={item => String(item?.id)}
          columnWrapperStyle={{ justifyContent: 'space-between' }}
          contentContainerStyle={{ paddingBottom: 20, marginHorizontal:9, }}
          ListEmptyComponent={renderEmpty('No products found')}
          renderItem={({ item }) => (
            <ProductCard
              item={item}
              onPress1={() =>
                navigateToScreen(ScreenNameEnum.ProductDetails, { item:item ,gender})
              }
            />
          )}
        />

        {/* ---------------- Top Brands ---------------- */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Top Brands</Text>
          <Text style={styles.viewAll}>View All</Text>
        </View>

        <TopBrands
        brands={BrandsProduct}
        title="Top Brands" />
         {/* ---------------- Video Ad ---------------- */}
        <VideoAd videoUrl="https://reelrecs.s3.us-east-1.amazonaws.com/static/movies/trailers/compressed/tt1645170/tt1645170.m3u8" />
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

 import React from 'react';
import { View, FlatList, ScrollView, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import HeaderBar from '../../../component/HeaderBar';
import CategoryTabs from '../../../component/cart/CategoryTabs';
import { SafeAreaView } from 'react-native-safe-area-context';
import StatusBarComponent from '../../../component/StatusBarCompoent';
import {  navigateToScreen } from '../../../constant';
import SearchBar from '../../../component/SearchBar';
import CustomCarousel from '../../../component/CustomCarousel';
import ProductCard from '../../../component/cart/ProductCard';
import ScreenNameEnum from '../../../routes/screenName.enum';
import TopBrands from '../TopBrands/TopBrands';
import PopularSubcategories from '../PopularSubcategories/PopularSubcategories';
import VideoAd from './VideoAd';
import useDashboard from './useDashboard';
import { styles } from './style';

const HomeScreen = () => {
  const {
    gender,
    setGender,
    genderOptions,
    categories,
    banners,
    topProducts,
  } = useDashboard();


  return (
    <SafeAreaView style={styles.container}>
      <StatusBarComponent />
      <HeaderBar />
      <SearchBar />
      {!genderOptions?.length === 0  > 0 ?  
      <ActivityIndicator color={"black"}  />
      :

       <ScrollView showsVerticalScrollIndicator={false}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {genderOptions?.map(item => {
            const isActive = gender === item;
            return (
              <TouchableOpacity
                key={item}
                style={[styles.genderTab, isActive && styles.genderActiveTab]}
                onPress={() => setGender(item)}
              >
                <Text style={[styles.genderText, isActive && styles.genderActiveText]}>
                  {item.toUpperCase()}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
        <CategoryTabs
          categories={categories}
        />
        <View style={{
          marginHorizontal: 12,
          marginTop: 11
        }}>
          <CustomCarousel
            banners={banners}
            autoPlay
            autoPlayInterval={3000}
            height={180}
          />

          <View style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 5
          }}>
            <Text style={{
              color: "black",

              fontWeight: "600",
              marginBottom: 6,
              marginTop: 10,
              fontSize: 15

            }}>Top Selling Products</Text>
            <Text style={{
              color: "black",

              fontWeight: "600",
              marginBottom: 6,
              marginTop: 10,
              fontSize: 15

            }}>View All</Text>

          </View>
          <View style={styles.container}>
            <FlatList
              data={topProducts}
              numColumns={2}
              columnWrapperStyle={{ justifyContent: 'space-between' }}
              keyExtractor={(item) => item.id}
              style={{
                marginBottom: 15
              }}
              renderItem={({ item }) => (
                <ProductCard
                  item={item}
                  onPress1={() =>
                    navigateToScreen(ScreenNameEnum.ProductDetails, { item })
                  }
                />
              )}
              contentContainerStyle={{ paddingBottom: 20 }}
            />
            <View style={{
              flexDirection: "row",
              justifyContent: "space-between"
            }}>
              <Text style={{
                color: "black",

                fontWeight: "600",
                marginBottom: 6,
                fontSize: 15

              }}>Top Brands</Text>
              <Text style={{
                color: "black",

                fontWeight: "600",
                marginBottom: 6,
                fontSize: 15

              }}>View All</Text>


            </View>
          </View>

        </View>

        <TopBrands
 title="Top Brands"
/>
        <Text style={{
          color: "black",

          fontWeight: "600",
          marginBottom: 6,
          fontSize: 15,
          marginTop: 15,
          marginLeft: 10

        }}>PopularSub Categories</Text>
        {/* <PopularSubcategories /> */}
        <VideoAd videoUrl="https://reelrecs.s3.us-east-1.amazonaws.com/static/movies/trailers/compressed/tt1645170/tt1645170.m3u8" />

      </ScrollView>
    
    }
      

    </SafeAreaView>
  );
};



export default HomeScreen;
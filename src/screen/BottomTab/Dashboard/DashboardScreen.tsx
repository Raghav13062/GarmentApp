// screens/HomeScreen.js
import React, { useState } from 'react';
import { View, FlatList, StyleSheet, ScrollView, Text } from 'react-native';
import HeaderBar from '../../../component/HeaderBar';
 import CategoryTabs from '../../../component/cart/CategoryTabs';
import CategoryItem from '../../../component/cart/CategoryItem';
import { SafeAreaView } from 'react-native-safe-area-context';
import StatusBarComponent from '../../../component/StatusBarCompoent';
import { color, navigateToScreen } from '../../../constant';
import SearchBar from '../../../component/SearchBar';
import CustomCarousel from '../../../component/CustomCarousel';
import ProductCard from '../../../component/cart/ProductCard';
import ScreenNameEnum from '../../../routes/screenName.enum';
import TopBrands from '../TopBrands/TopBrands';
import PopularSubcategories from '../PopularSubcategories/PopularSubcategories';
import VideoAd from './VideoAd';
import useDashboard from './useDashboard';
import Loading from '../../../utils/Loader';

const data = [
  {
    id: 1,
    title: 'Sari',
    image: "https://samabyrakhi.com/cdn/shop/products/IMG20230311113118-01.jpg?v=1678531816&width=2304"
  },
  {
    id: 2,
    title: 'Ethnic',
    image: "https://img.freepik.com/free-psd/fashionable-pants-isolated_23-2151336728.jpg?semt=ais_hybrid&w=740&q=80"
  },
  {
    id: 3,
    title: 'Footwear',
    image: "https://static.vecteezy.com/system/resources/thumbnails/046/323/598/small/pair-of-colorful-sports-shoes-for-active-lifestyle-png.png"
  },
  {
    id: 5,
    title: 'Essentials',
    image: "https://png.pngtree.com/png-clipart/20220206/original/pngtree-student-essentials-png-image_7265549.png"
  },
];
 
const products = [
  { id: 1, title: "Sari Mangalagiri", price: "799", image: "https://e7.pngegg.com/pngimages/309/9/png-clipart-sari-pink-m-sarees-magenta-clothing-thumbnail.png" },
  { id: 2, title: "Sari ", price: "1299", image: "https://e7.pngegg.com/pngimages/714/107/png-clipart-woman-wearing-purple-and-pink-indian-traditional-dress-while-sitting-down-lehenga-style-saree-gagra-choli-wedding-dress-dress-purple-violet-thumbnail.png" },
  { id: 3, title: "Sari", price: "1999", image: "https://e7.pngegg.com/pngimages/400/688/png-clipart-kanchipuram-sari-kancheepuram-silk-rmkv-silk-saree-magenta-fashion-model-thumbnail.png" },
   { id: 5, title: "Sari", price: "899", image:  "https://e7.pngegg.com/pngimages/587/801/png-clipart-sari-pochampally-saree-ikat-silk-handloom-saree-saree-border-purple-magenta-thumbnail.png" },
];

const HomeScreen = () => {
   const {    
  userData,
  categories,
  Banner
 }= useDashboard()
 
   return (
    <SafeAreaView style={styles.container}>
      <StatusBarComponent />
      <HeaderBar />
      <SearchBar/>
      {/* <Loading  visible={loading}/> */}
      <ScrollView showsVerticalScrollIndicator={false}>
        
 <CategoryTabs
        categories={categories}
       />    <View style={styles.listContainer}>
        {/* <FlatList
          data={data}
          horizontal
          renderItem={({ item }) => <CategoryItem item={item} />}
          keyExtractor={(item) => item.id.toString()}
          showsHorizontalScrollIndicator={false}
         /> */}
      </View>
          <View style={{
            marginHorizontal:12 ,
            marginTop:11
           }}>
 <CustomCarousel 
        banners={Banner}
        autoPlay={true}
        autoPlayInterval={3000}
        height={180}
        // onBannerPress={handleBannerPress}
      />
    <View style={{
      flexDirection:"row",
      justifyContent:"space-between" ,
      marginTop:5
    }}>
<Text style={{color:"black",

fontWeight:"600" ,
marginBottom:6,
marginTop:10,
fontSize:15

    }}>Top Selling Products</Text>
    <Text style={{color:"black",

fontWeight:"600" ,
marginBottom:6,
marginTop:10,
fontSize:15

    }}>View All</Text>

    </View>
 <View style={styles.container}>
  <FlatList
    data={products}
    numColumns={2}
    columnWrapperStyle={{ 
      justifyContent: "space-between",
       }}
    renderItem={({ item }) => (
      <ProductCard 
        item={item} 
        onPress1={() =>

navigateToScreen(ScreenNameEnum.ProductDetails ,{
  item:item
})

        } 
      />
    )}
    keyExtractor={(item) => item.id.toString()}
    showsVerticalScrollIndicator={false}
    contentContainerStyle={{ 
      paddingTop: 16,
      paddingBottom: 20 ,
      marginHorizontal:-3
    }}
  />
      <View style={{
      flexDirection:"row",
      justifyContent:"space-between"
    }}>
<Text style={{color:"black",

fontWeight:"600" ,
marginBottom:6,
 fontSize:15

    }}>Top Brands</Text>
    <Text style={{color:"black",

fontWeight:"600" ,
marginBottom:6,
 fontSize:15

    }}>View All</Text>
 

     </View>
</View>
    
</View>
 
  <TopBrands
 title="Top Brands"
/>
<Text style={{color:"black",

fontWeight:"600" ,
marginBottom:6,
 fontSize:15 ,
 marginTop:15,
 marginLeft:10

    }}>PopularSub Categories</Text>
<PopularSubcategories />
      <VideoAd videoUrl="https://reelrecs.s3.us-east-1.amazonaws.com/static/movies/trailers/compressed/tt1645170/tt1645170.m3u8" />

</ScrollView>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.white
  },
    container1: {
    padding: 12,
    backgroundColor: "#F6F6F6",
    flex: 1,
  },
  searchContainer: {
    backgroundColor: 'transparent',
    borderTopWidth: 0,
    borderBottomWidth: 0,
    marginHorizontal: 10,
    padding: 0
  },
  searchInputContainer: {
    backgroundColor: '#f2f2f2',
    borderRadius: 10,
  },
  listContainer: {
    flex: 1,
    marginTop: 10,
  },
  flatListContent: {
    marginLeft: 20,
  }
});

export default HomeScreen;
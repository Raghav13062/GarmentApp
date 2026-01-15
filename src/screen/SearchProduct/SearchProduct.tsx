import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image,
  TextInput,
  FlatList,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';

const { width } = Dimensions.get('window');

// Dummy Data
const DUMMY_CATEGORIES = [
  { id: '1', name: 'Women Fashion', icon: 'woman', color: '#FF6B8B' },
  { id: '2', name: 'Men Fashion', icon: 'man', color: '#4A90E2' },
  { id: '3', name: 'Electronics', icon: 'devices', color: '#FF9500' },
  { id: '4', name: 'Home & Kitchen', icon: 'home', color: '#34C759' },
  { id: '5', name: 'Beauty', icon: 'spa', color: '#AF52DE' },
  { id: '6', name: 'Kids', icon: 'child-care', color: '#FFCC00' },
  { id: '7', name: 'Footwear', icon: 'directions-walk', color: '#FF3B30' },
  { id: '8', name: 'Jewellery', icon: 'diamond', color: '#007AFF' },
];

const DUMMY_PRODUCTS = [
  {
    id: '1',
    name: 'Floral Printed Kurti',
    price: '₹399',
    originalPrice: '₹999',
    discount: '60% off',
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400',
    rating: 4.2,
    reviews: '2.5k',
    isTrending: true,
  },
  {
    id: '2',
    name: 'Wireless Bluetooth Headphones',
    price: '₹1,299',
    originalPrice: '₹2,999',
    discount: '56% off',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w-400',
    rating: 4.5,
    reviews: '1.8k',
    isTrending: true,
  },
  {
    id: '3',
    name: 'Kitchen Cookware Set',
    price: '₹1,899',
    originalPrice: '₹4,999',
    discount: '62% off',
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w-400',
    rating: 4.3,
    reviews: '3.2k',
    isTrending: false,
  },
  {
    id: '4',
    name: 'Sports Shoes',
    price: '₹699',
    originalPrice: '₹1,999',
    discount: '65% off',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w-400',
    rating: 4.0,
    reviews: '4.1k',
    isTrending: true,
  },
  {
    id: '5',
    name: 'Smart Watch',
    price: '₹1,599',
    originalPrice: '₹3,999',
    discount: '60% off',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w-400',
    rating: 4.4,
    reviews: '2.9k',
    isTrending: true,
  },
  {
    id: '6',
    name: 'Designer Saree',
    price: '₹599',
    originalPrice: '₹1,999',
    discount: '70% off',
    image: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?w-400',
    rating: 4.6,
    reviews: '5.2k',
    isTrending: true,
  },
];

const DUMMY_BANNERS = [
  {
    id: '1',
    image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=800',
    title: 'Big Billion Days',
    subtitle: 'Upto 70% OFF',
  },
  {
    id: '2',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800',
    title: 'Festive Sale',
    subtitle: 'Starting ₹99',
  },
  {
    id: '3',
    image: 'https://images.unsplash.com/photo-1558769132-cb1a40ed0ada?w=800',
    title: 'New Arrivals',
    subtitle: 'Trendy Collection',
  },
];

const DUMMY_OFFERS = [
  { id: '1', title: 'Free Delivery', icon: 'local-shipping', code: 'FREESHIP' },
  { id: '2', title: 'Cashback 10%', icon: 'monetization-on', code: 'CASH10' },
  { id: '3', title: 'Extra 15% Off', icon: 'discount', code: 'EXTRA15' },
  { id: '4', title: 'Buy 1 Get 1', icon: 'card-giftcard', code: 'B1G1' },
];

const SearchProduct = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('1');
  const [cartCount, setCartCount] = useState(3);

  const renderHeader = () => (
    <LinearGradient
      colors={['#F58021', '#862E92']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={styles.headerGradient}>
      <View style={styles.headerContent}>
        <View style={styles.headerTop}>
          <View style={styles.logoContainer}>
            <Text style={styles.logoText}>MESHO</Text>
            <Text style={styles.logoSubText}>Wholesale</Text>
          </View>
          <View style={styles.headerIcons}>
            <TouchableOpacity style={styles.iconButton}>
              <Icon name="notifications" size={24} color="white" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton}>
              <Icon name="shopping-cart" size={24} color="white" />
              {cartCount > 0 && (
                <View style={styles.cartBadge}>
                  <Text style={styles.cartBadgeText}>{cartCount}</Text>
                </View>
              )}
            </TouchableOpacity>
          </View>
        </View>

        {/* Search Bar */}
        <TouchableOpacity style={styles.searchContainer}>
          <Icon name="search" size={20} color="#666" />
          <Text style={styles.searchPlaceholder}>Search for products, brands and more</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );

  const renderCategories = () => (
    <View style={styles.categoriesSection}>
      <Text style={styles.sectionTitle}>Shop By Category</Text>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={DUMMY_CATEGORIES}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={[
              styles.categoryCard,
              activeCategory === item.id && styles.activeCategoryCard
            ]}
            onPress={() => setActiveCategory(item.id)}>
            <View style={[styles.categoryIcon, { backgroundColor: item.color + '20' }]}>
              <Icon name={item.icon} size={24} color={item.color} />
            </View>
            <Text style={styles.categoryName}>{item.name}</Text>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.categoriesList}
      />
    </View>
  );

  const renderBanner = () => (
    <View style={styles.bannerContainer}>
      <FlatList
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        data={DUMMY_BANNERS}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.bannerCard}>
            <Image source={{ uri: item.image }} style={styles.bannerImage} />
            <LinearGradient
              colors={['transparent', 'rgba(0,0,0,0.7)']}
              style={styles.bannerOverlay}>
              <View style={styles.bannerTextContainer}>
                <Text style={styles.bannerTitle}>{item.title}</Text>
                <Text style={styles.bannerSubtitle}>{item.subtitle}</Text>
                <TouchableOpacity style={styles.bannerButton}>
                  <Text style={styles.bannerButtonText}>Shop Now</Text>
                </TouchableOpacity>
              </View>
            </LinearGradient>
          </View>
        )}
      />
    </View>
  );

  const renderOffers = () => (
    <View style={styles.offersSection}>
      <Text style={styles.sectionTitle}>Today's Best Offers</Text>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={DUMMY_OFFERS}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <LinearGradient
            colors={['#FF6B8B', '#FF9500']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.offerCard}>
            <Icon name={item.icon} size={30} color="white" />
            <Text style={styles.offerTitle}>{item.title}</Text>
            <Text style={styles.offerCode}>Use Code: {item.code}</Text>
          </LinearGradient>
        )}
        contentContainerStyle={styles.offersList}
      />
    </View>
  );

  const renderProductCard = ({ item }) => (
    <View style={styles.productCard}>
      <View style={styles.productImageContainer}>
        <Image source={{ uri: item.image }} style={styles.productImage} />
        {item.isTrending && (
          <View style={styles.trendingBadge}>
            <Text style={styles.trendingText}>🔥 Trending</Text>
          </View>
        )}
        <TouchableOpacity style={styles.wishlistButton}>
          <Icon name="favorite-border" size={20} color="#666" />
        </TouchableOpacity>
      </View>
      
      <View style={styles.productInfo}>
        <Text style={styles.productName} numberOfLines={2}>{item.name}</Text>
        
        <View style={styles.ratingContainer}>
          <View style={styles.ratingBox}>
            <Icon name="star" size={12} color="#FFCC00" />
            <Text style={styles.ratingText}>{item.rating}</Text>
          </View>
          <Text style={styles.reviewsText}>({item.reviews} reviews)</Text>
        </View>
        
        <View style={styles.priceContainer}>
          <Text style={styles.price}>{item.price}</Text>
          <Text style={styles.originalPrice}>{item.originalPrice}</Text>
          <Text style={styles.discount}>{item.discount}</Text>
        </View>
        
        <LinearGradient
          colors={['#F58021', '#862E92']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.addToCartButton}>
          <Text style={styles.addToCartText}>Add to Cart</Text>
        </LinearGradient>
      </View>
    </View>
  );

  const renderProducts = () => (
    <View style={styles.productsSection}>
      <View style={styles.productsHeader}>
        <Text style={styles.sectionTitle}>Trending Products</Text>
        <TouchableOpacity>
          <Text style={styles.seeAllText}>See All →</Text>
        </TouchableOpacity>
      </View>
      
      <FlatList
        data={DUMMY_PRODUCTS}
        renderItem={renderProductCard}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.productsRow}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );

  const renderBottomNav = () => (
    <View style={styles.bottomNav}>
      {['home', 'search', 'shopping-bag', 'person'].map((icon, index) => (
        <TouchableOpacity key={icon} style={styles.navItem}>
          <Icon 
            name={icon} 
            size={24} 
            color={index === 0 ? '#F58021' : '#666'} 
          />
          <Text style={[
            styles.navText,
            index === 0 && styles.activeNavText
          ]}>
            {icon === 'home' ? 'Home' : 
             icon === 'search' ? 'Search' :
             icon === 'shopping-bag' ? 'Orders' : 'Profile'}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {renderHeader()}
      <ScrollView showsVerticalScrollIndicator={false}>
        {renderCategories()}
        {renderBanner()}
        {renderOffers()}
        {renderProducts()}
        
        {/* Footer Info */}
        <View style={styles.infoSection}>
          <Text style={styles.infoTitle}>Why Shop With Us?</Text>
          <View style={styles.infoGrid}>
            <View style={styles.infoCard}>
              <Icon name="local-shipping" size={30} color="#F58021" />
              <Text style={styles.infoCardTitle}>Free Shipping</Text>
              <Text style={styles.infoCardDesc}>Above ₹499</Text>
            </View>
            <View style={styles.infoCard}>
              <Icon name="assignment-return" size={30} color="#862E92" />
              <Text style={styles.infoCardTitle}>Easy Returns</Text>
              <Text style={styles.infoCardDesc}>10 Days Policy</Text>
            </View>
            <View style={styles.infoCard}>
              <Icon name="security" size={30} color="#34C759" />
              <Text style={styles.infoCardTitle}>Secure Payment</Text>
              <Text style={styles.infoCardDesc}>100% Safe</Text>
            </View>
            <View style={styles.infoCard}>
              <Icon name="support-agent" size={30} color="#007AFF" />
              <Text style={styles.infoCardTitle}>24x7 Support</Text>
              <Text style={styles.infoCardDesc}>Customer Care</Text>
            </View>
          </View>
        </View>
      </ScrollView>
      {renderBottomNav()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  headerGradient: {
    paddingTop: 40,
    paddingBottom: 15,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerContent: {
    paddingHorizontal: 15,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  logoText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    marginRight: 5,
  },
  logoSubText: {
    fontSize: 12,
    color: 'white',
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  headerIcons: {
    flexDirection: 'row',
  },
  iconButton: {
    marginLeft: 20,
    position: 'relative',
  },
  cartBadge: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: '#FF3B30',
    borderRadius: 10,
    width: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartBadgeText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 12,
  },
  searchPlaceholder: {
    marginLeft: 10,
    color: '#666',
    fontSize: 14,
  },
  categoriesSection: {
    marginTop: 20,
    paddingHorizontal: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  categoriesList: {
    paddingRight: 15,
  },
  categoryCard: {
    alignItems: 'center',
    marginRight: 15,
    width: 80,
  },
  activeCategoryCard: {
    backgroundColor: '#F58021' + '20',
    padding: 5,
    borderRadius: 10,
  },
  categoryIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  categoryName: {
    fontSize: 12,
    textAlign: 'center',
    color: '#333',
    fontWeight: '500',
  },
  bannerContainer: {
    marginTop: 20,
    height: 180,
  },
  bannerCard: {
    width: width - 30,
    height: 160,
    marginHorizontal: 15,
    borderRadius: 15,
    overflow: 'hidden',
    position: 'relative',
  },
  bannerImage: {
    width: '100%',
    height: '100%',
  },
  bannerOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '60%',
    padding: 15,
    justifyContent: 'flex-end',
  },
  bannerTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  bannerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5,
  },
  bannerSubtitle: {
    fontSize: 16,
    color: 'white',
    opacity: 0.9,
  },
  bannerButton: {
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
  },
  bannerButtonText: {
    color: '#F58021',
    fontWeight: 'bold',
  },
  offersSection: {
    marginTop: 20,
    paddingHorizontal: 15,
  },
  offersList: {
    paddingRight: 15,
  },
  offerCard: {
    width: 140,
    padding: 15,
    borderRadius: 10,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  offerTitle: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5,
  },
  offerCode: {
    color: 'white',
    fontSize: 12,
    opacity: 0.9,
  },
  productsSection: {
    marginTop: 20,
    paddingHorizontal: 15,
  },
  productsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  seeAllText: {
    color: '#F58021',
    fontWeight: '600',
  },
  productsRow: {
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  productCard: {
    width: (width - 40) / 2,
    backgroundColor: 'white',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  productImageContainer: {
    position: 'relative',
    height: 150,
  },
  productImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  trendingBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: '#FF3B30',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
  },
  trendingText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
  wishlistButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'white',
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
  },
  productInfo: {
    padding: 10,
  },
  productName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
    height: 40,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  ratingBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFCC00' + '20',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    marginRight: 5,
  },
  ratingText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 2,
  },
  reviewsText: {
    fontSize: 12,
    color: '#666',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginRight: 5,
  },
  originalPrice: {
    fontSize: 12,
    color: '#999',
    textDecorationLine: 'line-through',
    marginRight: 5,
  },
  discount: {
    fontSize: 12,
    color: '#34C759',
    fontWeight: 'bold',
  },
  addToCartButton: {
    paddingVertical: 8,
    borderRadius: 6,
    alignItems: 'center',
  },
  addToCartText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 14,
  },
  infoSection: {
    marginTop: 20,
    paddingHorizontal: 15,
    paddingBottom: 100,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
    textAlign: 'center',
  },
  infoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  infoCard: {
    width: (width - 40) / 2,
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
    elevation: 1,
  },
  infoCardTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginTop: 10,
    marginBottom: 5,
  },
  infoCardDesc: {
    fontSize: 12,
    color: '#666',
  },
  bottomNav: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderTopColor: '#EEE',
    justifyContent: 'space-between',
  },
  navItem: {
    alignItems: 'center',
  },
  navText: {
    fontSize: 10,
    color: '#666',
    marginTop: 4,
  },
  activeNavText: {
    color: '#F58021',
    fontWeight: '600',
  },
});

export default SearchProduct;
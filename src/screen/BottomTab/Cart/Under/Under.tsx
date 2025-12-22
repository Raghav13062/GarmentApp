import React, { useState, useEffect, useRef } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  Animated,
  Easing,
} from 'react-native';
 import { SafeAreaView } from 'react-native-safe-area-context';
 import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
 import LinearGradient from 'react-native-linear-gradient';
import { errorToast } from '../../../../utils/customToast';
import ScreenNameEnum from '../../../../routes/screenName.enum';
import ProductCard from '../../../../component/cart/ProductCard';
 
const { width, height } = Dimensions.get('window');
const NUM_COLUMNS = 2;
const CARD_MARGIN = 8;
const CARD_WIDTH = (width - (CARD_MARGIN * (NUM_COLUMNS + 1))) / NUM_COLUMNS;

// Brand Colors
const BRAND_COLORS = {
  primaryGradient: ['#F58021', '#862E92'],
  primaryDark: '#862E92',
  primaryLight: '#F58021',
  accent: '#FFD700',
  background: '#F5F5F5',
  textDark: '#2D3436',
  textLight: '#FFFFFF',
  cardBg: '#FFFFFF',
  success: '#4CAF50',
  warning: '#FF9800',
  error: '#F44336',
};

const Under = () => {
  const [userData, setUserData] = useState(null);
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [viewMode, setViewMode] = useState('grid');
  const [cartCount, setCartCount] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);
  
  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const cartPulseAnim = useRef(new Animated.Value(1)).current;
  const headerScrollAnim = useRef(new Animated.Value(0)).current;
  
  const navigation = useNavigation();

  // User data
  const userInfo = {
    name: "Fredly User",
    email: "fredly@example.com",
    membership: "Gold Member",
    joinDate: "2024-01-15",
    totalOrders: 47,
    cartItems: 0,
    address: "123 Shopping Street, City",
  };

const initialProducts = [
  {
    id: '1',
    title: 'Wireless Headphones',
    name: 'Wireless Earbuds',
    price: 2999,
    image: 'https://e7.pngegg.com/pngimages/402/613/png-clipart-sari-silk-kanchipuram-zari-pink-saree-model-purple-blue-thumbnail.png',
    category: 'Electronics',
    brand: 'AudioTech',
    rating: 4.5,
    reviews: 128,
    inStock: true,
  },
  {
    id: '2',
    title: 'Running Shoes',
    name: 'Running Shoes',
    price: 4499,
    image: 'https://static.vecteezy.com/system/resources/thumbnails/057/227/350/small/a-beautiful-woman-in-a-red-and-gold-sari-free-png.png',
    category: 'Fashion',
    brand: 'SportFit',
    rating: 4.2,
    reviews: 89,
    inStock: true,
  },
  {
    id: '3',
    title: 'Smart Watch',
    name: 'Smart Watch',
    price: 8999,
    image: 'https://e7.pngegg.com/pngimages/932/78/png-clipart-bhoodan-pochampally-pochampally-saree-silk-ikat-sari-silk-saree-textile-orange-thumbnail.png',
    category: 'Electronics',
    brand: 'TechWear',
    rating: 4.7,
    reviews: 256,
    inStock: true,
  },
  {
    id: '4',
    title: 'Coffee Maker',
    name: 'Coffee Maker',
    price: 3499,
    image: 'https://e7.pngegg.com/pngimages/596/270/png-clipart-sari-lehenga-style-saree-choli-lime-wedding-dress-bollywood-designer-sarees-blue-wedding-thumbnail.png',
    category: 'Home Appliances',
    brand: 'BrewMaster',
    rating: 4.0,
    reviews: 67,
    inStock: false,
  },
  {
    id: '5',
    title: 'Backpack',
    name: 'Backpack',
    price: 1999,
    image: 'https://img.freepik.com/premium-psd/family-shopping-trip-with-colorful-bags_1093584-394.jpg?semt=ais_hybrid&w=740&q=80',
    category: 'Fashion',
    brand: 'UrbanGear',
    rating: 4.3,
    reviews: 142,
    inStock: true,
  },
  {
    id: '6',
    title: 'Bluetooth Speaker',
    name: 'Bluetooth Speaker',
    price: 2499,
    image: 'https://i.pinimg.com/736x/d3/e6/32/d3e63258a3018af90307746dba1bd255.jpg',
    category: 'Electronics',
    brand: 'SoundWave',
    rating: 4.4,
    reviews: 203,
    inStock: true,
  },

  // 🔥 UNDER ₹999 PRODUCTS (NEW)
  {
    id: '7',
    title: 'T-Shirt',
    name: 'Cotton T-Shirt',
    price: 899,
    image: 'https://img.freepik.com/free-photo/happy-woman-standing-with-shopping-bags-light-wall_23-2148042898.jpg?semt=ais_hybrid&w=740&q=80',
    category: 'Fashion',
    brand: 'CottonClub',
    rating: 4.1,
    reviews: 56,
    inStock: true,
    tag: 'UNDER_999',
  },
  {
    id: '8',
    title: 'Desk Lamp',
    name: 'LED Desk Lamp',
    price: 699,
    image: 'https://img.freepik.com/free-photo/young-beautiful-woman-standing-with-purchases-white-wall_176420-3012.jpg?semt=ais_hybrid&w=740&q=80',
    category: 'Home',
    brand: 'LightWorks',
    rating: 4.6,
    reviews: 98,
    inStock: true,
    tag: 'UNDER_999',
  },
  {
    id: '9',
    title: 'Phone Cover',
    name: 'Silicone Phone Cover',
    price: 299,
    image: 'https://st4.depositphotos.com/2760050/20439/i/450/depositphotos_204390092-stock-photo-black-friday-black-friday-concept.jpg',
    category: 'Accessories',
    brand: 'CoverPro',
    rating: 4.3,
    reviews: 210,
    inStock: true,
    tag: 'UNDER_999',
  },
  {
    id: '10',
    title: 'Wired Earphones',
    name: 'Wired Earphones',
    price: 499,
    image: 'https://png.pngtree.com/png-vector/20250620/ourlarge/pngtree-a-women-is-happily-carrying-shopping-bags-png-image_16558128.png',
    category: 'Electronics',
    brand: 'SoundMax',
    rating: 4.0,
    reviews: 134,
    inStock: true,
    tag: 'UNDER_999',
  },
   
];


  useEffect(() => {
    setProducts(initialProducts);
    setUserData(userInfo);
    
    // Start animations
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  // Update cart totals whenever cart changes
  useEffect(() => {
    const totalItems = cart.length;
    const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);
    
    setCartCount(totalItems);
    setCartTotal(totalPrice);
    
    // Pulse animation when cart updates
    if (totalItems > 0) {
      Animated.sequence([
        Animated.timing(cartPulseAnim, {
          toValue: 1.3,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(cartPulseAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    }
    
    if (userData) {
      setUserData({
        ...userData,
        cartItems: totalItems
      });
    }
  }, [cart]);

  // Add to cart function with animation
  const addToCart = (product) => {
    if (!product.inStock) {
      errorToast(" Out of Stock This product is currently out of stock.")
       return;
    }

    const updatedCart = [...cart, product];
    setCart(updatedCart);
    
    // Add bounce animation to cart
    Animated.sequence([
      Animated.timing(cartPulseAnim, {
        toValue: 1.5,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(cartPulseAnim, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start();
    
    // Alert.alert(
    //   'Added to Cart!', 
    //   `${product.title} added to cart!\nPrice: ₹${product.price}`,
    //   [
    //     { text: 'Continue Shopping', style: 'cancel' },
    //     { text: 'View Cart', onPress: () => showCartSummary() }
    //   ]
    // );
  };

  // Show cart summary
  const showCartSummary = () => {
          //  navigation.navigate(ScreenNameEnum.CheckoutScreen)
  navigation.navigate(ScreenNameEnum.ViewCartScreen, {
      cart: cart,
      // totalAmount: selectedTotal,
      // ... other data
    });
   };

  // Clear cart with animation
  const clearCart = () => {
    Animated.timing(cartPulseAnim, {
      toValue: 0.8,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setCart([]);
      cartPulseAnim.setValue(1);
      errorToast("All items have been removed from your cart.")
      // Alert.alert('Cart Cleared', 'All items have been removed from your cart.');
    });
  };

  // Handle back button press
  const handleBackPress = () => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 50,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => {
      navigation.goBack();
    });
  };
 
  // Render product card with animation
  const renderProductCard = ({ item, index }) => {
    

    return (
         <ProductCard 
          item={item}
          onPress={() => item.inStock && addToCart(item)}
          buttShow={true}
          title={item.inStock ? `ADD TO CART` : 'OUT OF STOCK'}
          disabled={!item.inStock}
          onPress1={() => navigation.navigate(ScreenNameEnum.ProductDetails, { product: item })}
         />
     );
  };

  // Render cart summary bar with gradient
  const renderCartSummary = () => {
    if (cartCount === 0) return null;
    
    const slideUpAnim = new Animated.Value(100);
    
    Animated.spring(slideUpAnim, {
      toValue: 0,
      tension: 50,
      friction: 8,
      useNativeDriver: true,
    }).start();
    
    return (
      <Animated.View style={[styles.cartSummary, { transform: [{ translateY: slideUpAnim }] }]}>
        <LinearGradient
          colors={BRAND_COLORS.primaryGradient}
          style={[StyleSheet.absoluteFill, { borderRadius: 16 }]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        />
        <View style={styles.cartInfo}>
          <Text style={styles.cartText}>
            <Text style={styles.cartCount}>{cartCount}</Text> item{cartCount !== 1 ? 's' : ''} in cart
          </Text>
          <Text style={styles.cartTotal}>Total: ₹{cartTotal}</Text>
        </View>
        <TouchableOpacity 
          style={styles.viewCartButton}
          onPress={showCartSummary}
          activeOpacity={0.7}
        >
          <LinearGradient
  colors={['#FF6B6B', '#FF8E53']} // Coral/Orange gradient
            style={StyleSheet.absoluteFill}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          />
          <Text style={styles.viewCartButtonText}>VIEW CART</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.clearCartButton}
          onPress={clearCart}
          activeOpacity={0.7}
        >
          <Icon name="delete-outline" size={20} color="#FFFFFF" />
        </TouchableOpacity>
      </Animated.View>
    );
  };

  // Handle scroll for header animation
  const handleScroll = (event) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    headerScrollAnim.setValue(offsetY);
  };

 

  return (
    <SafeAreaView style={styles.container}>
     <LinearGradient
  colors={['#FF9A3C', '#F5457A']}
  start={{ x: 0, y: 0 }}
  end={{ x: 1, y: 0 }}
  style={{
    marginHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 14,
    marginTop: 14,
    marginBottom: 16,
    paddingVertical: 16,
    paddingHorizontal: 16,
    elevation: 4,
  }}
>
  {/* Left Content */}
  <View style={{ flexDirection: "row", alignItems: "center" }}>
    <Text style={{ fontSize: 26, marginRight: 8 }}>🔥</Text>
    <View>
      <Text
        style={{
          fontSize: 18,
          fontWeight: "700",
          color: "#fff",
        }}
      >
        Under ₹999
      </Text>
      <Text
        style={{
          fontSize: 12,
          color: "#FFE9D6",
          marginTop: 2,
        }}
      >
        Budget-friendly hot deals
      </Text>
    </View>
  </View>

  {/* Right Badge */}
  <View
    style={{
      backgroundColor: "#fff",
      borderRadius: 20,
      paddingHorizontal: 12,
      paddingVertical: 6,
    }}
  >
    <Text
      style={{
        color: "#F5457A",
        fontSize: 12,
        fontWeight: "700",
      }}
    >
      STARTS @ ₹999
    </Text>
  </View>
</LinearGradient>

 

      {/* Products List */}
      <Animated.FlatList
        data={products}
        renderItem={renderProductCard}
        keyExtractor={item => item.id.toString()}
        numColumns={NUM_COLUMNS}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.productList}
        columnWrapperStyle={styles.columnWrapper}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        // ListHeaderComponent={
        //   <Animated.View style={[styles.sectionHeader, {
        //     opacity: fadeAnim,
        //     transform: [{ translateY: slideAnim }]
        //   }]}>
        //     <LinearGradient
        //       colors={BRAND_COLORS.primaryGradient}
        //       style={styles.sectionHeaderGradient}
        //       start={{ x: 0, y: 0 }}
        //       end={{ x: 1, y: 0 }}
        //     >
        //       <View style={styles.sectionHeaderContent}>
        //         <Text style={styles.sectionTitle}>Featured Products</Text>
        //         <View style={styles.productCountContainer}>
        //           <Text style={styles.productCount}>{products.length} products</Text>
        //         </View>
        //       </View>
        //     </LinearGradient>
        //   </Animated.View>
        // }
        ListFooterComponent={<View style={styles.footer} />}
      />
      
      {renderCartSummary()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BRAND_COLORS.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    zIndex: 10,
    overflow: 'hidden',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  backButton: {
    padding: 8,
    marginRight: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 20,
  },
  headerTextContainer: {
    flex: 1,
  },
 
  headerSubtitle: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.9)',
    marginTop: 2,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cartIconContainer: {
    position: 'relative',
    padding: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 20,
  },
  cartBadge: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: BRAND_COLORS.accent,
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: BRAND_COLORS.primaryDark,
  },
  cartBadgeText: {
    color: BRAND_COLORS.textDark,
    fontSize: 10,
    fontWeight: 'bold',
  },
  fixedHeader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    paddingTop: 50,
    paddingHorizontal: 16,
    paddingVertical: 12,
    zIndex: 9,
    opacity: 0,
    overflow: 'hidden',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  fixedHeaderContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  fixedHeaderTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: BRAND_COLORS.textLight,
  },
  productCountBadge: {
    backgroundColor: BRAND_COLORS.accent,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  fixedHeaderCount: {
    fontSize: 12,
    fontWeight: 'bold',
    color: BRAND_COLORS.textDark,
  },

    headerTitle: {
    color: '#FFF',
    fontSize: 17,
    fontWeight: '700',
  },
  viewAll: {
    color: '#FFF',
    fontSize: 13,
    opacity: 0.9,
  },
  sectionHeader: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: 'transparent',
    borderRadius: 16,
    marginBottom: 8,
    overflow: 'hidden',
  },
  sectionHeaderGradient: {
    borderRadius: 16,
    padding: 16,
  },
  sectionHeaderContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: BRAND_COLORS.textLight,
  },
  productCountContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  productCount: {
    fontSize: 14,
    fontWeight: '600',
    color: BRAND_COLORS.textLight,
  },
  productList: {
    paddingHorizontal: CARD_MARGIN,
    paddingBottom: 100,
  },
  columnWrapper: {
    justifyContent: 'space-between',
    marginBottom: CARD_MARGIN,
  },
  productCardContainer: {
    width: CARD_WIDTH,
    marginHorizontal: CARD_MARGIN / 2,
    marginBottom: CARD_MARGIN * 2,
  },
  cartSummary: {
    position: 'absolute',
    bottom: 20,
    left: 16,
    right: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderRadius: 16,
    elevation: 10,
    shadowColor: BRAND_COLORS.primaryDark,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    overflow: 'hidden',
  },
  cartInfo: {
    flex: 1,
  },
  cartText: {
    fontWeight: '600',
    color: BRAND_COLORS.textLight,
    fontSize: 14,
  },
  cartCount: {
    fontWeight: 'bold',
    color: BRAND_COLORS.accent,
    fontSize: 16,
  },
  cartTotal: {
    fontWeight: 'bold',
    color: BRAND_COLORS.textLight,
    fontSize: 16,
    marginTop: 4,
  },
  viewCartButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    marginLeft: 12,
    overflow: 'hidden',
    minWidth: 100,
    alignItems: 'center',
  },
  viewCartButtonText: {
    color: "white",
    fontWeight: 'bold',
    fontSize: 14,
  },
  clearCartButton: {
    padding: 10,
    marginLeft: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 8,
  },
  footer: {
    height: 100,
  },
});

export default Under;
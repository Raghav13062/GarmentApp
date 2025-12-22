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
import ProductCard from '../../../component/cart/ProductCard';
import { SafeAreaView } from 'react-native-safe-area-context';
 import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import ScreenNameEnum from '../../../routes/screenName.enum';
import LinearGradient from 'react-native-linear-gradient';
import { errorToast } from '../../../utils/customToast';

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

const OtherCategoryData = () => {
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

  // Enhanced sample products
  const initialProducts = [
    {
      id: '1',
      title: 'Sari Mangalagiri',
      name: 'Sari Mangalagiri',
      price: 2999,
      image: 'https://e7.pngegg.com/pngimages/245/531/png-clipart-banarasi-sari-silk-shopping-zone-india-tv-pvt-ltd-clothing-silk-saree-textile-fashion-thumbnail.png',
      category: 'Electronics',
      brand: 'AudioTech',
      rating: 4.5,
      reviews: 128,
      inStock: true,
    },
    {
      id: '2',
      title: 'Sari Mangalagiri',
      name: 'Sari Mangalagiri',
      price: 4499,
      image: 'https://e7.pngegg.com/pngimages/983/257/png-clipart-woman-wearing-purple-and-beige-saree-dress-chanderi-sari-fashion-georgette-clothing-indian-girl-purple-india-thumbnail.png',
      category: 'Fashion',
      brand: 'SportFit',
      rating: 4.2,
      reviews: 89,
      inStock: true,
    },
    {
      id: '3',
      title: 'Sari Mangalagiri',
      name: 'Sari Mangalagiri',
      price: 8999,
      image:"https://e7.pngegg.com/pngimages/982/157/png-clipart-sari-georgette-clothing-churidar-blouse-sarees-fashion-formal-wear-thumbnail.png",
       category: 'Electronics',
      brand: 'TechWear',
      rating: 4.7,
      reviews: 256,
      inStock: true,
    },
    {
      id: '4',
      title: 'Sari Mangalagiri',
      name: 'Sari Mangalagiri',
      price: 3499,
      image: 'https://e7.pngegg.com/pngimages/1007/977/png-clipart-paithani-sari-silk-handloom-saree-surprise-wedding-reveal-purple-violet-thumbnail.png',
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
      image: 'https://png.pngtree.com/png-clipart/20250126/original/pngtree-stylish-red-designer-saree-for-weddings-and-celebrations-png-image_20330724.png',
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
      image: 'https://e7.pngegg.com/pngimages/64/922/png-clipart-jeans-t-shirt-clothing-graphy-a-pile-of-folded-jeans-blue-white-thumbnail.png',
      category: 'Electronics',
      brand: 'SoundWave',
      rating: 4.4,
      reviews: 203,
      inStock: true,
    },
    {
      id: '7',
      title: 'T-Shirt',
      name: 'T-Shirt',
      price: 899,
      image: 'https://e7.pngegg.com/pngimages/64/922/png-clipart-jeans-t-shirt-clothing-graphy-a-pile-of-folded-jeans-blue-white-thumbnail.png',
      category: 'Fashion',
      brand: 'CottonClub',
      rating: 4.1,
      reviews: 56,
      inStock: true,
    },
    {
      id: '8',
      title: 'Desk Lamp',
      name: 'Desk Lamp',
      price: 1299,
      image: 'https://e7.pngegg.com/pngimages/64/922/png-clipart-jeans-t-shirt-clothing-graphy-a-pile-of-folded-jeans-blue-white-thumbnail.png',
      category: 'Home',
      brand: 'LightWorks',
      rating: 4.6,
      reviews: 98,
      inStock: true,
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
    // if (cart.length === 0) {
    //   Alert.alert('Cart Empty', 'Your cart is empty. Add some products!');
    //   return;
    // }

    // Alert.alert(
    //   'Cart Summary',
    //   `Total Items: ${cart.length}\nTotal Price: ₹${cartTotal}\n\nItems in cart:\n${cart.map(item => `• ${item.title} - ₹${item.price}`).join('\n')}`,
    //   [
    //     { text: 'Continue Shopping', style: 'cancel' },
    //     { 
    //       text: 'Checkout',
    //       onPress: () => navigation.navigate(ScreenNameEnum.CheckoutScreen)
    //     },
    //     { 
    //       text: 'Clear Cart', 
    //       onPress: clearCart,
    //       style: 'destructive'
    //     }
    //   ]
    // );
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

  // Render header with gradient
  const renderHeader = () => (
    <Animated.View 
      style={[
        styles.header,
        {
          transform: [{
            translateY: headerScrollAnim.interpolate({
              inputRange: [0, 50],
              outputRange: [0, -50],
              extrapolate: 'clamp',
            })
          }],
          opacity: headerScrollAnim.interpolate({
            inputRange: [0, 50],
            outputRange: [1, 0],
            extrapolate: 'clamp',
          })
        }
      ]}
    >
      <LinearGradient
        colors={BRAND_COLORS.primaryGradient}
        style={StyleSheet.absoluteFill}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      />
      <View style={styles.headerLeft}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={handleBackPress}
          activeOpacity={0.7}
        >
          <Icon name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <View style={styles.headerTextContainer}>
          <Text style={styles.headerTitle}>Fredly Shop</Text>
          <Text style={styles.headerSubtitle}>{userData?.name || 'Guest'}</Text>
        </View>
      </View>
      
      <View style={styles.headerRight}>
        <Animated.View style={{ transform: [{ scale: cartPulseAnim }] }}>
          <TouchableOpacity 
            style={styles.cartIconContainer}
            onPress={showCartSummary}
            activeOpacity={0.7}
          >
            <Icon name="shopping-cart" size={24} color="#fff" />
            {cartCount > 0 && (
              <Animated.View style={styles.cartBadge}>
                <Text style={styles.cartBadgeText}>{cartCount}</Text>
              </Animated.View>
            )}
          </TouchableOpacity>
        </Animated.View>
      </View>
    </Animated.View>
  );

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

  // Render fixed gradient header
  const renderFixedHeader = () => (
    <Animated.View style={styles.fixedHeader}>
      <LinearGradient
        colors={BRAND_COLORS.primaryGradient}
        style={StyleSheet.absoluteFill}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      />
      <View style={styles.fixedHeaderContent}>
        <Text style={styles.fixedHeaderTitle}>Featured Products</Text>
        <View style={styles.productCountBadge}>
          <Text style={styles.fixedHeaderCount}>{products.length}</Text>
        </View>
      </View>
    </Animated.View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {renderHeader()}
      {renderFixedHeader()}

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
        ListHeaderComponent={
          <Animated.View style={[styles.sectionHeader, {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }]
          }]}>
            <LinearGradient
              colors={BRAND_COLORS.primaryGradient}
              style={styles.sectionHeaderGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <View style={styles.sectionHeaderContent}>
                <Text style={styles.sectionTitle}>Featured Products</Text>
                <View style={styles.productCountContainer}>
                  <Text style={styles.productCount}>{products.length} products</Text>
                </View>
              </View>
            </LinearGradient>
          </Animated.View>
        }
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
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: BRAND_COLORS.textLight,
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

export default OtherCategoryData;
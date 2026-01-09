import React, { useState, useEffect, useRef } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  Animated,
  Easing,
  Image,
 
  FlatList,
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

// Sari Categories and Subcategories Data
const SARI_CATEGORIES = [
  {
    id: '1',
    name: 'All Saris',
    icon: 'all-inclusive',
    color: '#862E92',
    subcategories: ['All'],
    count: 24,
  },
  {
    id: '2',
    name: 'Banarasi Silk',
    icon: 'silk',
    color: '#F58021',
    subcategories: ['Pure Silk', 'Zari Work', 'Kadhwa', 'Tanchoi'],
    count: 8,
  },
  {
    id: '3',
    name: 'Mangalagiri',
    icon: 'local-florist',
    color: '#4CAF50',
    subcategories: ['Cotton', 'Silk Cotton', 'Nizam Borders'],
    count: 6,
  },
  {
    id: '4',
    name: 'Chanderi',
    icon: 'style',
    color: '#2196F3',
    subcategories: ['Sheer', 'Zari', 'Motifs'],
    count: 5,
  },
  {
    id: '5',
    name: 'Kanjivaram',
    icon: 'star',
    color: '#E91E63',
    subcategories: ['Pure Silk', 'Zari Borders', 'Temple'],
    count: 7,
  },
  {
    id: '6',
    name: 'Patola',
    icon: 'pattern',
    color: '#9C27B0',
    subcategories: ['Double Ikat', 'Geometric', 'Floral'],
    count: 4,
  },
  {
    id: '7',
    name: 'Paithani',
    icon: 'brightness-1',
    color: '#FF5722',
    subcategories: ['Kadiyal', 'Brocade', 'Pallu'],
    count: 5,
  },
  {
    id: '8',
    name: 'Bandhani',
    icon: 'adjust',
    color: '#00BCD4',
    subcategories: ['Traditional', 'Leheriya', 'Echo Dye'],
    count: 6,
  },
];

// Sari Products Data organized by subcategory
const SARI_PRODUCTS = {
  'All': [
    {
      id: '1',
      title: 'Pure Banarasi Silk',
      name: 'Pure Banarasi Silk Sari',
      price: 12999,
      originalPrice: 15999,
      discount: 19,
      image: 'https://e7.pngegg.com/pngimages/245/531/png-clipart-banarasi-sari-silk-shopping-zone-india-tv-pvt-ltd-clothing-silk-saree-textile-fashion-thumbnail.png',
      category: 'Banarasi Silk',
      subcategory: 'Pure Silk',
      rating: 4.8,
      reviews: 128,
      inStock: true,
      isNew: true,
      colors: ['#862E92', '#F58021', '#000000']
    },
    {
      id: '2',
      title: 'Mangalagiri Cotton',
      name: 'Mangalagiri Cotton Sari',
      price: 4499,
      originalPrice: 5999,
      discount: 25,
      image: 'https://e7.pngegg.com/pngimages/983/257/png-clipart-woman-wearing-purple-and-beige-saree-dress-chanderi-sari-fashion-georgette-clothing-indian-girl-purple-india-thumbnail.png',
      category: 'Mangalagiri',
      subcategory: 'Cotton',
      rating: 4.2,
      reviews: 89,
      inStock: true,
      isNew: false,
      colors: ['#4CAF50', '#FFFFFF', '#000000']
    },
    {
      id: '3',
      title: 'Kanjivaram Temple',
      name: 'Kanjivaram Temple Sari',
      price: 18999,
      originalPrice: 22999,
      discount: 17,
      image: "https://e7.pngegg.com/pngimages/982/157/png-clipart-sari-georgette-clothing-churidar-blouse-sarees-fashion-formal-wear-thumbnail.png",
      category: 'Kanjivaram',
      subcategory: 'Temple',
      rating: 4.7,
      reviews: 256,
      inStock: true,
      isNew: true,
      colors: ['#E91E63', '#FFD700', '#000000']
    },
    {
      id: '4',
      title: 'Chanderi Sheer',
      name: 'Chanderi Sheer Sari',
      price: 8499,
      originalPrice: 10999,
      discount: 23,
      image: 'https://e7.pngegg.com/pngimages/1007/977/png-clipart-paithani-sari-silk-handloom-saree-surprise-wedding-reveal-purple-violet-thumbnail.png',
      category: 'Chanderi',
      subcategory: 'Sheer',
      rating: 4.0,
      reviews: 67,
      inStock: true,
      isNew: false,
      colors: ['#2196F3', '#FFFFFF', '#FFD700']
    },
    {
      id: '5',
      title: 'Patola Double Ikat',
      name: 'Patola Double Ikat Sari',
      price: 24999,
      originalPrice: 29999,
      discount: 17,
      image: 'https://png.pngtree.com/png-clipart/20250126/original/pngtree-stylish-red-designer-saree-for-weddings-and-celebrations-png-image_20330724.png',
      category: 'Patola',
      subcategory: 'Double Ikat',
      rating: 4.9,
      reviews: 42,
      inStock: true,
      isNew: true,
      colors: ['#9C27B0', '#FF5722', '#000000']
    },
    {
      id: '6',
      title: 'Paithani Kadiyal',
      name: 'Paithani Kadiyal Sari',
      price: 15999,
      originalPrice: 19999,
      discount: 20,
      image: 'https://e7.pngegg.com/pngimages/64/922/png-clipart-jeans-t-shirt-clothing-graphy-a-pile-of-folded-jeans-blue-white-thumbnail.png',
      category: 'Paithani',
      subcategory: 'Kadiyal',
      rating: 4.4,
      reviews: 203,
      inStock: true,
      isNew: false,
      colors: ['#FF5722', '#FFD700', '#000000']
    },
    {
      id: '7',
      title: 'Bandhani Traditional',
      name: 'Bandhani Traditional Sari',
      price: 6999,
      originalPrice: 8999,
      discount: 22,
      image: 'https://e7.pngegg.com/pngimages/64/922/png-clipart-jeans-t-shirt-clothing-graphy-a-pile-of-folded-jeans-blue-white-thumbnail.png',
      category: 'Bandhani',
      subcategory: 'Traditional',
      rating: 4.1,
      reviews: 56,
      inStock: true,
      isNew: false,
      colors: ['#00BCD4', '#FFFFFF', '#FFD700']
    },
    {
      id: '8',
      title: 'Banarasi Zari Work',
      name: 'Banarasi Zari Work Sari',
      price: 9999,
      originalPrice: 12999,
      discount: 23,
      image: 'https://e7.pngegg.com/pngimages/64/922/png-clipart-jeans-t-shirt-clothing-graphy-a-pile-of-folded-jeans-blue-white-thumbnail.png',
      category: 'Banarasi Silk',
      subcategory: 'Zari Work',
      rating: 4.6,
      reviews: 98,
      inStock: true,
      isNew: true,
      colors: ['#862E92', '#FFD700', '#000000']
    },
  ],
  'Pure Silk': [
    // Banarasi Pure Silk products
    {
      id: '1',
      title: 'Pure Banarasi Silk',
      name: 'Pure Banarasi Silk Sari',
      price: 12999,
      originalPrice: 15999,
      discount: 19,
      image: 'https://e7.pngegg.com/pngimages/245/531/png-clipart-banarasi-sari-silk-shopping-zone-india-tv-pvt-ltd-clothing-silk-saree-textile-fashion-thumbnail.png',
      category: 'Banarasi Silk',
      subcategory: 'Pure Silk',
      rating: 4.8,
      reviews: 128,
      inStock: true,
      isNew: true,
      colors: ['#862E92', '#F58021', '#000000']
    },
  ],
  'Cotton': [
    // Mangalagiri Cotton products
    {
      id: '2',
      title: 'Mangalagiri Cotton',
      name: 'Mangalagiri Cotton Sari',
      price: 4499,
      originalPrice: 5999,
      discount: 25,
      image: 'https://e7.pngegg.com/pngimages/983/257/png-clipart-woman-wearing-purple-and-beige-saree-dress-chanderi-sari-fashion-georgette-clothing-indian-girl-purple-india-thumbnail.png',
      category: 'Mangalagiri',
      subcategory: 'Cotton',
      rating: 4.2,
      reviews: 89,
      inStock: true,
      isNew: false,
      colors: ['#4CAF50', '#FFFFFF', '#000000']
    },
  ],
  'Temple': [
    // Kanjivaram Temple products
    {
      id: '3',
      title: 'Kanjivaram Temple',
      name: 'Kanjivaram Temple Sari',
      price: 18999,
      originalPrice: 22999,
      discount: 17,
      image: "https://e7.pngegg.com/pngimages/982/157/png-clipart-sari-georgette-clothing-churidar-blouse-sarees-fashion-formal-wear-thumbnail.png",
      category: 'Kanjivaram',
      subcategory: 'Temple',
      rating: 4.7,
      reviews: 256,
      inStock: true,
      isNew: true,
      colors: ['#E91E63', '#FFD700', '#000000']
    },
  ],
  'Sheer': [
    // Chanderi Sheer products
    {
      id: '4',
      title: 'Chanderi Sheer',
      name: 'Chanderi Sheer Sari',
      price: 8499,
      originalPrice: 10999,
      discount: 23,
      image: 'https://e7.pngegg.com/pngimages/1007/977/png-clipart-paithani-sari-silk-handloom-saree-surprise-wedding-reveal-purple-violet-thumbnail.png',
      category: 'Chanderi',
      subcategory: 'Sheer',
      rating: 4.0,
      reviews: 67,
      inStock: true,
      isNew: false,
      colors: ['#2196F3', '#FFFFFF', '#FFD700']
    },
  ],
  'Double Ikat': [
    // Patola Double Ikat products
    {
      id: '5',
      title: 'Patola Double Ikat',
      name: 'Patola Double Ikat Sari',
      price: 24999,
      originalPrice: 29999,
      discount: 17,
      image: 'https://png.pngtree.com/png-clipart/20250126/original/pngtree-stylish-red-designer-saree-for-weddings-and-celebrations-png-image_20330724.png',
      category: 'Patola',
      subcategory: 'Double Ikat',
      rating: 4.9,
      reviews: 42,
      inStock: true,
      isNew: true,
      colors: ['#9C27B0', '#FF5722', '#000000']
    },
  ],
  'Kadiyal': [
    // Paithani Kadiyal products
    {
      id: '6',
      title: 'Paithani Kadiyal',
      name: 'Paithani Kadiyal Sari',
      price: 15999,
      originalPrice: 19999,
      discount: 20,
      image: 'https://e7.pngegg.com/pngimages/64/922/png-clipart-jeans-t-shirt-clothing-graphy-a-pile-of-folded-jeans-blue-white-thumbnail.png',
      category: 'Paithani',
      subcategory: 'Kadiyal',
      rating: 4.4,
      reviews: 203,
      inStock: true,
      isNew: false,
      colors: ['#FF5722', '#FFD700', '#000000']
    },
  ],
  'Traditional': [
    // Bandhani Traditional products
    {
      id: '7',
      title: 'Bandhani Traditional',
      name: 'Bandhani Traditional Sari',
      price: 6999,
      originalPrice: 8999,
      discount: 22,
      image: 'https://e7.pngegg.com/pngimages/64/922/png-clipart-jeans-t-shirt-clothing-graphy-a-pile-of-folded-jeans-blue-white-thumbnail.png',
      category: 'Bandhani',
      subcategory: 'Traditional',
      rating: 4.1,
      reviews: 56,
      inStock: true,
      isNew: false,
      colors: ['#00BCD4', '#FFFFFF', '#FFD700']
    },
  ],
  'Zari Work': [
    // Banarasi Zari Work products
    {
      id: '8',
      title: 'Banarasi Zari Work',
      name: 'Banarasi Zari Work Sari',
      price: 9999,
      originalPrice: 12999,
      discount: 23,
      image: 'https://e7.pngegg.com/pngimages/64/922/png-clipart-jeans-t-shirt-clothing-graphy-a-pile-of-folded-jeans-blue-white-thumbnail.png',
      category: 'Banarasi Silk',
      subcategory: 'Zari Work',
      rating: 4.6,
      reviews: 98,
      inStock: true,
      isNew: true,
      colors: ['#862E92', '#FFD700', '#000000']
    },
  ],
};

const OtherCategoryData = () => {
  const [userData, setUserData] = useState(null);
  const [cart, setCart] = useState([]);
  const [viewMode, setViewMode] = useState('grid');
  const [cartCount, setCartCount] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);
  
  // State for categories and filtering
  const [selectedCategory, setSelectedCategory] = useState('1'); // Default: All Saris
  const [selectedSubcategory, setSelectedSubcategory] = useState('All');
  const [products, setProducts] = useState(SARI_PRODUCTS['All']);
  
  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const cartPulseAnim = useRef(new Animated.Value(1)).current;
  const headerScrollAnim = useRef(new Animated.Value(0)).current;
  
  const navigation = useNavigation();

  // User data
  const userInfo = {
    name: "Sari Shopper",
    email: "sari@example.com",
    membership: "Gold Member",
    joinDate: "2024-01-15",
    totalOrders: 47,
    cartItems: 0,
    address: "123 Fashion Street, City",
  };

  useEffect(() => {
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

  // Filter products based on selected category and subcategory
  useEffect(() => {
    if (selectedSubcategory === 'All') {
      // Show all products if "All" subcategory is selected
      setProducts(SARI_PRODUCTS['All']);
    } else {
      // Filter by subcategory
      const filteredProducts = SARI_PRODUCTS[selectedSubcategory] || [];
      setProducts(filteredProducts);
    }
  }, [selectedSubcategory]);

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

  // Handle category selection
  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId);
    const category = SARI_CATEGORIES.find(cat => cat.id === categoryId);
    if (category && category.subcategories.length > 0) {
      // Reset to first subcategory when changing category
      setSelectedSubcategory(category.subcategories[0]);
    }
  };

  // Handle subcategory selection
  const handleSubcategorySelect = (subcategory) => {
    setSelectedSubcategory(subcategory);
  };

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
  };

  // Show cart summary
  const showCartSummary = () => {
    navigation.navigate(ScreenNameEnum.ViewCartScreen, {
      cart: cart,
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
  const renderHeader = () => {
    const selectedCat = SARI_CATEGORIES.find(cat => cat.id === selectedCategory);
    
    return (
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
            <Text style={styles.headerTitle}>Sari Collection</Text>
            <Text style={styles.headerSubtitle}>
              {selectedCat?.name || 'All Saris'}
            </Text>
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
  };

  // Render category item
  const renderCategoryItem = ({ item }) => {
    const isSelected = selectedCategory === item.id;
    
    return (
      <TouchableOpacity
        style={[
          {
            padding:11
          },
          styles.categoryCard,
          isSelected && styles.categoryCardSelected,
          { borderColor:isSelected ?"black":"black",
backgroundColor:isSelected ? "black":"white"

           }
        ]}
        onPress={() => handleCategorySelect(item.id)}
        activeOpacity={0.8}
      >
        
            
           <Text 
            style={[
              styles.categoryName,
              isSelected && { color: '#fffdfdff' }
            ]}
            numberOfLines={2}
          >
            {item.name}
          </Text>
         
       </TouchableOpacity>
    );
  };

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
          <Text allowFontScaling={false} style={styles.cartText}>
            <Text allowFontScaling={false} style={styles.cartCount}>{cartCount}</Text> 
            item{cartCount !== 1 ? 's' : ''} in cart
          </Text>
          <Text allowFontScaling={false} style={styles.cartTotal}>Total: ₹{cartTotal}</Text>
        </View>
        <TouchableOpacity 
          style={styles.viewCartButton}
          onPress={showCartSummary}
          activeOpacity={0.7}
        >
          <LinearGradient
            colors={['#FF6B6B', '#FF8E53']}
            style={StyleSheet.absoluteFill}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          />
          <Text allowFontScaling={false} style={styles.viewCartButtonText}>VIEW CART</Text>
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

  // Get selected category data
  const selectedCatData = SARI_CATEGORIES.find(cat => cat.id === selectedCategory);

  return (
    <SafeAreaView style={styles.container}>
      {renderHeader()}
      
      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        onScroll={(event) => {
          const offsetY = event.nativeEvent.contentOffset.y;
          headerScrollAnim.setValue(offsetY);
        }}
        scrollEventThrottle={16}
      >
        {/* Categories Section */}
        <Animated.View style={[styles.section, {
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }]
        }]}>
          <LinearGradient
            colors={['#FFFFFF', '#F8F8F8']}
            style={styles.sectionHeaderGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <View style={styles.sectionHeaderContent}>
              <Text allowFontScaling={false} style={styles.sectionTitle}>Sari Categories</Text>
              <View style={styles.sectionSubtitleContainer}>
                <Text allowFontScaling={false} style={styles.sectionSubtitle}>
                  {SARI_CATEGORIES.length} categories
                </Text>
              </View>
            </View>
          </LinearGradient>
          
          <FlatList
            data={SARI_CATEGORIES}
            renderItem={renderCategoryItem}
            keyExtractor={item => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoryList}
          />
        </Animated.View>

     

        {/* Products Section */}
        <Animated.View style={[styles.section, {
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }]
        }]}>
          
            
           
          {products.length > 0 ? (
            <View style={[styles.productGrid, {
              flexDirection:"row"
            }]}>
              {products.map((item, index) => (
                <View 
                  key={item.id} 
                  style={[
                    styles.productCardContainer,
                    index % 2 === 0 ? styles.productCardLeft : styles.productCardRight
                  ]}
                >
                  {renderProductCard({ item, index })}
                </View>
              ))}
            </View>
          ) : (
            <View style={styles.emptyState}>
              <Icon name="inventory" size={60} color="#CCCCCC" />
              <Text style={styles.emptyStateText}>
                No products found for this category
              </Text>
            </View>
          )}
        </Animated.View>
        
        <View style={styles.footer} />
      </Animated.ScrollView>
      
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
  section: {
    marginBottom: 16,
  },
  sectionHeaderGradient: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  sectionHeaderContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: BRAND_COLORS.textDark,
  },
  sectionSubtitleContainer: {
    backgroundColor: 'rgba(134, 46, 146, 0.1)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  sectionSubtitle: {
    fontSize: 12,
    fontWeight: '600',
    color: BRAND_COLORS.primaryDark,
  },
  categoryList: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  categoryCard: {
   paddingVertical:12, 
    marginRight: 12,
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
     shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    alignItems:"center",
    marginTop:5
  },
  categoryCardSelected: {
    borderWidth: 1.2,
  
     shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  categoryGradient: {
    flex: 1,
    padding: 16,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  categoryIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  categoryName: {
    fontSize: 14,
    fontWeight: '600',
    color: BRAND_COLORS.textDark,
    textAlign: 'center',
    flex: 1,
  },
  categoryNameSelected: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  categoryCountBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 10,
    minWidth: 24,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 6,
  },
  categoryCountText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: BRAND_COLORS.textDark,
  },
  subcategoryList: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  subcategoryCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginRight: 10,
    borderRadius: 25,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  subcategoryCardSelected: {
    backgroundColor: BRAND_COLORS.primaryDark,
    borderColor: BRAND_COLORS.primaryDark,
    elevation: 4,
    shadowColor: BRAND_COLORS.primaryDark,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  subcategoryName: {
    fontSize: 14,
    fontWeight: '500',
    color: BRAND_COLORS.textDark,
  },
  subcategoryNameSelected: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  subcategoryCheck: {
    marginLeft: 8,
  },
  productsHeaderGradient: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: 8,
  },
  productsHeaderContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  productsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: BRAND_COLORS.textLight,
  },
  productsCountBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  productsCount: {
    fontSize: 12,
    fontWeight: '600',
    color: BRAND_COLORS.textLight,
  },
  productGrid: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
    paddingHorizontal: CARD_MARGIN,
    paddingBottom: 20,
  },
  productCardContainer: {
    width: CARD_WIDTH,
    marginBottom: CARD_MARGIN * 2,
  },
  productCardLeft: {
    marginRight: CARD_MARGIN,
  },
  productCardRight: {
    marginLeft: CARD_MARGIN,
  },
  emptyState: {
    padding: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginVertical: 20,
    borderRadius: 16,
    elevation: 2,
  },
  emptyStateText: {
    fontSize: 16,
    color: '#666666',
    marginTop: 12,
    textAlign: 'center',
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
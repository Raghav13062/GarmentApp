import { color, fonts } from "../../../constant";
import React, { useState, useEffect, useRef, useCallback } from 'react';
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
  ScrollView,
} from 'react-native';
import ProductCard from '../../../component/cart/ProductCard';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { getProductsByCategory } from '../../../Api/auth/productService';
import Loading from '../../../utils/Loader';
import { navigateToScreen } from "../../../constant";
import LinearGradient from "react-native-linear-gradient";
import { useSelector } from 'react-redux';
import ScreenNameEnum from '../../../routes/screenName.enum';
import { getAllCategories } from '../../../Api/auth/categoryService';
import { AddToCartApi } from '../../../Api/auth/cartService';

const { width, height } = Dimensions.get('window');
const NUM_COLUMNS = 2;
const CARD_MARGIN = 8;
const CARD_WIDTH = (width - (CARD_MARGIN * (NUM_COLUMNS + 1))) / NUM_COLUMNS;

// Brand Colors
const BRAND_COLORS = {
  primaryGradient: [color.primary, color.secondary],
  primaryDark: color.secondary,
  primaryLight: color.primary,
  accent: color.star,
  background: color.backgroundLight,
  textDark: '#2D3436',
  textLight: color.white,
  cardBg: color.white,
  success: color.success,
  warning: color.warning,
  error: '#F44336',
};

const OtherCategoryData = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const { categoryId, categoryName } = route.params || {};

  const cartCount = useSelector((state: any) => state.cart.totalItems);

  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(categoryId || '1');
  const [selectedSubcategory, setSelectedSubcategory] = useState('All');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [subcategories, setSubcategories] = useState(['All']);

  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const headerScrollAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
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

    const fetchCategories = async () => {
      const res = await getAllCategories();
      if (res && res.data) {
        setCategories(res.data || []);
      }
    };
    fetchCategories();
  }, []);

  // Filter products based on selected category and subcategory
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const res = await getProductsByCategory(categoryId, 'all');
      if (res && res.data) {
        const productList = res.data.products || [];
        setProducts(productList);

        // Derive subcategories from products if they exist
        const uniqueSubcats = ['All', ...new Set(productList.map((p: any) => p.subcategory).filter(Boolean))];
        setSubcategories(uniqueSubcats as string[]);
      }
      setLoading(false);
    };

    if (selectedCategory) {
      fetchProducts();
    }
  }, [selectedCategory]);

  const filteredProducts = selectedSubcategory === 'All'
    ? products
    : products.filter((p: any) => p.subcategory === selectedSubcategory);

  // Handle category selection
  const handleCategorySelect = useCallback((id: string) => {
    setSelectedCategory(id);
    setSelectedSubcategory('All');
  }, []);

  const addToCart = async (product: any) => {
    try {
      await AddToCartApi(product._id || product.id, setLoading);
    } catch (error) {
      console.error('Add to cart error:', error);
    }
  };

  // Render header
  const renderHeader = () => {
    const selectedCat: any = categories.find((cat: any) => cat._id === selectedCategory);

    return (
      <View style={styles.header}>
        <LinearGradient
          colors={BRAND_COLORS.primaryGradient}
          style={StyleSheet.absoluteFill}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        />
        <View style={styles.headerLeft}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
            activeOpacity={0.7}
          >
            <Icon name="arrow-back" size={24} color={color.white} />
          </TouchableOpacity>
          <View style={styles.headerTextContainer}>
            <Text style={styles.headerTitle}>{categoryName || selectedCat?.name || 'Collection'}</Text>
            <Text style={styles.headerSubtitle}>
              {selectedSubcategory === 'All' ? 'Discover your style' : selectedSubcategory}
            </Text>
          </View>
        </View>

        <View style={styles.headerRight}>
          <TouchableOpacity
            style={styles.cartIconContainer}
            onPress={() => navigation.navigate(ScreenNameEnum.ViewCartScreen)}
            activeOpacity={0.7}
          >
            <Icon name="shopping-bag" size={24} color={color.white} />
            {cartCount > 0 && (
              <View style={styles.cartBadge}>
                <Text style={styles.cartBadgeText}>{cartCount}</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  // Render category item
  const renderCategoryItem = ({ item }) => {
    const isSelected = selectedCategory === item._id;

    return (
      <TouchableOpacity
        style={[
          styles.categoryCard,
          isSelected && styles.categoryCardSelected,
        ]}
        onPress={() => handleCategorySelect(item._id)}
        activeOpacity={0.8}
      >
        <Text
          style={[
            styles.categoryName,
            isSelected && styles.categoryNameSelected
          ]}
          numberOfLines={1}
        >
          {item.name}
        </Text>
      </TouchableOpacity>
    );
  };

  const renderProductCard = ({ item }) => {
    return (
      <View style={styles.productCardWrapper}>
        <ProductCard
          item={item}
          onPress={() => addToCart(item)}
          buttShow={true}
          title={item.inventory?.stockQuantity > 0 ? `ADD TO CART` : 'OUT OF STOCK'}
          disabled={!(item.inventory?.stockQuantity > 0)}
          onPress1={() => navigateToScreen(ScreenNameEnum.ProductDetails, { item })}
        />
        {item.isTopSelling && (
          <View style={styles.topSellingBadge}>
            <LinearGradient
              colors={['#FFD700', '#FFA500']}
              style={styles.badgeGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <Text style={styles.badgeText}>BEST SELLER</Text>
            </LinearGradient>
          </View>
        )}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {renderHeader()}

      {/* Products Section */}
      {loading ? (
        <View style={styles.loadingContainer}>
          <Loading />
        </View>
      ) : (
        <FlatList
          data={filteredProducts}
          renderItem={renderProductCard}
          keyExtractor={item => item._id}
          numColumns={2}
          contentContainerStyle={styles.productList}
          showsVerticalScrollIndicator={false}
          columnWrapperStyle={styles.productRow}

          ListEmptyComponent={() => (
            <View style={styles.emptyState}>
              <Icon name="inventory" size={60} color="#CCCCCC" />
              <Text style={styles.emptyStateText}>
                No products found for this category
              </Text>
            </View>
          )}
          ListFooterComponent={() => <View style={styles.footer} />}
        />
      )}
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
    elevation: 8,
    shadowColor: color.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
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
    fontSize: 20,
    fontWeight: 'bold',
    color: color.white,
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
    top: -4,
    right: -4,
    backgroundColor: color.error,
    borderRadius: 10,
    minWidth: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: color.white,
  },
  cartBadgeText: {
    color: color.white,
    fontSize: 9,
    fontWeight: 'bold',
  },
  categoriesSection: {
    backgroundColor: color.white,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: color.borderLight,
  },
  categoryList: {
    paddingHorizontal: 16,
    paddingVertical: 4,
  },
  categoryCard: {
    paddingHorizontal: 18,
    paddingVertical: 10,
    marginRight: 12,
    borderRadius: 25,
    backgroundColor: color.white,
    borderWidth: 1,
    borderColor: color.borderLight,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    shadowColor: color.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  categoryCardSelected: {
    backgroundColor: color.black,
    borderColor: color.black,
  },
  categoryName: {
    fontSize: 13,
    fontWeight: '600',
    color: color.black,
  },
  categoryNameSelected: {
    color: color.white,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 100,
  },
  productList: {
    paddingBottom: 20,
  },
  productRow: {
    justifyContent: 'space-between',
    paddingHorizontal: 8,
  },
  productCardWrapper: {
    position: 'relative',
    width: '48%',
  },
  topSellingBadge: {
    position: 'absolute',
    top: 10,
    left: 0,
    zIndex: 5,
  },
  badgeGradient: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
  badgeText: {
    color: color.white,
    fontSize: 8,
    fontWeight: 'bold',
  },
  emptyState: {
    flex: 1,
    padding: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyStateText: {
    fontSize: 16,
    color: color.textMedium,
    marginTop: 12,
    textAlign: 'center',
    fontWeight: '500',
  },
  subcategoryWrapper: {
    backgroundColor: color.white,
    paddingVertical: 4,
  },
  subcategoryList: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  subcategoryTab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 10,
    borderRadius: 20,
    backgroundColor: color.backgroundLight,
    borderWidth: 1,
    borderColor: color.borderLight,
  },
  subcategoryTabSelected: {
    backgroundColor: color.black,
    borderColor: color.black,
  },
  subcategoryText: {
    fontSize: 13,
    color: color.black,
    fontWeight: '500',
  },
  subcategoryTextSelected: {
    color: color.white,
    fontWeight: '600',
  },
  footer: {
    height: 100,
  },
});

export default OtherCategoryData;
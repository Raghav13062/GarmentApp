import { color } from "../../../constant";
import React, { useState, useEffect, useRef } from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  Alert,
  Dimensions,
  TouchableOpacity,
  Image,
  Animated,
  Easing,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation, useRoute } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import { useDispatch } from 'react-redux';
import { setCart as setCartRedux } from '../../../redux/feature/cartSlice';
import ScreenNameEnum from '../../../routes/screenName.enum';
import { errorToast } from '../../../utils/customToast';
import { ClearCartApi, GetCartApi, RemoveFromCartApi, UpdateCartQuantityApi } from '../../../Api/auth/cartService';
import Loading from '../../../utils/Loader';

const { width, height } = Dimensions.get('window');

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
  gray: '#757575',
  lightGray: color.borderLight,
};

const ViewCartScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const dispatchRedux = useDispatch();

  // Get cart data from route params or initialize empty
  const initialCart = route.params?.cart || [];
  const cartTotal = route.params?.cartTotal || 0;

  const [cart, setCart] = useState(initialCart);
  const [totalPrice, setTotalPrice] = useState(cartTotal);
  const [totalItems, setTotalItems] = useState(initialCart.length);
  const [selectedItems, setSelectedItems] = useState(new Set());
  const [selectAll, setSelectAll] = useState(false);
  const [loading, setLoading] = useState(false);
  const [cartData, setCartData] = useState<any>(null);

  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const cartItemAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const data = await GetCartApi(setLoading);
      if (data) {
        setCartData(data);
        const mappedItems = data.items.map((item: any) => {
          const qty = item.quantity || 1;
          const unitPrice = item.price || 0;
          const lineTotal = item.lineTotal || (unitPrice * qty);
          const unitMrp = item.mrp || item.product?.mrp || unitPrice;

          return {
            id: item._id,
            productId: item.product?._id,
            title: item.product?.title || 'Product',
            image: item.product?.baseImages?.[0]?.replace(/\.avif$/i, '.webp') || 'https://via.placeholder.com/150',
            price: lineTotal,
            unitPrice: unitPrice,
            quantity: qty,
            brand: item.product?.brand || 'Garment',
            category: item.product?.categoryId?.name || 'Apparel',
            originalPrice: unitMrp * qty,
            unitMrp: unitMrp
          };
        });
        setCart(mappedItems);
        setTotalPrice(data.totalPrice);
        setTotalItems(data.totalItems);

        // Update Redux state
        dispatchRedux(setCartRedux({
          items: mappedItems,
          totalItems: data.totalItems,
          totalPrice: data.totalPrice
        }));

        // Auto-select all items by default
        const allItemIds = mappedItems.map((item: any) => item.id);
        setSelectedItems(new Set(allItemIds));
        setSelectAll(true);
      }
    } catch (error) {
      console.error('Fetch cart error:', error);
    }
  };

  useEffect(() => {
    // Start animations
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(cartItemAnim, {
        toValue: 1,
        duration: 800,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
    ]).start();

    if (cart.length > 0) {
      calculateTotals();
    }
  }, [cart]);

  // Calculate totals
  const calculateTotals = () => {
    const items = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
    const price = cart.reduce((sum, item) => sum + item.price, 0);
    setTotalItems(items);
    setTotalPrice(price);
  };

  // Remove item from cart
  const removeItem = (item: any) => {
    Alert.alert(
      'Remove Item',
      'Are you sure you want to remove this item from cart?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Remove',
          style: 'destructive',
          onPress: async () => {
            try {
              const productId = item.productId;
              if (productId) {
                await RemoveFromCartApi(productId, setLoading);
                fetchCart(); // Refresh cart data
              }
            } catch (error) {
              console.error('Remove error:', error);
            }
          }
        }
      ]
    );
  };

  // Update quantity
  const updateQuantity = async (item: any, action: string) => {
    const currentQty = item.quantity || 1;
    let newQty = currentQty;

    if (action === 'increase') {
      newQty = currentQty + 1;
    } else if (action === 'decrease' && currentQty > 1) {
      newQty = currentQty - 1;
    }

    if (newQty === currentQty) return;

    try {
      if (item.productId) {
        await UpdateCartQuantityApi(item.productId, newQty, setLoading);
        fetchCart(); // Refresh cart data
      }
    } catch (error) {
      console.error('Update quantity error:', error);
    }
  };

  // Toggle item selection
  const toggleItemSelection = (itemId) => {
    const updatedSelected = new Set(selectedItems);

    if (updatedSelected.has(itemId)) {
      updatedSelected.delete(itemId);
    } else {
      updatedSelected.add(itemId);
    }

    setSelectedItems(updatedSelected);

    // Update select all state
    if (updatedSelected.size === cart.length) {
      setSelectAll(true);
    } else {
      setSelectAll(false);
    }
  };

  // Toggle select all
  const toggleSelectAll = () => {
    if (selectAll) {
      setSelectedItems(new Set());
    } else {
      const allItemIds = cart.map(item => item.id);
      setSelectedItems(new Set(allItemIds));
    }
    setSelectAll(!selectAll);
  };

  // Get selected items metrics
  const getSelectedMetrics = () => {
    let subtotal = 0;
    let sellingPrice = 0;
    let itemCount = 0;

    selectedItems.forEach(itemId => {
      const item = cart.find(cartItem => cartItem.id === itemId);
      if (item) {
        const qty = item.quantity || 1;
        const lineMrp = item.originalPrice || (item.unitMrp ? item.unitMrp * qty : item.price);
        const lineTotal = item.price || (item.unitPrice ? item.unitPrice * qty : 0);

        subtotal += lineMrp;
        sellingPrice += lineTotal;
        itemCount += qty;
      }
    });

    return {
      subtotal,
      discount: Math.max(0, subtotal - sellingPrice),
      total: sellingPrice,
      count: itemCount
    };
  };

  const getSelectedTotal = () => getSelectedMetrics().total;

  // Clear cart
  const clearCart = () => {
    Alert.alert(
      'Clear Cart',
      'Are you sure you want to clear all items from cart?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Clear All',
          style: 'destructive',
          onPress: async () => {
            try {
              await ClearCartApi(setLoading);
              fetchCart(); // Refresh cart data from API
            } catch (error) {
              console.error('Clear cart error:', error);
            }
          }
        }
      ]
    );
  };

  // Proceed to checkout
  const proceedToCheckout = () => {
    if (cart.length === 0) {
      errorToast("Your cart is empty. Add some items first!")
      return;
    }

    if (selectedItems.size === 0) {
      errorToast("Please select items to checkout")
      return;
    }

    const selectedCartItems = cart.filter(item => selectedItems.has(item.id));
    const metrics = getSelectedMetrics();

    // Navigate to checkout screen with full details
    navigation.navigate(ScreenNameEnum.CheckoutScreen, {
      cartItems: selectedCartItems,
      totalAmount: metrics.total,
      subtotal: metrics.subtotal,
      discount: metrics.discount,
      itemCount: metrics.count
    });
  };



  // Render cart item
  const renderCartItem = ({ item, index }) => {
    const animationDelay = index * 100;
    const itemAnimation = {
      opacity: cartItemAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1],
      }),
      transform: [
        {
          translateX: cartItemAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [50, 0],
          }),
        },
      ],
    };

    const isSelected = selectedItems.has(item.id);
    const quantity = item.quantity || 1;

    return (
      <Animated.View style={[styles.cartItemContainer, { animationDelay }, itemAnimation]}>

        <TouchableOpacity
          style={styles.cartItem}
          onPress={() => toggleItemSelection(item.id)}
          activeOpacity={0.9}
        >
          {/* Selection Checkbox */}
          <View style={styles.checkboxContainer}>
            <TouchableOpacity
              style={[styles.checkbox, isSelected && styles.checkboxSelected]}
              onPress={() => toggleItemSelection(item.id)}
              activeOpacity={0.8}
            >
              {isSelected && <Icon name="check" size={16} color={color.white} />}
            </TouchableOpacity>
          </View>

          {/* Product Image */}
          <Image
            source={{ uri: item.image }}
            style={styles.productImage}
          />

          {/* Product Details */}
          <View style={styles.productDetails}>
            <Text style={styles.productTitle} numberOfLines={2}>
              {item.title || item.name}
            </Text>
            <Text style={styles.productBrand}>{item.brand}</Text>
            <Text style={styles.productCategory}>{item.category}</Text>

            {/* Quantity Controls */}
            <View style={styles.quantityContainer}>
              <TouchableOpacity
                style={styles.quantityButton}
                onPress={() => updateQuantity(item, 'decrease')}
                disabled={quantity <= 1}
              >
                <Icon name="remove" size={18} color={quantity <= 1 ? BRAND_COLORS.gray : BRAND_COLORS.primaryLight} />
              </TouchableOpacity>

              <Text style={styles.quantityText}>{quantity}</Text>

              <TouchableOpacity
                style={styles.quantityButton}
                onPress={() => updateQuantity(item, 'increase')}
              >
                <Icon name="add" size={18} color={BRAND_COLORS.primaryLight} />
              </TouchableOpacity>
            </View>
          </View>

          {/* Price and Actions */}
          <View style={styles.priceSection}>
            <Text style={styles.productPrice}>₹{item.price}</Text>
            {item.originalPrice && (
              <Text style={styles.originalPrice}>₹{item.originalPrice}</Text>
            )}

            <TouchableOpacity
              style={styles.removeButton}
              onPress={() => removeItem(item)}
              activeOpacity={0.7}
            >
              <Icon name="delete-outline" size={20} color={BRAND_COLORS.error} />
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
        {/* Divider */}
        {index < cart.length - 1 && <View style={styles.divider} />}
      </Animated.View>
    );
  };

  // Render empty cart
  const renderEmptyCart = () => (
    <Animated.View style={[styles.emptyCartContainer, { opacity: fadeAnim }]}>
      <View style={styles.emptyCartIcon}>
        <Icon name="shopping-cart" size={80} color={BRAND_COLORS.lightGray} />
      </View>
      <Text style={styles.emptyCartTitle}>Your cart is empty</Text>
      <Text style={styles.emptyCartText}>
        Looks like you haven't added any items to your cart yet
      </Text>
      <TouchableOpacity
        style={styles.shopNowButton}
        onPress={() => navigation.goBack()}
        activeOpacity={0.8}
      >
        <LinearGradient
          colors={BRAND_COLORS.primaryGradient}
          style={styles.shopNowGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        >
          <Text style={styles.shopNowText}>START SHOPPING</Text>
        </LinearGradient>
      </TouchableOpacity>
    </Animated.View>
  );

  // Render header
  const renderHeader = () => (
    <Animated.View style={[styles.header, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
      <LinearGradient
        colors={BRAND_COLORS.primaryGradient}
        style={StyleSheet.absoluteFill}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      />
      <View style={styles.headerContent}>
        {/* <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
          activeOpacity={0.7}
        >
          <Icon name="arrow-back" size={24} color={color.white} />
        </TouchableOpacity> */}

        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerTitle}>Shopping Cart</Text>
          <Text style={styles.headerSubtitle}>
            {totalItems} item{totalItems !== 1 ? 's' : ''}
          </Text>
        </View>

        <TouchableOpacity
          style={styles.clearCartButton}
          onPress={clearCart}
          disabled={cart.length === 0}
          activeOpacity={0.7}
        >
          <Icon
            name="delete-sweep"
            size={24}
            color={cart.length === 0 ? 'rgba(255, 255, 255, 0.5)' : color.white}
          />
        </TouchableOpacity>
      </View>
    </Animated.View>
  );

  // Render footer
  const renderFooter = () => {
    if (cart.length === 0) return null;

    const selectedTotal = getSelectedTotal();
    const selectedCount = selectedItems.size;

    return (
      <Animated.View style={[styles.footer, { opacity: fadeAnim }]}>
        <LinearGradient
          colors={[color.white, BRAND_COLORS.background]}
          style={StyleSheet.absoluteFill}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        />

        <View style={styles.footerContent}>
          {/* Select All */}
          <TouchableOpacity
            style={styles.selectAllContainer}
            onPress={toggleSelectAll}
            activeOpacity={0.7}
          >
            <View style={[styles.selectAllCheckbox, selectAll && styles.selectAllCheckboxSelected]}>
              {selectAll && <Icon name="check" size={16} color={color.white} />}
            </View>
            <Text style={styles.selectAllText}>Select All</Text>
          </TouchableOpacity>

          {/* Totals */}
          <View style={styles.totalsContainer}>
            <Text style={styles.totalText}>
              Selected ({selectedCount})
            </Text>
            <Text style={styles.totalAmount}>₹{selectedTotal}</Text>
          </View>

          {/* Checkout Button */}
          <TouchableOpacity
            style={[styles.checkoutButton, selectedCount === 0 && styles.checkoutButtonDisabled]}
            onPress={proceedToCheckout}
            disabled={selectedCount === 0}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={selectedCount > 0 ? BRAND_COLORS.primaryGradient : ['#CCCCCC', '#DDDDDD']}
              style={StyleSheet.absoluteFill}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            />
            <View style={styles.checkoutButtonContent}>
              <Text style={[styles.checkoutText, selectedCount === 0 && styles.checkoutTextDisabled]}>
                Chekout
              </Text>

            </View>
          </TouchableOpacity>
        </View>
      </Animated.View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {loading && <Loading />}
      {renderHeader()}

      {cart.length === 0 ? (
        renderEmptyCart()
      ) : (
        <View style={{ flex: 1 }}>
          <FlatList
            data={cart}
            renderItem={renderCartItem}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={styles.cartList}
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={
              <View style={styles.listHeader}>
                <Text style={styles.listHeaderTitle}>Your Cart Items</Text>
              </View>
            }
            ListFooterComponent={renderFooter()}
          />
        </View>
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
    paddingHorizontal: 16,
    paddingVertical: 12,
    elevation: 5,
    shadowColor: color.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    zIndex: 10,
    overflow: 'hidden',
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backButton: {
    padding: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 20,
  },
  headerTitleContainer: {
    flex: 1,
    alignItems: 'center',
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
  clearCartButton: {
    padding: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 20,
  },
  emptyCartContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emptyCartIcon: {
    marginBottom: 24,
  },
  emptyCartTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: BRAND_COLORS.textDark,
    marginBottom: 8,
    textAlign: 'center',
  },
  emptyCartText: {
    fontSize: 16,
    color: BRAND_COLORS.gray,
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 24,
  },
  shopNowButton: {
    overflow: 'hidden',
    width: '90%',
  },
  shopNowGradient: {
    alignItems: 'center',
    borderRadius: 10,
    height: 55,
    justifyContent: "center"
  },
  shopNowText: {
    color: BRAND_COLORS.textLight,
    fontSize: 16,
    fontWeight: 'bold',
  },
  cartList: {
    paddingHorizontal: 16,
    paddingBottom: 120, // More space for summary and footer
  },
  listHeader: {
    paddingVertical: 16,
  },
  listHeaderTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: BRAND_COLORS.textDark,
  },
  cartItemContainer: {
    backgroundColor: BRAND_COLORS.cardBg,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 3,
    shadowColor: color.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    overflow: 'hidden',
  },
  cartItem: {
    flexDirection: 'row',
    padding: 12,
    alignItems: 'center',
  },
  checkboxContainer: {
    marginRight: 12,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: BRAND_COLORS.lightGray,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxSelected: {
    backgroundColor: BRAND_COLORS.primaryLight,
    borderColor: BRAND_COLORS.primaryLight,
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    backgroundColor: BRAND_COLORS.lightGray,
  },
  productDetails: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'center',
  },
  productTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: BRAND_COLORS.textDark,
    marginBottom: 4,
  },
  productBrand: {
    fontSize: 12,
    color: BRAND_COLORS.primaryLight,
    marginBottom: 2,
  },
  productCategory: {
    fontSize: 12,
    color: BRAND_COLORS.gray,
    marginBottom: 8,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: BRAND_COLORS.lightGray,
    borderRadius: 20,
    paddingHorizontal: 8,
    paddingVertical: 4,
    alignSelf: 'flex-start',
  },
  quantityButton: {
    padding: 4,
  },
  quantityText: {
    fontSize: 14,
    fontWeight: '600',
    color: BRAND_COLORS.textDark,
    marginHorizontal: 12,
    minWidth: 20,
    textAlign: 'center',
  },
  priceSection: {
    alignItems: 'flex-end',
    marginLeft: 12,
  },
  productPrice: {
    fontSize: 17,
    fontWeight: 'bold',
    color: color.black,
    marginBottom: 4,
  },
  originalPrice: {
    fontSize: 12,
    color: BRAND_COLORS.gray,
    textDecorationLine: 'line-through',
    marginBottom: 8,
  },
  removeButton: {
    padding: 6,
    backgroundColor: 'rgba(244, 67, 54, 0.1)',
    borderRadius: 8,
  },
  divider: {
    height: 1,
    backgroundColor: BRAND_COLORS.lightGray,
    marginHorizontal: 12,
  },
  footer: {
    backgroundColor: color.white,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 16,
    borderRadius: 22,
    paddingTop: 16,
    paddingBottom: 20, // Extra padding for better touch area

  },
  footerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  selectAllContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  selectAllCheckbox: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: color.borderLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  selectAllCheckboxSelected: {
    backgroundColor: BRAND_COLORS.primaryLight,
    borderColor: BRAND_COLORS.primaryLight,
  },
  selectAllText: {
    fontSize: 14,
    color: BRAND_COLORS.textDark,
    fontWeight: '600',
  },
  totalsContainer: {
    alignItems: 'center',
  },
  totalText: {
    fontSize: 12,
    color: BRAND_COLORS.gray,
  },
  totalAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: color.black,
  },
  checkoutButton: {
    width: 140,
    height: 50,
    borderRadius: 25,
    overflow: 'hidden',

  },
  checkoutButtonDisabled: {
    opacity: 0.6,
  },
  checkoutButtonContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkoutText: {
    color: color.white,
    fontSize: 15,
    fontWeight: 'bold',
    marginRight: 6,
  },
  checkoutTextDisabled: {
    color: 'rgba(255, 255, 255, 0.6)',
  },
  summaryContainer: {
    backgroundColor: color.white,
    marginTop: 16,
    padding: 16,
    borderRadius: 12,
    marginHorizontal: 16,
    marginBottom: 20, // Margin before footer spacing
  },
  summaryTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: color.black,
    marginBottom: 16,
    textTransform: 'uppercase',
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  summaryLabel: {
    fontSize: 14,
    color: '#666',
  },
  summaryValue: {
    fontSize: 14,
    color: color.black,
    fontWeight: '500',
  },
  dividerSmall: {
    height: 1,
    backgroundColor: '#EEE',
    marginVertical: 4,
  },
  grandTotalLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: color.black,
  },
  grandTotalValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: color.black,
  },
  savingsContainer: {
    backgroundColor: 'rgba(26, 156, 74, 0.1)',
    padding: 10,
    borderRadius: 8,
    marginTop: 16,
    alignItems: 'center',
  },
  savingsText: {
    color: color.success,
    fontSize: 13,
    fontWeight: '600',
  },
});

export default ViewCartScreen;
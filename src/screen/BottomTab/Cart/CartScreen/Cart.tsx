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
import ScreenNameEnum from '../../../../routes/screenName.enum';

const { width, height } = Dimensions.get('window');

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
  gray: '#757575',
  lightGray: '#E0E0E0',
};

const CartScreen = () => {
  const navigation = useNavigation();
const sampleCartData = [
  {
    id: 1,
    title: "Wireless Bluetooth Headphones",
    name: "Premium Sound X1",
    brand: "AudioTech",
    category: "Electronics",
    price: 2999,
    originalPrice: 3999,
    basePrice: 2999,
    quantity: 1,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop"
  },
  {
    id: 2,
    title: "Sports Running Shoes",
    name: "Runner Pro 2024",
    brand: "SportFlex",
    category: "Footwear",
    price: 2499,
    originalPrice: 2999,
    basePrice: 2499,
    quantity: 2,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w-400&h=400&fit=crop"
  },
  {
    id: 3,
    title: "Smart Watch Series 5",
    name: "SmartFit Pro",
    brand: "TechWear",
    category: "Wearables",
    price: 5999,
    originalPrice: 7499,
    basePrice: 5999,
    quantity: 1,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop"
  },
  {
    id: 4,
    title: "Organic Green Tea",
    name: "Green Wellness Tea",
    brand: "Nature's Best",
    category: "Food & Beverages",
    price: 499,
    originalPrice: 699,
    basePrice: 499,
    quantity: 3,
    image: "https://images.unsplash.com/photo-1561047029-3000c68339ca?w=400&h=400&fit=crop"
  },
  {
    id: 5,
    title: "Leather Backpack",
    name: "Urban Explorer Backpack",
    brand: "UrbanGear",
    category: "Accessories",
    price: 1999,
    originalPrice: 2499,
    basePrice: 1999,
    quantity: 1,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop"
  }
];

const cartTotal = sampleCartData.reduce((total, item) => total + item.price, 0);
  
  const [cart, setCart] = useState(sampleCartData);
  const [totalPrice, setTotalPrice] = useState(cartTotal);
  const [totalItems, setTotalItems] = useState(sampleCartData.length);
  const [selectedItems, setSelectedItems] = useState(new Set());
  const [selectAll, setSelectAll] = useState(false);
  
  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const cartItemAnim = useRef(new Animated.Value(0)).current;

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

    calculateTotals();
  }, [cart]);

  // Calculate totals
  const calculateTotals = () => {
    const items = cart.length;
    const price = cart.reduce((sum, item) => sum + item.price, 0);
    setTotalItems(items);
    setTotalPrice(price);
  };

  // Remove item from cart
  const removeItem = (itemId) => {
    Alert.alert(
      'Remove Item',
      'Are you sure you want to remove this item from cart?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Remove',
          style: 'destructive',
          onPress: () => {
            const updatedCart = cart.filter(item => item.id !== itemId);
            setCart(updatedCart);
            // Also remove from selected items
            const updatedSelected = new Set(selectedItems);
            updatedSelected.delete(itemId);
            setSelectedItems(updatedSelected);
            
            // Show toast
            Alert.alert('Removed', 'Item removed from cart');
          }
        }
      ]
    );
  };

  // Update quantity
  const updateQuantity = (itemId, action) => {
    const updatedCart = cart.map(item => {
      if (item.id === itemId) {
        const currentQty = item.quantity || 1;
        let newQty = currentQty;
        
        if (action === 'increase') {
          newQty = currentQty + 1;
        } else if (action === 'decrease' && currentQty > 1) {
          newQty = currentQty - 1;
        }
        
        return {
          ...item,
          quantity: newQty,
          price: item.basePrice ? item.basePrice * newQty : item.price * newQty
        };
      }
      return item;
    });
    
    setCart(updatedCart);
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

  // Get selected items total
  const getSelectedTotal = () => {
    let total = 0;
    selectedItems.forEach(itemId => {
      const item = cart.find(cartItem => cartItem.id === itemId);
      if (item) {
        total += item.price;
      }
    });
    return total;
  };

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
          onPress: () => {
            setCart([]);
            setSelectedItems(new Set());
            setSelectAll(false);
            Alert.alert('Cleared', 'All items removed from cart');
          }
        }
      ]
    );
  };

  // Proceed to checkout
  const proceedToCheckout = () => {
    if (cart.length === 0) {
      Alert.alert('Empty Cart', 'Your cart is empty. Add some items first!');
      return;
    }
    
    if (selectedItems.size === 0) {
      Alert.alert('No Items Selected', 'Please select items to checkout');
      return;
    }
    
    const selectedCartItems = cart.filter(item => selectedItems.has(item.id));
    const selectedTotal = getSelectedTotal();
    
    // Navigate to checkout screen
    // navigation.navigate('CheckoutScreen', {
    //   cartItems: selectedCartItems,
    //   totalAmount: selectedTotal,
    // });
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
              {isSelected && <Icon name="check" size={16} color="#FFFFFF" />}
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
                onPress={() => updateQuantity(item.id, 'decrease')}
                disabled={quantity <= 1}
              >
                <Icon name="remove" size={18} color={quantity <= 1 ? BRAND_COLORS.gray : BRAND_COLORS.primaryDark} />
              </TouchableOpacity>
              
              <Text style={styles.quantityText}>{quantity}</Text>
              
              <TouchableOpacity
                style={styles.quantityButton}
                onPress={() => updateQuantity(item.id, 'increase')}
              >
                <Icon name="add" size={18} color={BRAND_COLORS.primaryDark} />
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
              onPress={() => removeItem(item.id)}
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

 

  // Render footer
  const renderFooter = () => {
    if (cart.length === 0) return null;
    
    const selectedTotal = getSelectedTotal();
    const selectedCount = selectedItems.size;
    
    return (
      <Animated.View style={[styles.footer, { opacity: fadeAnim }]}>
        <LinearGradient
          colors={BRAND_COLORS.primaryGradient}
          style={StyleSheet.absoluteFill}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        />
        
        <View style={styles.footerContent}>
          {/* Select All */}
          <TouchableOpacity
            style={styles.selectAllContainer}
            onPress={toggleSelectAll}
            activeOpacity={0.8}
          >
            <View style={[styles.selectAllCheckbox, selectAll && styles.selectAllCheckboxSelected]}>
              {selectAll && <Icon name="check" size={16} color="#FFFFFF" />}
            </View>
            <Text style={styles.selectAllText}>Select All</Text>
          </TouchableOpacity>
          
          {/* Totals */}
          <View style={styles.totalsContainer}>
            <Text style={styles.totalText}>
              Selected: {selectedCount} item{selectedCount !== 1 ? 's' : ''}
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
              colors={selectedCount > 0 ? ['#FFFFFF', '#F0F0F0'] : ['#CCCCCC', '#DDDDDD']}
              style={StyleSheet.absoluteFill}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            />
            <TouchableOpacity style={styles.checkoutButtonContent}
            // 
            onPress={()=>{
              navigation.navigate(ScreenNameEnum.CheckoutScreen)
            }}
            > 
              <Text style={[styles.checkoutText, selectedCount === 0 && styles.checkoutTextDisabled]}>
                CHECKOUT
              </Text>
              <Icon 
                name="arrow-forward" 
                size={20} 
                color={selectedCount === 0 ? BRAND_COLORS.gray : BRAND_COLORS.primaryDark} 
              />
            </TouchableOpacity>
          </TouchableOpacity>
        </View>
      </Animated.View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      
      
      {cart.length === 0 ? (
        renderEmptyCart()
      ) : (
        <>
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
          />
          {renderFooter()}
        </>
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
    shadowColor: '#000',
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
    borderRadius: 25,
    overflow: 'hidden',
    width: '80%',
  },
  shopNowGradient: {
    paddingVertical: 14,
    paddingHorizontal: 32,
    alignItems: 'center',
    borderRadius: 25,
  },
  shopNowText: {
    color: BRAND_COLORS.textLight,
    fontSize: 16,
    fontWeight: 'bold',
  },
  cartList: {
    paddingHorizontal: 16,
    paddingBottom: 100,
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
    shadowColor: '#000',
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
    backgroundColor: BRAND_COLORS.primaryDark,
    borderColor: BRAND_COLORS.primaryDark,
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
    fontSize: 16,
    fontWeight: '600',
    color: BRAND_COLORS.textDark,
    marginBottom: 4,
  },
  productBrand: {
    fontSize: 12,
    color: BRAND_COLORS.primaryDark,
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
    fontSize: 18,
    fontWeight: 'bold',
    color: BRAND_COLORS.primaryDark,
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
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    overflow: 'hidden',
  },
  footerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  selectAllContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  selectAllCheckbox: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: BRAND_COLORS.textLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  selectAllCheckboxSelected: {
    backgroundColor: BRAND_COLORS.accent,
    borderColor: BRAND_COLORS.accent,
  },
  selectAllText: {
    color: BRAND_COLORS.textLight,
    fontSize: 14,
    fontWeight: '600',
  },
  totalsContainer: {
    alignItems: 'flex-end',
    marginHorizontal: 16,
  },
  totalText: {
    fontSize: 12,
    color: BRAND_COLORS.textLight,
    marginBottom: 2,
  },
  totalAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: BRAND_COLORS.accent,
  },
  checkoutButton: {
    borderRadius: 8,
    overflow: 'hidden',
    minWidth: 120,
  },
  checkoutButtonDisabled: {
    opacity: 0.7,
  },
  checkoutButtonContent: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkoutText: {
    color: BRAND_COLORS.primaryDark,
    fontSize: 14,
    fontWeight: 'bold',
    marginRight: 8,
  },
  checkoutTextDisabled: {
    color: BRAND_COLORS.gray,
  },
});

export default CartScreen;
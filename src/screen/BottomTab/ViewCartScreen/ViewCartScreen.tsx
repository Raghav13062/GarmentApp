import React, { useCallback, useEffect, useRef, useState } from 'react';
import { color } from "../../../constant";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  Alert,
  TouchableOpacity,
  Image,
  Animated,
  Easing,
  Platform,
  StatusBar,
} from 'react-native';
import StatusBarComponent from '../../../component/StatusBarCompoent';
const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 44 : StatusBar.currentHeight || 0;
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import { useDispatch } from 'react-redux';
import { setCart as setCartRedux } from '../../../redux/feature/cartSlice';
import ScreenNameEnum from '../../../routes/screenName.enum';
import { errorToast } from '../../../utils/customToast';
import { ClearCartApi, GetCartApi, RemoveFromCartApi, UpdateCartQuantityApi } from '../../../Api/auth/cartService';
import { getHomePageData } from '../../../Api/auth/homeService';
import Loading from '../../../utils/Loader';
import ProductCard from '../../../component/cart/ProductCard';


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

const toNumber = (value: any, fallback = 0) => {
  const parsed = Number(value);
  return Number?.isFinite(parsed) ? parsed : fallback;
};

const safeImageUrl = (url?: string) =>
  typeof url === 'string' && url.length > 0
    ? url.replace(/\.avif$/i, '.webp')
    : 'https://via.placeholder.com/150';

const mapCartItem = (item: any) => {
  const product = item?.product && typeof item.product === 'object' ? item.product : {};
  const productId =
    product?._id ||
    product?.id ||
    item?.productId ||
    item?.product?._id ||
    item?.product?.id;
  const qty = toNumber(item?.quantity, 1);
  const unitPrice = toNumber(
    item?.unitPrice ??
    item?.price ??
    product?.pricing?.sellingPrice ??
    product?.sellingPrice ??
    product?.discountPrice ??
    product?.price,
    0
  );
  const lineTotal = toNumber(
    item?.lineTotal ??
    item?.totalPrice ??
    item?.sellingPrice ??
    unitPrice * qty,
    unitPrice * qty
  );
  const unitMrp = toNumber(
    item?.unitMrp ??
    item?.mrp ??
    product?.pricing?.mrp ??
    product?.mrp ??
    product?.price,
    unitPrice
  );
  const originalPrice = toNumber(
    item?.originalPrice ??
    item?.mrpTotal ??
    unitMrp * qty,
    unitMrp * qty
  );
  const image =
    item?.image ||
    item?.images?.[0] ||
    item?.baseImages?.[0] ||
    product?.baseImages?.[0] ||
    product?.images?.[0] ||
    product?.thumbnail;

  return {
    id: item?._id || item?.id || productId,
    productId,
    product,
    title: product?.title || product?.name || item?.title || item?.name || 'Product',
    image: safeImageUrl(image),
    price: lineTotal,
    unitPrice,
    quantity: qty,
    brand: product?.brand || item?.brand || 'Garment',
    category: product?.categoryId?.name || product?.category?.name || item?.category || 'One-Size',
    originalPrice,
    unitMrp,
    selectedSize: item?.size || item?.selectedSize || item?.variant?.size,
    selectedColor: item?.color || item?.selectedColor || item?.variant?.color,
  };
};

const ViewCartScreen = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
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
  const [allProducts, setAllProducts] = useState<any[]>([]);

  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const cartItemAnim = useRef(new Animated.Value(0)).current;

  const fetchCart = async () => {
    try {
      const data = await GetCartApi(setLoading);
      if (data) {
        setCartData(data);
        const mappedItems = Array.isArray(data.items) ? data.items.map(mapCartItem) : [];
        setCart(mappedItems);
        setTotalPrice(toNumber(data.totalPrice, mappedItems.reduce((sum: number, item: any) => sum + item.price, 0)));
        setTotalItems(toNumber(data.totalItems, mappedItems.reduce((sum: number, item: any) => sum + item.quantity, 0)));

        // Update Redux state
        dispatchRedux(setCartRedux({
          items: mappedItems,
          totalItems: toNumber(data.totalItems, mappedItems.length),
          totalPrice: toNumber(data.totalPrice, 0)
        }));

        // Auto-select all items by default
        const allItemIds = mappedItems.map((item: any) => item.id);
        setSelectedItems(new Set(allItemIds));
        setSelectAll(mappedItems.length > 0);
      }
    } catch (error) {
      console.error('Fetch cart error:', error);
    }
  };

  const fetchAllProducts = async () => {
    const routeProducts =
      route.params?.products ||
      route.params?.relatedProducts ||
      route.params?.allProducts;

    if (Array.isArray(routeProducts) && routeProducts.length > 0) {
      setAllProducts(routeProducts);
      return;
    }

    try {
      const response = await getHomePageData(route.params?.gender || 'women');
      const sections = response?.data?.sections;

      if (!Array.isArray(sections)) return;

      const productMap = new Map<string, any>();
      sections.forEach((section: any) => {
        const products = Array.isArray(section?.data?.products) ? section.data.products : [];
        products.forEach((product: any) => {
          const key = String(product?._id || product?.id || product?.productId || '');
          if (key && !productMap.has(key)) {
            productMap.set(key, product);
          }
        });
      });

      setAllProducts(Array.from(productMap.values()));
    } catch (error) {
      console.log('Fetch all products error:', error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchCart();
      fetchAllProducts();
    }, [])
  );

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
    const items = cart.reduce((sum: number, item: any) => sum + (item.quantity || 1), 0);
    const price = cart.reduce((sum: number, item: any) => sum + item.price, 0);
    setTotalItems(items);
    setTotalPrice(price);
  };

  // Remove item from cart
  const removeItem = async (item: any) => {

    try {
      const productId = item.productId;
      if (productId) {
        await RemoveFromCartApi(productId, setLoading);
        fetchCart(); // Refresh cart data
      }
    } catch (error) {
      console.error('Remove error:', error);
    }

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

    // Optimistically update local cart state
    const previousCart = [...cart];
    const updatedCart = cart.map((cartItem: any) => {
      if (cartItem.id === item.id) {
        const lineTotal = cartItem.unitPrice * newQty;
        const lineMrp = cartItem.unitMrp * newQty;
        return {
          ...cartItem,
          quantity: newQty,
          price: lineTotal,
          originalPrice: lineMrp
        };
      }
      return cartItem;
    });

    setCart(updatedCart);

    try {
      if (item.productId) {
        // Sync with API in background (without full-screen loading spinner)
        const response = await UpdateCartQuantityApi(item.productId, newQty);

        if (response && response.success) {
          // Silently refresh the full cart from API to sync all totals
          const data = await GetCartApi();
          if (data) {
            setCartData(data);
            const mappedItems = Array.isArray(data.items) ? data.items.map(mapCartItem) : [];
            setCart(mappedItems);
            setTotalPrice(toNumber(data.totalPrice, mappedItems.reduce((sum: number, item: any) => sum + item.price, 0)));
            setTotalItems(toNumber(data.totalItems, mappedItems.reduce((sum: number, item: any) => sum + item.quantity, 0)));

            // Update Redux state
            dispatchRedux(setCartRedux({
              items: mappedItems,
              totalItems: toNumber(data.totalItems, mappedItems.length),
              totalPrice: toNumber(data.totalPrice, 0)
            }));
          }
        } else {
          // Rollback on API failure
          setCart(previousCart);
          errorToast(response?.message || 'Failed to update quantity');
        }
      }
    } catch (error) {
      console.error('Update quantity error:', error);
      // Rollback on network error
      setCart(previousCart);
      errorToast('Failed to update quantity due to network error');
    }
  };

  // Toggle item selection
  const toggleItemSelection = (itemId: any) => {
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
      const allItemIds = cart.map((item: any) => item.id);
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
      const item = cart.find((cartItem: any) => cartItem.id === itemId);
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

    const selectedCartItems = cart?.filter((item: any) => selectedItems?.has(item?.id));
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
  const renderCartItem = ({ item, index }: any) => {
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
    const discountPercent = item.originalPrice > item.price
      ? Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)
      : 0;
    const variantText = item.selectedSize || item.selectedColor
      ? `${item.selectedColor ? `${item.selectedColor} / ` : ''}${item.selectedSize || item.category}`
      : item.category || 'One-Size';

    return (
      <Animated.View style={[styles.bagItemContainer, itemAnimation]}>
        <TouchableOpacity
          style={[styles.bagCheckbox, isSelected && styles.bagCheckboxSelected]}
          onPress={() => toggleItemSelection(item.id)}
          activeOpacity={0.8}
        >
          {isSelected && <Icon name="check" size={15} color={color.white} />}
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.bagProductBlock}
          activeOpacity={0.9}
          onPress={() =>
            navigation.navigate(ScreenNameEnum.ProductDetails, {
              item: item.product && Object.keys(item.product).length ? item.product : item,
              productId: item.productId,
              relatedProducts: cart.map((cartItem: any) => cartItem.product && Object.keys(cartItem.product).length ? cartItem.product : cartItem),
            })
          }
        >
          <Image
            source={{ uri: item.image }}
            style={styles.bagProductImage}
          />

          <View style={styles.bagProductDetails}>
            <View style={styles.bagTitleRow}>
              <Text style={styles.bagProductTitle} numberOfLines={1}>
                {item.title || item.name}
              </Text>
              <TouchableOpacity
                style={styles.bagDeleteButton}
                onPress={() => removeItem(item)}
                activeOpacity={0.7}
              >
                <Icon name="delete-outline" size={20} color={BRAND_COLORS.error} />
              </TouchableOpacity>
            </View>


            <View style={styles.bagPriceRow}>
              <Text style={styles.bagPrice}>₹{item.price}</Text>
              {item.originalPrice > item.price && (
                <Text style={styles.bagMrp}>₹{item.originalPrice}</Text>
              )}
              {discountPercent > 0 && (
                <Text style={styles.bagDiscount}>{discountPercent}%OFF</Text>
              )}
            </View>

            <View style={styles.bagTagsRow}>
              <Text style={styles.bagTag}>Best selling</Text>
              <Text style={styles.bagTag}>Trendy</Text>
            </View>

            <View style={styles.bagQtyRow}>
              <TouchableOpacity
                style={styles.bagQtyButton}
                onPress={() => updateQuantity(item, 'decrease')}
                disabled={quantity <= 1}
              >
                <Icon name="remove" size={16} color={quantity <= 1 ? BRAND_COLORS.gray : color.black} />
              </TouchableOpacity>
              <Text style={styles.bagQtyText}>{quantity}</Text>
              <TouchableOpacity
                style={styles.bagQtyButton}
                onPress={() => updateQuantity(item, 'increase')}
              >
                <Icon name="add" size={16} color={color.black} />
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      </Animated.View>
    );
  };



  const getCardProducts = () =>
    cart
      .map((cartItem: any) => {
        if (cartItem.product && Object.keys(cartItem.product).length > 0) {
          return cartItem.product;
        }

        return {
          _id: cartItem.productId || cartItem.id,
          id: cartItem.productId || cartItem.id,
          title: cartItem.title,
          name: cartItem.title,
          baseImages: [cartItem.image],
          images: [cartItem.image],
          brand: cartItem.brand,
          category: cartItem.category,
          pricing: {
            sellingPrice: cartItem.unitPrice || cartItem.price,
            mrp: cartItem.unitMrp || cartItem.originalPrice,
            discountPercentage:
              cartItem.originalPrice > cartItem.price
                ? Math.round(((cartItem.originalPrice - cartItem.price) / cartItem.originalPrice) * 100)
                : 0,
          },
        };
      })
      .filter((item: any) => item?._id || item?.id);

  const renderProductCardList = () => {
    const products = allProducts.length > 0 ? allProducts : getCardProducts();
    if (products.length === 0) return null;

    return (
      <View style={styles.productCardSection}>
        <Text style={styles.productCardSectionTitle}>More products for you</Text>
        <FlatList
          data={products}
          numColumns={2}
          scrollEnabled={false}
          columnWrapperStyle={styles.productCardRow}
          renderItem={({ item }) => (
            <ProductCard
              item={item}
              onPress1={() =>
                navigation.navigate(ScreenNameEnum.ProductDetails, {
                  item,
                  productId: item?._id || item?.id,
                  relatedProducts: products,
                })
              }
            />
          )}
          keyExtractor={(item, productIndex) =>
            String(item?._id || item?.id || item?.productId || `bag-product-${productIndex}`)
          }
        />
      </View>
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
          <Text style={styles.shopNowText}>Startup Shopping</Text>
        </LinearGradient>
      </TouchableOpacity>
    </Animated.View>
  );

  // Render detailed order summary


  // Render header
  const renderHeader = () => {
    const selectedCount = selectedItems.size;
    const headerStatus = cart.length === 0
      ? 'Your bag is waiting'
      : `${selectedCount} selected • ₹${getSelectedTotal()}`;

    return (
      <Animated.View style={[styles.bagHeader, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
        <View style={styles.bagHeaderContent}>
          <TouchableOpacity
            style={styles.bagHeaderIcon}
            onPress={() => navigation.goBack()}
            activeOpacity={0.7}
          >
            <Icon name="arrow-back" size={23} color={color.black} />
          </TouchableOpacity>

          <View style={styles.bagHeaderTitleWrap}>
            <Text style={styles.bagHeaderTitle}>My Bag ({totalItems})</Text>
            <Text style={styles.bagHeaderStatus} numberOfLines={1}>{headerStatus}</Text>
          </View>

          <View style={styles.bagHeaderActions}>
            <TouchableOpacity
              style={[styles.bagHeaderIcon, cart.length === 0 && styles.bagHeaderIconDisabled]}
              onPress={clearCart}
              disabled={cart.length === 0}
              activeOpacity={0.7}
            >
              <Icon name="delete-outline" size={23} color={cart.length === 0 ? '#B8B8B8' : color.black} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.bagHeaderIcon}
              activeOpacity={0.7}
              onPress={() => navigation.navigate(ScreenNameEnum.WishList)}
            >
              <Icon name="favorite-border" size={23} color={color.black} />
            </TouchableOpacity>
          </View>
        </View>
      </Animated.View>
    );
  };

  // Render footer
  const renderFooter = () => {
    if (cart.length === 0) return null;

    const selectedTotal = getSelectedTotal();
    const selectedCount = selectedItems.size;

    return (
      <Animated.View style={[styles.bagFooter, { opacity: fadeAnim }]}>
        <View style={styles.bagFooterContent}>
          <TouchableOpacity
            style={styles.bagSelectAll}
            onPress={toggleSelectAll}
            activeOpacity={0.7}
          >
            <View style={[styles.bagFooterCheckbox, selectAll && styles.bagCheckboxSelected]}>
              {selectAll && <Icon name="check" size={14} color={color.white} />}
            </View>
            <Text style={styles.bagAllText}>All</Text>
          </TouchableOpacity>

          <Text style={styles.bagFooterTotal}>₹{selectedTotal}</Text>

          <TouchableOpacity
            style={[styles.bagCheckoutButton, selectedCount === 0 && styles.checkoutButtonDisabled]}
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
            <Text style={[styles.bagCheckoutText, selectedCount === 0 && styles.checkoutTextDisabled]}>
              CHECKOUT ({selectedCount})
            </Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBarComponent barStyle="dark-content" backgroundColor="#FFFFFF" translucent={false} />

      {renderHeader()}
      {loading ? <Loading fullScreen={false} size="large" color={BRAND_COLORS.primaryLight} containerStyle={styles.loaderContainer} /> : (
        cart.length === 0 ? (
          renderEmptyCart()
        ) : (
          <View style={{ flex: 1 }}>
            <FlatList
              data={cart}
              renderItem={renderCartItem}
              keyExtractor={(item, index) => String(item?.id || item?.productId || index)}
              contentContainerStyle={styles.bagList}
              showsVerticalScrollIndicator={false}
              ListFooterComponent={

                renderProductCardList()

              }
            />
          </View>
        )
      )}
      {renderFooter()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.white,
  },
  loaderContainer: {
    flex: 1,
  },
  bagHeader: {
    paddingTop: Platform.OS === 'ios' ? 10 : 8,
    paddingHorizontal: 12,
    paddingBottom: 12,
    backgroundColor: color.white,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
    zIndex: 10,
  },
  bagHeaderContent: {
    minHeight: 48,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  bagHeaderTitleWrap: {
    position: 'absolute',
    left: 58,
    right: 92,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bagHeaderTitle: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '800',
    color: color.black,
  },
  bagHeaderStatus: {
    marginTop: 2,
    fontSize: 12,
    fontWeight: '500',
    color: '#777',
    textAlign: 'center',
  },
  bagHeaderActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bagHeaderIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
  },
  bagHeaderIconDisabled: {
    opacity: 0.7,
  },
  shippingBanner: {
    backgroundColor: '#F4F4F4',
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 14,
  },
  shippingText: {
    fontSize: 13,
    lineHeight: 18,
    color: '#222',
  },
  shippingBold: {
    fontWeight: '800',
    color: color.black,
  },
  bagList: {
    paddingBottom: 112,
    backgroundColor: color.white,
  },
  productCardSection: {
    paddingTop: 18,
    paddingBottom: 12,
    backgroundColor: color.white,
  },
  productCardSectionTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: color.black,
    marginBottom: 12,
    paddingHorizontal: 16,
  },
  productCardRow: {
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  bagItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 12,
    backgroundColor: color.white,
  },
  bagCheckbox: {
    width: 22,
    height: 22,
    borderRadius: 5,
    borderWidth: 1.4,
    borderColor: '#1F1F1F',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  bagCheckboxSelected: {
    backgroundColor: color.primary,
    borderColor: color.primary,
  },
  bagProductBlock: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  bagProductImage: {
    width: 122,
    height: 164,
    backgroundColor: '#F0F0F0',
    resizeMode: 'cover',
  },
  bagProductDetails: {
    flex: 1,
    paddingLeft: 12,
    minHeight: 164,
  },
  bagTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bagProductTitle: {
    flex: 1,
    fontSize: 15,
    color: '#111',
    fontWeight: '500',
  },
  bagDeleteButton: {
    width: 28,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bagVariantText: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: '600',
    color: '#111',
  },
  bagPriceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginTop: 14,
  },
  bagPrice: {
    fontSize: 16,
    fontWeight: '800',
    color: color.primary,
    marginRight: 4,
  },
  bagMrp: {
    fontSize: 13,
    color: '#999',
    textDecorationLine: 'line-through',
    marginRight: 4,
  },
  bagDiscount: {
    fontSize: 13,
    color: color.white,
    backgroundColor: color.primary,
    paddingHorizontal: 4,
    paddingVertical: 2,
    borderRadius: 2,
    overflow: 'hidden',
  },
  bagTagsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 7,
  },
  bagTag: {
    fontSize: 10,
    color: '#8A5A00',
    backgroundColor: '#FFF4D8',
    paddingHorizontal: 5,
    paddingVertical: 2,
    marginRight: 5,
  },
  bagQtyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    marginTop: 'auto',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 7,
    overflow: 'hidden',
  },
  bagQtyButton: {
    width: 28,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FAFAFA',
  },
  bagQtyText: {
    minWidth: 34,
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '600',
    color: color.black,
  },
  bagFooter: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: color.white,
    borderTopWidth: 1,
    borderTopColor: '#E8E8E8',
    paddingHorizontal: 12,
    paddingTop: 10,
    paddingBottom: Platform.OS === 'ios' ? 28 : 12,
  },
  bagFooterContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bagSelectAll: {
    flexDirection: 'row',
    alignItems: 'center',
    minWidth: 70,
  },
  bagFooterCheckbox: {
    width: 22,
    height: 22,
    borderRadius: 5,
    borderWidth: 1.4,
    borderColor: '#1F1F1F',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  bagAllText: {
    fontSize: 15,
    color: '#111',
  },
  bagFooterTotal: {
    flex: 1,
    textAlign: 'right',
    marginRight: 14,
    fontSize: 17,
    fontWeight: '800',
    color: color.black,
  },
  bagCheckoutButton: {
    width: 140,
    height: 50,
    borderRadius: 14,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bagCheckoutText: {
    color: color.white,
    fontSize: 13,
    fontWeight: '800',
    letterSpacing: 0.2,
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: STATUSBAR_HEIGHT + 12,
    paddingBottom: 12,
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
    textTransform: "capitalize"
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
    paddingTop: 16,
    paddingBottom: Platform.OS === 'ios' ? 34 : 20, // safe area padding for iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 10,
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

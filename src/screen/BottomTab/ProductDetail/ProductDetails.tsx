import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Platform,
  Animated,
  Modal,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import LinearGradient from "react-native-linear-gradient";
import { useRoute } from "@react-navigation/native";
import { color, navigateToScreen, navigationBack } from "../../../constant";
import ScreenNameEnum from "../../../routes/screenName.enum";
import Loading from "../../../utils/Loader";
import { TopProductDetail } from "../../../Api/auth/ApiGetCategories";
import { styles } from "./style";
import { useProtectedAction } from "../../../utils/useProtectedAction";

import { useDispatch, useSelector } from "react-redux";
import { toggleWishlist } from "../../../redux/feature/wishlistSlice";

const { width } = Dimensions.get("window");
export default function ProductDetails() {
  const dispatch = useDispatch();
  const wishlist = useSelector((state: any) => state.wishlist.items);
  const route = useRoute();
  const routeItem = route.params?.item;
  const productId = routeItem?._id || routeItem?.id || (typeof routeItem === 'string' ? routeItem : null) || route.params?.id || route.params?.productId;

  const [activeImage, setActiveImage] = useState(0);
  const [product, setProduct] = useState<any>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [fullScreenImage, setFullScreenImage] = useState<string | null>(null);
  const executeProtected = useProtectedAction();

  const isFavorite = wishlist.some((wishItem: any) =>
    (wishItem.id || wishItem._id) === (product?._id || product?.id || productId)
  );

  const onToggleWishlist = () => {
    executeProtected(() => {
      if (product) {
        dispatch(toggleWishlist(product));
      }
    });
  };

  // Animation values
  const fadeAnim = useState(new Animated.Value(0))[0];
  const slideAnim = useState(new Animated.Value(30))[0];

  useEffect(() => {
    if (productId) {
      TopProductDetail(productId)
        .then(res => {
          if (res) {
            console.log("res", res);
            setProduct(res);
          }
        })
        .catch(err => console.log("API Error:", err));
    }
  }, [productId]);

  useEffect(() => {
    if (product) {
      const sizes = product?.variants?.sizes || [];
      const colors = product?.variants?.colors || [];
      if (sizes.length > 0 && !selectedSize) setSelectedSize(sizes[0]);
      if (colors.length > 0 && !selectedColor) setSelectedColor(colors[0]);

      // Trigger animation when product loads
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.spring(slideAnim, {
          toValue: 0,
          tension: 50,
          friction: 7,
          useNativeDriver: true,
        })
      ]).start();
    }
  }, [product]);



  if (!product) {
    return (
      <View style={styles.loader}>
        <Loading />
      </View>
    );
  }

  // Mapping API data fields
  const displayName = product?.title || product?.name || "Product";

  // Handle both flat structures and nested 'pricing' object structures
  const rawMrp = product?.pricing?.mrp || product?.mrp || product?.price || 0;
  const rawSellingPrice = product?.pricing?.sellingPrice || product?.sellingPrice || product?.discountPrice || 0;
  const rawDiscount = product?.pricing?.discountPercentage || product?.discountPercentage || 0;

  const displayMrp = parseFloat(rawMrp);
  const displaySellingPrice = parseFloat(rawSellingPrice);

  let displayImages = product?.baseImages || product?.images || [];
  if (selectedColor && product?.variantImages?.length > 0) {
    const variant = product.variantImages.find((v: any) => v.color === selectedColor);
    if (variant && variant.urls && variant.urls.length > 0) {
      displayImages = variant.urls;
    }
  }

  const categoryName = product?.categoryId?.name || product?.category?.name || "Category";

  const discountPercent = rawDiscount > 0
    ? rawDiscount
    : (displayMrp > 0 ? Math.round(((displayMrp - displaySellingPrice) / displayMrp) * 100) : 0);

  return (
    <View style={styles.container}>
      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}
      >

        {/* IMAGE SLIDER */}
        <View>
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={(e) =>
              setActiveImage(
                Math.round(e.nativeEvent.contentOffset.x / width)
              )
            }
          >
            {displayImages?.map((img: string, index: number) => {
              const safeImg = typeof img === 'string' ? img.replace(/\.avif$/i, '.webp') : img;
              return (
                <TouchableOpacity key={index} activeOpacity={0.9} onPress={() => setFullScreenImage(safeImg)}>
                  <Image
                    source={{ uri: safeImg }}
                    style={styles.mainImage}
                  />
                </TouchableOpacity>
              )
            })}
          </ScrollView>



          {/* PREMIUM OVERLAYS */}
          {discountPercent > 0 && (
            <View style={{ position: 'absolute', top: Platform.OS === 'ios' ? 55 : 40, right: 16, backgroundColor: '#b69262', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 2 }}>
              <Text style={{ color: color.white, fontSize: 11, fontWeight: '700', letterSpacing: 1 }}>{discountPercent}% OFF</Text>
            </View>
          )}

          {/* DOT INDICATOR */}
          <View style={styles.indicatorRow}>
            {displayImages?.map((_: any, i: number) => (
              <View
                key={i}
                style={[
                  styles.dot,
                  activeImage === i && styles.activeDot,
                ]}
              />
            ))}
          </View>
        </View>

        {/* INFO SECTION */}
        <View style={{ padding: 20, backgroundColor: '#FDFBFA' }}>
          {/* CATEGORY & BADGES */}
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
            <Text style={{ fontSize: 12, color: '#888', textTransform: 'uppercase', letterSpacing: 1 }}>
              {categoryName} {product?.subcategory ? `• ${product.subcategory}` : ''} {product?.genderFilter ? `(${product.genderFilter})` : ''}
            </Text>
            {product?.isTopSelling && (
              <View style={{ backgroundColor: '#FFD700', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4 }}>
                <Text style={{ fontSize: 10, fontWeight: 'bold', color: '#111' }}>TOP SELLING</Text>
              </View>
            )}
          </View>

          {/* TITLE */}
          <Text style={{ fontSize: 26, fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif', color: '#111' }}>{displayName}</Text>

          {/* RATING */}
          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 8 }}>
            <Ionicons name="star" size={14} color="#b69262" />
            <Ionicons name="star" size={14} color="#b69262" />
            <Ionicons name="star" size={14} color="#b69262" />
            <Ionicons name="star" size={14} color="#b69262" />
            <Ionicons name="star-half" size={14} color="#b69262" />
            <Text style={{ fontSize: 12, color: color.textMedium, marginLeft: 8 }}>({product?.ratings?.count ?? 'Premium Quality'})</Text>
          </View>

          {/* PRICE */}
          <View style={{ marginTop: 16 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={{ fontSize: 24, fontWeight: '600', color: '#111', fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif' }}>Rs. {displaySellingPrice}</Text>
              {displayMrp > displaySellingPrice && (
                <>
                  <Text style={{ fontSize: 16, color: '#888', textDecorationLine: 'line-through', marginLeft: 12 }}>Rs. {displayMrp}</Text>
                  <View style={{ backgroundColor: '#FCEFE9', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 4, marginLeft: 12 }}>
                    <Text style={{ fontSize: 12, fontWeight: '700', color: '#D45C2B' }}>{discountPercent}% OFF</Text>
                  </View>
                </>
              )}
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 6 }}>
              <Text style={{ fontSize: 12, color: '#888', fontWeight: '500' }}>Inclusive of all taxes</Text>
              {product?.inventory?.stockQuantity !== undefined && (
                <Text style={{ fontSize: 12, fontWeight: '600', color: product.inventory.stockQuantity > 0 ? color.success : color.error }}>
                  {product.inventory.stockQuantity > 0 ? `In Stock (${product.inventory.stockQuantity})` : 'Out of Stock'}
                </Text>
              )}
            </View>
          </View>

          {product?.variants?.colors && product.variants.colors.length > 0 && (
            <View style={{ marginBottom: 30, marginTop: 20 }}>
              <Text style={styles.sectionHeader}>COLOR</Text>
              <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 8 }}>
                {product.variants.colors.map((c: string, index: number) => {
                  const variant = product.variantImages?.find((v: any) => v.color === c);
                  return (
                    <TouchableOpacity
                      key={index}
                      style={[
                        styles.variantBox,
                        selectedColor === c && styles.variantBoxSelected,
                        { paddingHorizontal: variant ? 4 : 24, paddingVertical: variant ? 4 : 14 }
                      ]}
                      onPress={() => {
                        setSelectedColor(c);
                        setActiveImage(0);
                      }}
                    >
                      {variant && variant.urls && variant.urls.length > 0 ? (
                        <Image source={{ uri: variant.urls[0].replace(/\.avif$/i, '.webp') }} style={{ width: 40, height: 40, borderRadius: 4 }} />
                      ) : (
                        <Text style={[styles.variantText, selectedColor === c && styles.variantTextSelected]}>
                          {c}
                        </Text>
                      )}
                    </TouchableOpacity>
                  )
                })}
              </View>
            </View>
          )}

          {/* VARIANTS: SIZES */}
          {product?.variants?.sizes && product.variants.sizes.length > 0 && (
            <View style={{ marginBottom: 30 }}>
              <Text style={styles.sectionHeader}>SIZE</Text>
              <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 8 }}>
                {product.variants.sizes.map((size: string, index: number) => (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.variantBox,
                      selectedSize === size && styles.variantBoxSelected,
                      { width: 56, height: 56, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 0, paddingVertical: 0 }
                    ]}
                    onPress={() => setSelectedSize(size)}
                  >
                    <Text style={[styles.variantText, selectedSize === size && styles.variantTextSelected]}>
                      {size}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          )}
          {/* DESCRIPTION */}
          <View style={{ marginBottom: 24 }}>
            <Text style={styles.sectionHeader}>DESCRIPTION</Text>
            <Text style={{ fontSize: 14, color: "#555", lineHeight: 22 }}>
              {product?.description || "High-quality product. Perfect for everyday styling. Premium fabric and comfortable fit — a must-have in your collection."}
            </Text>
          </View>

          {/* VARIANTS: COLORS */}


        </View>

      </Animated.ScrollView>

      {/* FIXED BACK BUTTON */}
      <TouchableOpacity style={[styles.backButton, { zIndex: 10, shadowColor: color.black, shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 3 }]} onPress={navigationBack}>
        <View style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgba(255,255,255,0.9)', alignItems: 'center', justifyContent: 'center' }}>
          <Ionicons name="arrow-back" size={22} color="#111" />
        </View>
      </TouchableOpacity>

      {/* BOTTOM BAR */}
      <View style={styles.themeBottomBar}>
        <TouchableOpacity
          style={styles.favoriteBtn}
          onPress={onToggleWishlist}
        >
          <Ionicons
            name={isFavorite ? "heart" : "heart-outline"}
            size={26}
            color={isFavorite ? color.error : "#444"}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={{ flex: 1, marginLeft: 16 }}
          onPress={() => executeProtected(() => navigateToScreen(ScreenNameEnum.CheckoutScreen, { product }))}
        >
          <LinearGradient colors={color.buttLinearGradient} style={styles.themeBtnGradient}>
            <Ionicons name="cart-outline" size={22} color={color.white} style={{ marginRight: 8 }} />
            <Text style={styles.themeBtnText}>Add to Cart</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>

      {/* FULL SCREEN IMAGE MODAL */}
      <Modal visible={!!fullScreenImage} transparent={true} animationType="fade" onRequestClose={() => setFullScreenImage(null)}>
        <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.95)' }}>
          <TouchableOpacity
            style={{ position: 'absolute', top: Platform.OS === 'ios' ? 60 : 40, right: 20, zIndex: 100 }}
            onPress={() => setFullScreenImage(null)}
          >
            <Ionicons name="close" size={36} color={color.white} />
          </TouchableOpacity>
          <ScrollView
            maximumZoomScale={4}
            minimumZoomScale={1}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center' }}
          >
            {fullScreenImage && (
              <Image
                source={{ uri: fullScreenImage.replace(/\.avif$/i, '.webp') }}
                style={{ width: width, height: Dimensions.get('window').height * 0.8, resizeMode: 'contain' }}
              />
            )}
          </ScrollView>
        </View>
      </Modal>
    </View >
  );
}

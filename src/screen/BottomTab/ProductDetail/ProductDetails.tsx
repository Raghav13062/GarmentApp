import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Platform,
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

const { width } = Dimensions.get("window");
export default function ProductDetails() {
  const route = useRoute();
  const { item, gender } = route.params as any;
  const [activeImage, setActiveImage] = useState(0);
  const [product, setProduct] = useState<any>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const executeProtected = useProtectedAction();

  useEffect(() => {
    const productId = item?.id || item?._id;
    if (productId) {
      TopProductDetail(productId)
        .then(res => {
          if (res) {
            setProduct(res);
          }
        })
        .catch(err => console.log("API Error:", err));
    }
  }, [item?.id, item?._id]);

  useEffect(() => {
    if (product) {
      const sizes = product?.variants?.sizes || [];
      const colors = product?.variants?.colors || [];
      if (sizes.length > 0 && !selectedSize) setSelectedSize(sizes[0]);
      if (colors.length > 0 && !selectedColor) setSelectedColor(colors[0]);
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

  const displayImages = product?.images || product?.baseImages || [];

  const discountPercent = rawDiscount > 0 
    ? rawDiscount 
    : (displayMrp > 0 ? Math.round(((displayMrp - displaySellingPrice) / displayMrp) * 100) : 0);

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>

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
            {displayImages?.map((img: string, index: number) => (
              <Image
                key={index}
                source={{ uri: img }}
                style={styles.mainImage}
              />
            ))}
          </ScrollView>



          {/* PREMIUM OVERLAYS */}
          {discountPercent > 0 && (
            <View style={{ position: 'absolute', top: Platform.OS === 'ios' ? 55 : 40, right: 16, backgroundColor: '#b69262', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 2 }}>
              <Text style={{ color: '#fff', fontSize: 11, fontWeight: '700', letterSpacing: 1 }}>{discountPercent}% OFF</Text>
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
          {/* CATEGORY */}
          <Text style={{ fontSize: 12, color: '#888', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 4 }}>
            {product?.category?.name} {product?.subcategory ? `• ${product.subcategory}` : ''}
          </Text>

          {/* TITLE */}
          <Text style={{ fontSize: 26, fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif', color: '#111' }}>{displayName}</Text>

          {/* RATING */}
          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 8 }}>
            <Ionicons name="star" size={14} color="#b69262" />
            <Ionicons name="star" size={14} color="#b69262" />
            <Ionicons name="star" size={14} color="#b69262" />
            <Ionicons name="star" size={14} color="#b69262" />
            <Ionicons name="star-half" size={14} color="#b69262" />
            <Text style={{ fontSize: 12, color: '#666', marginLeft: 8 }}>({product?.ratings?.count || 'Premium Quality'})</Text>
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
            <Text style={{ fontSize: 12, color: '#888', marginTop: 6, fontWeight: '500' }}>Inclusive of all taxes</Text>
          </View>

          <View style={{ height: 1, backgroundColor: '#eaeaea', marginVertical: 20 }} />

          {/* DESCRIPTION */}
          <View style={{ marginBottom: 24 }}>
            <Text style={styles.sectionHeader}>DESCRIPTION</Text>
            <Text style={{ fontSize: 14, color: "#555", lineHeight: 22 }}>
              {product?.description || "High-quality product. Perfect for everyday styling. Premium fabric and comfortable fit — a must-have in your collection."}
            </Text>
          </View>

          {/* VARIANTS: COLORS */}
          {product?.variants?.colors && product.variants.colors.length > 0 && (
            <View style={{ marginBottom: 30 }}>
              <Text style={styles.sectionHeader}>COLOR</Text>
              <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 8 }}>
                {product.variants.colors.map((color: string, index: number) => (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.variantBox,
                      selectedColor === color && styles.variantBoxSelected,
                      { paddingHorizontal: 24, paddingVertical: 14 }
                    ]}
                    onPress={() => setSelectedColor(color)}
                  >
                    <Text style={[styles.variantText, selectedColor === color && styles.variantTextSelected]}>
                      {color}
                    </Text>
                  </TouchableOpacity>
                ))}
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

        </View>

      </ScrollView>

      {/* FIXED BACK BUTTON */}
      <TouchableOpacity style={[styles.backButton, { zIndex: 10, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 3 }]} onPress={navigationBack}>
        <View style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgba(255,255,255,0.9)', alignItems: 'center', justifyContent: 'center' }}>
          <Ionicons name="arrow-back" size={22} color="#111" />
        </View>
      </TouchableOpacity>

      {/* BOTTOM BAR */}
      <View style={styles.themeBottomBar}>
        <TouchableOpacity 
          style={styles.favoriteBtn}
          onPress={() => executeProtected(() => {
            // Add favorite logic here
            console.log("Added to wishlist");
          })}
        >
          <Ionicons name="heart-outline" size={26} color="#444" />
        </TouchableOpacity>

        <TouchableOpacity
          style={{ flex: 1, marginLeft: 16 }}
          onPress={() => executeProtected(() => navigateToScreen(ScreenNameEnum.CheckoutScreen, { product }))}
        >
          <LinearGradient colors={color.buttLinearGradient} style={styles.themeBtnGradient}>
            <Ionicons name="cart-outline" size={22} color="#fff" style={{ marginRight: 8 }} />
            <Text style={styles.themeBtnText}>Add to Cart</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View >
  );
}

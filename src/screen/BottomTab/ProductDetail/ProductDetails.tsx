import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Animated,
  Modal,
  StatusBar,
  FlatList,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import LinearGradient from "react-native-linear-gradient";
import { useNavigation, useRoute } from "@react-navigation/native";
import { color, fonts, navigationBack } from "../../../constant";
import Loading from "../../../utils/Loader";
import { TopProductDetail } from "../../../Api/auth/ApiGetCategories";
import { AddToCartApi, GetCartApi } from "../../../Api/auth/cartService";
import { styles } from "./style";
import { useProtectedAction } from "../../../utils/useProtectedAction";
import { useDispatch, useSelector } from "react-redux";
import { toggleWishlist } from "../../../redux/feature/wishlistSlice";
import { setCart } from "../../../redux/feature/cartSlice";
import ProductCard from "../../../component/cart/ProductCard";
import ScreenNameEnum from "../../../routes/screenName.enum";
import { warningToast } from "../../../utils/customToast";

const { width, height } = Dimensions.get("window");

export default function ProductDetails() {
  const dispatch = useDispatch();
  const wishlist = useSelector((state: any) => state.wishlist.items);
  const cartCount = useSelector((state: any) => state.cart?.totalItems || 0);
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const routeParams = route.params || {};
  const routeItem = routeParams.item || routeParams.product;
  const productId =
    routeItem?._id ||
    routeItem?.id ||
    (typeof routeItem === "string" ? routeItem : null) ||
    routeParams?.id ||
    routeParams?.productId;

  const [activeImage, setActiveImage] = useState(0);
  const [product, setProduct] = useState<any>(
    routeItem && typeof routeItem === "object" ? routeItem : null
  );
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [fullScreenImage, setFullScreenImage] = useState<string | null>(null);
  const [descExpanded, setDescExpanded] = useState(false);
  const executeProtected = useProtectedAction();

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(40)).current;
  const imageScrollRef = useRef<ScrollView>(null);
  const mainScrollRef = useRef<ScrollView>(null);
  const sizeSectionY = useRef(0);

  const isFavorite = wishlist.some(
    (wishItem: any) =>
      (wishItem.id || wishItem._id) ===
      (product?._id || product?.id || productId)
  );

  const onToggleWishlist = () => {
    executeProtected(() => {
      if (product) dispatch(toggleWishlist(product));
    });
  };

  const fetchCart = async () => {
    try {
      const data = await GetCartApi();
      if (data) {
        const mappedItems = data.items.map((item: any) => ({
          id: item._id,
          title: item.product?.title || "Product",
          price: item.product?.pricing?.sellingPrice || 0,
          quantity: item.quantity,
          image: item.product?.images?.[0] || "",
        }));
        dispatch(
          setCart({
            items: mappedItems,
            totalItems: data.totalItems,
            totalPrice: data.totalPrice,
          })
        );
      }
    } catch (e) {
      console.log("Error fetching cart: ", e);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  useEffect(() => {
    if (productId) {
      setActiveImage(0);
      setSelectedSize(null);
      setSelectedColor(null);
      setDescExpanded(false);
      if (routeItem && typeof routeItem === "object") {
        setProduct(routeItem);
      } else {
        setProduct(null);
      }
      TopProductDetail(productId)
        .then((res) => {
          if (res) setProduct(res);
        })
        .catch((err) => console.log("API Error:", err));
    }
  }, [productId]);

  useEffect(() => {
    if (product) {
      const sizes = product?.variants?.sizes || [];
      const colors = product?.variants?.colors || [];
      if (sizes.length > 0 && !selectedSize) setSelectedSize(sizes[0]);
      if (colors.length > 0 && !selectedColor) setSelectedColor(colors[0]);

      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.spring(slideAnim, {
          toValue: 0,
          tension: 60,
          friction: 8,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [product]);

  // ─── Jump to image thumbnail ──────────────────────────────────────────────
  const scrollToImage = (index: number) => {
    setActiveImage(index);
    imageScrollRef.current?.scrollTo({ x: index * width, animated: true });
  };

  const getProductId = (item: any) => item?._id || item?.id || item?.productId;

  const relatedProductSource =
    routeParams.relatedProducts ||
    routeParams.products ||
    routeParams.section?.data?.products ||
    routeItem?.relatedProducts ||
    product?.relatedProducts ||
    product?.similarProducts ||
    product?.recommendedProducts ||
    [];

  const relatedProducts = Array.isArray(relatedProductSource)
    ? relatedProductSource.filter(
      (item: any) =>
        getProductId(item) !== (product?._id || product?.id || productId)
    )
    : [];

  const handleRelatedProductPress = (item: any) => {
    const nextProductId = getProductId(item);
    navigation.push(ScreenNameEnum.ProductDetails, {
      item,
      productId: nextProductId,
      gender: routeParams.gender,
      relatedProducts,
    });
  };

  const scrollToSizeSection = () => {
    mainScrollRef.current?.scrollTo({
      y: Math.max(sizeSectionY.current - 90, 0),
      animated: true,
    });
  };

  const handleAddToCart = () => {
    executeProtected(async () => {
      const sizes = product?.variants?.sizes || [];

      if (sizes.length > 0 && !selectedSize) {
        warningToast(
          "Please select a size",
          "Choose your size before adding this item to bag."
        );
        scrollToSizeSection();
        return;
      }

      const id = product?._id || product?.id || productId;
      if (id) {
        const res = await AddToCartApi(id);
        if (res) await fetchCart();
      }
    });
  };

  if (!product) {
    return (
      <View style={styles.loader}>
        <Loading />
      </View>
    );
  }

  // ─── Derived Data ──────────────────────────────────────────────────────────
  const displayName = product?.title || product?.name || "Product";
  const rawMrp = product?.pricing?.mrp || product?.mrp || product?.price || 0;
  const rawSellingPrice =
    product?.pricing?.sellingPrice ||
    product?.sellingPrice ||
    product?.discountPrice ||
    product?.price ||
    rawMrp ||
    0;
  const rawDiscount =
    product?.pricing?.discountPercentage || product?.discountPercentage || 0;
  const displayMrp = parseFloat(rawMrp);
  const displaySellingPrice = parseFloat(rawSellingPrice);
  const categoryName =
    product?.categoryId?.name || product?.category?.name || "Category";
  const discountPercent =
    rawDiscount > 0
      ? rawDiscount
      : displayMrp > 0
        ? Math.round(((displayMrp - displaySellingPrice) / displayMrp) * 100)
        : 0;

  let displayImages = product?.baseImages || product?.images || [];
  if (!displayImages.length) {
    const fallbackImage = routeItem?.image || routeItem?.images?.[0] || routeItem?.baseImages?.[0];
    if (fallbackImage) displayImages = [fallbackImage];
  }
  if (selectedColor && product?.variantImages?.length > 0) {
    const variant = product.variantImages.find(
      (v: any) => v.color === selectedColor
    );
    if (variant?.urls?.length > 0) displayImages = variant.urls;
  }

  const safeUrl = (url: string) =>
    typeof url === "string" ? url.replace(/\.avif$/i, ".webp") : url;

  const descriptionText =
    product?.description ||
    "High-quality product. Perfect for everyday styling. Premium fabric and comfortable fit — a must-have in your collection.";
  const shortDesc =
    descriptionText.length > 150
      ? descriptionText.slice(0, 150) + "..."
      : descriptionText;

  const stockQty = product?.inventory?.stockQuantity;
  const inStock = stockQty === undefined || stockQty > 0;
  const couponPrice =
    displaySellingPrice > 0 ? Math.max(0, Math.round(displaySellingPrice * 0.8)) : 0;

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />

      {/* ─── SCROLLABLE CONTENT ─────────────────────────────────────────── */}
      <Animated.ScrollView
        ref={mainScrollRef}
        showsVerticalScrollIndicator={false}
        style={{ flex: 1, opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}
        contentContainerStyle={{ paddingBottom: 112 }}
      >
        {/* IMAGE SLIDER */}
        <View style={styles.imageWrapper}>
          <ScrollView
            ref={imageScrollRef}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={(e) =>
              setActiveImage(
                Math.round(e.nativeEvent.contentOffset.x / width)
              )
            }
            scrollEventThrottle={16}
          >
            {displayImages.map((img: string, index: number) => (
              <TouchableOpacity
                key={index}
                activeOpacity={0.95}
                onPress={() => setFullScreenImage(safeUrl(img))}
              >
                <Image source={{ uri: safeUrl(img) }} style={styles.mainImage} />
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* DISCOUNT BADGE */}
          {discountPercent > 0 && (
            <View style={styles.discountBadge}>
              <Text style={styles.discountBadgeText}>{discountPercent}% OFF</Text>
            </View>
          )}

          {/* DOT INDICATORS */}
          <View style={styles.indicatorRow}>
            {displayImages.map((_: any, i: number) => (
              <View
                key={i}
                style={[styles.dot, activeImage === i && styles.activeDot]}
              />
            ))}
          </View>
        </View>

        {/* ── MAIN INFO CARD ─────────────────────────────────────────────── */}
        <View style={styles.infoCard}>
          <Text style={styles.productTitle}>{displayName}</Text>

          <View style={styles.priceRow}>
            <Text style={styles.sellingPrice}>
              ₹{displaySellingPrice.toLocaleString()}
            </Text>
            {displayMrp > displaySellingPrice && (
              <>
                <Text style={styles.mrp}>
                  MRP ₹{displayMrp.toLocaleString()}
                </Text>
                <View style={styles.offChip}>
                  <Text style={styles.offChipText}>{discountPercent}%OFF</Text>
                </View>
              </>
            )}
          </View>

          <Text style={styles.taxNote}>Inclusive of all taxes</Text>

          {couponPrice > 0 && (
            <View style={styles.couponStrip}>
              <View style={styles.couponIcon}>
                <Ionicons name="pricetag" size={15} color={color.primary} />
              </View>
              <Text style={styles.couponText}>
                Get it for <Text style={styles.couponPrice}>₹{couponPrice.toLocaleString()}</Text>
              </Text>
              <View style={styles.couponBadge}>
                <Text style={styles.couponBadgeTop}>COUPON</Text>
                <Text style={styles.couponBadgeMain}>20%</Text>
                <Text style={styles.couponBadgeBottom}>OFF</Text>
              </View>
            </View>
          )}

          {/* Stock */}
          {stockQty !== undefined && (
            <Text
              style={[
                styles.stockTag,
                { color: inStock ? color.success : color.error },
              ]}
            >
              {inStock ? `✓  In Stock  (${stockQty} left)` : "✕  Out of Stock"}
            </Text>
          )}
        </View>

        {/* ── OFFERS ─────────────────────────────────────────────────────── */}

        {/* ── DELIVERY SECTION ───────────────────────────────────────────── */}


        {/* ── COLOR VARIANTS ─────────────────────────────────────────────── */}
        {product?.variants?.colors && product.variants.colors.length > 0 && (
          <View style={styles.variantCard}>
            <Text style={styles.sectionHeader}>
              COLOR : <Text style={styles.selectedVariantText}>{selectedColor}</Text>
            </Text>
            <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
              {product.variants.colors.map((c: string, index: number) => {
                const variant = product.variantImages?.find(
                  (v: any) => v.color === c
                );
                const isSelected = selectedColor === c;
                return (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.colorBox,
                      isSelected && styles.colorBoxSelected,
                    ]}
                    onPress={() => {
                      setSelectedColor(c);
                      setActiveImage(0);
                    }}
                  >
                    {variant?.urls?.length > 0 ? (
                      <Image
                        source={{ uri: safeUrl(variant.urls[0]) }}
                        style={{ width: 54, height: 54, borderRadius: 6 }}
                      />
                    ) : (
                      <View style={styles.colorLabel}>
                        <Text
                          style={[
                            styles.variantText,
                            isSelected && styles.variantTextSelected,
                          ]}
                        >
                          {c}
                        </Text>
                      </View>
                    )}
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        )}

        {/* ── SIZE VARIANTS ──────────────────────────────────────────────── */}
        {product?.variants?.sizes && product.variants.sizes.length > 0 && (
          <View
            style={[styles.variantCard, { marginTop: 0 }]}
            onLayout={(event) => {
              sizeSectionY.current = event.nativeEvent.layout.y;
            }}
          >
            <View style={styles.sizeRow}>
              <Text style={styles.sectionHeader}>
                Size : <Text style={styles.selectedVariantText}>{selectedSize || "Select size"}</Text>
              </Text>
              <TouchableOpacity>
                <Text style={styles.sizeGuide}>Size Guide</Text>
              </TouchableOpacity>
            </View>
            <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
              {product.variants.sizes.map((size: string, index: number) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.variantBox,
                    selectedSize === size && styles.variantBoxSelected,
                  ]}
                  onPress={() => setSelectedSize(size)}
                >
                  <Text
                    style={[
                      styles.variantText,
                      selectedSize === size && styles.variantTextSelected,
                    ]}
                  >
                    {size}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        <View style={styles.descCard}>
          <Text style={styles.sectionHeader}>Description</Text>
          <Text style={styles.descText}>
            {descExpanded ? descriptionText : shortDesc}
          </Text>
          {descriptionText.length > 150 && (
            <TouchableOpacity onPress={() => setDescExpanded(!descExpanded)}>
              <Text style={styles.readMore}>
                {descExpanded ? "Read Less ▲" : "Read More ▼"}
              </Text>
            </TouchableOpacity>
          )}
        </View>


        {relatedProducts.length > 0 && (
          <View style={styles.relatedSection}>
            <Text style={styles.relatedTitle}>You may also like</Text>
            <FlatList
              data={relatedProducts}
              numColumns={2}
              scrollEnabled={false}
              columnWrapperStyle={styles.relatedRow}
              renderItem={({ item }) => (
                <ProductCard
                  item={item}
                  onPress1={() => handleRelatedProductPress(item)}
                />
              )}
              keyExtractor={(item, productIndex) =>
                String(item?._id || item?.id || item?.productId || productIndex)
              }
            />
          </View>
        )}
        {/* ── DESCRIPTION ────────────────────────────────────────────────── */}


      </Animated.ScrollView>

      {/* ─── BACK BUTTON (ABSOLUTE) ─────────────────────────────────────── */}
      <View style={styles.headerAbsolute} pointerEvents="box-none">
        <TouchableOpacity style={styles.backButton} onPress={navigationBack}>
          <Ionicons name="arrow-back" size={20} color="#1A1A2E" />
        </TouchableOpacity>
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.headerActionBtn}>
            <Ionicons name="share-social-outline" size={20} color="#1A1A2E" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.headerActionBtn}
            onPress={onToggleWishlist}
          >
            <Ionicons
              name={isFavorite ? "heart" : "heart-outline"}
              size={20}
              color={isFavorite ? color.error : "#1A1A2E"}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.headerActionBtn}
            onPress={() => navigation.navigate(ScreenNameEnum.ViewCartScreen)}
            activeOpacity={0.85}
          >
            <Ionicons name="bag-outline" size={20} color="#1A1A2E" />
            {cartCount > 0 && (
              <View style={styles.headerCartBadge}>
                <Text style={styles.headerCartBadgeText}>{cartCount > 9 ? "9+" : cartCount}</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

      </View>
      <View style={styles.bottomBar}>
        <TouchableOpacity
          style={styles.bottomIconBtn}
          activeOpacity={0.82}
          onPress={onToggleWishlist}
        >
          <Ionicons
            name={isFavorite ? "heart" : "heart-outline"}
            size={30}
            color={isFavorite ? color.error : "#111"}
          />
        </TouchableOpacity>

        {/* <TouchableOpacity style={styles.bottomIconBtn} activeOpacity={0.82}>
          <Ionicons name="chatbubble-outline" size={28} color="#111" />
        </TouchableOpacity> */}

        <TouchableOpacity
          style={styles.addToCartBtn}
          activeOpacity={0.85}
          onPress={handleAddToCart}
        >
          <LinearGradient
            colors={color.primaryGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.cartGradient}
          >
            <Text style={styles.cartBtnText}>Add to Bag</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>

      {/* ─── FULL SCREEN IMAGE MODAL ─────────────────────────────────────── */}
      <Modal
        visible={!!fullScreenImage}
        transparent
        animationType="fade"
        onRequestClose={() => setFullScreenImage(null)}
      >
        <View style={styles.modalOverlay}>
          <TouchableOpacity
            style={styles.modalCloseBtn}
            onPress={() => setFullScreenImage(null)}
          >
            <Ionicons name="close" size={22} color="#fff" />
          </TouchableOpacity>
          <ScrollView
            maximumZoomScale={4}
            minimumZoomScale={1}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              flexGrow: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {fullScreenImage && (
              <Image
                source={{ uri: safeUrl(fullScreenImage) }}
                style={{ width, height: height * 0.85, resizeMode: "contain" }}
              />
            )}
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
}

import React from "react";
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Dimensions,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import Animated, {
  FadeIn,
  useAnimatedStyle,
  useSharedValue,
  withSpring
} from "react-native-reanimated";
import { color } from "../../constant";
import CustomButton from "../CustomButton";

const { width } = Dimensions.get("window");
const CARD_WIDTH = width / 2 - 12;

export default function ProductCard({
  onPress1,
  item,
  onPress,
  title,
  buttShow,
  disabled,
}: any) {
  // Robust data mapping for different API responses
  const brandName = item?.brand?.name || "";
  const titleText = item?.title || item?.name || "Product";
  const displayMrp = item?.pricing?.mrp || item?.mrp || item?.price || 0;
  const displaySellingPrice = item?.pricing?.sellingPrice || item?.sellingPrice || item?.discountPrice || 0;
  const rawImage = item?.images?.[0] || item?.baseImages?.[0] || 'https://via.placeholder.com/150';
  const productImage = typeof rawImage === 'string' ? rawImage.replace(/\.avif$/i, '.webp') : rawImage;

  const discountPercent = displayMrp > displaySellingPrice
    ? Math.round(((displayMrp - displaySellingPrice) / displayMrp) * 100)
    : item?.pricing?.discountPercentage || item?.discountPercentage || 0;

  const rating = item?.ratings?.average || 0.0;
  const ratingCount = item?.ratings?.count || 0.0;

  // Animation values
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = () => {
    scale.value = withSpring(0.97);
  };

  const handlePressOut = () => {
    scale.value = withSpring(1);
  };

  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={onPress1}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={styles.cardContainer}
    >
      <Animated.View entering={FadeIn.duration(500)} style={[styles.card, animatedStyle]}>
        {/* IMAGE SECTION */}
        <View style={styles.imageContainer}>
          <ImageBackground
            source={{ uri: productImage }}
            style={styles.image}
            imageStyle={styles.imageRadius}
            resizeMode="cover"
          >


            {/* Rating Badge Overlay */}
            <View style={styles.ratingBadge}>
              <Text style={styles.ratingText}>{rating}</Text>
              <Ionicons name="star" size={10} color="#1A9C4A" style={{ marginLeft: 2 }} />
              <View style={styles.ratingDivider} />
              <Text style={styles.ratingCountText}>{ratingCount}</Text>
            </View>
          </ImageBackground>
        </View>

        {/* CONTENT SECTION */}
        <View style={styles.content}>

          <Text numberOfLines={1} style={styles.title}>
            {titleText}
          </Text>

          <View style={styles.priceRow}>
            <Text style={styles.sellingPrice}>₹{displaySellingPrice}</Text>
            {displayMrp > displaySellingPrice && (
              <>
                <Text style={styles.mrp}>₹{displayMrp}</Text>
                <Text style={styles.discount}>({discountPercent}% OFF)</Text>
              </>
            )}
          </View>
        </View>

        {/* OPTIONAL ACTION BUTTON */}
        {buttShow && (
          <View style={styles.buttonWrap}>
            <CustomButton
              title={title}
              onPress={onPress}
              disabled={disabled}
            />
          </View>
        )}
      </Animated.View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    width: CARD_WIDTH,
    marginBottom: 10,
  },
  card: {
    backgroundColor: color.white,
    borderRadius: 8,
    overflow: 'hidden',
    borderWidth: 0.5,
    borderColor: '#eee',
  },
  imageContainer: {
    width: "100%",
    aspectRatio: 1, // Changed to square for reduced height
    backgroundColor: "#f9f9f9",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  imageRadius: {
    // No radius here as it's handled by card overflow
  },
  wishlistBtn: {
    position: 'absolute',
    top: 6,
    right: 6,
    backgroundColor: 'rgba(255,255,255,0.8)',
    width: 26,
    height: 26,
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ratingBadge: {
    position: 'absolute',
    bottom: 6,
    left: 6,
    backgroundColor: 'rgba(255,255,255,0.9)',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 4,
    paddingVertical: 1,
    borderRadius: 3,
  },
  ratingText: {
    fontSize: 9,
    fontWeight: 'bold',
    color: '#333',
  },
  ratingDivider: {
    width: 1,
    height: 8,
    backgroundColor: '#ccc',
    marginHorizontal: 3,
  },
  ratingCountText: {
    fontSize: 9,
    color: '#666',
  },
  content: {
    padding: 8,
  },
  brand: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#222",
  },
  title: {
    fontSize: 10,
    color: "#777",
    marginTop: 1,
  },
  priceRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
    flexWrap: 'wrap',
  },
  sellingPrice: {
    fontSize: 13,
    fontWeight: "bold",
    color: "#222",
  },
  mrp: {
    fontSize: 10,
    color: "#888",
    textDecorationLine: "line-through",
    marginLeft: 4,
  },
  discount: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#FF7A00",
    marginLeft: 4,
  },
  buttonWrap: {
    paddingHorizontal: 8,
    paddingBottom: 8,
  },
});

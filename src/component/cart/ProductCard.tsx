import React from "react";
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
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
const CARD_WIDTH = width / 2 - 20;

export default function ProductCard({
  onPress1,
  item,
  onPress,
  title,
  buttShow,
  disabled,
}: any) {
  // Robust data mapping for different API responses
  const titleText = item?.title || item?.name || "Product";
  const displayMrp = item?.pricing?.mrp || item?.mrp || item?.price || 0;
  const displaySellingPrice = item?.pricing?.sellingPrice || item?.sellingPrice || item?.discountPrice || item?.price || displayMrp;
  const rawImage = item?.images?.[0] || item?.baseImages?.[0] || 'https://via.placeholder.com/150';
  const productImage = typeof rawImage === 'string' ? rawImage.replace(/\.avif$/i, '.webp') : rawImage;
  const swatches = item?.colors?.filter(Boolean) || [];

  const discountPercent = displayMrp > displaySellingPrice
    ? Math.round(((displayMrp - displaySellingPrice) / displayMrp) * 100)
    : item?.pricing?.discountPercentage || item?.discountPercentage || 0;

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
            {!!discountPercent && (
              <View style={styles.discountBadge}>
                <Text style={styles.discountBadgeText}>{discountPercent}%OFF</Text>
              </View>
            )}

            <View style={styles.wishlistBtn}>
              <Ionicons name="heart-outline" size={23} color="black" />
            </View>
          </ImageBackground>
        </View>

        {/* CONTENT SECTION */}
        <View style={styles.content}>
          <View style={styles.deliveryRow}>
            <Ionicons name="flash" size={11} color="#1A1A1A" />
            <Text style={styles.deliveryText}>Fast delivery</Text>
          </View>

          <Text numberOfLines={1} style={styles.title}>
            {titleText}
          </Text>

          <View style={styles.priceRow}>
            <Text style={styles.sellingPrice}>₹{displaySellingPrice}</Text>
            {displayMrp > displaySellingPrice && (
              <Text style={styles.mrp}>₹{displayMrp}</Text>
            )}
          </View>

          {swatches.length > 0 && (
            <View style={styles.swatchRow}>
              {swatches.slice(0, 3).map((swatch: any, index: number) => (
                <View
                  key={`${swatch}-${index}`}
                  style={[
                    styles.swatch,
                    { backgroundColor: typeof swatch === "string" ? swatch : swatch?.hex || swatch?.code || color.lightGray },
                  ]}
                />
              ))}
            </View>
          )}
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
    marginBottom: 12,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ECECEC',

    // Android Shadow
    elevation: 5,

    // iOS Shadow
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 4,

    // Android shadow ko cut hone se bachane ke liye
    overflow: 'visible',

  },
  imageContainer: {
    width: "100%",
    aspectRatio: 0.86,
    backgroundColor: "#F4F4F4",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  imageRadius: {
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
  },
  discountBadge: {
    position: 'absolute',
    top: 6,
    left: 6,
    backgroundColor: color.primary,
    paddingHorizontal: 5,
    paddingVertical: 3,
    borderRadius: 2,
  },
  discountBadgeText: {
    color: color.white,
    fontSize: 9,
    fontWeight: '800',
  },
  wishlistBtn: {
    position: 'absolute',
    bottom: 7,
    right: 6,
    backgroundColor: color.white,
    width: 38,
    height: 38,
    borderRadius: 44,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
    shadowColor: color.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.14,
    shadowRadius: 2,
  },
  content: {
    paddingHorizontal: 8,
    paddingTop: 5,
    paddingBottom: 8,
  },
  deliveryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  deliveryText: {
    fontSize: 11,
    color: '#1F1F1F',
    fontWeight: '700',
    marginLeft: 2,
  },
  title: {
    fontSize: 12,
    color: "#555",
    lineHeight: 16,
  },
  priceRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 3,
    flexWrap: 'wrap',
  },
  sellingPrice: {
    fontSize: 13,
    fontWeight: "800",
    color: "#F15A24",
  },
  mrp: {
    fontSize: 11,
    color: "#888",
    textDecorationLine: "line-through",
    marginLeft: 4,
  },
  swatchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 7,
  },
  swatch: {
    width: 9,
    height: 9,
    borderRadius: 2,
    marginRight: 5,
    borderWidth: 0.5,
    borderColor: '#D8D8D8',
  },
  buttonWrap: {
    paddingHorizontal: 8,
    paddingBottom: 8,
  },
});

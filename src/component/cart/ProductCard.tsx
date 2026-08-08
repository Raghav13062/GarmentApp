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
  withSpring,
} from "react-native-reanimated";
import { color, fonts, radius, spacing } from "../../constant";
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
  const titleText = item?.title || item?.name || "";
  const subtitle =
    item?.subtitle ||
    item?.fabric ||
    item?.categoryName ||
    item?.productType ||
    item?.description ||
    "";
  const badgeLabel =
    item?.badge ||
    item?.tag ||
    item?.fabricType ||
    (item?.isOrganic ? "ORGANIC" : "") ||
    (item?.material ? String(item.material).toUpperCase() : "");

  const displayMrp = item?.pricing?.mrp || item?.mrp || item?.price || 0;
  const displaySellingPrice =
    item?.pricing?.sellingPrice ||
    item?.sellingPrice ||
    item?.discountPrice ||
    item?.price ||
    displayMrp;
  const rawImage = item?.images?.[0] || item?.baseImages?.[0] || "";
  const productImage =
    typeof rawImage === "string"
      ? rawImage.replace(/\.avif$/i, ".webp")
      : rawImage;
  const swatches = item?.colors?.filter(Boolean) || [];

  const discountPercent =
    displayMrp > displaySellingPrice
      ? Math.round(((displayMrp - displaySellingPrice) / displayMrp) * 100)
      : item?.pricing?.discountPercentage || item?.discountPercentage || 0;

  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={onPress1}
      onPressIn={() => {
        scale.value = withSpring(0.97);
      }}
      onPressOut={() => {
        scale.value = withSpring(1);
      }}
      style={styles.cardContainer}
    >
      <Animated.View
        entering={FadeIn.duration(500)}
        style={[styles.card, animatedStyle]}
      >
        <View style={styles.imageContainer}>
          <ImageBackground
            // source={{ uri: productImage }}
                        source={{ uri: "https://swtantra.com/cdn/shop/files/Celebrity_closet_67.png?v=1739881952&width=2048" }}

            style={styles.image}
            imageStyle={styles.imageRadius}
            resizeMode="cover"
          >
            {(!!badgeLabel || !!discountPercent) && (
              <View
                style={[
                  styles.badge,
                  discountPercent && !badgeLabel
                    ? styles.discountBadge
                    : styles.tagBadge,
                ]}
              >
                <Text style={styles.badgeText} numberOfLines={1}>
                  {badgeLabel || `${discountPercent}% OFF`}
                </Text>
              </View>
            )}

            <TouchableOpacity style={styles.wishlistBtn} activeOpacity={0.8}>
              <Ionicons name="heart-outline" size={18} color={color.textDark} />
            </TouchableOpacity>
          </ImageBackground>
        </View>

        <View style={styles.content}>
          <Text style={styles.title} numberOfLines={1}>
            {titleText}
          </Text>
          {!!subtitle && (
            <Text style={styles.subtitle} numberOfLines={1}>
              {typeof subtitle === "string" ? subtitle : ""}
            </Text>
          )}

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
                    {
                      backgroundColor:
                        typeof swatch === "string"
                          ? swatch
                          : swatch?.hex || swatch?.code || color.lightGray,
                    },
                  ]}
                />
              ))}
            </View>
          )}
        </View>

        {buttShow && (
          <View style={styles.buttonWrap}>
            <CustomButton
              title={title}
              onPress={onPress}
              disabled={disabled}
              height={40}
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
    marginBottom: spacing.md,
  },
  card: {
    backgroundColor: color.card,
    borderRadius: radius.lg,
    overflow: "hidden",
  },
  imageContainer: {
    width: "100%",
    aspectRatio: 0.75,
    backgroundColor: color.lightGray,
    borderRadius: radius.lg,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  imageRadius: {
    borderRadius: radius.lg,
  },
  badge: {
    position: "absolute",
    top: spacing.sm,
    left: spacing.sm,
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: 3,
    maxWidth: "70%",
  },
  tagBadge: {
    backgroundColor: color.badgeTeal,
  },
  discountBadge: {
    backgroundColor: color.accent,
  },
  badgeText: {
    color: color.white,
    fontSize: 8,
    fontFamily: fonts.bold,
    letterSpacing: 0.4,
  },
  wishlistBtn: {
    position: "absolute",
    top: spacing.sm,
    right: spacing.sm,
    backgroundColor: color.whiteAlpha94,
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    paddingTop: spacing.sm + 2,
    paddingBottom: spacing.xs,
  },
  title: {
    fontSize: 13,
    color: color.textDark,
    fontFamily: fonts.semiBold,
  },
  subtitle: {
    fontSize: 11,
    color: color.textMedium,
    fontFamily: fonts.regular,
    marginTop: 2,
  },
  priceRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6,
    flexWrap: "wrap",
  },
  sellingPrice: {
    fontSize: 14,
    fontFamily: fonts.bold,
    color: color.primary,
  },
  mrp: {
    fontSize: 11,
    color: color.textLight,
    textDecorationLine: "line-through",
    marginLeft: 6,
    fontFamily: fonts.regular,
  },
  swatchRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 7,
  },
  swatch: {
    width: 9,
    height: 9,
    borderRadius: 2,
    marginRight: 5,
    borderWidth: 0.5,
    borderColor: color.borderLight,
  },
  buttonWrap: {
    paddingTop: spacing.sm,
  },
});

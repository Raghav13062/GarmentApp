import { color } from "../../constant";
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
import CustomButton from "../CustomButton";

const { width } = Dimensions.get("window");
const CARD_WIDTH = width / 2 - 13;

export default function ProductCard({
  onPress1,
  item,
  onPress,
  title,
  buttShow,
  disabled,
}) {
  // Robust data mapping for different API responses
  const titleText = item?.title || item?.name || "Product";
  const displayMrp = item?.pricing?.mrp || item?.mrp || item?.price || 0;
  const displaySellingPrice = item?.pricing?.sellingPrice || item?.sellingPrice || item?.discountPrice || 0;
  const rawImage = item?.images?.[0] || item?.baseImages?.[0] || 'https://via.placeholder.com/150';
  const productImage = typeof rawImage === 'string' ? rawImage.replace(/\.avif$/i, '.webp') : rawImage;
  const discountPercent = displayMrp > 0
    ? Math.round(((displayMrp - displaySellingPrice) / displayMrp) * 100)
    : item?.pricing?.discountPercentage || item?.discountPercentage || 0;

  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={onPress1}
      style={styles.cardContainer}
    >
      <View style={styles.card}>
        {/* IMAGE */}
        <ImageBackground
          source={{ uri: productImage }}
          style={styles.image}
          imageStyle={styles.imageRadius}
          resizeMode="stretch"
        />

        {/* TITLE */}
        <Text numberOfLines={1} style={styles.title}>
          {titleText}
        </Text>

        {/* PRICE */}
        <View style={styles.priceRow}>
          <Text style={styles.price}>₹{displaySellingPrice}</Text>
          {displayMrp > displaySellingPrice && (
            <Text style={styles.oldPrice}>₹{displayMrp}</Text>
          )}
        </View>

        {discountPercent > 0 && (
          <Text style={[styles.off, { marginLeft: 11, marginTop: 2 }]}>
            {discountPercent}% OFF
          </Text>
        )}


        {/* BUTTON */}
        {buttShow && (
          <View style={{
            marginHorizontal: 14,
            marginTop: 10,
            marginBottom: 10
          }}>
            <CustomButton
              title={title}
              onPress={onPress}
              disabled={disabled}

            />
          </View>

        )}
      </View>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  cardContainer: {
    width: CARD_WIDTH,
    marginBottom: 16,
  },

  card: {
    backgroundColor: color.white,
    borderRadius: 14,
    paddingBottom: 10,
    ...Platform.select({
      ios: {
        shadowColor: color.black,
        shadowOpacity: 0.12,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 3 },
      },
      android: {
        elevation: 4,
      },
    }),
  },

  image: {
    width: "100%",
    aspectRatio: 0.75, // 🔥 responsive image height
    backgroundColor: "#f2f2f2",
  },

  imageRadius: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },

  ratingChip: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingTop: 6,
  },

  ratingText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#0a8a2a",
  },

  ratingCount: {
    fontSize: 11,
    color: "#555",
    marginLeft: 4,
  },

  title: {
    fontSize: 13,
    fontWeight: "600",
    color: "#222",
    paddingHorizontal: 10,
    marginTop: 4,
  },

  priceRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    marginTop: 6,
    gap: 6,
  },

  price: {
    fontSize: 16,
    fontWeight: "900",
    color: "#1A9C4A",
  },

  oldPrice: {
    fontSize: 12,
    color: "#777",
    textDecorationLine: "line-through",
    flexWrap: "wrap",

  },

  off: {
    fontSize: 12,
    fontWeight: "700",
    color: "#FF7A00",
    flexShrink: 1,      // ⭐ text cut nahi hoga
    flexWrap: "wrap",
  },

  buttonWrap: {
    marginTop: 10,
  },
});

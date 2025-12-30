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
import { fonts } from "../../constant";

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
  const original = item.originalPrice || Math.round(item.price * 1.5);
  const discount = Math.round((1 - item.price / original) * 100);

  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={onPress1}
      style={styles.cardContainer}
    >
      <View style={styles.card}>
        {/* IMAGE */}
        <ImageBackground
          source={{ uri: item.image }}
          style={styles.image}
          imageStyle={styles.imageRadius}
          resizeMode="cover"
        />

        {/* RATING */}
        <View style={styles.ratingChip}>
          <Text style={styles.ratingText}>⭐ {item.rating || 4}</Text>
          <Text style={styles.ratingCount}>
            ({item.reviews || 23})
          </Text>
        </View>

        {/* TITLE */}
        <Text numberOfLines={1} style={styles.title}>
          {item.title || "Mock Collar Striped Pullover"}
        </Text>

        {/* PRICE */}
        <View style={styles.priceRow}>
          <Text style={styles.price}>₹{item.price}</Text>
          <Text style={styles.oldPrice}>₹{original}</Text>
        </View>
          <Text style={[styles.off,{
            marginLeft:11,marginTop:2
           }]}>{discount}% OFF</Text>

        {/* BUTTON */}
        {buttShow && (
          <View style={{
            marginHorizontal:14,
            marginTop:10,
            marginBottom:10
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
    backgroundColor: "#fff",
    borderRadius: 14,
    paddingBottom: 10,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
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
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
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

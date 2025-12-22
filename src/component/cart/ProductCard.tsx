import React from "react";
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { hp } from "../../utils/Constant";
import CustomButton from "../CustomButton";
import { fonts } from "../../constant";

export default function ProductCard({onPress1, item, onPress ,title,buttShow,disabled}) {
  const original = item.originalPrice || item.price * 1.5;
  const discount = Math.round((1 - item.price / original) * 100);

  return (
    <TouchableOpacity
      onPress={onPress1}
      activeOpacity={0.8}
      style={styles.cardContainer}
    
    >
      <View style={styles.card}>

        {/* IMAGE */}
        <View style={styles.imageWrap}>
          <ImageBackground
            source={{ uri: item.image }}
            style={styles.image}
            resizeMode="stretch"
          />

          {/* RATING CHIP */}
          <View style={styles.ratingChip}>
            <Text style={styles.ratingText}>⭐ {item.rating || 4}</Text>
            <Text style={[styles.ratingCount,]}>({item.reviews || 23})</Text>
          </View>
              <Text numberOfLines={1} style={styles.title}>
          {item.title || "Mock Collar Striped Pullover"}
        </Text>
          {/* PRICE ROW */}
        <View style={styles.priceRow}>
          <Text style={styles.price}>₹{item.price}</Text>
          <Text style={styles.oldPrice}>₹{original}</Text>
          <Text style={[styles.off,{flex:1}]}>{discount}% OFF</Text>
        </View>

        {/* BRAND */}
         </View>

        {/* TITLE */}
    {
      buttShow  && (
        <View style={{
          marginTop:10,
          marginBottom:5
        }}> 
        <CustomButton 
title ={title} 
 onPress={onPress}
 textStyle={{
     fontSize: 13.2,
     fontFamily: fonts.semiBold,
     textAlign:"center"
 }}
 gradient={
  {
    height:38 ,

   }
 }
        disabled={disabled}
/>
</View>
      )
      
    }

      
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    width: "48%",
    marginBottom: 18,
  },

  card: {
     borderRadius: 12,
    overflow: "hidden",
      shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },

  imageWrap: {
    width: "100%",
    height: 260, // bigger image
   },

  image: {
   width: "100%",
  height: 180,          // fixed height — image clean dikhegi
  borderRadius: 16,
  resizeMode: "cover",  // image stretch nahi hoga
  overflow: "hidden",
  backgroundColor: "#f2f2f2",
   borderColor: "#e5e5e5",
  },

  ratingChip: {
    
    flexDirection: "row",
     paddingHorizontal: 8,
    paddingVertical: 4,
 
    alignItems: "center",
  
  },

  ratingText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#0a8a2a",
  },

  ratingCount: {
    fontSize: 11,
    color: "#444",
    marginLeft: 3,
  },

  title: {
    fontSize: 13,
    color: "#222",
    paddingHorizontal: 10,
     fontWeight: "600",
  },

  priceRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    marginTop: 6,
    gap: 6,
  },

  price: {
    fontSize: 17,
    fontWeight: "900",
    color: "#1A9C4A",
  },

  oldPrice: {
    fontSize: 12,
    color: "#777",
    textDecorationLine: "line-through",
  },

  off: {
    fontSize: 12,
    color: "#FF7A00",
    fontWeight: "700",
  },

  brand: {
    paddingHorizontal: 10,
    paddingVertical: 8,
    fontSize: 12,
    color: "#555",
  },
});

import React from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import ScreenNameEnum from "../../../routes/screenName.enum";
import { useNavigation } from "@react-navigation/native";

const { width } = Dimensions.get("window");
const cardSize = width * 0.22; // slightly smaller for better spacing
export default function TopBrands({ brands , onBrandPress }:any) {
  const navigation = useNavigation()
  return (
    <View style={styles.container}>
       <FlatList
        data={brands}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingLeft: 16, paddingRight: 8 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.card}
              onPress={() => {
        navigation.navigate(ScreenNameEnum.OtherCategoryData, { 
          categoryId: item.id,
          categoryName: item.title 
        });
      }}
            // onPress={() => onBrandPress && onBrandPress(item)}
          >
            <Image source={{ uri: item.image }} style={styles.brandImage} 
            resizeMode="stretch"
            />
            <Text numberOfLines={1} style={styles.brandName}>
              {item.name}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    marginLeft: 16,
    marginBottom: 10,
    color: "#111",
  },
  card: {
    width: cardSize,
    marginRight: 16,
    alignItems: "center",
  },
  brandImage: {
    width: cardSize,
    height: cardSize,
    borderRadius: cardSize / 2, // makes it circular
    borderWidth: 1,
    borderColor: "#e0e0e0",
    marginBottom: 8,
   },
  brandName: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    textAlign: "center",
    width: cardSize + 10,
    marginBottom:5,
    marginTop:2
    
  },
});

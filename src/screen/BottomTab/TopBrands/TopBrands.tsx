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

const sampleBrands = [
  {
    id: '1',
    name: 'Adidas',
    image:
      'https://shirtsvskins.ie/cdn/shop/collections/adidas.png?v=1747832563',
  },
  {
    id: '2',
    name: 'Nike',
    image:
      'https://www.citypng.com/public/uploads/preview/black-nike-logo-transparent-background-701751694777156f3ewilq1js.png',
  },
  {
    id: '3',
    name: 'Puma',
    image:
      'https://i.pinimg.com/564x/ef/1c/1b/ef1c1b08d8c2236f55ad0001e22f879d.jpg',
  },
 
  {
    id: '4',
    name: 'H&M',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQX3DQwfDD6XEW21_Yl5ajzjfbGkR6nusbrSg&s',
  },
  {
    id: '5',
    name: 'Levi’s',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5DbwRNK--PWWMFbXV8c9fF0jqQluJMm91Lg&s',
  },
];

export default function TopBrands({ brands = sampleBrands, onBrandPress }) {
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
            <Image source={{ uri: item.image }} style={styles.brandImage} />
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
    marginTop: 16,
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
  },
});

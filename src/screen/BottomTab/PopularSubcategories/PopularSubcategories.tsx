import { color, fonts, radius, spacing } from "../../../constant";
import { useNavigation } from "@react-navigation/native";
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

const { width } = Dimensions.get("window");

const popularSubcategories = [
  {
    id: "1",
    name: "Sari",
    image:
      "https://e7.pngegg.com/pngimages/48/415/png-clipart-choli-lehenga-style-saree-dress-clothing-bridal-lehenga-and-sarees-fashion-formal-wear-thumbnail.png",
  },
  {
    id: "2",
    name: "Sari",
    image:
      "https://e7.pngegg.com/pngimages/816/835/png-clipart-sari-ikat-silk-sambalpuri-saree-clothing-silk-saree-blue-fashion-thumbnail.png",
  },
  {
    id: "3",
    name: "Sari",
    image:
      "https://e7.pngegg.com/pngimages/877/438/png-clipart-woman-wearing-orange-and-red-scarf-paithani-wedding-sari-silk-clothing-saree-holidays-textile-thumbnail.png",
  },
  {
    id: "5",
    name: "Sari",
    image:
      "https://e7.pngegg.com/pngimages/200/893/png-clipart-sari-mangalagiri-sarees-and-fabrics-uppada-gadwal-handloom-blue-textile-thumbnail.png",
  },
];

export default function PopularSubcategories() {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <FlatList
        data={popularSubcategories}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => {
              navigation.navigate(ScreenNameEnum.OtherCategoryData);
            }}
          >
            <Image
              source={{ uri: item.image }}
              style={styles.image}
              resizeMode="contain"
            />
            <Text style={styles.name}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const cardWidth = width * 0.32;

const styles = StyleSheet.create({
  container: {
    marginVertical: spacing.md,
  },
  title: {
    fontSize: 18,
    fontFamily: fonts.bold,
    color: color.primary,
    marginLeft: spacing.lg,
    marginBottom: spacing.sm,
  },
  card: {
    width: cardWidth,
    marginLeft: spacing.lg,
    alignItems: "center",
    backgroundColor: color.card,
    borderRadius: radius.lg,
    paddingVertical: spacing.sm,
    borderWidth: 1,
    borderColor: color.borderLight,
    marginBottom: spacing.xl,
  },
  image: {
    width: cardWidth * 0.9,
    height: cardWidth * 0.9,
    borderRadius: radius.lg,
    marginBottom: spacing.xs,
  },
  name: {
    fontSize: 14,
    fontFamily: fonts.medium,
    color: color.textDark,
    textAlign: "center",
  },
});

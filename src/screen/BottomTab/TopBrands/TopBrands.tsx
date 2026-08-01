import { color, fonts, spacing } from "../../../constant";
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
const cardSize = width * 0.22;

export default function TopBrands({ brands }: any) {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <FlatList
        data={brands}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{
          paddingLeft: spacing.lg,
          paddingRight: spacing.sm,
        }}
        renderItem={({ item }) => (
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.card}
            onPress={() => {
              navigation.navigate(ScreenNameEnum.OtherCategoryData, {
                categoryId: item.id,
                categoryName: item.title,
              });
            }}
          >
            <Image
              source={{ uri: item.image?.replace(/\.avif$/i, ".webp") }}
              style={styles.brandImage}
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
    marginTop: spacing.sm,
  },
  title: {
    fontSize: 18,
    fontFamily: fonts.bold,
    marginLeft: spacing.lg,
    marginBottom: spacing.sm,
    color: color.primary,
  },
  card: {
    width: cardSize,
    marginRight: spacing.lg,
    alignItems: "center",
  },
  brandImage: {
    width: cardSize,
    height: cardSize,
    borderRadius: cardSize / 2,
    borderWidth: 1,
    borderColor: color.borderLight,
    marginBottom: spacing.sm,
    backgroundColor: color.lightGray,
  },
  brandName: {
    fontSize: 12,
    fontFamily: fonts.semiBold,
    color: color.textDark,
    textAlign: "center",
  },
});

import { color, fonts, radius, spacing } from "../../constant";
import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
} from "react-native";
import imageIndex from "../../assets/imageIndex";
import ScreenNameEnum from "../../routes/screenName.enum";
import { useNavigation } from "@react-navigation/native";
import Animated, { FadeInDown } from "react-native-reanimated";
import Loading from "../../utils/Loader";

interface Category {
  _id?: string;
  name?: string;
  image: string;
  id?: string;
}

interface CategoryTabsProps {
  categories?: Category[];
  selected?: string;
}

const CategoryTabs: React.FC<CategoryTabsProps> = ({
  categories,
  selected,
}: any) => {
  const navigation: any = useNavigation();
  return (
    <View style={styles.wrapper}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.container}
      >
        {categories?.length === 0 ? (
          <Loading fullScreen={false} size="small" color={color.primary} />
        ) : (
          categories?.map((item: any, index: number) => {
            return (
              <Animated.View 
                key={item._id} 
                entering={FadeInDown.duration(500).delay(index * 80)}
              >
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => {
                    navigation.navigate(ScreenNameEnum.OtherCategoryData, {
                      categoryId: item.id,
                      categoryName: item.name
                    });
                  }}
                  style={styles.tab}
                >
                  <View style={styles.imageContainer}>
                    <Image
                      source={{ uri: item.image || imageIndex.smsImg }}
                      style={styles.image}
                      resizeMode="cover"
                    />
                  </View>
                  <Text allowFontScaling={false} style={styles.text} numberOfLines={1}>
                    {item.name}
                  </Text>
                </TouchableOpacity>
              </Animated.View>
            );
          })
        )}
      </ScrollView>
    </View>
  );
};

export default CategoryTabs;

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: color.background,
    paddingVertical: spacing.sm + 2,
    borderBottomWidth: 1,
    borderBottomColor: color.borderLight,
  },
  container: {
    paddingHorizontal: spacing.md,
  },
  tab: {
    alignItems: "center",
    marginRight: 15,
    width: 72,
  },
  imageContainer: {
    width: 66,
    height: 66,
    borderRadius: 33,
    backgroundColor: color.primarySoft,
    overflow: "hidden",
    marginBottom: 6,
    borderWidth: 1.5,
    borderColor: color.borderLight,
    elevation: 2,
    shadowColor: color.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  text: {
    fontSize: 10,
    color: color.textDark,
    fontFamily: fonts.semiBold,
    textAlign: "center",
    marginTop: 2,
  },
});

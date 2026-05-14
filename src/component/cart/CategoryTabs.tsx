import { color, fonts } from "../../constant";
import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  ActivityIndicator,
} from "react-native";
import imageIndex from "../../assets/imageIndex";
import ScreenNameEnum from "../../routes/screenName.enum";
import { useNavigation } from "@react-navigation/native";
import Animated, { FadeInDown } from "react-native-reanimated";

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
          <ActivityIndicator size="small" color="#FF3F6C" />
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
    backgroundColor: '#fff',
    paddingVertical: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: '#f0f0f0',
  },
  container: {
    paddingHorizontal: 12,
  },
  tab: {
    alignItems: "center",
    marginRight: 15,
    width: 72,
  },
  imageContainer: {
    width: 66,
    height: 66,
    borderRadius: 33, // Perfect circle
    backgroundColor: '#FFF0F3',
    overflow: "hidden",
    marginBottom: 6,
    borderWidth: 1,
    borderColor: '#FFF0F3',
    elevation: 2,
    shadowColor: '#000',
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
    color: '#333',
    fontFamily: fonts.semiBold,
    textAlign: "center",
    marginTop: 2,
  },
});

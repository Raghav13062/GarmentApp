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

interface Category {
  _id?: string;
  name?: string;
  image: string;
}

interface CategoryTabsProps {
  categories?: Category[];
  selected?: string;
 }

const CategoryTabs: React.FC<CategoryTabsProps> = ({
  categories,
  selected,
 }:any) => {
  const navigation: any = useNavigation();
  return (
    <View style={styles.wrapper}>
   <ScrollView
  horizontal
  showsHorizontalScrollIndicator={false}
  contentContainerStyle={[
    styles.container,
    categories?.length === 0 && styles.emptyContainer,
  ]}
>
  {categories?.length === 0 ? (
    <ActivityIndicator size="small" color="#0000ff" />
  ) : (
    categories?.map((item) => {
      const isActive = selected === item?.name;
      return (
        <TouchableOpacity
          key={item._id}
          activeOpacity={0.85}
          onPress={() => {
             navigation.navigate(ScreenNameEnum.OtherCategoryData, {
              item: { _id: item._id ?? "all", name: item.name },
            });
          }}
          style={[styles.tab, isActive && styles.activeTab]}
        >
          <Text allowFontScaling={false}   style={styles.text}>
            {item.name}
          </Text>
          <Image
            source={{ uri: item.image || imageIndex.smsImg }}
            style={styles.image}
            resizeMode="stretch"
          />
        </TouchableOpacity>
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
    backgroundColor: "#FFFFFF",
    marginTop:4
   },

  container: {
     alignItems: "center",
  },

  tab: {
     paddingVertical: 5,
    borderRadius: 18,
     alignItems: "center",
     marginHorizontal: 10,

  },

  activeTab: {
    // backgroundColor: color.primary,
    transform: [{ scale: 1.05 }],
  },

  image: {
    width: 65,
    height: 65,
    borderRadius: 8,
     backgroundColor: "#EAEAEA",
    marginTop:8
  },

  activeImage: {
    borderWidth: 2,
    borderColor: "#FFFFFF",
  },

  text: {
    fontSize: 13,
    color: "#000000",
    fontWeight: "600",
    textAlign: "center",
  },
emptyContainer: {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
},
  activeText: {
    color: "#FFFFFF",
    fontWeight: "600",
  },
});

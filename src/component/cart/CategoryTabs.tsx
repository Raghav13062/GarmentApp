import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { color } from "../../constant";

interface Category {
  _id: string;
  name: string;
}

interface CategoryTabsProps {
  categories: Category[];
  selected: string;
  onSelect: (value: string) => void;
}

const CategoryTabs: React.FC<CategoryTabsProps> = ({
  categories,
  selected,
  onSelect,
}) => {
  return (
    <View style={styles.wrapper}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.container}
      >
        {categories.map((item) => {
          const isActive = selected === item.name;

          return (
            <TouchableOpacity
              key={item._id}
              onPress={() => onSelect(item.name)}
              style={[
                styles.tab,
                isActive && styles.activeTab,
              ]}
              activeOpacity={0.8}
            >
              <Text
                style={[
                  styles.text,
                  isActive && styles.activeText,
                ]}
              >
                {item.name}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default CategoryTabs;
const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: "#fff",
    paddingVertical: 10,
  },

  container: {
    paddingHorizontal: 12,
  },

  tab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#F4F4F4",
    marginRight: 10,
  },

  activeTab: {
    backgroundColor: color.primary,
  },

  text: {
    fontSize: 14,
    color: "#555",
    fontWeight: "500",
  },

  activeText: {
    color: "#fff",
    fontWeight: "600",
  },
});

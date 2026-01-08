import React, { useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import useOtherCategoryData from "./useOtherCategoryData";
 
const { width } = Dimensions.get("window");
const ITEM_WIDTH = width / 2 - 20; // 2 items per row
const BRAND_COLORS = { primaryGradient: ['#F58021', '#862E92'], primaryDark: '#862E92', primaryLight: '#F58021', accent: '#FFD700', background: '#F5F5F5', textDark: '#2D3436', textLight: '#FFFFFF', cardBg: '#FFFFFF', success: '#4CAF50', warning: '#FF9800', error: '#F44336', };
const CategoriesScreen = () => {
  const {
    loading,
    products,
    navigation,
    viewMode,
    setViewMode,
  } = useOtherCategoryData();

  const renderItem = ({ item }: any) => (
    <TouchableOpacity
      style={[
        styles.card,
        viewMode === "grid" && { width: ITEM_WIDTH },
      ]}
      onPress={() => navigation.navigate("CategoryDetail", { item })}
    >
      <Image source={{ uri: item.image }} style={styles.image} />
      <Text style={styles.title}>{item.name}</Text>
      <Text style={styles.description}>{item.description}</Text>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={BRAND_COLORS.primaryDark} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        key={viewMode} // re-render when view changes
        keyExtractor={(item) => item?._id}
        renderItem={renderItem}
        numColumns={viewMode === "grid" ? 2 : 1}
        contentContainerStyle={{ padding: 10 }}
      />
    </View>
  );
};

export default CategoriesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BRAND_COLORS.background,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    borderRadius: 12,
    padding: 10,
    margin: 5,
    flex: 1,
    backgroundColor: BRAND_COLORS.cardBg,
    elevation: 3,
  },
  image: {
    width: "100%",
    height: 120,
    borderRadius: 10,
    marginBottom: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: "700",
    color: BRAND_COLORS.textDark,
  },
  description: {
    fontSize: 14,
    color: "#666",
  },
});

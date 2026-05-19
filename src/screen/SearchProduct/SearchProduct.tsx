import { color } from "../../constant";
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TextInput,
  FlatList,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useProtectedAction } from "../../utils/useProtectedAction";
import { AddToCartApi, GetCartApi } from "../../Api/auth/cartService";
import { useDispatch } from "react-redux";
import { setCart } from "../../redux/feature/cartSlice";

const { width } = Dimensions.get("window");

// Updated COLORS with your theme
const COLORS = {
  gradient: [color.primary, color.secondary],
  background: color.white,
  statusBar: color.primary,
  cardBackground: color.white,
  text: color.textDark,
  textLight: color.textMedium,
  border: color.borderLight,
  primary: color.primary,
  secondary: color.secondary,
  success: color.success,
  warning: color.warning,
  info: '#2196F3',
  white: color.white,
  shadow: color.black,
};

// Extended demo data with images
const productsData = [
  { 
    id: "1", 
    name: "Saree", 
    price: "₹2,499",
    category: "Clothing",
    image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=400",
    description: "Premium silk saree with elegant borders",
    rating: 4.5,
    reviews: 1243
  },
  { 
    id: "2", 
    name: "Kurti", 
    price: "₹1,999",
    category: "Clothing",
    image: "https://images.unsplash.com/photo-1610030469668-935142b96de4?w=400",
    description: "Comfortable cotton kurti for daily wear",
    rating: 4.7,
    reviews: 892
  },
  { 
    id: "3", 
    name: "Lehenga", 
    price: "₹3,299",
    category: "Clothing",
    image: "https://images.unsplash.com/photo-1594235412402-b1cd90450b00?w=400",
    description: "Designer lehenga for special occasions",
    rating: 4.3,
    reviews: 2100
  }
];

// Search suggestions
const searchSuggestions = [
  "Saree",
  "Kurti",
  "Lehenga",
  "Salwar Suit",
  "Clothing",
  "Ethnic Wear",
];

// Categories for filter
const categories = [
  { id: "all", name: "All", icon: "apps" },
  { id: "clothing", name: "Clothing", icon: "checkroom" },
];

export default function SearchProduct() {
  const dispatch = useDispatch();

  const fetchCart = async () => {
    try {
      const data = await GetCartApi();
      if (data) {
        const mappedItems = data.items.map((item: any) => ({
          id: item._id,
          title: item.product?.title || 'Product',
          price: item.product?.pricing?.sellingPrice || 0,
          quantity: item.quantity,
          image: item.product?.images?.[0] || '',
        }));
        dispatch(setCart({
          items: mappedItems,
          totalItems: data.totalItems,
          totalPrice: data.totalPrice
        }));
      }
    } catch (e) {
      console.log('Error fetching cart: ', e);
    }
  };

  const [search, setSearch] = useState("");
  const [filteredProducts, setFilteredProducts] = useState(productsData);
  const [suggestions, setSuggestions] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("default");
  const executeProtected = useProtectedAction();

  // Filter products based on search and category
  useEffect(() => {
    let filtered = [...productsData];

    // Apply search filter
    if (search.trim() !== "") {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(search.toLowerCase()) ||
        product.category.toLowerCase().includes(search.toLowerCase()) ||
        product.description.toLowerCase().includes(search.toLowerCase())
      );

      // Update suggestions
      const matchedSuggestions = searchSuggestions.filter(suggestion =>
        suggestion.toLowerCase().includes(search.toLowerCase())
      );
      setSuggestions(matchedSuggestions.slice(0, 5));
    } else {
      setSuggestions([]);
    }

    // Apply category filter
    if (selectedCategory !== "all") {
      filtered = filtered.filter(product =>
        product.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    // Apply sorting
    if (sortBy === "price_low") {
      filtered.sort((a, b) => parseInt(a.price.replace(/[^0-9]/g, '')) - parseInt(b.price.replace(/[^0-9]/g, '')));
    } else if (sortBy === "price_high") {
      filtered.sort((a, b) => parseInt(b.price.replace(/[^0-9]/g, '')) - parseInt(a.price.replace(/[^0-9]/g, '')));
    } else if (sortBy === "rating") {
      filtered.sort((a, b) => b.rating - a.rating);
    }

    setFilteredProducts(filtered);
  }, [search, selectedCategory, sortBy]);

  // Add to cart function
  const addToCart = async (product) => {
    executeProtected(async () => {
      try {
        const id = product._id || product.id;
        if (id) {
          const res = await AddToCartApi(id);
          if (res) {
            await fetchCart();
          }
        }
      } catch (error) {
        console.error('Search add to cart error:', error);
      }
    });
  };

  // Clear search
  const clearSearch = () => {
    setSearch("");
    setSuggestions([]);
  };

  // Handle suggestion press
  const handleSuggestionPress = (suggestion) => {
    setSearch(suggestion);
  };

  // Render product item
  const renderProductItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <View style={styles.categoryBadge}>
          <Text style={styles.categoryText}>{item.category}</Text>
        </View>
        <View style={styles.ratingContainer}>
          <Icon name="star" size={14} color={color.star} />
          <Text style={styles.ratingText}>{item.rating}</Text>
          <Text style={styles.reviewsText}>({item.reviews})</Text>
        </View>
      </View>

      <View style={styles.cardContent}>
        <Image 
          source={{ uri: item.image }} 
          style={styles.productImage}
        />
        
        <View style={styles.productInfo}>
          <Text style={styles.productName}>{item.name}</Text>
          <Text style={styles.productDescription} numberOfLines={2}>
            {item.description}
          </Text>
          
          <View style={styles.priceContainer}>
            <Text style={styles.price}>{item.price}</Text>
          </View>
        </View>
      </View>

      <View style={styles.cardFooter}>
        <TouchableOpacity style={styles.detailsButton}>
          <Icon name="info" size={18} color={COLORS.primary} />
          <Text style={styles.detailsButtonText}>Details</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.addButton}
          onPress={() => addToCart(item)}
        >
          <LinearGradient
            colors={COLORS.gradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.addButtonGradient}
          >
            <Icon name="add" size={20} color={color.white} />
            <Text style={styles.addButtonText}>Add to Cart</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );

  // Render category filter item
  const renderCategoryItem = ({ item }) => (
    <TouchableOpacity 
      style={[
        styles.categoryItem,
        selectedCategory === item.id && styles.categoryItemSelected
      ]}
      onPress={() => setSelectedCategory(item.id)}
    >
      <Icon 
        name={item.icon} 
        size={20} 
        color={selectedCategory === item.id ? COLORS.white : COLORS.textLight} 
      />
      <Text style={[
        styles.categoryItemText,
        selectedCategory === item.id && styles.categoryItemTextSelected
      ]}>
        {item.name}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={COLORS.statusBar} barStyle="light-content" />

      {/* Header */}
      <LinearGradient 
        colors={COLORS.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.header}
      >
        <View style={styles.headerTop}>
          <TouchableOpacity style={styles.backButton}>
            <Icon name="arrow-back" size={24} color={color.white} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Search Products</Text>
        </View>

        {/* Search Box */}
        <View style={styles.searchContainer}>
          <View style={styles.searchBox}>
            <Icon name="search" size={22} color={COLORS.textLight} style={styles.searchIcon} />
            <TextInput
              placeholder="Search products, categories..."
              placeholderTextColor={COLORS.textLight}
              value={search}
              onChangeText={setSearch}
              style={styles.searchInput}
              clearButtonMode="while-editing"
            />
            {search.length > 0 && (
              <TouchableOpacity onPress={clearSearch} style={styles.clearButton}>
                <Icon name="close" size={20} color={COLORS.textLight} />
              </TouchableOpacity>
            )}
          </View>
        </View>
      </LinearGradient>

      {/* Search Suggestions */}
      {suggestions.length > 0 && (
        <View style={styles.suggestionsContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {suggestions.map((suggestion, index) => (
              <TouchableOpacity 
                key={index}
                style={styles.suggestionChip}
                onPress={() => handleSuggestionPress(suggestion)}
              >
                <Text style={styles.suggestionChipText}>{suggestion}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}

      {/* Category Filter */}
      <View style={styles.categoriesContainer}>
        <FlatList
          data={categories}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={renderCategoryItem}
          contentContainerStyle={styles.categoriesList}
        />
      </View>

      {/* Product List */}
      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        renderItem={renderProductItem}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Icon name="search-off" size={80} color={COLORS.textLight} />
            <Text style={styles.emptyTitle}>No products found</Text>
            <TouchableOpacity 
              style={styles.resetButton}
              onPress={() => {
                setSearch("");
                setSelectedCategory("all");
              }}
            >
              <Text style={styles.resetButtonText}>Reset Filters</Text>
            </TouchableOpacity>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    paddingTop: 40,
    paddingBottom: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerTop: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  headerTitle: {
    color: COLORS.white,
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    flex: 1,
  },
  searchContainer: {
    paddingHorizontal: 16,
  },
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.white,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: COLORS.text,
  },
  suggestionsContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  suggestionChip: {
    backgroundColor: color.backgroundLight,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  suggestionChipText: {
    color: COLORS.text,
    fontSize: 14,
  },
  categoriesContainer: {
    backgroundColor: COLORS.white,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  categoriesList: {
    paddingHorizontal: 16,
  },
  categoryItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: color.backgroundLight,
    borderRadius: 25,
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginRight: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  categoryItemSelected: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  categoryItemText: {
    color: COLORS.textLight,
    fontSize: 14,
    marginLeft: 6,
  },
  categoryItemTextSelected: {
    color: COLORS.white,
    fontWeight: "bold",
  },
  listContainer: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 100,
  },
  card: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    elevation: 3,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  categoryBadge: {
    backgroundColor: 'rgba(245, 128, 33, 0.1)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  categoryText: {
    color: COLORS.primary,
    fontSize: 12,
    fontWeight: "600",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  ratingText: {
    color: COLORS.text,
    fontSize: 14,
    fontWeight: "600",
    marginLeft: 4,
  },
  reviewsText: {
    color: COLORS.textLight,
    fontSize: 12,
  },
  cardContent: {
    flexDirection: "row",
    marginBottom: 16,
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 12,
    marginRight: 16,
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.text,
  },
  productDescription: {
    fontSize: 14,
    color: COLORS.textLight,
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "baseline",
    marginTop: 4,
  },
  price: {
    fontSize: 22,
    fontWeight: "bold",
    color: COLORS.secondary,
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  detailsButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  detailsButtonText: {
    marginLeft: 4,
    color: COLORS.primary,
    fontWeight: "600",
  },
  addButton: {
    flex: 1,
    marginLeft: 16,
  },
  addButtonGradient: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    borderRadius: 12,
  },
  addButtonText: {
    color: color.white,
    fontWeight: "bold",
    marginLeft: 8,
  },
  emptyContainer: {
    alignItems: "center",
    marginTop: 50,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
  },
  resetButton: {
    marginTop: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: COLORS.primary,
    borderRadius: 10,
  },
  resetButtonText: {
    color: color.white,
    fontWeight: "bold",
  },
});
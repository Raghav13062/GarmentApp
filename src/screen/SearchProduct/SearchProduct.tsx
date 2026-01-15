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
  Alert,
  ScrollView,
  Dimensions,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import Icon from "react-native-vector-icons/MaterialIcons";

const { width } = Dimensions.get("window");

// Updated COLORS with your theme
const COLORS = {
  gradient: ['#F58021', '#862E92'],
  background: '#FFFFFF',
  statusBar: '#F58021',
  cardBackground: '#FFFFFF',
  text: '#333333',
  textLight: '#666666',
  border: '#E0E0E0',
  primary: '#F58021',
  secondary: '#862E92',
  success: '#4CAF50',
  warning: '#FF9800',
  info: '#2196F3',
  white: '#FFFFFF',
  shadow: '#000000',
};

// Extended demo data with images
const productsData = [
  { 
    id: "1", 
    name: "Health Insurance", 
    price: "₹2,499",
    category: "Insurance",
    image: "https://images.unsplash.com/photo-1577896851231-70ef18881754?w=400",
    description: "Comprehensive health coverage for you and family",
    rating: 4.5,
    reviews: 1243
  },
  { 
    id: "2", 
    name: "Life Insurance", 
    price: "₹1,999",
    category: "Insurance",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400",
    description: "Secure your family's future with term life insurance",
    rating: 4.7,
    reviews: 892
  },
  { 
    id: "3", 
    name: "Vehicle Insurance", 
    price: "₹3,299",
    category: "Insurance",
    image: "https://images.unsplash.com/photo-1553440569-bcc63803a83d?w=400",
    description: "Comprehensive coverage for cars and bikes",
    rating: 4.3,
    reviews: 2100
  },
  { 
    id: "4", 
    name: "Travel Insurance", 
    price: "₹899",
    category: "Insurance",
    image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400",
    description: "International travel coverage with medical emergency",
    rating: 4.6,
    reviews: 1567
  },
  { 
    id: "5", 
    name: "Mutual Fund", 
    price: "₹5,000",
    category: "Investment",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400",
    description: "Systematic Investment Plan for long term growth",
    rating: 4.4,
    reviews: 3456
  },
  { 
    id: "6", 
    name: "Fixed Deposit", 
    price: "₹10,000",
    category: "Investment",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400",
    description: "Fixed returns with high interest rates",
    rating: 4.8,
    reviews: 2789
  },
  { 
    id: "7", 
    name: "Gold Plan", 
    price: "₹4,999",
    category: "Investment",
    image: "https://images.unsplash.com/photo-1552422535-c45813c61732?w=400",
    description: "Digital gold investment with secure storage",
    rating: 4.2,
    reviews: 987
  },
  { 
    id: "8", 
    name: "Retirement Plan", 
    price: "₹3,500",
    category: "Pension",
    image: "https://images.unsplash.com/photo-1579154204601-0151d3407dcb?w=400",
    description: "Monthly pension plan for post-retirement life",
    rating: 4.9,
    reviews: 1234
  },
  { 
    id: "9", 
    name: "Child Education Plan", 
    price: "₹2,999",
    category: "Investment",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400",
    description: "Secure your child's education future",
    rating: 4.7,
    reviews: 1890
  },
  { 
    id: "10", 
    name: "Home Insurance", 
    price: "₹4,499",
    category: "Insurance",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400",
    description: "Protect your home against natural disasters",
    rating: 4.5,
    reviews: 2100
  },
];

// Search suggestions
const searchSuggestions = [
  "Insurance",
  "Health",
  "Investment",
  "Life Insurance",
  "Vehicle",
  "Travel",
  "Mutual Fund",
  "Gold",
  "Retirement",
  "Education",
  "Home",
  "Car",
  "Bike",
];

// Categories for filter
const categories = [
  { id: "all", name: "All", icon: "apps" },
  { id: "insurance", name: "Insurance", icon: "security" },
  { id: "investment", name: "Investment", icon: "trending-up" },
  { id: "pension", name: "Pension", icon: "account-balance" },
  { id: "savings", name: "Savings", icon: "savings" },
];

export default function SearchProduct() {
  const [search, setSearch] = useState("");
  const [filteredProducts, setFilteredProducts] = useState(productsData);
  const [suggestions, setSuggestions] = useState([]);
  const [cart, setCart] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("default");

  // Filter products based on search and category
  useEffect(() => {
    let filtered = productsData;

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
  const addToCart = (product) => {
    setCart(prevCart => [...prevCart, product]);
    Alert.alert(
      "Added to Cart",
      `${product.name} has been added to your cart`,
      [
        { 
          text: "View Cart", 
          onPress: () => console.log("View Cart Pressed"),
          style: "default"
        },
        { 
          text: "Continue Shopping", 
          style: "cancel" 
        }
      ]
    );
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
          <Icon name="star" size={14} color="#FFD700" />
          <Text style={styles.ratingText}>{item.rating}</Text>
          <Text style={styles.reviewsText}>({item.reviews})</Text>
        </View>
      </View>

      <View style={styles.cardContent}>
        <Image 
          source={{ uri: item.image }} 
          style={styles.productImage}
          defaultSource={{ uri: 'https://via.placeholder.com/100' }}
        />
        
        <View style={styles.productInfo}>
          <Text style={styles.productName}>{item.name}</Text>
          <Text style={styles.productDescription} numberOfLines={2}>
            {item.description}
          </Text>
          
          <View style={styles.priceContainer}>
            <Text style={styles.price}>{item.price}</Text>
            <Text style={styles.monthText}>/month</Text>
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
            <Icon name="add" size={20} color="#FFF" />
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
            <Icon name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Search Products</Text>
          <TouchableOpacity style={styles.cartIcon}>
            <Icon name="shopping-cart" size={24} color="#fff" />
            {cart.length > 0 && (
              <View style={styles.cartBadge}>
                <Text style={styles.cartBadgeText}>{cart.length}</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        {/* Search Box */}
        <View style={styles.searchContainer}>
          <View style={styles.searchBox}>
            <Icon name="search" size={22} color={COLORS.textLight} style={styles.searchIcon} />
            <TextInput
              placeholder="Search products, categories, descriptions..."
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

      {/* Sort Options */}
      <View style={styles.sortContainer}>
        <Text style={styles.sortLabel}>Sort by:</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.sortOptions}>
          <TouchableOpacity 
            style={[styles.sortOption, sortBy === "default" && styles.sortOptionActive]}
            onPress={() => setSortBy("default")}
          >
            <Text style={[styles.sortOptionText, sortBy === "default" && styles.sortOptionTextActive]}>
              Featured
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.sortOption, sortBy === "price_low" && styles.sortOptionActive]}
            onPress={() => setSortBy("price_low")}
          >
            <Text style={[styles.sortOptionText, sortBy === "price_low" && styles.sortOptionTextActive]}>
              Price: Low to High
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.sortOption, sortBy === "price_high" && styles.sortOptionActive]}
            onPress={() => setSortBy("price_high")}
          >
            <Text style={[styles.sortOptionText, sortBy === "price_high" && styles.sortOptionTextActive]}>
              Price: High to Low
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.sortOption, sortBy === "rating" && styles.sortOptionActive]}
            onPress={() => setSortBy("rating")}
          >
            <Text style={[styles.sortOptionText, sortBy === "rating" && styles.sortOptionTextActive]}>
              Highest Rated
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>

      {/* Results Info */}
      <View style={styles.resultsInfo}>
        <Text style={styles.resultsText}>
          Showing {filteredProducts.length} of {productsData.length} products
        </Text>
        {search !== "" && (
          <Text style={styles.searchQueryText}>for "{search}"</Text>
        )}
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
            <LinearGradient
              colors={['#F8F8F8', '#FFFFFF']}
              style={styles.emptyGradient}
            >
              <Icon name="search-off" size={80} color={COLORS.textLight} />
              <Text style={styles.emptyTitle}>No products found</Text>
              <Text style={styles.emptySubtitle}>
                Try different keywords or browse categories
              </Text>
              <TouchableOpacity 
                style={styles.resetButton}
                onPress={() => {
                  setSearch("");
                  setSelectedCategory("all");
                  setSortBy("default");
                }}
              >
                <Text style={styles.resetButtonText}>Reset Filters</Text>
              </TouchableOpacity>
            </LinearGradient>
          </View>
        }
      />

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <Icon name="home" size={24} color={COLORS.primary} />
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Icon name="search" size={24} color={COLORS.primary} />
          <Text style={[styles.navText, styles.navTextActive]}>Search</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Icon name="favorite" size={24} color={COLORS.textLight} />
          <Text style={styles.navText}>Wishlist</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Icon name="person" size={24} color={COLORS.textLight} />
          <Text style={styles.navText}>Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  // Header Styles
  header: {
    paddingTop: StatusBar.currentHeight + 10,
    paddingBottom: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  headerTop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    color: COLORS.white,
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    flex: 1,
    marginHorizontal: 10,
  },
  cartIcon: {
    padding: 4,
    position: "relative",
  },
  cartBadge: {
    position: "absolute",
    top: -5,
    right: -5,
    backgroundColor: COLORS.white,
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  cartBadgeText: {
    color: COLORS.primary,
    fontSize: 12,
    fontWeight: "bold",
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
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: COLORS.text,
    paddingVertical: 0,
  },
  clearButton: {
    padding: 4,
  },
  // Suggestions Styles
  suggestionsContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  suggestionChip: {
    backgroundColor: '#F8F8F8',
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
    fontWeight: "500",
  },
  // Categories Styles
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
    backgroundColor: '#F8F8F8',
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
    fontWeight: "500",
    marginLeft: 6,
  },
  categoryItemTextSelected: {
    color: COLORS.white,
    fontWeight: "bold",
  },
  // Sort Styles
  sortContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: COLORS.white,
  },
  sortLabel: {
    color: COLORS.text,
    fontSize: 14,
    fontWeight: "600",
    marginRight: 12,
  },
  sortOptions: {
    flex: 1,
  },
  sortOption: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    marginRight: 10,
    borderRadius: 15,
    backgroundColor: '#F8F8F8',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  sortOptionActive: {
    backgroundColor: COLORS.secondary,
    borderColor: COLORS.secondary,
  },
  sortOptionText: {
    color: COLORS.textLight,
    fontSize: 13,
  },
  sortOptionTextActive: {
    color: COLORS.white,
    fontWeight: "bold",
  },
  // Results Info
  resultsInfo: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  resultsText: {
    color: COLORS.text,
    fontSize: 14,
    fontWeight: "600",
  },
  searchQueryText: {
    color: COLORS.primary,
    fontSize: 14,
    marginTop: 2,
    fontWeight: "500",
  },
  // Product List
  listContainer: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 100,
  },
  // Card Styles
  card: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
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
    borderWidth: 1,
    borderColor: 'rgba(245, 128, 33, 0.3)',
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
    marginRight: 2,
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
    backgroundColor: '#F8F8F8',
  },
  productInfo: {
    flex: 1,
    justifyContent: "center",
  },
  productName: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.text,
    marginBottom: 6,
  },
  productDescription: {
    fontSize: 14,
    color: COLORS.textLight,
    marginBottom: 10,
    lineHeight: 20,
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "baseline",
  },
  price: {
    fontSize: 22,
    fontWeight: "bold",
    color: COLORS.secondary,
  },
  monthText: {
    fontSize: 14,
    color: COLORS.textLight,
    marginLeft: 4,
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  detailsButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: '#F8F8F8',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  detailsButtonText: {
    color: COLORS.primary,
    fontSize: 14,
    fontWeight: "500",
    marginLeft: 6,
  },
  addButton: {
    flex: 1,
    marginLeft: 12,
    borderRadius: 8,
    overflow: "hidden",
  },
  addButtonGradient: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  addButtonText: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: "600",
    marginLeft: 6,
  },
  // Empty State
  emptyContainer: {
    marginTop: 40,
  },
  emptyGradient: {
    alignItems: "center",
    padding: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: COLORS.text,
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 16,
    color: COLORS.textLight,
    textAlign: "center",
    marginBottom: 24,
  },
  resetButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  resetButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "600",
  },
  // Bottom Navigation
  bottomNav: {
    flexDirection: "row",
    backgroundColor: COLORS.white,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    paddingVertical: 12,
    paddingHorizontal: 16,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  navItem: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 4,
  },
  navText: {
    color: COLORS.textLight,
    fontSize: 12,
    marginTop: 4,
  },
  navTextActive: {
    color: COLORS.primary,
    fontWeight: "600",
  },
});
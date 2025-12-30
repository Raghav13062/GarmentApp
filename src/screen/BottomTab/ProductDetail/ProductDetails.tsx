import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
  FlatList,
  Platform,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import LinearGradient from "react-native-linear-gradient";
import { color, navigateToScreen, navigationBack } from "../../../constant";
import ScreenNameEnum from "../../../routes/screenName.enum";

const { width } = Dimensions.get("window");

const images = [
  "https://e7.pngegg.com/pngimages/714/107/png-clipart-woman-wearing-purple-and-pink-indian-traditional-dress-while-sitting-down-lehenga-style-saree-gagra-choli-wedding-dress-dress-purple-violet-thumbnail.png",
  "https://e7.pngegg.com/pngimages/1007/977/png-clipart-paithani-sari-silk-handloom-saree-surprise-wedding-reveal-purple-violet-thumbnail.png",
  "https://e7.pngegg.com/pngimages/587/801/png-clipart-sari-pochampally-saree-ikat-silk-handloom-saree-saree-border-purple-magenta-thumbnail.png",
];

const reviews = [
  { id: "1", userName: "Rahul Sharma", rating: 5, date: "15 March 2024", comment: "Excellent quality! Perfect fit and very comfortable.", verified: true },
  { id: "2", userName: "Priya Patel", rating: 4, date: "10 March 2024", comment: "Good product but color slightly different.", verified: true },
];

const specifications = [
  { label: "Material", value: "100% Cotton Denim" },
  { label: "Fit", value: "Regular Fit" },
  { label: "Color", value: "Mid Blue" },
  { label: "Country", value: "India" },
];

export default function ProductDetails() {
  const [activeImage, setActiveImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState("M");
  const [selectedTab, setSelectedTab] = useState("description");

  const renderStars = (rating) =>
    Array(5).fill(0).map((_, i) => (
      <Text key={i} style={styles.star}>
        {i < rating ? "★" : "☆"}
      </Text>
    ));

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* IMAGE SLIDER */}
        <View>
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={(e) =>
              setActiveImage(Math.round(e.nativeEvent.contentOffset.x / width))
            }
          >
            {images.map((img, index) => (
              <Image key={index} source={{ uri: img }} style={styles.mainImage} />
            ))}
          </ScrollView>

          {/* BACK BUTTON */}
          <TouchableOpacity style={styles.backButton} onPress={navigationBack}>
            <LinearGradient colors={color.buttLinearGradient} style={styles.backBtn}>
              <Ionicons name="arrow-back" size={20} color="#fff" />
            </LinearGradient>
          </TouchableOpacity>

          {/* INDICATOR */}
          <View style={styles.indicatorRow}>
            {images.map((_, i) => (
              <View key={i} style={[styles.dot, activeImage === i && styles.activeDot]} />
            ))}
          </View>
        </View>

        {/* PRODUCT INFO */}
        <View style={styles.section}>
          <Text allowFontScaling={false} style={styles.brand}>Levi's</Text>
          <Text allowFontScaling={false} style={styles.title}>
            Men's Pure Cotton Denim Jacket
          </Text>

          <View style={styles.ratingRow}>
            <LinearGradient colors={color.buttLinearGradient} style={styles.ratingBox}>
              <Text style={styles.ratingText}>4.2 ★</Text>
            </LinearGradient>
            <Text style={styles.ratingCount}>1,234 Ratings</Text>
          </View>

          <View style={styles.priceRow}>
            <Text style={styles.price}>₹2,709</Text>
            <Text style={styles.mrp}>₹4,839</Text>
            <LinearGradient colors={color.buttLinearGradient} style={styles.discountBadge}>
              <Text style={styles.discount}>44% OFF</Text>
            </LinearGradient>
          </View>
        </View>

        {/* SIZE */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Select Size</Text>
          <View style={styles.sizeRow}>
            {["XS", "S", "M", "L", "XL"].map((s) => (
              <TouchableOpacity
                key={s}
                style={[styles.sizeBtn, selectedSize === s && styles.activeSize]}
                onPress={() => setSelectedSize(s)}
              >
                <Text style={[styles.sizeText, selectedSize === s && styles.activeSizeText]}>
                  {s}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* TABS */}
        <View style={styles.tabs}>
          {["description", "specifications", "reviews"].map((tab) => (
            <TouchableOpacity key={tab} onPress={() => setSelectedTab(tab)}>
              <Text style={[styles.tabText, selectedTab === tab && styles.activeTab]}>
                {tab.toUpperCase()}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* DESCRIPTION */}
        {selectedTab === "description" && (
          <View style={styles.section}>
            <Text style={styles.desc}>
              Premium cotton denim jacket with modern fit. Perfect for daily wear.
            </Text>
          </View>
        )}

        {/* SPECIFICATIONS */}
        {selectedTab === "specifications" && (
          <View style={styles.section}>
            {specifications.map((s, i) => (
              <View key={i} style={styles.specRow}>
                <Text style={styles.specLabel}>{s.label}</Text>
                <Text style={styles.specValue}>{s.value}</Text>
              </View>
            ))}
          </View>
        )}

        {/* REVIEWS */}
        {selectedTab === "reviews" && (
          <View style={styles.section}>
            <FlatList
              data={reviews}
              keyExtractor={(i) => i.id}
              scrollEnabled={false}
              renderItem={({ item }) => (
                <View style={styles.reviewCard}>
                  <Text style={styles.reviewUser}>{item.userName}</Text>
                  <View style={styles.starRow}>{renderStars(item.rating)}</View>
                  <Text style={styles.reviewText}>{item.comment}</Text>
                </View>
              )}
            />
          </View>
        )}
      </ScrollView>

      {/* BOTTOM BAR */}
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.cartBtn} onPress={() => navigateToScreen(ScreenNameEnum.CheckoutScreen)}>
          <LinearGradient colors={color.buttLinearGradient} style={styles.cartGradient}>
            <Text style={styles.cartText}>Add to Bag</Text>
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buyBtn}>
          <Text style={styles.buyText}>Buy Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5f5" },

  mainImage: {
    width,
    aspectRatio: 3 / 4,
    resizeMode: "cover",
  },

  backButton: {
    position: "absolute",
    top: Platform.OS === "ios" ? 55 : 40,
    left: 16,
  },
  backBtn: {
    height: 40,
    width: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },

  indicatorRow: {
    position: "absolute",
    bottom: 15,
    alignSelf: "center",
    flexDirection: "row",
  },
  dot: {
    height: 8,
    width: 8,
    backgroundColor: "#ccc",
    borderRadius: 4,
    marginHorizontal: 3,
  },
  activeDot: { backgroundColor: "#fff", width: 20 },

  section: { backgroundColor: "#fff", padding: 16, marginBottom: 8 },

  brand: { fontSize: 22, fontWeight: "800" },
  title: { fontSize: 16, color: "#555", marginTop: 4 },

  ratingRow: { flexDirection: "row", alignItems: "center", marginTop: 10 },
  ratingBox: {  borderRadius: 6, height:22 ,
    alignItems:"center" ,
    justifyContent:"center" ,
    width:70
   },
  ratingText: { color: "#fff", fontWeight: "700" },
  ratingCount: { marginLeft: 8, color: "#666" },

  priceRow: { flexDirection: "row", alignItems: "center", marginTop: 12 },
  price: { fontSize: 26, fontWeight: "800" },
  mrp: { marginLeft: 10, textDecorationLine: "line-through", color: "#999" },
  discountBadge: {  
    
    height:24,
    width:100,
    justifyContent:"center",
    alignItems:"center",
    marginLeft: 10,  
     borderRadius: 6 },
  discount: { color: "#fff", fontSize: 12, fontWeight: "700" },

  sectionTitle: { fontSize: 18, fontWeight: "700" },
  sizeRow: { flexDirection: "row", flexWrap: "wrap", marginTop: 10 },
  sizeBtn: {
    borderWidth: 1,
    borderColor: "#ddd",
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 8,
    marginRight: 10,
    marginBottom: 10,
  },
  activeSize: { backgroundColor: "#F58021", borderColor: "#F58021" },
  sizeText: { fontWeight: "600" },
  activeSizeText: { color: "#fff" },

  tabs: { flexDirection: "row", justifyContent: "space-around", backgroundColor: "#fff", paddingVertical: 12 },
  tabText: { color: "#666", fontSize: 13 },
  activeTab: { color: "#F58021", fontWeight: "700" },

  desc: { color: "#444", lineHeight: 22 },

  specRow: { flexDirection: "row", justifyContent: "space-between", marginVertical: 6 },
  specLabel: { color: "#666" },
  specValue: { fontWeight: "600" },

  reviewCard: { backgroundColor: "#f8f8f8", padding: 12, borderRadius: 8, marginBottom: 10 },
  reviewUser: { fontWeight: "700" },
  starRow: { flexDirection: "row", marginVertical: 4 },
  star: { color: "#FFB800" },
  reviewText: { color: "#444" },

  bottomBar: {
    flexDirection: "row",
    padding: 16,
    paddingBottom: Platform.OS === "ios" ? 30 : 16,
    backgroundColor: "#fff",
  },
  cartBtn: { flex: 1, marginRight: 10 },
  cartGradient: { height: 50, borderRadius: 25, alignItems: "center", justifyContent: "center" },
  cartText: { color: "#fff", fontWeight: "700" },
  buyBtn: { flex: 1, backgroundColor: "#222", borderRadius: 25, alignItems: "center", justifyContent: "center" },
  buyText: { color: "#fff", fontWeight: "700" },
});

import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
  FlatList
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
 import { color, navigateToScreen, navigationBack } from "../../../constant";
import LinearGradient from "react-native-linear-gradient";
import ScreenNameEnum from "../../../routes/screenName.enum";

const { width } = Dimensions.get("window");

const images = [
  "https://e7.pngegg.com/pngimages/714/107/png-clipart-woman-wearing-purple-and-pink-indian-traditional-dress-while-sitting-down-lehenga-style-saree-gagra-choli-wedding-dress-dress-purple-violet-thumbnail.png",
  "https://e7.pngegg.com/pngimages/1007/977/png-clipart-paithani-sari-silk-handloom-saree-surprise-wedding-reveal-purple-violet-thumbnail.png",
   "https://e7.pngegg.com/pngimages/587/801/png-clipart-sari-pochampally-saree-ikat-silk-handloom-saree-saree-border-purple-magenta-thumbnail.png"
 ];

const reviews = [
  {
    id: "1",
    userName: "Rahul Sharma",
    rating: 5,
    date: "15 March 2024",
    comment: "Excellent quality! Perfect fit and very comfortable. Highly recommended!",
    verified: true
  },
  {
    id: "2",
    userName: "Priya Patel",
    rating: 4,
    date: "10 March 2024",
    comment: "Good denim jacket, but the color is slightly different from the picture.",
    verified: true
  },
  {
    id: "3",
    userName: "Amit Verma",
    rating: 5,
    date: "5 March 2024",
    comment: "Worth every penny. The material is premium and stitching is perfect.",
    verified: false
  },
  {
    id: "4",
    userName: "Neha Gupta",
    rating: 3,
    date: "1 March 2024",
    comment: "Average product. Size runs a bit small. Order one size up.",
    verified: true
  }
];

const specifications = [
  { label: "Material", value: "100% Premium Cotton Denim" },
  { label: "Fit", value: "Regular Fit" },
  { label: "Pattern", value: "Solid" },
  { label: "Color", value: "Mid Blue" },
  { label: "Style", value: "Casual" },
  { label: "Wash Care", value: "Machine Wash Cold" },
  { label: "Country of Origin", value: "India" },
  { label: "Sleeve Length", value: "Full Sleeve" },
  { label: "Closure", value: "Button Down" },
  { label: "Occasion", value: "Casual, Outdoor" }
];

export default function ProductDetails() {
  const [activeImage, setActiveImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedTab, setSelectedTab] = useState("description");

  const renderStars = (rating) => {
    return Array(5).fill(0).map((_, index) => (
      <Text key={index} style={styles.star}>
        {index < rating ? "★" : "☆"}
      </Text>
    ));
  };

  const renderReviewItem = ({ item }) => (
    <View style={styles.reviewItem}>
      <View style={styles.reviewHeader}>
        <View>
          <Text style={styles.reviewUserName}>{item.userName}</Text>
          <View style={styles.ratingContainer}>
            {renderStars(item.rating)}
            <Text style={styles.reviewDate}>{item.date}</Text>
          </View>
        </View>
        {item.verified && (
          <LinearGradient
            colors={color.buttLinearGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.verifiedBadge}
          >
            <Text style={styles.verifiedText}>✓ Verified</Text>
          </LinearGradient>
        )}
      </View>
      <Text style={styles.reviewComment}>{item.comment}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        
        {/* ---------------- IMAGE SLIDER ---------------- */}
        <View style={styles.imageContainer}>
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={(e) => {
              const slide = Math.round(e.nativeEvent.contentOffset.x / width);
              setActiveImage(slide);
            }}
          >
            {images.map((img, index) => (
              <Image key={index} source={{ uri: img }} style={styles.mainImage} />
            ))}
          </ScrollView>
          
          {/* Back Button with Gradient */}
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigationBack()}
            activeOpacity={0.7}
          >
            <LinearGradient
              colors={['rgba(245, 128, 33, 0.9)', 'rgba(134, 46, 146, 0.9)']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.backButtonGradient}
            >
              <Ionicons name="arrow-back" size={20} color="#FFF" />
            </LinearGradient>
          </TouchableOpacity>
          
          {/* Image Indicator */}
          <View style={styles.imageIndicatorContainer}>
            {images.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.imageIndicator,
                  activeImage === index && styles.activeIndicator
                ]}
              />
            ))}
          </View>
        </View>

        {/* ---------------- PRODUCT TITLE ---------------- */}
        <View style={styles.section}>
          <Text style={styles.brand}>Levi's</Text>
          <Text style={styles.productTitle}>Men's Pure Cotton Denim Jacket - Mid Blue</Text>

          <View style={styles.ratingRow}>
            <LinearGradient
            colors={color.buttLinearGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.ratingBox}
            >
              <Text style={styles.ratingText}>4.2 ★</Text>
            </LinearGradient>
            <Text style={styles.ratingCount}>1,234 Ratings</Text>
            <Text style={styles.ratingSeparator}>•</Text>
            <Text style={styles.ratingCount}>587 Reviews</Text>
          </View>

          <View style={styles.priceRow}>
            <Text style={styles.price}>₹2,709</Text>
            <Text style={styles.mrp}>₹4,839</Text>
            <LinearGradient
            colors={color.buttLinearGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.discountBadge}
            >
              <Text style={styles.discount}>44% OFF</Text>
            </LinearGradient>
          </View>
        </View>

        {/* ---------------- SELECT SIZE ---------------- */}
        <View style={styles.section}>
          <View style={styles.sizeHeader}>
            <Text style={styles.sectionTitle}>Select Size</Text>
            <TouchableOpacity>
              <Text style={styles.sizeGuide}>Size Guide</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.sizeRow}>
            {["XS", "S", "M", "L", "XL", "XXL"].map((s) => (
              <TouchableOpacity
                key={s}
                style={[
                  styles.sizeBtn,
                  selectedSize === s && styles.activeSize
                ]}
                onPress={() => setSelectedSize(s)}
              >
                <Text
                  style={[
                    styles.sizeText,
                    selectedSize === s && styles.activeSizeText
                  ]}
                >
                  {s}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* ---------------- PRODUCT DETAILS TABS ---------------- */}
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tab, selectedTab === "description" && styles.activeTab]}
            onPress={() => setSelectedTab("description")}
          >
            <Text style={[styles.tabText, selectedTab === "description" && styles.activeTabText]}>
              Description
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, selectedTab === "specifications" && styles.activeTab]}
            onPress={() => setSelectedTab("specifications")}
          >
            <Text style={[styles.tabText, selectedTab === "specifications" && styles.activeTabText]}>
              Specifications
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, selectedTab === "reviews" && styles.activeTab]}
            onPress={() => setSelectedTab("reviews")}
          >
            <Text style={[styles.tabText, selectedTab === "reviews" && styles.activeTabText]}>
              Reviews ({reviews.length})
            </Text>
          </TouchableOpacity>
        </View>

        {/* ---------------- DESCRIPTION ---------------- */}
        {selectedTab === "description" && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.descriptionTitle}>Product Description</Text>
              <View style={styles.titleUnderline} />
            </View>
            <Text style={styles.descriptionText}>
              Crafted from premium 100% cotton denim, this Levi's jacket combines classic style with modern comfort. 
              The regular fit ensures ease of movement while maintaining a stylish silhouette. Features include:
              {"\n\n"}
              • Button-down closure
              {"\n"}
              • Classic collar design
              {"\n"}
              • Chest pockets with button flaps
              {"\n"}
              • Adjustable cuffs
              {"\n"}
              • Reinforced stitching for durability
              {"\n"}
              • Mid-blue wash for versatile styling
              {"\n\n"}
              Perfect for casual outings, this jacket pairs well with jeans, chinos, or casual trousers.
            </Text>
          </View>
        )}

        {/* ---------------- SPECIFICATIONS ---------------- */}
        {selectedTab === "specifications" && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.descriptionTitle}>Product Specifications</Text>
              <View style={styles.titleUnderline} />
            </View>
            <View style={styles.specsContainer}>
              {specifications.map((spec, index) => (
                <View key={index} style={[
                  styles.specRow,
                  index % 2 === 0 && styles.specRowEven
                ]}>
                  <Text style={styles.specLabel}>{spec.label}</Text>
                  <Text style={styles.specValue}>{spec.value}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* ---------------- REVIEWS ---------------- */}
        {selectedTab === "reviews" && (
          <View style={styles.section}>
            <View style={styles.reviewsHeader}>
              <View>
                <View style={styles.sectionHeader}>
                  <Text style={styles.descriptionTitle}>Customer Reviews</Text>
                  <View style={styles.titleUnderline} />
                </View>
                <View style={styles.overallRating}>
                  <LinearGradient
                    colors={['#F58021', '#862E92']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.overallRatingCircle}
                  >
                    <Text style={styles.overallRatingText}>4.2</Text>
                  </LinearGradient>
                  <View style={styles.ratingStars}>
                    <View style={styles.starsRow}>
                      {renderStars(4)}
                    </View>
                    <Text style={styles.totalReviews}>Based on {reviews.length} reviews</Text>
                  </View>
                </View>
              </View>
              <TouchableOpacity>
                <LinearGradient
            colors={color.buttLinearGradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.writeReviewBtn}
                >
                  <Text style={styles.writeReviewText}>Write Review</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>

            <FlatList
              data={reviews}
              renderItem={renderReviewItem}
              keyExtractor={item => item.id}
              scrollEnabled={false}
            />
          </View>
        )}

        {/* ---------------- ADDRESS BOX ---------------- */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Delivery Address</Text>
            <View style={styles.titleUnderline} />
          </View>
          <TouchableOpacity style={styles.addressCard}>
            <LinearGradient
            colors={color.buttLinearGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.addressGradient}
            >
              <Ionicons name="add-circle-outline" size={24} color="#FFF" />
              <Text style={styles.addAddressText}>Add New Address</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* ---------------- OFFER BOX ---------------- */}
        <View style={styles.section}>
          <LinearGradient
            colors={['rgba(245, 128, 33, 0.1)', 'rgba(134, 46, 146, 0.1)']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.offerCard}
          >
            <Text style={styles.offerPrice}>Get at ₹2,214</Text>
            <Text style={styles.offerDetails}>With Coupon + Bank Offer</Text>
            <TouchableOpacity style={styles.viewOffersBtn}>
              <Text style={styles.viewOffersText}>View All Offers</Text>
              <Ionicons name="arrow-forward" size={16} color="#F58021" />
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </ScrollView>

      {/* ---------------- BOTTOM BUTTONS ---------------- */}
      <LinearGradient
        colors={['rgba(255, 255, 255, 0.95)', 'rgba(255, 255, 255, 1)']}
        style={styles.bottomBar}
      >
        <TouchableOpacity style={styles.wishlistBtn}>
          <Ionicons name="heart-outline" size={24} color="#333" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.cartBtn} 
         onPress={()=>{
          navigateToScreen(ScreenNameEnum.CheckoutScreen)
        }}
        >
          <LinearGradient
            colors={color.buttLinearGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.cartGradient}
          >
            <Ionicons name="bag-handle-outline" size={20} color="#FFF" />
            <Text style={styles.cartText}>Add to Bag</Text>
          </LinearGradient>
        </TouchableOpacity>
        <TouchableOpacity 
        
        onPress={()=>{
          navigateToScreen(ScreenNameEnum.CheckoutScreen)
        }}
        style={styles.buyBtn}>
          <Text style={styles.buyText}>Buy Now</Text>
        </TouchableOpacity>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f8f9fa" },
  imageContainer: {
    position: "relative",
  },
  mainImage: {
    width: width,
    height: width * 1.8,
    resizeMode: "cover",
  },
  backButton: {
    position: "absolute",
    top: 50,
    left: 16,
    borderRadius: 25,
    overflow: "hidden",
  },
  backButtonGradient: {
    width: 40,
    height: 40,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
  },
  imageIndicatorContainer: {
    position: "absolute",
    bottom: 20,
    flexDirection: "row",
    alignSelf: "center",
    backgroundColor: "rgba(0,0,0,0.3)",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
  },
  imageIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "rgba(255,255,255,0.5)",
    marginHorizontal: 3,
  },
  activeIndicator: {
    backgroundColor: "#FFF",
    width: 20,
  },
  section: {
    padding: 16,
    backgroundColor: "#fff",
    marginBottom: 8,
  },
  sectionHeader: {
    marginBottom: 16,
  },
  titleUnderline: {
    width: 40,
    height: 3,
    backgroundColor: '#F58021',
    marginTop: 4,
    borderRadius: 2,
  },
  brand: {
    fontSize: 22,
    fontWeight: "800",
    color: "#222",
  },
  productTitle: {
    fontSize: 16,
    color: "#666",
    marginTop: 4,
    lineHeight: 22,
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 12,
    gap: 8,
  },
  ratingBox: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  ratingText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "700",
  },
  ratingCount: {
    fontSize: 13,
    color: "#666",
  },
  ratingSeparator: {
    fontSize: 12,
    color: "#999",
  },
  priceRow: {
    flexDirection: "row",
    marginTop: 12,
    alignItems: "center",
  },
  price: {
    fontSize: 26,
    fontWeight: "800",
    color: "#222",
  },
  mrp: {
    fontSize: 16,
    marginLeft: 12,
    textDecorationLine: "line-through",
    color: "#999",
  },
  discountBadge: {
    marginLeft: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  discount: {
    fontSize: 13,
    color: "#fff",
    fontWeight: "700",
  },
  sizeHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#222",
  },
  sizeGuide: {
    fontSize: 14,
    color: "#F58021",
    fontWeight: "600",
  },
  sizeRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  sizeBtn: {
    borderWidth: 1,
    borderColor: "#ddd",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    minWidth: 60,
    alignItems: "center",
    backgroundColor: "#f8f9fa",
  },
  activeSize: {
    backgroundColor: "#F58021",
    borderColor: "#F58021",
  },
  sizeText: {
    fontSize: 14,
    color: "#333",
    fontWeight: "600",
  },
  activeSizeText: {
    color: "#fff",
    fontWeight: "700",
  },
  tabContainer: {
    flexDirection: "row",
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  tab: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    marginRight: 20,
  },
  activeTab: {
    borderBottomWidth: 3,
    borderBottomColor: "#F58021",
  },
  tabText: {
    fontSize: 14,
    color: "#666",
    fontWeight: "600",
  },
  activeTabText: {
    color: "#F58021",
    fontWeight: "700",
  },
  descriptionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#222",
  },
  descriptionText: {
    fontSize: 14,
    color: "#444",
    lineHeight: 24,
  },
  specsContainer: {
    backgroundColor: "#f8f9fa",
    borderRadius: 12,
    overflow: "hidden",
  },
  specRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  specRowEven: {
    backgroundColor: "#f0f0f0",
  },
  specLabel: {
    fontSize: 14,
    color: "#666",
    fontWeight: "500",
    flex: 1,
  },
  specValue: {
    fontSize: 14,
    color: "#222",
    fontWeight: "600",
    flex: 1,
    textAlign: "right",
  },
  reviewsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 20,
  },
  overallRating: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  overallRatingCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
  },
  overallRatingText: {
    fontSize: 22,
    fontWeight: "800",
    color: "#fff",
  },
  ratingStars: {
    flexDirection: "column",
  },
  starsRow: {
    flexDirection: "row",
    marginBottom: 4,
  },
  star: {
    fontSize: 16,
    color: "#FFB800",
    marginRight: 2,
  },
  totalReviews: {
    fontSize: 13,
    color: "#666",
  },
  writeReviewBtn: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
  },
  writeReviewText: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "700",
  },
  reviewItem: {
    backgroundColor: "#f8f9fa",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#eee",
  },
  reviewHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  reviewUserName: {
    fontSize: 15,
    fontWeight: "700",
    color: "#222",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6,
  },
  reviewDate: {
    fontSize: 12,
    color: "#666",
    marginLeft: 12,
  },
  verifiedBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
  },
  verifiedText: {
    fontSize: 10,
    color: "#fff",
    fontWeight: "700",
  },
  reviewComment: {
    fontSize: 14,
    color: "#444",
    lineHeight: 20,
  },
  addressCard: {
    borderRadius: 12,
    overflow: "hidden",
  },
  addressGradient: {
    padding: 20,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  addAddressText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
  offerCard: {
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#F58021",
  },
  offerPrice: {
    fontSize: 22,
    fontWeight: "800",
    color: "#F58021",
  },
  offerDetails: {
    color: "#666",
    fontSize: 14,
    marginTop: 4,
  },
  viewOffersBtn: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 12,
  },
  viewOffersText: {
    color: "#F58021",
    fontSize: 14,
    fontWeight: "600",
    marginRight: 6,
  },
  bottomBar: {
    flexDirection: "row",
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "#eee",
    alignItems: "center",
    gap: 12,
  },
  wishlistBtn: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#f0f0f0",
    alignItems: "center",
    justifyContent: "center",
  },
  cartBtn: {
    flex: 1,
    borderRadius: 25,
    overflow: "hidden",
  },
  cartGradient: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  cartText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
  buyBtn: {
    flex: 1,
    backgroundColor: "#333",
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
  },
  buyText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
});
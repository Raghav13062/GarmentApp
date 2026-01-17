import { Dimensions, Platform, StyleSheet } from "react-native";
import { color } from "../../../constant";
 const { width } = Dimensions.get("window");
 
export const styles = StyleSheet.create({
   container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  mainImage: {
    width,
    aspectRatio: 3 / 4,
    resizeMode: "stretch",
  },

  backButton: {
    position: "absolute",
    top: Platform.OS === "ios" ? 55 : 40,
    left: 16,
  },
  off: {
  fontSize: 12,
  fontWeight: "700",
  color: "#FF7A00",
  flexShrink: 1,      // ⭐ text cut nahi hoga
  flexWrap: "wrap",
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

  activeDot: {
    backgroundColor: "#fff",
    width: 20,
  },

  section: {
    padding: 16,
  },

  brand: {
    fontSize: 22,
    fontWeight: "800",
  },

  title: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 6,
  },

  desc: {
    fontSize: 14,
    color: "#555",
    lineHeight: 22,
  },

  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },

  ratingCount: {
    color: "#666",
  },

  priceRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 12,
  },

  price: {
    fontSize: 26,
    fontWeight: "800",
  },

  mrp: {
    marginLeft: 10,
    textDecorationLine: "line-through",
    color: "#999",
  },

  discountBadge: {
    height: 24,
    paddingHorizontal: 10,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
    borderRadius: 6,
  },

  discount: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "700",
  },

  bottomBar: {
    flexDirection: "row",
    padding: 16,
    paddingBottom: Platform.OS === "ios" ? 30 : 16,
    backgroundColor: "#fff",
  },

  cartBtn: {
    flex: 1,
    marginRight: 10,
  },

  cartGradient: {
    height: 50,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
  },

  cartText: {
    color: "#fff",
    fontWeight: "700",
  },

  buyBtn: {
    flex: 1,
    backgroundColor: "#222",
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
  },

  buyText: {
    color: "#fff",
    fontWeight: "700",
  },

  });

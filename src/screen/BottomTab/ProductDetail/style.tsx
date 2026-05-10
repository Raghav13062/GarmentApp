import { Dimensions, Platform, StyleSheet } from "react-native";
import { color } from "../../../constant";
 const { width } = Dimensions.get("window");
 
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FDFBFA",
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
  ratingSubText: {
  fontSize: 12,
  fontWeight: '400',
  color: '#666',
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

  sectionHeader: {
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 2,
    color: "#333",
    marginBottom: 6,
  },
  variantBox: {
    borderWidth: 1,
    borderColor: "#E5E5E5",
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: "#FAFAFA",
    marginRight: 10,
    marginBottom: 10,
    borderRadius: 2,
  },
  variantBoxSelected: {
    borderColor: "#111",
    backgroundColor: "#fff",
  },
  variantText: {
    fontSize: 13,
    color: "#666",
    fontWeight: "500",
  },
  variantTextSelected: {
    color: "#111",
    fontWeight: "700",
  },
  themeBottomBar: {
    flexDirection: "row",
    padding: 16,
    paddingBottom: Platform.OS === "ios" ? 30 : 16,
    backgroundColor: "#FDFBFA",
    borderTopWidth: 1,
    borderColor: "#E5E5E5",
  },
  themeBtnGradient: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
    borderRadius: 25,
  },
  themeBtnText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 15,
  },
  themeBtnBuy: {
    flex: 1,
    backgroundColor: "#222",
    marginLeft: 8,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
  },
  themeBtnBuyText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 15,
  },
});

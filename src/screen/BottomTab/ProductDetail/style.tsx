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
    fontSize: 15,
    fontWeight: "400",
    fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif',
    color: "#111",
    letterSpacing: 4,
    marginBottom: 16,
  },
  variantBox: {
    borderWidth: 1,
    borderColor: "#D9D9D9",
    backgroundColor: "transparent",
    marginRight: 12,
    marginBottom: 12,
    borderRadius: 0,
  },
  variantBoxSelected: {
    borderColor: "#111",
    borderWidth: 1.5,
    backgroundColor: "transparent",
  },
  variantText: {
    fontSize: 14,
    color: "#555",
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
    alignItems: "center",
  },
  favoriteBtn: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: "#E5E5E5",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  themeBtnGradient: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
    borderRadius: 10,
  },
  themeBtnText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
    letterSpacing: 1,
  },
});

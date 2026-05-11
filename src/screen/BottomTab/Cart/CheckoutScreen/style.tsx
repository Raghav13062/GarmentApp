import { color } from "../../../../constant";
import { Dimensions, Platform, StyleSheet } from "react-native";
  const { width } = Dimensions.get("window");
 const BRAND_COLORS = {
  primaryGradient: [color.primary, color.secondary],
  primaryDark: color.secondary,
  primaryLight: color.primary,
  background: color.backgroundLight,
  textDark: '#2D3436',
  textLight: color.white,
  cardBg: color.white,
  gray: '#757575',
  lightGray: color.borderLight,
};
export const styles = StyleSheet.create({

    container: { flex: 1, backgroundColor: BRAND_COLORS.background },

  header: {
    height: 56,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTitle: { color: color.white, fontSize: 18, fontWeight: 'bold' },

  card: {
    backgroundColor: color.white,
    margin: 16,
    borderRadius: 12,
    padding: 16,
    elevation: 2,
  },

  sectionTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 12 },

  orderItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  image: { width: 60, height: 60, borderRadius: 8 },
  title: { fontSize: 14, fontWeight: '600' },
  brand: { fontSize: 12, color: BRAND_COLORS.primaryDark },
  qty: { fontSize: 12, color: BRAND_COLORS.gray },
  price: { fontWeight: 'bold', color: BRAND_COLORS.primaryDark },

  paymentOption: {
    padding: 12,
    borderWidth: 1,
    borderColor: BRAND_COLORS.lightGray,
    borderRadius: 8,
    marginBottom: 8,
  },
  paymentSelected: {
    borderColor: BRAND_COLORS.primaryDark,
    backgroundColor: '#f7eefe',
  },
  paymentText: { textAlign: 'center', fontWeight: '600' },

  row: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  label: { color: BRAND_COLORS.textDark },
  value: { fontWeight: '600' },
  bold: { fontWeight: 'bold', fontSize: 16 },

  divider: { height: 1, backgroundColor: '#eee', marginVertical: 10 },

  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: color.white,
    elevation: 10,
  },
  off: {
    fontSize: 12,
    fontWeight: "700",
    color: "#FF7A00",
    flexShrink: 1,      // ⭐ text cut nahi hoga
    flexWrap: "wrap",
  },
  footerAmount: { fontSize: 20, fontWeight: 'bold' },
  orderBtn: {
    backgroundColor: BRAND_COLORS.primaryDark,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  orderText: { color: color.white, fontWeight: 'bold' },

   });

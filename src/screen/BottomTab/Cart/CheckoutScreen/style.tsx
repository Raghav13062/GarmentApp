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

  headerGradient: {
    paddingHorizontal: 16,
    paddingBottom: 12,
    elevation: 5,
    shadowColor: color.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    zIndex: 10,
    overflow: 'hidden',
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backBtn: {
    padding: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 20,
  },
  headerTitle: { color: color.white, fontSize: 20, fontWeight: 'bold' },

  card: {
    backgroundColor: color.white,
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 16,
    padding: 16,
    elevation: 3,
    shadowColor: color.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },

  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: BRAND_COLORS.textDark, marginBottom: 16 },

  orderItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  image: { width: 64, height: 64, borderRadius: 10, backgroundColor: BRAND_COLORS.lightGray },
  title: { fontSize: 15, fontWeight: '600', color: BRAND_COLORS.textDark, marginBottom: 4 },
  brand: { fontSize: 13, color: BRAND_COLORS.primaryLight, marginBottom: 4 },
  qty: { fontSize: 13, color: BRAND_COLORS.gray },
  price: { fontWeight: 'bold', fontSize: 16, color: BRAND_COLORS.textDark },

  paymentOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 14,
    borderWidth: 1.5,
    borderColor: BRAND_COLORS.lightGray,
    borderRadius: 12,
    marginBottom: 12,
    backgroundColor: BRAND_COLORS.cardBg,
  },
  paymentSelected: {
    borderColor: BRAND_COLORS.primaryLight,
    backgroundColor: '#F3EFFF',
  },
  paymentOptionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  iconContainerSelected: {
    backgroundColor: color.white,
  },
  paymentText: {
    fontSize: 15,
    fontWeight: '600',
    color: BRAND_COLORS.textDark,
  },
  paymentTextSelected: {
    color: BRAND_COLORS.primaryLight,
  },
  radioCircle: {
    height: 22,
    width: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: BRAND_COLORS.lightGray,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioCircleSelected: {
    borderColor: BRAND_COLORS.primaryLight,
  },
  radioDot: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: BRAND_COLORS.primaryLight,
  },

  row: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  label: { color: BRAND_COLORS.gray, fontSize: 14 },
  value: { fontWeight: '600', color: BRAND_COLORS.textDark, fontSize: 14 },
  bold: { fontWeight: 'bold', fontSize: 16, color: BRAND_COLORS.textDark },

  divider: { height: 1, backgroundColor: '#E0E0E0', marginVertical: 12 },

  footer: {
    backgroundColor: color.white,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: Platform.OS === 'ios' ? 30 : 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 15,
    shadowColor: color.black,
    shadowOffset: { width: 0, height: -5 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
  },
  off: {
    fontSize: 12,
    fontWeight: "700",
    color: "#FF7A00",
    flexShrink: 1,      // ⭐ text cut nahi hoga
    flexWrap: "wrap",
  },
  footerLabel: {
    fontSize: 13,
    color: BRAND_COLORS.gray,
    marginBottom: 4,
  },
  footerAmount: {
    fontSize: 22,
    fontWeight: 'bold',
    color: BRAND_COLORS.textDark,
  },
  orderBtn: {
    width: 160,
    height: 50,
    borderRadius: 25,
    overflow: 'hidden',

  },
  orderBtnContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  orderText: {
    color: color.white,
    fontSize: 15,
    fontWeight: 'bold'
  },
});

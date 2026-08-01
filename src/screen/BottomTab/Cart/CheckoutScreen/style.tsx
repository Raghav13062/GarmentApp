import { color, fonts, spacing, radius, shadows } from "../../../../constant";
import { Dimensions, Platform, StyleSheet } from "react-native";
const { width } = Dimensions.get("window");
const BRAND_COLORS = {
  primaryGradient: color.primaryGradient,
  primaryDark: color.primaryDark,
  primaryLight: color.primary,
  background: color.background,
  textDark: color.textDark,
  textLight: color.white,
  cardBg: color.white,
  gray: color.textMedium,
  lightGray: color.borderLight,
};
export const styles = StyleSheet.create({

  container: { flex: 1, backgroundColor: color.background },

  headerGradient: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.md,
    ...shadows.md,
    zIndex: 10,
    overflow: 'hidden',
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backBtn: {
    padding: spacing.sm,
    backgroundColor: color.whiteAlpha20,
    borderRadius: 20,
  },
  headerTitle: { color: color.white, fontSize: 20, fontFamily: fonts.bold },

  card: {
    backgroundColor: color.card,
    marginHorizontal: spacing.lg,
    marginTop: spacing.lg,
    borderRadius: radius.xl,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: color.borderLight,
    ...shadows.card,
  },

  sectionTitle: { fontSize: 18, fontFamily: fonts.bold, color: BRAND_COLORS.textDark, marginBottom: spacing.lg },

  orderItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  image: { width: 64, height: 64, borderRadius: radius.md, backgroundColor: color.lightGray },
  title: { fontSize: 15, fontFamily: fonts.semiBold, color: BRAND_COLORS.textDark, marginBottom: 4 },
  brand: { fontSize: 13, color: BRAND_COLORS.primaryLight, marginBottom: 4, fontFamily: fonts.medium },
  qty: { fontSize: 13, color: BRAND_COLORS.gray, fontFamily: fonts.regular },
  price: { fontFamily: fonts.bold, fontSize: 16, color: BRAND_COLORS.textDark },

  paymentOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 14,
    borderWidth: 1.5,
    borderColor: color.borderLight,
    borderRadius: radius.lg,
    marginBottom: spacing.md,
    backgroundColor: color.card,
  },
  paymentSelected: {
    borderColor: BRAND_COLORS.primaryLight,
    backgroundColor: color.primarySoft,
  },
  paymentOptionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: color.lightGray,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  iconContainerSelected: {
    backgroundColor: color.white,
  },
  paymentText: {
    fontSize: 15,
    fontFamily: fonts.semiBold,
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
    borderColor: color.borderLight,
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
  label: { color: BRAND_COLORS.gray, fontSize: 14, fontFamily: fonts.regular },
  value: { fontFamily: fonts.semiBold, color: BRAND_COLORS.textDark, fontSize: 14 },
  bold: { fontFamily: fonts.bold, fontSize: 16, color: BRAND_COLORS.textDark },

  divider: { height: 1, backgroundColor: color.borderLight, marginVertical: spacing.md },

  footer: {
    backgroundColor: color.card,
    borderTopLeftRadius: radius.xxl,
    borderTopRightRadius: radius.xxl,
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.lg,
    paddingBottom: Platform.OS === 'ios' ? 30 : 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    ...shadows.lg,
  },
  off: {
    fontSize: 12,
    fontFamily: fonts.bold,
    color: color.warning,
    flexShrink: 1,
    flexWrap: "wrap",
  },
  footerLabel: {
    fontSize: 13,
    color: BRAND_COLORS.gray,
    marginBottom: 4,
    fontFamily: fonts.regular,
  },
  footerAmount: {
    fontSize: 22,
    fontFamily: fonts.bold,
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
    fontFamily: fonts.bold,
  },
});

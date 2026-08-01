import { StyleSheet, Dimensions, Platform } from 'react-native';
import { color, fonts, spacing, radius, shadows } from '../../../constant';

const { height } = Dimensions.get('window');

export const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: color.primaryDark,
  },

  keyboardAvoidingView: {
    flex: 1,
  },

  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'flex-end',
  },

  backgroundOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },

  darkOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: color.overlayDark,
  },

  contentContainer: {
    flex: 1,
    justifyContent: 'space-between',
    minHeight: height,
  },

  topSection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: Platform.OS === 'ios' ? 60 : 80,
    paddingBottom: spacing.xxxl + 8,
  },

  logo: {
    width: 150,
    height: 150,
    borderRadius: radius.pill,
  },

  appName: {
    fontSize: 32,
    fontFamily: fonts.extraBold,
    color: color.white,
    letterSpacing: 2,
    textAlign: 'center',
  },

  appTagline: {
    fontSize: 14,
    fontFamily: fonts.regular,
    color: color.white,
    opacity: 0.8,
    marginTop: spacing.xs,
    textAlign: 'center',
    letterSpacing: 1,
  },

  bottomSheet: {
    backgroundColor: color.background,
    borderTopLeftRadius: radius.xxl,
    borderTopRightRadius: radius.xxl,
    paddingTop: spacing.md,
    ...shadows.lg,
    minHeight: height * 0.6,
  },

  handleBar: {
    width: 40,
    height: 4,
    backgroundColor: color.borderLight,
    borderRadius: radius.sm,
    alignSelf: 'center',
    marginBottom: spacing.xxxl - 2,
  },

  bottomSheetContent: {
    paddingHorizontal: spacing.xxxl - 2,
    paddingBottom: Platform.OS === 'ios' ? spacing.xxxl + 8 : spacing.xxxl - 2,
  },

  headerContainer: {
    marginBottom: spacing.xxxl + 3,
  },

  welcomeText: {
    fontSize: 28,
    fontFamily: fonts.extraBold,
    color: color.textDark,
  },

  subHeaderText: {
    fontSize: 16,
    fontFamily: fonts.regular,
    color: color.textMedium,
    marginTop: spacing.xs,
  },

  inputSection: {
    marginBottom: spacing.md + 3,
  },

  inputContainer: {
    backgroundColor: color.white,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: color.borderLight,
    height: 48,
    paddingHorizontal: spacing.md + 3,
  },

  inputField: {
    flex: 1,
    fontSize: 16,
    fontFamily: fonts.regular,
    color: color.textDark,
    paddingLeft: spacing.sm + 2,
  },

  forgotPasswordContainer: {
    alignItems: 'flex-end',
    marginBottom: spacing.xl + 5,
  },

  forgotPasswordText: {
    color: color.primary,
    fontSize: 14,
    fontFamily: fonts.semiBold,
  },

  termsRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: spacing.xxl + 4,
    paddingHorizontal: 2,
  },

  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 1.6,
    borderColor: color.borderLight,
    borderRadius: radius.sm,
    marginRight: spacing.md,
    marginTop: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: color.white,
  },

  checkboxActive: {
    backgroundColor: color.primary,
    borderColor: color.primary,
  },

  checkboxInner: {
    width: 12,
    height: 12,
    borderRadius: radius.sm / 2,
  },

  termsText: {
    flex: 1,
    fontSize: 14,
    color: color.textMedium,
    lineHeight: 21,
    fontFamily: fonts.regular,
  },

  termsLink: {
    color: color.primary,
    fontFamily: fonts.bold,
    textDecorationLine: 'underline',
  },

  buttonSection: {
    marginBottom: spacing.xl + 5,
  },

  loginButtonBase: {
    height: 48,
    borderRadius: radius.md,
    overflow: 'hidden',
    ...shadows.md,
  },

  loginButtonGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  loginButtonDisabled: {
    opacity: 0.6,
  },

  loginButtonText: {
    color: color.white,
    fontSize: 16,
    fontFamily: fonts.extraBold,
  },

  footerContainer: {
    alignItems: 'center',
    marginTop: spacing.sm + 2,
  },

  footerText: {
    fontSize: 14,
    fontFamily: fonts.regular,
    color: color.textMedium,
  },

  footerLink: {
    color: color.primary,
    fontFamily: fonts.bold,
  },

  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: spacing.xl + 5,
  },

  divider: {
    flex: 1,
    height: 1,
    backgroundColor: color.borderLight,
  },

  dividerText: {
    paddingHorizontal: spacing.md + 3,
    color: color.textMedium,
    fontSize: 12,
    fontFamily: fonts.semiBold,
    letterSpacing: 1,
  },

  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.xl,
  },

  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '48%',
    height: 48,
    borderRadius: radius.lg,
    backgroundColor: color.white,
    borderWidth: 1,
    borderColor: color.borderLight,
    ...shadows.sm,
  },

  socialIcon: {
    width: 20,
    height: 20,
    marginRight: spacing.sm + 2,
  },

  socialButtonText: {
    fontSize: 14,
    fontFamily: fonts.semiBold,
    color: color.textDark,
  },
});

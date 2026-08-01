import { StyleSheet, Dimensions, Platform } from 'react-native';
import { color, fonts, spacing, radius, shadows } from '../../../constant';

const { width, height } = Dimensions.get('window');

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
    marginBottom: spacing.xl + 5,
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
    lineHeight: 22,
  },

  phoneHighlight: {
    fontFamily: fonts.bold,
    color: color.primary,
  },

  changeButtonText: {
    color: color.primary,
    fontSize: 14,
    fontFamily: fonts.semiBold,
    marginTop: spacing.xs,
    textDecorationLine: 'underline',
  },

  otpSection: {
    marginBottom: spacing.xl + 5,
  },

  codeFieldRoot: {
    marginTop: spacing.sm + 2,
    justifyContent: 'space-between',
  },

  cell: {
    width: width * 0.14,
    height: 48,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: color.borderLight,
    backgroundColor: color.white,
    justifyContent: 'center',
    alignItems: 'center',
  },

  focusCell: {
    borderColor: color.primary,
    borderWidth: 2,
    backgroundColor: color.white,
  },

  filledCell: {
    borderColor: color.primary,
    backgroundColor: color.white,
  },

  cellText: {
    fontSize: 24,
    fontFamily: fonts.semiBold,
    color: color.textDark,
    textAlign: 'center',
  },

  resendContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: spacing.xl,
  },

  resendText: {
    fontSize: 14,
    fontFamily: fonts.regular,
    color: color.textMedium,
  },

  timerText: {
    color: color.primary,
    fontFamily: fonts.bold,
  },

  resendButtonText: {
    fontSize: 14,
    color: color.primary,
    fontFamily: fonts.bold,
  },

  buttonSection: {
    marginBottom: spacing.xl + 5,
  },

  verifyButton: {
    height: 48,
    borderRadius: radius.md,
    overflow: 'hidden',
    ...shadows.md,
  },

  verifyButtonGradient: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  verifyButtonDisabled: {
    opacity: 0.6,
  },

  verifyButtonText: {
    color: color.white,
    fontSize: 16,
    fontFamily: fonts.extraBold,
    marginRight: spacing.sm,
  },

  backButton: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 50 : 30,
    left: spacing.xl,
    zIndex: 10,
    padding: spacing.sm + 2,
    backgroundColor: color.overlay,
    borderRadius: radius.xl,
  },
});

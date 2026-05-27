import { StyleSheet, Dimensions, Platform } from 'react-native';
import { color, fonts } from '../../../constant';

const { width, height } = Dimensions.get('window');

export const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#000',
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
    backgroundColor: 'rgba(0,0,0,0.5)',
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
    paddingBottom: 40,
  },

  logo: {
    width: 150,
    height: 150,
    borderRadius: 100
  },

  appName: {
    fontSize: 32,
    fontWeight: '900',
    color: color.white,
    letterSpacing: 2,
    textAlign: 'center',
  },

  appTagline: {
    fontSize: 14,
    color: color.white,
    opacity: 0.8,
    marginTop: 4,
    textAlign: 'center',
    letterSpacing: 1,
  },

  // Bottom Sheet Styles
  bottomSheet: {
    backgroundColor: color.white,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    paddingTop: 12,
    shadowColor: color.black,
    shadowOffset: { width: 0, height: -15 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    elevation: 25,
    minHeight: height * 0.6,
  },

  handleBar: {
    width: 40,
    height: 4,
    backgroundColor: '#E0E0E0',
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 30,
  },

  bottomSheetContent: {
    paddingHorizontal: 30,
    paddingBottom: Platform.OS === 'ios' ? 40 : 30,
  },

  headerContainer: {
    marginBottom: 35,
  },

  welcomeText: {
    fontSize: 28,
    fontWeight: '800',
    color: color.textDark,
  },

  subHeaderText: {
    fontSize: 16,
    color: color.textMedium,
    marginTop: 5,
  },

  inputSection: {
    marginBottom: 15,
  },

  inputContainer: {
    backgroundColor: '#F8F9FA',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#E9ECEF',
    height: 55,
    paddingHorizontal: 15,
  },

  inputField: {
    flex: 1,
    fontSize: 16,
    color: color.textDark,
    paddingLeft: 10,
  },

  forgotPasswordContainer: {
    alignItems: 'flex-end',
    marginBottom: 25,
  },

  forgotPasswordText: {
    color: color.primary,
    fontSize: 14,
    fontWeight: '600',
  },

  termsRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 28,
    paddingHorizontal: 2,
  },

  checkbox: {
    width: 22,
    height: 22,
    borderWidth: 1.6,
    borderColor: color.borderLight,
    borderRadius: 7,
    marginRight: 11,
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
    borderRadius: 3,
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
    marginBottom: 25,
  },

  loginButtonBase: {
    height: 55,
    borderRadius: 15,
    overflow: 'hidden',
    shadowColor: color.primary,
    shadowOffset: { width: 0, height: 8 },

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
    fontWeight: '800',
  },

  footerContainer: {
    alignItems: 'center',
    marginTop: 10,
  },

  footerText: {
    fontSize: 14,
    color: color.textMedium,
  },

  footerLink: {
    color: color.primary,
    fontWeight: 'bold',
  },

  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 25,
  },

  divider: {
    flex: 1,
    height: 1,
    backgroundColor: '#EEEEEE',
  },

  dividerText: {
    paddingHorizontal: 15,
    color: color.textMedium,
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 1,
  },

  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },

  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '48%',
    height: 50,
    borderRadius: 12,
    backgroundColor: color.white,
    borderWidth: 1,
    borderColor: '#EEEEEE',
    shadowColor: color.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },

  socialIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },

  socialButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: color.textDark,
  },
});

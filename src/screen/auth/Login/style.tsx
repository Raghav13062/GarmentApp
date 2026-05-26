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
    fontSize: 34,
    fontWeight: '900',
    color: color.white,
    letterSpacing: 2,
    textAlign: 'center',
    marginTop: 15,
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
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 25,
    minHeight: height * 0.55,
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
    textAlign: 'center',
  },

  subHeaderText: {
    fontSize: 16,
    color: color.textMedium,
    marginTop: 5,
    fontWeight: '500',
    textAlign: 'center',
  },

  inputSection: {
    marginBottom: 15,
  },

  inputContainer: {
    backgroundColor: '#F8F9FA',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#E9ECEF',
    height: 60,
    paddingHorizontal: 20,
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
    alignItems: 'center',
    marginBottom: 30,
  },

  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1.5,
    borderColor: color.primary,
    borderRadius: 6,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },

  checkboxActive: {
    backgroundColor: color.primary,
  },

  checkboxInner: {
    width: 10,
    height: 10,
    backgroundColor: color.white,
    borderRadius: 2,
  },

  termsText: {
    fontSize: 13,
    color: color.textMedium,
    textAlign: 'center',
    lineHeight: 20,
  },

  termsLink: {
    color: color.primary,
    fontWeight: '700',
  },

  buttonSection: {
    marginBottom: 20,
    marginTop: 10,
  },

  loginButtonBase: {
    height: 55,
    borderRadius: 15,
    overflow: 'hidden',
    shadowColor: color.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
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
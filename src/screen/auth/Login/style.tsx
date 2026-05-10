import { StyleSheet, Dimensions, Platform } from 'react-native';
import { color, fonts } from '../../../constant';

const { width, height } = Dimensions.get('window');

export const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#EAEAEA', // Darker gray so bottom sheet pops
  },

  keyboardAvoidingView: {
    flex: 1,
  },

  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'flex-end', // Push everything down
  },

  backgroundOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#EAEAEA',
  },

  darkOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.4)', // Dark overlay so logo pops
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
    paddingTop: Platform.OS === 'ios' ? 40 : 60,
    paddingBottom: 40,
  },

  logo: {
    width: 110,
    height: 110,
    borderRadius: 55,
    borderWidth: 2,
    borderColor: '#FFFFFF',
    marginBottom: 16,
  },

  appTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: color.primary,
    marginBottom: 8,
  },

  appTagline: {
    fontSize: 16,
    color: '#666',
    opacity: 0.8,
  },

  // Bottom Sheet Styles
  bottomSheet: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    paddingTop: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 20,
    minHeight: height * 0.65, // Taller so it looks prominent
  },

  handleBar: {
    width: 45,
    height: 5,
    backgroundColor: '#D1D1D1',
    borderRadius: 3,
    alignSelf: 'center',
    marginBottom: 24,
  },

  bottomSheetContent: {
    paddingHorizontal: 24,
    paddingBottom: Platform.OS === 'ios' ? 40 : 24,
  },

  headerContainer: {
    marginBottom: 24,
  },

  welcomeText: {
    fontSize: 24,
    fontWeight: '800',
    color: '#333333',
  },

  welcomeTextLight: {
    fontWeight: '400',
    color: '#4A4A52',
    fontSize: 20,
  },

  inputSection: {
    marginBottom: 24,
  },

  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#D4D5D9',
    height: 60,
  },

  prefixContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  prefixText: {
    fontSize: 16,
    color: '#94969F',
    fontWeight: '500',
  },

  verticalDivider: {
    width: 1,
    height: 20,
    backgroundColor: '#D4D5D9',
    marginHorizontal: 12,
  },

  inputField: {
    flex: 1,
    fontSize: 16,
    color: '#282C3F',
    height: '100%',
  },

  termsRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 24,
    paddingRight: 10,
  },

  checkbox: {
    width: 18,
    height: 18,
    borderWidth: 1,
    borderColor: '#7E818C',
    borderRadius: 3,
    marginRight: 12,
    marginTop: 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },

  checkboxActive: {
    backgroundColor: color.primary,
    borderColor: color.primary,
  },

  checkboxInner: {
    width: 10,
    height: 10,
    backgroundColor: '#fff',
    borderRadius: 1,
  },

  termsText: {
    flex: 1,
    fontSize: 14,
    color: '#4A4A52',
    lineHeight: 20,
  },

  termsLink: {
    color: color.primary,
    fontWeight: '700',
  },

  buttonSection: {
    marginBottom: 24,
  },

  loginButtonBase: {
    height: 50,
    borderRadius: 25,
    overflow: 'hidden',
  },

  loginButtonGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  loginButtonDisabled: {
    backgroundColor: '#94969F',
  },

  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 1,
  },

  footerContainer: {
    alignItems: 'flex-start',
    marginTop: 8,
  },

  footerText: {
    fontSize: 14,
    color: '#4A4A52',
  },

  footerLink: {
    color: color.primary,
    fontWeight: '700',
  },
});
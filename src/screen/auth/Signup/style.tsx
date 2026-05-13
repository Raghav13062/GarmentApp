import { color, fonts } from "../../../constant";
import { StyleSheet, Dimensions, Platform } from "react-native";

const { width, height } = Dimensions.get('window');

export const styles = StyleSheet.create({
  bgContainer: {
    flex: 1,
    backgroundColor: color.white,
  },
  
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 40,
  },

  mainContainer: {
    flex: 1,
    paddingHorizontal: 24,
  },

  headerSection: {
    marginTop: Platform.OS === 'ios' ? 20 : 40,
    marginBottom: 35,
  },

  txtHeading: {
    fontSize: 32,
    fontWeight: '800',
    color: color.textDark,
    letterSpacing: 0.5,
  },

  txtDes: {
    fontSize: 16,
    color: color.textMedium,
    marginTop: 8,
    fontFamily: fonts.regular,
  },

  formContainer: {
    width: '100%',
  },

  inputWrapper: {
    marginBottom: 18,
  },

  inputContainer: {
    backgroundColor: '#F8F9FA',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#E9ECEF',
    height: 58,
    paddingHorizontal: 15,
    marginTop: 0, // Override default margin
  },

  termsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
    marginBottom: 30,
    paddingHorizontal: 2,
  },

  checkbox: {
    width: 22,
    height: 22,
    borderWidth: 1.5,
    borderColor: color.primary,
    borderRadius: 6,
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: color.white,
  },

  checkboxActive: {
    backgroundColor: color.primary,
  },

  termsText: {
    flex: 1,
    fontSize: 13,
    color: color.textMedium,
    lineHeight: 18,
  },

  linkText: {
    color: color.primary,
    fontWeight: '700',
  },

  signupButton: {
    height: 55,
    borderRadius: 15,
    overflow: 'hidden',
    shadowColor: color.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },

  gradientButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonText: {
    color: color.white,
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 1,
  },

  loginLinkContainer: {
    marginTop: 35,
    alignItems: 'center',
    marginBottom: 20,
  },

  loginLinkText: {
    fontSize: 15,
    color: color.textMedium,
  },

  loginLinkHighlight: {
    color: color.primary,
    fontWeight: 'bold',
  },
});

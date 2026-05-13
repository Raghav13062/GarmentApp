import { color, fonts } from "../../../constant";
import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get('window');

export const styles = StyleSheet.create({
  bgContainer: {
    flex: 1,
    backgroundColor: color.white,
  },
  
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 30,
  },

  mainContainer: {
    flex: 1,
    paddingHorizontal: 25,
  },

  headerSection: {
    marginTop: 30,
    marginBottom: 30,
    alignItems: 'center',
  },

  txtHeading: {
    fontSize: 32,
    fontWeight: '800',
    color: color.textDark,
    letterSpacing: 1,
  },

  txtDes: {
    fontSize: 16,
    color: color.textMedium,
    marginTop: 8,
  },

  formContainer: {
    width: '100%',
  },

  inputWrapper: {
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

  errorText: {
    color: color.error,
    fontSize: 12,
    marginTop: 4,
    marginLeft: 5,
    fontWeight: '500',
  },

  termsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 30,
    paddingHorizontal: 5,
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
  },

  checkboxActive: {
    backgroundColor: color.primary,
  },

  checkboxInner: {
    width: 12,
    height: 12,
    backgroundColor: color.white,
    borderRadius: 2,
  },

  termsText: {
    flex: 1,
    fontSize: 14,
    color: color.textMedium,
    lineHeight: 20,
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
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },

  gradientButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonText: {
    color: color.white,
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: 1.5,
  },

  loginLinkContainer: {
    marginTop: 30,
    alignItems: 'center',
  },

  loginLinkText: {
    fontSize: 15,
    color: color.textMedium,
  },

  loginLinkHighlight: {
    color: color.secondary,
    fontWeight: '800',
  },
});

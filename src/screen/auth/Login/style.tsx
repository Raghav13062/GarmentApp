import { StyleSheet, Dimensions, Platform } from 'react-native';
import { color, fonts } from '../../../constant';

const { width, height } = Dimensions.get('window');

export const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: color.baground,
  },
  
  keyboardAvoidingView: {
    flex: 1,
  },
  
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  
  backgroundOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'white',
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
    maxHeight: height * 0.4,
  },
  
  logo: {
    width: width * 0.77,
    height: width * 0.77,
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
    backgroundColor: color.white,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingTop: 16,
    shadowColor: color.primary,
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 10,
    minHeight: height * 0.6,
  },
  
  handleBar: {
    width: 40,
    height: 1.6,
    backgroundColor: color.primary,
    borderRadius: 1,
    alignSelf: 'center',
    marginBottom: 16,
  },
  
  bottomSheetContent: {
    paddingHorizontal: 24,
    paddingBottom: Platform.OS === 'ios' ? 40 : 24,
  },
  
  headerContainer: {
    marginBottom: 20,
  },
  
  welcomeText: {
    fontSize: 28,
    fontWeight: '700',
    color: color.black,
    marginBottom: 8,
  },
  
  subtitle: {
    fontSize: 14,
    color: color.grey,
    lineHeight: 22,
    
    },
  
  inputSection: {
    marginBottom: 32,

   },
  
  inputLabelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
    flex:1
  },
  
  inputLabel: {
    fontSize: 14,
     color: color.primary,
    flex:1 
    ,
    fontFamily:fonts.black
  },
  
  inputHint: {
    fontSize: 14,
    color: color.grey,
    
  },
  
  inputContainer: {
    backgroundColor: color.inputColor,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: color.borderColor,
    height: 60,
  },
  
  inputField: {
    fontSize: 16,
    color: '#1A1A1A',
  },
  
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    paddingHorizontal: 8,
  },
  
  errorText: {
    color: color.error,
    fontSize: 13,
    marginLeft: 6,
    fontWeight: '500',
  },
  
  buttonSection: {
    marginBottom: 32,
  },
  
  loginButton: {
    backgroundColor: color.primary,
    borderRadius: 16,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: color.primary,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  
  termsContainer: {
    marginTop: 22,
    paddingHorizontal: 8,
  },
  
  termsText: {
    fontSize: 13,
    color: '#999',
    textAlign: 'center',
    lineHeight: 18,
  },
  
  termsLink: {
    color: color.primary,
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
  
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 32,
  },
  
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: '#E9ECEF',
  },
  
  dividerText: {
    marginHorizontal: 16,
    color: '#999',
    fontSize: 14,
    fontWeight: '600',
  },
  
  alternativeOptions: {
    alignItems: 'center',
    marginBottom: Platform.OS === 'ios' ? 20 : 10,
  },
  
  alternativeButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#E9ECEF',
    borderRadius: 16,
    height: 56,
    width: '100%',
    marginBottom: 24,
  },
  
  alternativeButtonText: {
    color: '#1A1A1A',
    fontSize: 16,
    fontWeight: '600',
  },
  
  signupPrompt: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  signupText: {
    fontSize: 16,
    color: '#666',
  },
  
  signupLink: {
    fontSize: 16,
    fontWeight: '700',
    color: color.primary,
  },
});
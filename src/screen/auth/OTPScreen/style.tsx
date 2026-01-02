// style.ts
import { StyleSheet, Dimensions, Platform } from 'react-native';
import { color } from '../../../constant';

const { width, height } = Dimensions.get('window');

export const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: color.white,
  },
  
  backgroundOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: color.baground,
  },
  
  keyboardAvoidingView: {
    flex: 1,
  },
  
  scrollContainer: {
    flexGrow: 1,
  },
  
  contentContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  
  topSection: {
    flex: 0.4,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: Platform.OS === 'ios' ? 50 : 30,
  },
  
  otpImage: {
    width: width * 0.5,
    height: width * 0.5,
    marginBottom: 20,
  },
  
  bottomSheet: {
    flex: 0.6,
    backgroundColor: color.white,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingTop: 10,
    shadowColor: color.black,
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 10,
  },
  
  handleBar: {
    width: 40,
    height: 4,
    backgroundColor: color.borderColor,
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 20,
  },
  
  bottomSheetContent: {
    flex: 1,
  },
  
  headerContainer: {
    marginBottom: 30,
    alignItems: 'center',
  },
  
  welcomeText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: color.black,
    marginBottom: 10,
  },
  
  subtitle: {
    fontSize: 16,
    color: color.grey,
    textAlign: 'center',
    lineHeight: 22,
  },
  
  phoneNumberContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  
  phoneNumberText: {
    fontSize: 18,
    fontWeight: '600',
    color: color.primary,
    marginRight: 10,
  },
  
  changeButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: color.baground,
    borderRadius: 8,
     borderColor: color.primary,
  },
    logo: {
    width: width * 0.77,
    height: width * 0.77,
    marginBottom: 16,
  },
  changeButtonText: {
    fontSize: 14,
    color: color.primary,
    fontWeight: '600',
  },
  
  otpSection: {
    marginBottom: 40,
    alignItems: 'center',
  },
  
  otpLabel: {
    fontSize: 16,
    color: color.grey,
    marginBottom: 20,
    textAlign: 'center',
  },
  
  codeFieldRoot: {
    marginTop: 20,
    marginBottom: 20,
  },
  
  cell: {
    width: 43,
    height: 40,
    lineHeight: 58,
    fontSize: 25,
    borderWidth: 1,
    borderColor: color.borderColor,
    borderRadius: 10,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
    backgroundColor: color.inputColor,
  },
  
  cellText: {
    fontSize: 22,
    color: color.black,
    textAlign: 'center',
  },
  
  focusCell: {
    borderColor: color.primary,
    backgroundColor: color.white,
  },
  
  filledCell: {
    borderColor: color.primary,
    backgroundColor: color.baground,
  },
  
  resendContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  
  resendText: {
    fontSize: 16,
    color: color.grey,
  },
  
  timerText: {
    fontSize: 16,
    color: color.primary,
    fontWeight: '600',
  },
  
  resendButtonText: {
    fontSize: 16,
    color: color.primary,
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
  
  buttonSection: {
    marginBottom: 30,
  },
  
  helpContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  
  helpText: {
    fontSize: 14,
    color: color.grey,
    textAlign: 'center',
  },
  
  helpLink: {
    color: color.primary,
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
});
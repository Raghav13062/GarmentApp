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
    marginBottom: 25,
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
    lineHeight: 22,
  },

  phoneHighlight: {
    fontWeight: 'bold',
    color: color.primary,
  },

  changeButtonText: {
    color: color.primary,
    fontSize: 14,
    fontWeight: '600',
    marginTop: 5,
    textDecorationLine: 'underline',
  },

  otpSection: {
    marginBottom: 25,
  },

  codeFieldRoot: {
    marginTop: 10,
    justifyContent: 'space-between',
  },

  cell: {
    width: width * 0.14,
    height: 55,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#E9ECEF',
    backgroundColor: '#F8F9FA',
    justifyContent: 'center',
    alignItems: 'center',
  },

  focusCell: {
    borderColor: color.primary,
    borderWidth: 2,
    backgroundColor: '#FFFFFF',
  },

  filledCell: {
    borderColor: color.primary,
    backgroundColor: '#FFFFFF',
  },

  cellText: {
    fontSize: 24,
    color: color.textDark,
    textAlign: 'center',
  },

  resendContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },

  resendText: {
    fontSize: 14,
    color: color.textMedium,
  },

  timerText: {
    color: color.primary,
    fontWeight: 'bold',
  },

  resendButtonText: {
    fontSize: 14,
    color: color.primary,
    fontWeight: 'bold',
  },

  buttonSection: {
    marginBottom: 25,
  },

  verifyButton: {
    height: 55,
    borderRadius: 15,
    overflow: 'hidden',
    shadowColor: color.primary,
    shadowOffset: { width: 0, height: 8 },
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
    fontWeight: '800',
    marginRight: 8,
  },

  backButton: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 50 : 30,
    left: 20,
    zIndex: 10,
    padding: 10,
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: 20,
  },
});

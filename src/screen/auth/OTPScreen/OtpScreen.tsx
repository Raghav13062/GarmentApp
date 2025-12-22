import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableWithoutFeedback,
  TouchableOpacity, // ✅ यहाँ TouchableOpacity जोड़ें
  Keyboard,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import React from 'react';
import Loading from '../../../utils/Loader';
import imageIndex from '../../../assets/imageIndex';
import CustomButton from '../../../component/CustomButton';
import { styles } from './style';
import StatusBarComponent from '../../../component/StatusBarCompoent';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  CodeField,
  Cursor,
} from 'react-native-confirmation-code-field';
import useOtpVerification from './useOTPVerification';
import { color } from '../../../constant';

export default function OtpVerification() {
  const {
    phoneNumber,
    code,
     resendTimer,
    setCode,
    handleVerifyOtp,
    handleResendOtp,
    handleChangePhone,
   } = useOtpVerification();

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
       <KeyboardAvoidingView
          style={styles.keyboardAvoidingView}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
         >
      <SafeAreaView style={styles.main}>
        <StatusBarComponent translucent={true} backgroundColor="transparent" />
            {/* <Loading visible={true}/> */}
        <View style={styles.backgroundOverlay} />
       
          <ScrollView 
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContainer}
            keyboardShouldPersistTaps="handled"
          >                
          
        

            
            <View style={styles.contentContainer}>
              <View style={styles.topSection}>
                <Image 
                  source={imageIndex.logo}
                  style={styles.logo} 
                />
              </View>

              {/* Bottom Section */}
              <View style={styles.bottomSheet}>
                 
                <View style={styles.bottomSheetContent}>
                

                  <View style={styles.headerContainer}>
                    <Text style={styles.welcomeText}>OTP Verification</Text>
                    <Text style={styles.subtitle}>
                      We have sent a verification code to
                    </Text>
                    <View style={styles.phoneNumberContainer}>
                      <Text style={styles.phoneNumberText}>{phoneNumber}</Text>
                      <TouchableOpacity onPress={handleChangePhone} style={styles.changeButton}>
                        <Text style={styles.changeButtonText}>
                          
                          <Text style={{
                            color:color.black 
                          }}>959303820383 {" "}</Text>
                           Change</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                    <Text style={styles.otpLabel}>Enter 6-digit code</Text>

                  <View style={styles.otpSection}>
                    
                    <CodeField
                     blurOnSubmit={true}  // Keyboard dismiss on done
  returnKeyType="done"  // Shows done button on keyboard
                      value={code}
                      onChangeText={setCode}
                      cellCount={5}
                      
                       rootStyle={styles.codeFieldRoot}
                      keyboardType="number-pad"
                      textContentType="oneTimeCode"
                      renderCell={({index, symbol, isFocused}) => (
                        <View
                          key={index}
                          style={[
                            styles.cell,
                            isFocused && styles.focusCell,
                            symbol && styles.filledCell
                          ]}
                        >
                          <Text style={styles.cellText}>
                            {symbol || (isFocused ? <Cursor /> : null)}
                          </Text>
                        </View>
                      )}
                    />
                    
                    <View style={styles.resendContainer}>
                      {resendTimer > 0 ? (
                        <Text style={styles.resendText}>
                          Resend code in <Text style={styles.timerText}>{resendTimer}s</Text>
                        </Text>
                      ) : (
                        <TouchableOpacity onPress={handleResendOtp}>
                          <Text style={styles.resendButtonText}>Resend Code</Text>
                        </TouchableOpacity>
                      )}
                    </View>
                  </View>

                  <View style={styles.buttonSection}>
                    <CustomButton 
                      title="Verify & Continue" 
                      onPress={handleVerifyOtp}
                      // disabled={code.length !== 6}
                    />
                    
                    <View style={styles.helpContainer}>
                      <Text style={styles.helpText}>
                        Didn't receive the code?{' '}
                        {resendTimer === 0 && (
                          <Text style={styles.helpLink} onPress={handleResendOtp}>
                            Resend
                          </Text>
                        )}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </ScrollView>
      
      </SafeAreaView>
        </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}
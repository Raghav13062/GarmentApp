import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import React from 'react';
import Loading from '../../../utils/Loader';
import imageIndex from '../../../assets/imageIndex';
import CustomButton from '../../../component/CustomButton';
import CustomInput from '../../../component/CustomInput';
import Icon from '../../../component/Icon';
import useLogin from './useLogin';
import { styles } from './style';
import StatusBarComponent from '../../../component/StatusBarCompoent';
import { SafeAreaView } from 'react-native-safe-area-context';
import ErrorText from '../../../component/ErrorText';

export default function Login() {
  const {
    phone,
    phoneError,
    loading,
    handlePhoneChange,
    handleLogin,
    navigation,
  } = useLogin();

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <KeyboardAvoidingView
          style={styles.keyboardAvoidingView}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 30}
        >
      <SafeAreaView style={styles.main}>
        <StatusBarComponent translucent={true} backgroundColor="transparent" />
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

              {/* Bottom   */}
              <View style={styles.bottomSheet}>
                  
                
                <View style={styles.bottomSheetContent}>
                  {loading && <Loading />}

                  <View style={styles.headerContainer}>
                    <Text  allowFontScaling={false}  style={styles.welcomeText}>Welcome Back!</Text>
                    <Text  allowFontScaling={false}  style={styles.subtitle}>
                      Enter your mobile number to continue
                    </Text>
                  </View>
  <View style={styles.inputLabelContainer}>
                      <Text  allowFontScaling={false}  style={styles.inputLabel}>Mobile Number</Text>
                     </View>
                  <View style={styles.inputSection}>
                  
                    
                    <CustomInput
                      placeholder="Enter Mobile Number"
                      leftIcon={<Icon source={imageIndex.phone} size={20} />}
                      value={phone}
                      onChangeText={handlePhoneChange}
                      keyboardType="phone-pad"
                      maxLength={10}
                      containerStyle={styles.inputContainer}
                     />
                     <ErrorText error={phoneError} />

                 
                  </View>

                  <View style={styles.buttonSection}>
                    <CustomButton 
                      title="Continue" 
                      onPress={handleLogin}
                      // onPress={handleLogin}
                      />
                    
                    <View style={styles.termsContainer}>
                      <Text   allowFontScaling={false} style={styles.termsText}>
                        By continuing, you agree to our{' '}
                        <Text style={styles.termsLink}>Terms of Service</Text>
                        {' '}and{' '}
                        <Text   allowFontScaling={false} style={styles.termsLink}>Privacy Policy</Text>
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
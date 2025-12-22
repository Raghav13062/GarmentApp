import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import imageIndex from '../../../assets/imageIndex';
import CustomButton from '../../../component/CustomButton';
import CustomInput from '../../../component/CustomInput';
import Icon from '../../../component/Icon';
import CustomBackHeader from '../../../component/CustomBackHeader';
import LoadingModal from '../../../utils/Loader';
import ScreenNameEnum from '../../../routes/screenName.enum';
import { color } from '../../../constant';
import useSignup from './useSignup';
import { styles } from './style';

export default function Signup() {
  const {
    email,
    password,
    confirmPassword,
    emailError,
    passwordError,
    confirmPasswordError,
    loading,
    handlePasswordChange,
    handleConfirmPasswordChange,
    handleSignup,
    navigation,
    checked,
    setChecked,
    fname,
    gst,
    proof,
    fnameError,
    handlefNameChange,
    handleProofChange,
    handleGSTChange,
    phone,
    phoneError,
    handlePhoneChange
  } = useSignup();

  return (
    <SafeAreaView style={styles.bgContainer}>
      {loading && <LoadingModal />}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "padding"}
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.OS === "ios" ? 50 : 0}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView contentContainerStyle={{ flex: 1 }} showsVerticalScrollIndicator={false}>
            <View style={{ marginLeft: 15 }}>
              <CustomBackHeader menuIcon={imageIndex.back} label={""} />
            </View>

            <View style={styles.mainContainer}>
              <Text style={styles.txtHeading}>Sign Up</Text>
              <Text style={styles.txtDes}>Create your account to get started</Text>

              <View style={styles.inputContainer}>
                <CustomInput
                  placeholder="Full Name"
                  leftIcon={<Icon source={imageIndex.user} size={20} />}
                  value={fname}
                  onChangeText={handlefNameChange}
                />
                {fnameError && <Text style={styles.errorText}>{fnameError}</Text>}

                <CustomInput
                  placeholder="Phone Number"
                  leftIcon={<Icon source={imageIndex.phone} size={18} />}
                  value={phone}
                  onChangeText={handlePhoneChange}
                  keyboardType='phone-pad'
                />
                {phoneError && <Text style={styles.errorText}>{phoneError}</Text>}

                <View style={{ flexDirection: "row", width: "100%" }}>
                  <View style={{ width: "50%" }}>
                    <CustomInput
                      placeholder="GST Number"
                      containerStyle={{ marginRight: 10 }}
                      leftIcon={<Icon source={imageIndex.shield} size={18} />}
                      value={gst}
                      onChangeText={handleGSTChange}
                    />
                  </View>
                  <View style={{ width: "50%" }}>
                    <CustomInput
                      placeholder="Proof ID"
                      containerStyle={{ marginLeft: 10 }}
                      leftIcon={<Icon source={imageIndex.id} size={18} />}
                      value={proof}
                      onChangeText={handleProofChange}
                    />
                  </View>
                </View>

                <CustomInput
                  placeholder="Password"
                  secureTextEntryToggle
                  leftIcon={<Icon source={imageIndex.lock} size={20} />}
                  value={password}
                  onChangeText={handlePasswordChange}
                />
                {passwordError && <Text style={styles.errorText}>{passwordError}</Text>}
              </View>

              <View style={{ width: "100%", marginBottom: 20, flexDirection: "row" }}>
                <TouchableOpacity onPress={() => setChecked(!checked)}>
                  {checked ? 
                    <Image source={imageIndex.check} style={{ height: 22, width: 22 }} />
                    : <View style={{ height: 22, width: 22, borderWidth: 2, borderRadius: 11, borderColor: color.secondary }} />
                  }
                </TouchableOpacity>

                <Text style={[styles.signupText, { textAlignVertical: "center", lineHeight: 30 }]}>
                  {" "}I agree to the 
                  <Text style={{ color: color.secondary }}> Terms of Service </Text>
                  and 
                  <Text style={{ color: color.secondary }}> Privacy Policy</Text>
                </Text>
              </View>

              <CustomButton
                title="Sign Up"
                onPress={handleSignup}
              />
            </View>

            <TouchableOpacity
              style={{ alignItems: "center", marginVertical: 15 }}
              onPress={() => navigation.navigate(ScreenNameEnum.LoginScreen)}
            >
              <Text style={styles.signupText}>
                Already have an account? 
                <Text style={{ color: color.secondary }}> Login</Text>
              </Text>
            </TouchableOpacity>

          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

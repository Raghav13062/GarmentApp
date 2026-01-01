import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import Icon from "react-native-vector-icons/Feather";
import LinearGradient from "react-native-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import DateTimePicker from "@react-native-community/datetimepicker";

import imageIndex from "../../../assets/imageIndex";
import { color } from "../../../constant";
import CustomHeader from "../../../component/CustomHeader";
import StatusBarComponent from "../../../component/StatusBarCompoent";
import CustomButton from "../../../component/CustomButton";
import { styles } from "./style";
import useEditProfile from "./useEditProfile";

const EditProfile = () => {
  const {
    loading,
    profileImg,
    formData,
    errors,
    inputRefs,
    openPicker,
    handleChange,
    handleSubmit,
    focusNextField,
    showDatePicker,
    setShowDatePicker,
    onChangeDate,
  } = useEditProfile();

  const renderInputField = (
    field: string,
    label: string,
    placeholder: string,
    keyboardType: any = "default",
    autoCapitalize: any = "none"
  ) => (
    <View style={styles.inputContainer}>
      <Text style={styles.inputLabel}>{label}</Text>
      <View style={[styles.inputWrapper, errors[field] && styles.inputError]}>
        <TextInput
          ref={ref => (inputRefs.current[field] = ref)}
          style={styles.input}
          value={formData[field]}
          onChangeText={text => handleChange(field, text)}
          placeholder={placeholder}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          returnKeyType="next"
          onSubmitEditing={() => focusNextField("email")}
        />
      </View>
      {errors[field] && <Text style={styles.errorText}>{errors[field]}</Text>}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBarComponent />

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <CustomHeader label="Edit Profile" leftPress menuIcon={imageIndex.back} />

          {/* Profile Image */}
          <View style={styles.profileSection}>
            <View style={styles.profileImageContainer}>
              <Image
                source={profileImg ? { uri: profileImg } : imageIndex.d1}
                style={styles.profileImage}
              />

              <TouchableOpacity style={styles.editPhotoButton} onPress={openPicker}>
                <LinearGradient
                  colors={color.buttLinearGradient}
                  style={styles.editPhotoGradient}
                >
                  <Icon name="camera" size={18} color="#fff" />
                </LinearGradient>
              </TouchableOpacity>
            </View>
            <Text style={styles.photoHint}>Tap to change profile photo</Text>
          </View>

          {/* Form */}
          <View style={styles.formContainer}>
            {renderInputField("fullName", "Full Name", "Enter name", "default", "words")}
            {renderInputField("email", "Email", "Enter email", "email-address")}
            {renderInputField("address", "Address", "Enter address", "default", "sentences")}

            {/* Gender */}
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Gender</Text>
              <View style={styles.genderContainer}>
                {["Male", "Female", "Other"].map(item => (
                  <TouchableOpacity
                    key={item}
                    style={[
                      styles.genderOption,
                      formData.gender === item && styles.genderOptionSelected,
                    ]}
                    onPress={() => handleChange("gender", item)}
                  >
                    <Text
                      style={[
                        styles.genderText,
                        formData.gender === item && styles.genderTextSelected,
                      ]}
                    >
                      {item}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* DOB */}
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Date of Birth</Text>

              <TouchableOpacity
                style={[
                  styles.datePicker,
                  errors.dateOfBirth && styles.inputError,
                ]}
                onPress={() => setShowDatePicker(true)}
              >
                <Text style={styles.dateText}>
                  {formData.dateOfBirth || "Select date"}
                </Text>
                <Icon name="calendar" size={20} color="#666" />
              </TouchableOpacity>

              {errors.dateOfBirth && (
                <Text style={styles.errorText}>{errors.dateOfBirth}</Text>
              )}

              {showDatePicker && (
                <DateTimePicker
                  value={
                    formData.dateOfBirth
                      ? new Date(formData.dateOfBirth)
                      : new Date()
                  }
                  mode="date"
                  display={Platform.OS === "ios" ? "spinner" : "default"}
                  maximumDate={new Date()}
                  onChange={onChangeDate}
                />
              )}
            </View>
          </View>

          {/* Submit */}
          <View style={{ marginHorizontal: 25, marginTop:18,
            marginBottom:25
           }}>
            <CustomButton title="Save Changes" onPress={handleSubmit}   />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default EditProfile;

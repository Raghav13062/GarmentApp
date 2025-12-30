import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
  TextInput,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from "react-native";
import ImagePicker from "react-native-image-crop-picker";
import Icon from "react-native-vector-icons/Feather";
import LinearGradient from "react-native-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import imageIndex from "../../../assets/imageIndex";
import { color } from "../../../constant";
import CustomHeader from "../../../component/CustomHeader";
import StatusBarComponent from "../../../component/StatusBarCompoent";
import CustomButton from "../../../component/CustomButton";

const EditProfile = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [profileImg, setProfileImg] = useState(null);
  const [formData, setFormData] = useState({
    fullName: "John Doe",
    email: "john.doe@gmail.com",
    phone: "+91 9876543210",
    gender: "Male",
    dateOfBirth: "1990-01-15",
    address: "123 Main Street, New York, NY 10001",
    bio: "Digital creator and photography enthusiast",
  });

  const [errors, setErrors] = useState({});
  const inputRefs = useRef({});

  const openPicker = () => {
    Alert.alert(
      "Change Profile Photo",
      "Choose an option",
      [
        { text: "Camera", onPress: openCamera },
        { text: "Gallery", onPress: openGallery },
        { text: "Cancel", style: "cancel" },
      ],
      { cancelable: true }
    );
  };

  const openCamera = () => {
    ImagePicker.openCamera({
      width: 500,
      height: 500,
      cropping: true,
      cropperCircleOverlay: true,
      mediaType: "photo",
    })
      .then((img) => {
        setProfileImg(img.path);
      })
      .catch(() => {});
  };

  const openGallery = () => {
    ImagePicker.openPicker({
      width: 500,
      height: 500,
      cropping: true,
      cropperCircleOverlay: true,
      mediaType: "photo",
    })
      .then((img) => {
        setProfileImg(img.path);
      })
      .catch(() => {});
  };

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors({ ...errors, [field]: "" });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      setLoading(true);
      // Simulate API call
      setTimeout(() => {
        setLoading(false);
        Alert.alert(
          "Success!",
          "Profile updated successfully",
          [
            {
              text: "OK",
              onPress: () => navigation.goBack(),
            },
          ]
        );
      }, 1500);
    }
  };

  const focusNextField = (nextField) => {
    inputRefs.current[nextField]?.focus();
  };

  const renderInputField = (field, label, placeholder, keyboardType = "default", autoCapitalize = "none") => (
    <View style={styles.inputContainer}>
      <Text style={styles.inputLabel}>{label}</Text>
      <View style={[styles.inputWrapper, errors[field] && styles.inputError]}>
        <TextInput
          ref={ref => inputRefs.current[field] = ref}
          style={styles.input}
          value={formData[field]}
          onChangeText={(text) => handleChange(field, text)}
          placeholder={placeholder}
          placeholderTextColor="#999"
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          returnKeyType="next"
          onSubmitEditing={() => {
            const fields = ['fullName', 'email', 'phone', 'address', 'bio'];
            const currentIndex = fields.indexOf(field);
            if (currentIndex < fields.length - 1) {
              focusNextField(fields[currentIndex + 1]);
            }
          }}
        />
      </View>
      {errors[field] ? (
        <Text style={styles.errorText}>{errors[field]}</Text>
      ) : null}
    </View>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
        <StatusBarComponent/>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
      >
        <ScrollView 

          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Header */}
          <CustomHeader label="Edit Profile" 
          leftPress={true}
          menuIcon={imageIndex.back}
          />
          
          <View style={styles.profileSection}>
            <View style={styles.profileImageContainer}>
              <Image
                source={
                  profileImg
                    ? { uri: profileImg }
                    : imageIndex.d1
                }
                style={styles.profileImage}
              />
              
              <TouchableOpacity style={styles.editPhotoButton} onPress={openPicker}>
                <LinearGradient
                                          colors={color.buttLinearGradient}
                   start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
                  style={styles.editPhotoGradient}
                >
                  <Icon name="camera" size={20} color="#fff" />
                </LinearGradient>
              </TouchableOpacity>
            </View>
            
            <Text allowFontScaling={false}    style={styles.photoHint}>
              Tap to change profile photo
            </Text>
        
          </View>

          {/* Form Section */}
          <View style={styles.formContainer}>
            {renderInputField("fullName", "Full Name", "Enter your full name", "default", "words")}
            {renderInputField("email", "Email Address", "Enter your email", "email-address")}
            {renderInputField("phone", "Phone Number", "Enter your phone number", "phone-pad")}
            {renderInputField("address", "Address", "Enter your address", "default", "sentences")}
            
            {/* Bio Field */}
            <View style={styles.inputContainer}>
              <Text allowFontScaling={false}   style={styles.inputLabel}>Bio</Text>
              <View style={styles.textAreaWrapper}>
                <TextInput
                allowFontScaling={false}  
                  ref={ref => inputRefs.current.bio = ref}
                  style={[styles.input, styles.textArea]}
                  value={formData.bio}
                  onChangeText={(text) => handleChange('bio', text)}
                  placeholder="Tell us about yourself"
                  placeholderTextColor="#999"
                  multiline
                  numberOfLines={4}
                  maxLength={200}
                  textAlignVertical="top"
                />
                <Text style={styles.charCount}>
                  {formData.bio.length}/200
                </Text>
              </View>
            </View>

            {/* Gender Selection */}
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Gender</Text>
              <View style={styles.genderContainer}>
                {['Male', 'Female', 'Other'].map((gender) => (
                  <TouchableOpacity
                    key={gender}
                    style={[
                      styles.genderOption,
                      formData.gender === gender && styles.genderOptionSelected,
                    ]}
                    onPress={() => handleChange('gender', gender)}
                  >
                    <Text
                      style={[
                        styles.genderText,
                        formData.gender === gender && styles.genderTextSelected,
                      ]}
                    >
                      {gender}
                    </Text>
                    {formData.gender === gender && (
                      <Icon name="check" size={16} color="#F58021" style={styles.genderCheck} />
                    )}
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Date of Birth */}
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Date of Birth</Text>
              <TouchableOpacity 
                style={styles.datePicker}
                onPress={() => {
                  // Implement date picker here
                  Alert.alert("Coming Soon", "Date picker will be implemented");
                }}
              >
                <Text style={styles.dateText}>{formData.dateOfBirth}</Text>
                <Icon name="calendar" size={20} color="#666" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Action Buttons */}
           <View style={{
            marginHorizontal:15 ,
            marginBottom:10 ,
            marginTop:15
           }}>
              <CustomButton 
                      title="Save Changes" 
                      onPress={handleSubmit}
                      // onPress={handleLogin}
                      />
           </View>
    

          {/* Help Section */}
          
          <View style={{ height: 40 }} />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
  },
  headerButton: {
    padding: 8,
  },
  profileSection: {
    alignItems: 'center',
    paddingVertical: 30,
    backgroundColor: '#fff',
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  profileImageContainer: {
    position: 'relative',
    marginBottom: 15,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 4,
    borderColor: '#fff',
    backgroundColor: '#f0f0f0',
  },
  editPhotoButton: {
    position: 'absolute',
    bottom: 5,
    right: 5,
  },
  editPhotoGradient: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
  photoHint: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
  },
  photoSubHint: {
    fontSize: 13,
    color: '#666',
  },
  formContainer: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    borderRadius: 20,
    padding: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
    marginLeft: 5,
  },
  inputWrapper: {
    borderWidth: 1.5,
    borderColor: '#e0e0e0',
    borderRadius: 12,
    backgroundColor: '#fafafa',
    paddingHorizontal: 16,
  },
  input: {
    fontSize: 16,
    color: '#333',
    paddingVertical: 14,
    height: 50,
  },
  inputError: {
    borderColor: '#FF6B6B',
    backgroundColor: '#FFF5F5',
  },
  errorText: {
    color: '#FF6B6B',
    fontSize: 13,
    marginTop: 5,
    marginLeft: 5,
  },
  textAreaWrapper: {
    position: 'relative',
    borderWidth: 1.5,
    borderColor: '#e0e0e0',
    borderRadius: 12,
    backgroundColor: '#fafafa',
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 30,
  },
  textArea: {
    height: 100,
    paddingVertical: 0,
  },
  charCount: {
    position: 'absolute',
    bottom: 10,
    right: 16,
    fontSize: 13,
    color: '#999',
  },
  genderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: -5,
  },
  genderOption: {
    flex: 1,
    marginHorizontal: 5,
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: '#e0e0e0',
    backgroundColor: '#fafafa',
    alignItems: 'center',
    position: 'relative',
  },
  genderOptionSelected: {
    borderColor: '#F58021',
    backgroundColor: '#FFF5E6',
  },
  genderText: {
    fontSize: 15,
    color: '#666',
    fontWeight: '500',
  },
  genderTextSelected: {
    color: '#F58021',
    fontWeight: '600',
  },
  genderCheck: {
    position: 'absolute',
    top: 8,
    right: 8,
  },
  datePicker: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#e0e0e0',
    borderRadius: 12,
    backgroundColor: '#fafafa',
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  dateText: {
    fontSize: 16,
    color: '#333',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginTop: 30,
    marginBottom: 20,
  },
  cancelButton: {
    flex: 1,
    marginRight: 10,
    paddingVertical: 16,
    borderRadius: 12,
    backgroundColor: '#fff',
    borderWidth: 1.5,
    borderColor: '#e0e0e0',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
  },
  saveButton: {
    flex: 2,
    marginLeft: 10,
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 6,
    shadowColor: '#F58021',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  saveButtonGradient: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
  },
  saveIcon: {
    marginRight: 8,
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#fff',
  },
  helpSection: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    borderRadius: 20,
    paddingHorizontal: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  helpItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  helpText: {
    flex: 1,
    fontSize: 15,
    color: '#333',
    marginLeft: 12,
    fontWeight: '500',
  },
});
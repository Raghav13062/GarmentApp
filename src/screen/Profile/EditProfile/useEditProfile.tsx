import { useNavigation } from '@react-navigation/native';
import { useEffect, useRef, useState } from 'react';
import { Alert } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import { GetProfile, UpdateProfileApi } from '../../../Api/auth/authservice';
import { useDispatch, useSelector } from 'react-redux';

export default function useEditProfile() {
  const navigation = useNavigation<any>();
  const dispatch = useDispatch();

  const userData = useSelector((state: any) => state.auth?.userData);

  const [loading, setLoading] = useState(false);
  const [profileImg, setProfileImg] = useState<string | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const [formData, setFormData] = useState({
    fullName: userData?.fullName || '',
    email: userData?.email || '',
    gender: userData?.gender || '',
    dateOfBirth: userData?.dateOfBirth
      ? userData.dateOfBirth.split('T')[0]
      : '',
    address: userData?.address || '',
  });

  const [errors, setErrors] = useState<any>({});
  const inputRefs = useRef<any>({});

  /* ---------------- Get Profile ---------------- */
 

  /* ---------------- Image Picker ---------------- */
  const openPicker = () => {
    Alert.alert('Change Profile Photo', 'Choose an option', [
      { text: 'Camera', onPress: openCamera },
      { text: 'Gallery', onPress: openGallery },
      { text: 'Cancel', style: 'cancel' },
    ]);
  };

  const openCamera = () => {
    ImagePicker.openCamera({
      width: 500,
      height: 500,
      cropping: true,
      cropperCircleOverlay: true,
    }).then(img => setProfileImg(img.path));
  };

  const openGallery = () => {
    ImagePicker.openPicker({
      width: 500,
      height: 500,
      cropping: false,
      cropperCircleOverlay: true,
    }).then(img => setProfileImg(img.path));
  };

  /* ---------------- Date Picker ---------------- */
  const onChangeDate = (_: any, selectedDate?: Date) => {
    setShowDatePicker(false);

    if (selectedDate) {
      const formattedDate = selectedDate.toISOString().split('T')[0];
      setFormData(prev => ({ ...prev, dateOfBirth: formattedDate }));
      clearError('dateOfBirth');
    }
  };

  /* ---------------- Input Change ---------------- */
  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    clearError(field);
  };

  const clearError = (field: string) => {
    if (errors[field]) {
      setErrors((prev: any) => ({ ...prev, [field]: '' }));
    }
  };

  /* ---------------- Validation ---------------- */
  const validate = () => {
    let valid = true;
    let newErrors: any = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
      valid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
      valid = false;
    }

    if (!formData.gender) {
      newErrors.gender = 'Please select gender';
      valid = false;
    }

    if (!formData.dateOfBirth) {
      newErrors.dateOfBirth = 'Date of birth is required';
      valid = false;
    }

    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  /* ---------------- Submit ---------------- */
  const handleSubmit = async () => {
    if (!validate()) return;

    const payload = {
      fullName: formData.fullName.trim(),
      email: formData.email.trim(),
      gender: formData.gender,
      dateOfBirth: formData.dateOfBirth, // YYYY-MM-DD
      address: formData.address.trim(),
      profileImage: profileImg, // optional
    };

    const res = await UpdateProfileApi(payload, setLoading);

    if (res?.success) {
        GetProfile(setLoading, dispatch);
            navigation.goBack();
    } else {
      Alert.alert('Error', res?.message || 'Something went wrong');
    }
  };

  /* ---------------- Focus Next ---------------- */
  const focusNextField = (field: string) => {
    inputRefs.current[field]?.focus();
  };

  return {
    loading,
    profileImg,
    formData,
    errors,
    inputRefs,
    showDatePicker,
    setShowDatePicker,
    openPicker,
    handleChange,
    handleSubmit,
    focusNextField,
    onChangeDate,
    navigation,
  };
}

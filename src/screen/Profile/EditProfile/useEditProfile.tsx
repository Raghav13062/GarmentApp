import { useNavigation } from '@react-navigation/native';
import { useRef, useState } from 'react';
import { Alert, Platform } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import { UpdateProfileApi } from '../../../Api/auth/authservice';

export default function useEditProfile() {
  const navigation = useNavigation();

  const [loading, setLoading] = useState(false);
  const [profileImg, setProfileImg] = useState<string | null>(null);

  const [showDatePicker, setShowDatePicker] = useState(false);

  const [formData, setFormData] = useState({
    fullName: 'John Doe',
    email: 'john.doe@gmail.com',
    gender: 'Male',
    dateOfBirth: '1990-01-15',
    address: '123 Main Street, New York, NY 10001',
  });

  const [errors, setErrors] = useState<any>({});
  const inputRefs = useRef<any>({});

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
      cropping: true,
      cropperCircleOverlay: true,
    }).then(img => setProfileImg(img.path));
  };

  /* ---------------- DOB Handler ---------------- */

  const onChangeDate = (_: any, selectedDate?: Date) => {
    setShowDatePicker(false);

    if (selectedDate) {
      const formattedDate = selectedDate.toISOString().split('T')[0];

      setFormData(prev => ({
        ...prev,
        dateOfBirth: formattedDate,
      }));

      if (errors.dateOfBirth) {
        setErrors((prev: any) => ({ ...prev, dateOfBirth: '' }));
      }
    }
  };

  /* ---------------- Form Handling ---------------- */

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev: any) => ({ ...prev, [field]: '' }));
  };

 
  const handleSubmit = async () => {
 
  const payload = {
    fullName: formData.fullName,
    email: formData.email,
    gender: formData.gender,
    dateOfBirth: formData.dateOfBirth,
    address: formData.address,
  };

  const res = await UpdateProfileApi(payload, setLoading);

  if (res?.success) {
    Alert.alert('Success', 'Profile updated successfully', [
      { text: 'OK', onPress: () => navigation.goBack() },
    ]);
  }
};


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

import React from 'react';
import { Modal, View, Text, TouchableOpacity, TouchableWithoutFeedback, StyleSheet } from 'react-native';
import { color, fonts, radius, spacing } from '../constant';

interface ImagePickerModalProps {
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
  pickImageFromGallery: () => void;
  takePhotoFromCamera: () => void;
}

const ImagePickerModal: React.FC<ImagePickerModalProps> = ({
  modalVisible,
  setModalVisible,
  pickImageFromGallery,
  takePhotoFromCamera,
}) => {
  return (
    <Modal
      transparent 
      visible={modalVisible}
      animationType="slide"
      onRequestClose={() => setModalVisible(false)}
    >
      <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.handleBar} />
            <Text allowFontScaling={false} style={styles.title}>Choose an option</Text>
            <TouchableOpacity
              onPress={() => {
                setModalVisible(false);
                pickImageFromGallery();
              }}
              style={styles.optionButton}
            >
              <Text allowFontScaling={false} style={styles.optionText}>📷 Choose from gallery</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setModalVisible(false);
                takePhotoFromCamera();
              }}
              style={styles.optionButton}
            >
              <Text allowFontScaling={false} style={styles.optionText}>📸 Take a photo</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: color.overlay,
  },
  modalContainer: {
    backgroundColor: color.card,
    paddingVertical: spacing.xl,
    paddingHorizontal: spacing.xl,
    borderTopLeftRadius: radius.xxl,
    borderTopRightRadius: radius.xxl,
    width: '100%',
    alignItems: 'center',
    gap: 10,
    shadowColor: color.black,
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  handleBar: {
    width: 40,
    height: 4,
    backgroundColor: color.primary,
    borderRadius: 3,
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontFamily: fonts.bold,
    color: color.textDark,
    marginBottom: 10,
  },
  optionButton: {
    width: '100%',
    backgroundColor: color.lightGray,
    paddingVertical: 15,
    borderRadius: radius.md,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: color.borderLight,
  },
  optionText: {
    fontSize: 16,
    color: color.textDark,
    fontFamily: fonts.medium,
  },
  cancelButton: {
    width: '100%',
    backgroundColor: color.primary,
    paddingVertical: 15,
    borderRadius: radius.lg,
    alignItems: 'center',
    marginTop: 10,
  },
  cancelText: {
    fontSize: 16,
    color: color.white,
    fontFamily: fonts.semiBold,
  },
});

export default ImagePickerModal;

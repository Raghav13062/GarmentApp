import React from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Platform,
  StatusBar,
  SafeAreaView,
} from "react-native";
import Icon from "react-native-vector-icons/Feather";
import LinearGradient from "react-native-linear-gradient";
import { color } from "../constant";
import CustomButton from "./CustomButton";
import { logout } from "../redux/feature/authSlice";
import { useDispatch } from "react-redux";

const { width, height } = Dimensions.get("window");

type LogoutModalProps = {
  visible: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
  showIcon?: boolean;
  type?: "default" | "danger" | "warning" | "success";
};

const LogoutModal  = ({
  visible,
  onClose,
  onConfirm,
  title = "Logout?",
  message = "Are you sure you want to log out?",
  confirmText = "Logout",
  cancelText = "Cancel",
  showIcon = true,
  type = "danger",
}: any) => {
  
  const getTypeStyles = () => {
    switch(type) {
      case "danger":
        return {
          gradient: color.buttLinearGradient,
          iconColor: '#FF4B4B',
          iconName: 'log-out',
          iconBg: '#FFE5E5'
        };
      case "warning":
        return {
          gradient: ['#FFA726', '#FFB74D'],
          iconColor: '#FFA726',
          iconName: 'alert-triangle',
          iconBg: '#FFF3E0'
        };
      case "success":
        return {
          gradient: ['#4CAF50', '#66BB6A'],
          iconColor: '#4CAF50',
          iconName: 'check-circle',
          iconBg: '#E8F5E9'
        };
      default:
        return {
          gradient: [color.primary, color.secondary || '#862E92'],
          iconColor: color.primary,
          iconName: 'log-out',
          iconBg: '#F0F0FF'
        };
    }
  };
const dispatch = useDispatch();
  const typeStyles = getTypeStyles();

  return (
    <Modal
      transparent
      visible={visible}
      animationType="slide"
      onRequestClose={onClose}
      statusBarTranslucent
    >
      <View style={styles.overlay}>
        <TouchableOpacity 
          style={styles.backdrop} 
          activeOpacity={1} 
          onPress={onClose}
        />
        
        <View style={styles.modalContainer}>
          {/* Handle Bar */}
          <View style={styles.handleBarContainer}>
            <View style={styles.handleBar} />
          </View>

          <View style={styles.content}>
  
            {/* Title */}
            <Text style={styles.title}>{title}</Text>
             <Text style={styles.message}>{message}</Text>
            {/* Warning Note (for logout) */}
            {type === "danger" && (
              <View style={styles.warningNote}>
                <Icon name="alert-circle" size={16} color="#FFA726" />
                <Text style={styles.warningText}>
                  You will need to login again to access your account
                </Text>
              </View>
            )}

            {/* Action Buttons */}
               {/* Cancel Button */}
             
  <CustomButton 
                      title={confirmText}
                      onPress={onConfirm}
                      // onPress={handleLogin}
                      />
                    
              {/* Confirm Button */}
            
        
          </View>
          </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  backdrop: {
    flex: 1,
  },
  modalContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingBottom: Platform.OS === 'ios' ? 34 : 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 20,
    maxHeight: height * 0.7,
  },
  handleBarContainer: {
    alignItems: 'center',
    paddingVertical: 12,
  },
  handleBar: {
    width: 40,
    height: 5,
    backgroundColor: '#E0E0E0',
    borderRadius: 3,
  },
  content: {
    paddingHorizontal: 24,
    paddingTop: 8,
    paddingBottom: 16,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: '#333',
    textAlign: 'center',
    marginBottom: 12,
    letterSpacing: -0.3,
  },
  message: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  warningNote: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF9E6',
    padding: 14,
    borderRadius: 12,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#FFE58F',
  },
  warningText: {
    fontSize: 14,
    color: '#856404',
    marginLeft: 10,
    flex: 1,
    lineHeight: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  button: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 14,
    marginHorizontal: 6,
    borderWidth: 1.5,
  },
  cancelButton: {
    backgroundColor: '#fff',
    borderColor: '#E0E0E0',
  },
  gradientButton: {
    flex: 1,
    borderRadius: 14,
    marginHorizontal: 6,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
   },
  gradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  buttonIcon: {
    marginRight: 8,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  cancelText: {
    color: '#666',
  },
  confirmText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  extraOptions: {
    alignItems: 'center',
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  optionText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 8,
    fontWeight: '500',
  },
  safeArea: {
    backgroundColor: '#fff',
  },
});

export default LogoutModal;
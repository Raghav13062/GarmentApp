import React from 'react';
import { StyleSheet, View, Platform } from 'react-native';
import Toast from 'react-native-toast-message';
import Icon from 'react-native-vector-icons/Ionicons';
import TextCompoent, { Size } from './Text';

const toastConfig = {
  successResponse: ({ text1, text2, props }) => (
    <View style={styles.successContainer}>
      <View style={styles.iconWrapper}>
        <Icon 
          name="checkmark-circle" 
          size={28} 
          color="#FFFFFF" 
          style={styles.icon} 
        />
      </View>
      <View style={styles.contentContainer}>
        <TextCompoent
          size={Size.Small}
          color={'#FFFFFF'}
          fontWeight="600"
          style={styles.title}
          numberOfLines={2}>
          {text1}
        </TextCompoent>
        {text2 && (
          <TextCompoent
            size={Size.ExtraSmall}
            color={'rgba(255,255,255,0.85)'}
            fontWeight="400"
            style={styles.subtitle}
            numberOfLines={2}>
            {text2}
          </TextCompoent>
        )}
      </View>
      <Icon 
        name="close" 
        size={18} 
        color="rgba(255,255,255,0.7)" 
        style={styles.closeIcon}
        onPress={() => Toast.hide()}
      />
    </View>
  ),
  
  errorResponse: ({ text1, text2, props }) => (
    <View style={styles.errorContainer}>
      <View style={styles.iconWrapper}>
        <Icon 
          name="close-circle" 
          size={28} 
          color="#FFFFFF" 
          style={styles.icon} 
        />
      </View>
      <View style={styles.contentContainer}>
        <TextCompoent
          size={Size.Small}
          color={'#FFFFFF'}
          fontWeight="600"
          style={styles.title}
          numberOfLines={2}>
          {text1}
        </TextCompoent>
        {text2 && (
          <TextCompoent
            size={Size.ExtraSmall}
            color={'rgba(255,255,255,0.85)'}
            fontWeight="400"
            style={styles.subtitle}
            numberOfLines={2}>
            {text2}
          </TextCompoent>
        )}
      </View>
      <Icon 
        name="close" 
        size={18} 
        color="rgba(255,255,255,0.7)" 
        style={styles.closeIcon}
        onPress={() => Toast.hide()}
      />
    </View>
  ),
  
  infoResponse: ({ text1, text2, props }) => (
    <View style={styles.infoContainer}>
      <View style={styles.iconWrapper}>
        <Icon 
          name="information-circle" 
          size={28} 
          color="#FFFFFF" 
          style={styles.icon} 
        />
      </View>
      <View style={styles.contentContainer}>
        <TextCompoent
          size={Size.Small}
          color={'#FFFFFF'}
          fontWeight="600"
          style={styles.title}
          numberOfLines={2}>
          {text1}
        </TextCompoent>
        {text2 && (
          <TextCompoent
            size={Size.ExtraSmall}
            color={'rgba(255,255,255,0.85)'}
            fontWeight="400"
            style={styles.subtitle}
            numberOfLines={2}>
            {text2}
          </TextCompoent>
        )}
      </View>
      <Icon 
        name="close" 
        size={18} 
        color="rgba(255,255,255,0.7)" 
        style={styles.closeIcon}
        onPress={() => Toast.hide()}
      />
    </View>
  ),
  
  warningResponse: ({ text1, text2, props }) => (
    <View style={styles.warningContainer}>
      <View style={styles.iconWrapper}>
        <Icon 
          name="warning" 
          size={28} 
          color="#FFFFFF" 
          style={styles.icon} 
        />
      </View>
      <View style={styles.contentContainer}>
        <TextCompoent
          size={Size.Small}
          color={'#FFFFFF'}
          fontWeight="600"
          style={styles.title}
          numberOfLines={2}>
          {text1}
        </TextCompoent>
        {text2 && (
          <TextCompoent
            size={Size.ExtraSmall}
            color={'rgba(255,255,255,0.85)'}
            fontWeight="400"
            style={styles.subtitle}
            numberOfLines={2}>
            {text2}
          </TextCompoent>
        )}
      </View>
      <Icon 
        name="close" 
        size={18} 
        color="rgba(255,255,255,0.7)" 
        style={styles.closeIcon}
        onPress={() => Toast.hide()}
      />
    </View>
  ),
};

// Success Toast - Shows at top with modern UI
export const successToast = (message, subtitle = '', time = 4000) => {
  Toast.show({
    type: 'successResponse',
    text1: message,
    text2: subtitle,
    position: 'top',
    visibilityTime: time,
    topOffset: Platform.OS === 'ios' ? 60 : 40,
    autoHide: true,
    props: {
      hasSubtitle: !!subtitle,
    }
  });
};

// Error Toast - Shows at top with modern UI
export const errorToast = (message, subtitle = '', time = 5000) => {
  Toast.show({
    type: 'errorResponse',
    text1: message,
    text2: subtitle,
    position: 'top',
    visibilityTime: time,
    topOffset: Platform.OS === 'ios' ? 60 : 40,
    autoHide: true,
    props: {
      hasSubtitle: !!subtitle,
    }
  });
};

// Info Toast - Shows at top
export const infoToast = (message, subtitle = '', time = 4000) => {
  Toast.show({
    type: 'infoResponse',
    text1: message,
    text2: subtitle,
    position: 'top',
    visibilityTime: time,
    topOffset: Platform.OS === 'ios' ? 60 : 40,
    autoHide: true,
    props: {
      hasSubtitle: !!subtitle,
    }
  });
};

// Warning Toast - Shows at top
export const warningToast = (message, subtitle = '', time = 4000) => {
  Toast.show({
    type: 'warningResponse',
    text1: message,
    text2: subtitle,
    position: 'top',
    visibilityTime: time,
    topOffset: Platform.OS === 'ios' ? 60 : 40,
    autoHide: true,
    props: {
      hasSubtitle: !!subtitle,
    }
  });
};

// Bottom Toast Variants
export const bottomSuccessToast = (message, subtitle = '', time = 3000) => {
  Toast.show({
    type: 'successResponse',
    text1: message,
    text2: subtitle,
    position: 'bottom',
    visibilityTime: time,
    bottomOffset: 80,
    autoHide: true,
  });
};

export const bottomErrorToast = (message, subtitle = '', time = 4000) => {
  Toast.show({
    type: 'errorResponse',
    text1: message,
    text2: subtitle,
    position: 'bottom',
    visibilityTime: time,
    bottomOffset: 80,
    autoHide: true,
  });
};

// Quick Toast Functions (for simple messages)
export const showSuccess = (message) => successToast(message);
export const showError = (message) => errorToast(message);
export const showInfo = (message) => infoToast(message);
export const showWarning = (message) => warningToast(message);

export default toastConfig;

const styles = StyleSheet.create({
  // Common Styles
  iconWrapper: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    marginLeft: 4,
  },
  icon: {
    marginLeft: 1, // Center adjustment for some icons
  },
  contentContainer: {
    flex: 1,
    paddingRight: 8,
  },
  title: {
    lineHeight: 20,
  },
  subtitle: {
    marginTop: 4,
    lineHeight: 16,
  },
  closeIcon: {
    padding: 4,
    marginRight: 4,
  },
  
  // Success Toast - Green gradient
  successContainer: {
    minHeight: 70,
    width: '92%',
    backgroundColor: '#10B981', // Emerald-500
    borderRadius: 14,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    shadowColor: '#10B981',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 10,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    ...Platform.select({
      ios: {
        marginTop: 10,
      },
      android: {
        marginTop: 8,
      },
    }),
  },
  
  // Error Toast - Red gradient
  errorContainer: {
    minHeight: 70,
    width: '92%',
    backgroundColor: '#EF4444', // Red-500
    borderRadius: 14,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    shadowColor: '#EF4444',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 10,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    ...Platform.select({
      ios: {
        marginTop: 10,
      },
      android: {
        marginTop: 8,
      },
    }),
  },
  
  // Info Toast - Blue gradient
  infoContainer: {
    minHeight: 70,
    width: '92%',
    backgroundColor: '#3B82F6', // Blue-500
    borderRadius: 14,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    shadowColor: '#3B82F6',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 10,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    ...Platform.select({
      ios: {
        marginTop: 10,
      },
      android: {
        marginTop: 8,
      },
    }),
  },
  
  // Warning Toast - Amber gradient
  warningContainer: {
    minHeight: 70,
    width: '92%',
    backgroundColor: '#F59E0B', // Amber-500
    borderRadius: 14,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    shadowColor: '#F59E0B',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 10,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    ...Platform.select({
      ios: {
        marginTop: 10,
      },
      android: {
        marginTop: 8,
      },
    }),
  },
});

// Optional: If you want to customize the Toast component globally
export const ToastConfig = {
  success: (internalState) => toastConfig.successResponse(internalState),
  error: (internalState) => toastConfig.errorResponse(internalState),
  info: (internalState) => toastConfig.infoResponse(internalState),
  warning: (internalState) => toastConfig.warningResponse(internalState),
};
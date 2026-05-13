
export const validateEmail = (email: string): string => {
  const trimmed = email.trim();
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (!trimmed) {
    return "Email is required";
  } else if (!emailRegex.test(trimmed)) {
    return "Please enter a valid email address";
  }
  return ''; // No error
};

export const validatePassword = (password: string): string => {
  const trimmed = password.trim();

  if (!trimmed) {
    return "Password is required"
  } else if (trimmed.length < 8) {
    return "Password must be at least 8 characters"
  } else if (!/[A-Z]/.test(trimmed)) {
    return "Password must contain at least one uppercase letter"
  } else if (!/[a-z]/.test(trimmed)) {
    return "Password must contain at least one lowercase letter"
  } else if (!/\d/.test(trimmed)) {
    return "Password must contain at least one number"
  }

  return ''; // ✅ No error
};
export const validateConfirmPassword = (password: string, confirmPassword: string): string => {
  if (!confirmPassword) return "Please confirm your password";
  if (password !== confirmPassword) return "Passwords do not match";
  return '';
};

// First Name validation
export const validateFirstName = (firstName: string): string => {
  const trimmed = firstName.trim();
  if (!trimmed) {
    return "Full Name is required";
  }
  return '';
};

// Last Name validation
export const validateLastName = (lastName: string): string => {
  const trimmed = lastName.trim();
  if (!trimmed) {
    return "Last Name is required";
  }
  return '';
};

export const validateMobileNumber = (mobile: string): string => {
  const trimmed = mobile.trim();
  const mobileRegex = /^[0-9]{10,15}$/; // Allows 10 to 15 digits

  if (!trimmed) {
    return "Mobile number is required";
  } else if (!mobileRegex.test(trimmed)) {
    return "Please enter a valid mobile number";
  }
  return '';
};
const Params = {
  mobileNo: "mobileNo",
  otp: "otp",
  email: "email",
  fullName: "fullName",
  address: "address",
  gender: "gender",
  dateOfBirth: "dateOfBirth",
  password: "password",
};

const endpointApi = {
  login: "api/auth/login",
  register: "api/auth/register",
  loginotp: "api/auth/verify-otp",
  sendotpApi: "api/auth/send-otp",
  UpdateProfile: "api/user/profile",
  getProfile: "api/user/profile",
  categories: "api/categories",
  HomeBanners: "api/banners",
  home: "api/home",
  AllBrands: "api/brands",
  cart: "api/cart",
  cartAdd: "api/cart/add",
  cartRemove: "api/cart/remove",
  cartUpdate: "api/cart/update",
  cartClear: "api/cart/clear",
  products: "api/products",
  topSellingProducts: "api/products/top-selling",
  productDetails: "api/products", // base path, ID will be appended
};

export { endpointApi, Params };

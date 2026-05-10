const Params = {
  mobileNo: "mobileNo",
  otp: "otp",
  email: "email",
  fullName: "fullName",
  address: "address",
  gender: "gender",
  dateOfBirth: "dateOfBirth",
};

const endpointApi = {
  loginotp: "auth/verify-otp",
  sendotpApi: "auth/send-otp",
  UpdateProfile: "user/profile",
  getProfile: "user/profile",
  categories: "categories",
  HomeBanners: "banners",
  home: "home",
  AllBrands: "brands",
  cartAdd: "cart/add",
  cartRemove: "cart/remove",
  products: "products",
  topSellingProducts: "products/top-selling",
  productDetails: "products", // base path, ID will be appended
};

export { endpointApi, Params };
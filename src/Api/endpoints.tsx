  const endpointApi = {
  loginotp: "auth/verify-otp",
  sendotpApi: "auth/send-otp",
  UpdateProfile:"user/profile",
  getProfile:"user/profile",
  categories:"categories",
  home:"home"
};

  const Params = {
  mobileNo: "mobileNo",
  otp:"otp" ,
  email:"email" ,
  fullName:"fullName" , 
  address:"address" ,
  gender:"gender" ,
  dateOfBirth:"dateOfBirth"
 
};




export {endpointApi,Params}
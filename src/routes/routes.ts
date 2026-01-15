 import BottomTabs from "../navigators/TabNavigator";
 import Login from "../screen/auth/Login/Login";
import OnboardingScreen from "../screen/auth/Onboarding";
import OtpScreen from "../screen/auth/OTPScreen/OtpScreen";
 import SignUp from "../screen/auth/Signup/SignUp";
import Splash from "../screen/auth/Splash";
import CheckoutScreen from "../screen/BottomTab/Cart/CheckoutScreen/CheckoutScreen";
import OrderConfirmationScreen from "../screen/BottomTab/OrderConfirmationScreen/OrderConfirmationScreen";
import OtherCategoryData from "../screen/BottomTab/OtherCategoryData/OtherCategoryData";
import ProductDetails from "../screen/BottomTab/ProductDetail/ProductDetails";
import ViewCartScreen from "../screen/BottomTab/ViewCartScreen/ViewCartScreen";
import EditProfile from "../screen/Profile/EditProfile/EditProfile";
import MyOrders from "../screen/Profile/MyOrders/MyOrders";
import PaymentHistoryScreen from "../screen/Profile/PaymentHistory/PaymentHistory";
import Privacy from "../screen/Profile/Privacy/Privacy";
import SearchProduct from "../screen/SearchProduct/SearchProduct";
 
 
 import ScreenNameEnum from "./screenName.enum";

const _routes: any = {
  REGISTRATION_ROUTE: [
    {
      name: ScreenNameEnum.SPLASH_SCREEN,
      Component: Splash,
    },
    {
      name: ScreenNameEnum.Privacy,
      Component: Privacy,
    },
      {
      name: ScreenNameEnum.SearchProduct,
      Component: SearchProduct,
    },
    
    {
      name: ScreenNameEnum.PaymentHistory,
      Component: PaymentHistoryScreen,
    },
    {
      name: ScreenNameEnum.MyOrders,
      Component: MyOrders,
    },
    {
      name: ScreenNameEnum.EditProfile,
      Component: EditProfile,
    },

    {
      name: ScreenNameEnum.SignUpScreen,
      Component: SignUp,
    },

    {
      name: ScreenNameEnum.LoginScreen,
      Component: Login,
    },

    {
      name: ScreenNameEnum.OnboardingScreen,
      Component: OnboardingScreen,
    },

   
 
   
    {
      name: ScreenNameEnum.OtpScreen,
      Component: OtpScreen,
    },
   
   
    {
      name: ScreenNameEnum.OrderConfirmationScreen,
      Component: OrderConfirmationScreen,
    },
   
    {
      name: ScreenNameEnum.ViewCartScreen,
      Component: ViewCartScreen,
    },
    {
      name: ScreenNameEnum.CheckoutScreen,
      Component: CheckoutScreen,
    },
    {
      name: ScreenNameEnum.OtherCategoryData,
      Component: OtherCategoryData,
    },

 {
      name: ScreenNameEnum.BottomTabs,
      Component: BottomTabs,
    },
 {
      name: ScreenNameEnum.ProductDetails,
      Component: ProductDetails,
    },
  
 
 

  ],


};

export default _routes;

import AsyncStorage from "@react-native-async-storage/async-storage";
import { base_url } from "..";
import { navigateToScreen } from "../../constant";
import { loginSuccess } from "../../redux/feature/authSlice";
import ScreenNameEnum from "../../routes/screenName.enum";
import { errorToast, successToast } from "../../utils/customToast";
import { endpointApi, Params } from "../endpoints";

const SetOtpApi = async (data: any, setLoading: (loading: boolean) => void) => {
  try {
    setLoading(true);

    const response = await fetch(`${base_url}${endpointApi.sendotpApi}`, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        mobileNo: data?.phone,
      }),
    });
    const res = await response.json();
    console.log("response", res);
    setLoading(false);
    if (res.success === true) {
      successToast(res.message);
      navigateToScreen(ScreenNameEnum.OtpScreen, { phone: data?.phone });
    } else {
      errorToast(res.message);
    }

    return res;
  } catch (error) {
    setLoading(false);
    errorToast("Network error");
    console.error(error);
  }
};


const ResendOtpApi = async (data: any, setLoading: (loading: boolean) => void) => {
  try {
    setLoading(true);

    const response = await fetch(`${base_url}${endpointApi.sendotpApi}`, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        mobileNo: data?.phone,
      }),
    });
    const res = await response.json();
    console.log("response", res);
    setLoading(false);
    if (res.success === true) {
      successToast(res.message);
     } else {
      errorToast(res.message);
    }

    return res;
  } catch (error) {
    setLoading(false);
    errorToast("Network error");
    console.error(error);
  }
};

const LoginApi = (
  data: any,
  setLoading: (loading: boolean) => void,
  dispatch: any,
  navigation: any
) => {
  try {
    setLoading(true);

    const requestOptions = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        [Params.mobileNo]: data?.phone,
        // [Params.otp]: data?.code,
         [Params.otp]:"293251"
      }),
    //    body: JSON.stringify({
    //     mobileNo: data?.phone,
    //   }),
    };

    return fetch(`${base_url}${endpointApi.loginotp}`, requestOptions)
      .then((response) => response.json())
      .then((response) => {
        setLoading(false);
        if (response.success ==true) {
          successToast(response?.message);
          dispatch(
            loginSuccess({
              userData: response,
              token: response?.token,
            })
          );
          navigation.reset({
            index: 0,
            routes: [{ name: ScreenNameEnum.BottomTabs }],
          });
        } else {
            console.log("response error", response);
          errorToast(response?.message);
        }

        return response;
      })
      .catch((error) => {
        setLoading(false);
        console.error(error);
        errorToast("Network error");
      });
  } catch (error) {
    setLoading(false);
                console.log("response error", error);

    errorToast("Network error");
  }
};






 export const UpdateProfileApi = async (
  data: any,
  setLoading: (loading: boolean) => void
) => {
  try {
    setLoading(true);

    const token = await AsyncStorage.getItem('token'); // 🔐 get token

    const response = await fetch(`${base_url}${endpointApi.UpdateProfile}`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`, // ✅ token passed
      },
      body: JSON.stringify({
        [Params.email]: data.email,
        [Params.fullName]: data.fullName,
        [Params.address]: data.address,
        [Params.gender]: data.gender,
        [Params.dateOfBirth]: data.dateOfBirth,
      }),
    });

    const res = await response.json();
    console.log('Update Profile Response 👉', res);

    if (res?.success) {
      successToast(res.message || 'Profile updated');
    } else {
      errorToast(res.message || 'Something went wrong');
    }

    return res;
  } catch (error) {
    console.error('UpdateProfileApi Error 👉', error);
    errorToast('Network error');
  } finally {
    setLoading(false);
  }
};




export  {SetOtpApi , UpdateProfileApi,LoginApi,ResendOtpApi}
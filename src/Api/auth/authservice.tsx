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
    setLoading(false);
    if (res.success == true) {
      successToast(res.message);
      navigateToScreen(ScreenNameEnum.OtpScreen, {
        phone: data?.phone,
        otp: res?.otp,
        isNewUser: res?.isNewUser
      });
    } else {
      setLoading(false);

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

const LoginApi = async (
  data: any,
  setLoading: (loading: boolean) => void,
  dispatch: any,
  navigation: any
) => {
  console.log('LoginApi data 👉', data);

  try {
    setLoading(true);

    const response = await fetch(
      `${base_url}${endpointApi.login}`,
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          [Params.email]: data?.email,
          [Params.password]: data?.password,
        }),
      }
    );

    const res = await response.json();
    console.log('Login Response 👉', res);

    if (res?.success === true || response.status === 200) {
      successToast(res?.message || 'Login successful');

      // 🔐 Save token properly
      if (res?.token) {
        await AsyncStorage.setItem('token', res.token);
        console.log('Saved Token 👉', res.token);
      }

      // 🧠 Redux store
      dispatch(
        loginSuccess({
          userData: res?.user ?? res?.data ?? res,
          token: res?.token,
        })
      );

      // 🔁 Reset navigation
      navigation.reset({
        index: 0,
        routes: [{ name: ScreenNameEnum.BottomTabs }],
      });
    } else {
      console.log('Login error response 👉', res);
      errorToast(res?.message || 'Login failed');
    }

    return res;
  } catch (error) {
    console.error('LoginApi Error 👉', error);
    errorToast('Network error');
  } finally {
    setLoading(false);
  }
};

const RegisterApi = async (
  data: any,
  setLoading: (loading: boolean) => void,
  navigation: any
) => {
  try {
    setLoading(true);

    const response = await fetch(
      `${base_url}${endpointApi.register}`,
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          [Params.email]: data?.email,
          [Params.password]: data?.password,
          [Params.fullName]: data?.fullName,
          [Params.mobileNo]: data?.mobileNo,
          [Params.address]: data?.address,
        }),
      }
    );

    const res = await response.json();
    console.log('Register Response 👉', res);

    if (res?.success === true || response.status === 200 || response.status === 201) {
      successToast(res?.message || 'Registration successful');
      navigation.navigate(ScreenNameEnum.LoginScreen);
    } else {
      errorToast(res?.message || 'Registration failed');
    }

    return res;
  } catch (error) {
    console.error('RegisterApi Error 👉', error);
    errorToast('Network error');
  } finally {
    setLoading(false);
  }
};





const VerifyOtpApi = async (
  data: any,
  setLoading: (loading: boolean) => void,
  dispatch: any,
  navigation: any
) => {
  console.log('VerifyOtpApi data 👉', data);

  try {
    setLoading(true);

    const bodyData: any = {
      mobileNo: data?.phone,
      otp: data?.otp2,
    };

    if (data?.fullName) {
      bodyData.fullName = data?.fullName;
    }

    const response = await fetch(
      `${base_url}${endpointApi.loginotp}`,
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bodyData),
      }
    );

    const res = await response.json();
    console.log('VerifyOtp Response 👉', res);

    if (res?.success === true || response.status === 200) {
      successToast(res?.message || 'Login successful');

      // 🔐 Save token properly
      if (res?.token) {
        await AsyncStorage.setItem('token', res.token);
        console.log('Saved Token 👉', res.token);
      }

      // 🧠 Redux store
      dispatch(
        loginSuccess({
          userData: res?.user ?? res?.data ?? res,
          token: res?.token,
        })
      );

      // 🔁 Reset navigation
      navigation.reset({
        index: 0,
        routes: [{ name: ScreenNameEnum.BottomTabs }],
      });
      return { status: true, ...res };
    } else {
      console.log('VerifyOtp error response 👉', res);
      errorToast(res?.message || 'Verification failed');
      return { status: false, ...res };
    }
  } catch (error) {
    console.error('VerifyOtpApi Error 👉', error);
    errorToast('Network error');
    return { status: false };
  } finally {
    setLoading(false);
  }
};

const UpdateProfileApi = async (
  data: any,
  setLoading: (loading: boolean) => void
) => {
  try {
    setLoading(true);

    const token = await AsyncStorage.getItem('token');

    if (!token) {
      errorToast('Token not found. Please login again.');
      return;
    }

    const response = await fetch(
      `${base_url}${endpointApi.UpdateProfile}`,
      {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // ✅ correct
        },
        body: JSON.stringify({
          [Params.email]: data?.email,
          [Params.fullName]: data?.fullName,
          [Params.address]: data?.address,
          [Params.gender]: data?.gender?.toLowerCase(), // ✅ FIX
          [Params.dateOfBirth]: data?.dateOfBirth,
        }),

      }
    );

    const res = await response.json();
    if (response.ok && res?.success) {
      successToast(res.message || 'Profile updated successfully');
      return res;
    } else {
      errorToast(res?.message || 'Something went wrong');
      return res;
    }
  } catch (error) {
    console.error('UpdateProfileApi Error 👉', error);
    errorToast('Network error');
  } finally {
    setLoading(false);
  }
};

const GetProfile = async (
  setLoading: (loading: boolean) => void,
  dispatch: any
) => {
  try {
    setLoading(true);
    // 🔐 Get token from storage
    const token = await AsyncStorage.getItem('token');
    const response = await fetch(`${base_url}${endpointApi.getProfile}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: token ? `Bearer ${token}` : "",
      },
    });
    const res = await response.json();
    if (res?.success === true) {
      dispatch(
        loginSuccess({
          userData: res?.data ?? res,
          token: token,
        })
      );
      // 🔹 Usually GET profile par toast optional hota hai
      // successToast(res?.message);
    } else {
      // errorToast(res?.message || "Failed to fetch profile");
    }

    return res;

  } catch (error) {
    console.error("GetProfile error:", error);
    errorToast("Network error");
  } finally {
    // ✅ Always stop loader
    setLoading(false);
  }
};




export { SetOtpApi, GetProfile, UpdateProfileApi, LoginApi, ResendOtpApi, RegisterApi, VerifyOtpApi }
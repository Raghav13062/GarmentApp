import { base_url } from "..";
import { loginSuccess } from "../../redux/feature/authSlice";
import ScreenNameEnum from "../../routes/screenName.enum";
import { errorToast, successToast } from "../../utils/customToast";
import { endpointApi, Params } from "../endpoints";

const SetOtpApi  = (
    data: any,
    setLoading: (loading: boolean) => void,
    dispatch: any) => {
    try {
        setLoading(true)
        const myHeaders = new Headers();
        myHeaders.append("Accept", "application/json");
        const formdata = new FormData();
        formdata.append(Params.mobileNo, data?.phone);
         const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: formdata,
        };
        console.log(formdata)
         const respons = fetch(`${base_url}${endpointApi.sendotpApi}`, requestOptions)
            .then((response) => response.text())
            .then((res) => {
                const response = JSON.parse(res)
                if (response.status == '1') {
                    setLoading(false)
                    successToast(
                        response?.message
                    );
 
                    return response
                } else {
                    setLoading(false)
                    errorToast(
                        response.message,
                    );
                    return response
                }
            })
            .catch((error) =>
                console.error(error));
        return respons
    } catch (error) {
        setLoading(false)
        errorToast(
            'Network error',
        );
    }
};





const LoginApi  = (
    data: any,
    setLoading: (loading: boolean) => void,
    dispatch: any ,
    navigation:any
) => {
    try {
        setLoading(true)
        const myHeaders = new Headers();
        myHeaders.append("Accept", "application/json");
        const formdata = new FormData();
        formdata.append(Params.mobileNo, data?.phone);
        formdata.append(Params.otp, data?.code);
         const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: formdata,
        };
        console.log(formdata)
         const respons = fetch(`${base_url}${endpointApi.loginotp}`, requestOptions)
            .then((response) => response.text())
            .then((res) => {
                const response = JSON.parse(res)
                if (response.status == '1') {
                    setLoading(false)
                    successToast(
                        response?.message
                    );
                  dispatch(loginSuccess({ userData: response?.data, token: response?.data?.token, }));
                    data.navigation.reset({
          index: 0,
          routes: [{ name: ScreenNameEnum.BottomTabs }],
        });
                  return response
                } else {
                    setLoading(false)
                    errorToast(
                        response.message,
                    );
                    return response
                }
            })
            .catch((error) =>
                console.error(error));
        return respons
    } catch (error) {
        setLoading(false)
        errorToast(
            'Network error',
        );
    }
};





export  {SetOtpApi ,LoginApi}
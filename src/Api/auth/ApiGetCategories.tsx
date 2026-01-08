import AsyncStorage from "@react-native-async-storage/async-storage";
import { endpointApi } from "../endpoints";
import { base_url } from "..";
import { errorToast } from "../../utils/customToast";

export const GetCategories = async (
  setLoading: (loading: boolean) => void
) => {
  try {
    setLoading(true);
    // const token = await AsyncStorage.getItem("token");
    const response = await fetch(
      `${base_url}${endpointApi.categories}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
        //   Authorization: token ? `Bearer ${token}` : "",
        },
      }
    );

    const res = await response.json();

    if (!res?.success) {
      errorToast(res?.message || "Failed to fetch categories");
      return null;
    }

    return res.data;
  } catch (error) {
    console.error("GetCategories error:", error);
    errorToast("Network error");
    return null;
  } finally {
    setLoading(false);
  }
};

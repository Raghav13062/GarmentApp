import AsyncStorage from "@react-native-async-storage/async-storage";
import { endpointApi } from "../endpoints";
 import { errorToast } from "../../utils/customToast";
import { base_url } from "..";

export const GetCategories = async (
  setLoading: any,
  gender: string
) => {
  try {
    setLoading(true);
    const response = await fetch(
      `${base_url}home?gender=${gender}`,
      // `${base_url}${endpointApi.categories}`,
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




export const GetCategoriesId = async (categoryId: string) => {
  if (!categoryId || typeof categoryId !== "string") {
    throw new Error("Invalid category ID");
  }

  try {
    const url = `${base_url}categories/${categoryId}`;
    console.log("Fetching URL:", url);

    const response = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    const res = await response.json();
    console.log("GetCategoriesId response", res);

    if (!res?.success) {
      throw new Error(res?.message || "Failed to fetch category");
    }

    return res.data;
  } catch (error) {
    console.error("GetCategoriesId error:", error);
    throw error;
  }
};


export const GetBannersHome = async (
  setLoading: (loading: boolean) => void
) => {
  try {
    setLoading(true);
    const response = await fetch(
      `${base_url}${endpointApi.HomeBanners}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
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

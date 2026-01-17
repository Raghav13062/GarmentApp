 import { endpointApi } from "../endpoints";
 import { errorToast } from "../../utils/customToast";
import { base_url } from "..";
import axios from "axios";

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




export const GetAllBrandsProduct = async () => {
 
  try {
    const url = `${base_url}${endpointApi.AllBrands}`;
    console.log("Fetching URL:", url);

    const response = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    const res = await response.json();
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




export const TopProductDetail = async (
  categoryId: string | number,
   // setLoading: (loading: boolean) => void
) => {
  try {
     const response = await fetch(
      `${base_url}products/${categoryId}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );

    const res = await response.json();
     if (!res?.success) {
      errorToast(res?.message || "Failed to fetch products");
      return null;
    }

    return res.data;
  } catch (error) {
    console.error("ProductDetailsByCategory error:", error);
    errorToast("Network error");
    return null;
  } finally {
    // setLoading(false);
  }
};

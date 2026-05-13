import apiClient from '../apiClient';
import { endpointApi } from '../endpoints';
import { errorToast } from '../../utils/customToast';

export const getAllProducts = async (params: {
  page?: number;
  limit?: number;
  categoryId?: string;
  gender?: string;
  topSelling?: boolean;
} = {}) => {
  try {
    const response = await apiClient.get(endpointApi.products, { params });
    if (response.data.success) {
      return response.data;
    } else {
      errorToast(response.data.message || 'Failed to fetch products');
      return null;
    }
  } catch (error) {
    errorToast('Network error while fetching products');
    return null;
  }
};

export const getTopSellingProducts = async (limit: number = 10) => {
  try {
    const response = await apiClient.get(endpointApi.topSellingProducts, {
      params: { limit },
    });
    if (response.data.success) {
      return response.data;
    } else {
      errorToast(response.data.message || 'Failed to fetch top selling products');
      return null;
    }
  } catch (error) {
    errorToast('Network error while fetching top selling products');
    return null;
  }
};

export const getProductDetails = async (productId: string) => {
  try {
    const response = await apiClient.get(`${endpointApi.productDetails}/${productId}`);
    if (response.data.success) {
      return response.data;
    } else {
      errorToast(response.data.message || 'Failed to fetch product details');
      return null;
    }
  } catch (error) {
    errorToast('Network error while fetching product details');
    return null;
  }
};

export const getProductsByCategory = async (categoryId: string, gender: string = 'all') => {
  try {
    const response = await apiClient.get(`categories/${categoryId}/products`, {
      params: { gender }
    });
    if (response.data.success) {
      return response.data;
    } else {
      errorToast(response.data.message || 'Failed to fetch category products');
      return null;
    }
  } catch (error) {
    errorToast('Network error while fetching category products');
    return null;
  }
};

import apiClient from '../apiClient';
import { endpointApi } from '../endpoints';
import { errorToast, successToast } from '../../utils/customToast';

/**
 * Adds a product to the user's cart
 * @param productId The ID of the product to add
 * @param setLoading Optional loading state setter
 * @returns Response data
 */
export const AddToCartApi = async (
  productId: string,
  setLoading?: (loading: boolean) => void
) => {
  try {
    if (setLoading) setLoading(true);
    
    const response = await apiClient.post(endpointApi.cartAdd, {
      productId: productId
    });
    
    if (response.data.success || response.status === 200 || response.status === 201) {
      successToast(response.data.message || 'Added to cart successfully');
      return response.data;
    } else {
      errorToast(response.data.message || 'Failed to add to cart');
      return response.data;
    }
  } catch (error: any) {
    console.error('AddToCartApi Error:', error);
    const errorMsg = error.response?.data?.message || 'Network error';
    errorToast(errorMsg);
    throw error;
  } finally {
    if (setLoading) setLoading(false);
  }
};

/**
 * Fetches the user's current cart
 * @param setLoading Optional loading state setter
 * @returns Cart data
 */
export const GetCartApi = async (
  setLoading?: (loading: boolean) => void
) => {
  try {
    if (setLoading) setLoading(true);
    
    const response = await apiClient.get('cart');
    
    if (response.data.success) {
      return response.data.data;
    } else {
      console.warn('GetCartApi: Success false in response');
      return null;
    }
  } catch (error: any) {
    console.error('GetCartApi Error:', error);
    throw error;
  } finally {
    if (setLoading) setLoading(false);
  }
};

/**
 * Removes a product from the user's cart
 * @param productId The ID of the product to remove
 * @param setLoading Optional loading state setter
 * @returns Response data
 */
export const RemoveFromCartApi = async (
  productId: string,
  setLoading?: (loading: boolean) => void
) => {
  try {
    if (setLoading) setLoading(true);
    
    const response = await apiClient.post(endpointApi.cartRemove, {
      productId: productId
    });
    
    if (response.data.success) {
      successToast(response.data.message || 'Removed from cart');
      return response.data;
    } else {
      errorToast(response.data.message || 'Failed to remove');
      return response.data;
    }
  } catch (error: any) {
    console.error('RemoveFromCartApi Error:', error);
    errorToast(error.response?.data?.message || 'Network error');
    throw error;
  } finally {
    if (setLoading) setLoading(false);
  }
};

/**
 * Updates the quantity of a product in the cart
 * @param productId The ID of the product to update
 * @param quantity The new quantity
 * @param setLoading Optional loading state setter
 * @returns Response data
 */
export const UpdateCartQuantityApi = async (
  productId: string,
  quantity: number,
  setLoading?: (loading: boolean) => void
) => {
  try {
    if (setLoading) setLoading(true);
    
    // Note: Assuming there's an update endpoint, if not we might use cartAdd again or similar
    const response = await apiClient.post('cart/update', {
      productId,
      quantity
    });
    
    return response.data;
  } catch (error: any) {
    console.error('UpdateCartQuantityApi Error:', error);
    throw error;
  } finally {
    if (setLoading) setLoading(false);
  }
};

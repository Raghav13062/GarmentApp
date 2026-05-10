import apiClient from '../apiClient';
import { endpointApi } from '../endpoints';
import { errorToast } from '../../utils/customToast';

export const getAllCategories = async () => {
  try {
    const response = await apiClient.get(endpointApi.categories);
    if (response.data.success) {
      return response.data;
    } else {
      errorToast(response.data.message || 'Failed to fetch categories');
      return null;
    }
  } catch (error) {
    errorToast('Network error while fetching categories');
    return null;
  }
};

import apiClient from '../apiClient';
import { endpointApi } from '../endpoints';
import { errorToast } from '../../utils/customToast';

export const getHomePageData = async (gender: string = 'all') => {
  try {
    const response = await apiClient.get(endpointApi.home, {
      params: { gender },
    });
    if (response.data.success) {
      return response.data;
    } else {
      errorToast(response.data.message || 'Failed to fetch home page data');
      return null;
    }
  } catch (error) {
    errorToast('Network error while fetching home page data');
    return null;
  }
};

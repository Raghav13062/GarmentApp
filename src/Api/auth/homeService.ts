import apiClient from '../apiClient';
import { endpointApi } from '../endpoints'
import { errorToast } from '../../utils/customToast';

export const getHomePageData = async (gender: string = 'Women') => {
  try {
    let formattedGender = 'Women';
    if (gender && gender.toLowerCase() !== 'all') {
      formattedGender = gender.charAt(0).toUpperCase() + gender.slice(1).toLowerCase();
    }
    const url = `${endpointApi.home}?${formattedGender}`;
    const response = await apiClient.get(url);
    if (response.data.success) {
      return response.data;
    } else {
      // errorToast(response.data.message || 'Failed to fetch home page data');
      return null;
    }
  } catch (error) {
    // errorToast('Network error while fetching home page data');
    return null;
  }
};

import apiClient from '../apiClient';
import { endpointApi } from '../endpoints'

export const getHomePageData = async (gender: string = 'women') => {
  try {
    const normalizedGender = String(gender || 'women').trim().toLowerCase();
    const url = `${endpointApi.home}?gender=${encodeURIComponent(normalizedGender)}`;

    const response = await apiClient.get(url);

    if (response.data.success) {
      return response.data;
    } else {
      // errorToast(response.data.message || 'Failed to fetch home page data');
      return null;
    }
  } catch (error: any) {
    console.log('Home API Error:', error?.response?.data || error?.message || error);
    // errorToast('Network error while fetching home page data');
    return null;
  }
};

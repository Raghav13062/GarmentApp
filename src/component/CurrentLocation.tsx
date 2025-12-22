import Geolocation from '@react-native-community/geolocation';
import { PermissionsAndroid, Platform } from 'react-native';
import { UpdateCurrentLatlong } from '../Api/apiRequest';

const requestLocationPermission = async () => {
    if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
    }
    return true;
};

export const getCurrentLocation = async (isLogin: { userData: { id: any; }; } | undefined) => {
    const hasPermission = await requestLocationPermission();

    if (!hasPermission) {
        console.warn('Location permission denied');
        return;
    }

    Geolocation.getCurrentPosition(
        (position) => {
            console.log('Current Location:', position.coords);
            const param = {
                id: isLogin?.userData?.id,
                lat: position.coords?.latitude,
                lon: position.coords?.longitude
            }
            console.log(param, '---params')
            UpdateCurrentLatlong(param)
            return position.coords

        },
        (error) => {
            console.error('Error getting location:', error);
        },
        {
            enableHighAccuracy: true,
            timeout: 15000,
            maximumAge: 10000,
        },
    );
};

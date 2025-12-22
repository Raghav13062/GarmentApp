import React, { useState } from 'react';
import {
  View,
  TextInput,
  FlatList,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Animated,
  Platform,
} from 'react-native';
import imageIndex from '../assets/imageIndex';
import CustomInput from './CustomInput';
 import Icon from './Icon';

type Props = {
  apiKey: string;
  type?: boolean;
  onLocationSelected: (location: {
    latitude: number;
    longitude: number;
    address: string;
  }) => void;
  plac?:string
};

const LocationInput: React.FC<Props> = ({ apiKey, onLocationSelected, type, plac }) => {
  const [places, setPlaces] = useState([]);
  const [searchText, setSearchText] = useState('');
  const fadeAnim = useState(new Animated.Value(0))[0];

  const fetchPlaces = async (input: string) => {
    if (!input) return setPlaces([]);

    const urlHospital = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(
      input
    )}&key=${apiKey}&types=establishment&components=country:fr`;

    const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${input}&key=${apiKey}&language=en`;

    try {
      const response = await fetch(type ? urlHospital : url);
      const result = await response.json();
      setPlaces(result?.predictions || []);
      Animated.timing(fadeAnim, {
        toValue: result?.predictions?.length ? 1 : 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } catch (error) {
      console.error('Error fetching places:', error);
      setPlaces([]);
    }
  };

  const fetchPlaceDetails = async (placeId: string) => {
    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${apiKey}`;

    try {
      const response = await fetch(url);
      const result = await response.json();
      if (result?.result?.geometry?.location) {
        const { lat, lng } = result.result.geometry.location;
        const address = result.result.formatted_address || '';
        setSearchText(address);
        setPlaces([]);
        onLocationSelected({ latitude: lat, longitude: lng, address });
      }
    } catch (error) {
      console.error('Error fetching place details:', error);
    }
  };

  const handleSelectPlace = (place: any) => {
    setSearchText(place.description);
    setPlaces([]);
    fetchPlaceDetails(place.place_id);
  };

  return (
    <View style={styles.container}>
      {/* <View style={styles.searchBar}>
        <Image source={imageIndex.search} style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search for a place"
          value={searchText}
          onChangeText={(text) => {
            setSearchText(text);
            fetchPlaces(text);
          }}
          placeholderTextColor="#808080"
        />
      </View> */}
        <CustomInput
            placeholder={plac ? plac :''}
            value={searchText}
            leftIcon={<Icon source={imageIndex.location3} size={20} />}
           onChangeText={(text) => {
            setSearchText(text);
            fetchPlaces(text);
          }}
          />

      {places.length > 0 && (
        <Animated.View style={[styles.suggestionsContainer, { opacity: fadeAnim }]}>
          <FlatList
            data={places}
            keyExtractor={(item: any) => item.place_id}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.suggestionItem}
                onPress={() => handleSelectPlace(item)}
              >
                <Text style={styles.suggestionText}>{item.description}</Text>
              </TouchableOpacity>
            )}
          />
        </Animated.View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    zIndex: 10,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 10,
    height: 50,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
  },
  searchIcon: {
    width: 20,
    height: 20,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    marginLeft: 10,
  },
  suggestionsContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    marginTop: 8,
    maxHeight: 200,
  },
  suggestionItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  suggestionText: {
    fontSize: 16,
    color: 'black',
  },
});

export default LocationInput;

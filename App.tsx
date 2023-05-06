import React, { useState } from 'react';
import { View, TextInput } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const Map = () => {
  const [location, setLocation] = useState('');
  const [coordinates, setCoordinates] = useState<{
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
  } | undefined>();

  const handleSearch = async () => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=AIzaSyAmaBD99BFTkihnNzOm3iR5q-JRF6xnKB0`
      );
      const data = await response.json();
      console.log(data);

      if (data.status === 'OK') {
        const { lat, lng } = data.results[0].geometry.location;
        setCoordinates({
          latitude: lat,
          longitude: lng,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, margin: 5 , marginTop: 50}}
        value={location}
        onChangeText={setLocation}
        onSubmitEditing={handleSearch}
        placeholder="Digite o nome da localização"
      />
      {coordinates && (
        <MapView style={{ flex: 1 }} region={coordinates}>
          <Marker coordinate={coordinates} title={location} />
        </MapView>
      )}
    </View>
  );
};

export default Map;
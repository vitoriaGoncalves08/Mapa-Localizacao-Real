import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState}from 'react';
import { StyleSheet, View, Dimensions, Alert} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import * as Location from 'expo-location';
import customMap from './assets/css/customMap';

export default function App() {
  
  let [region, setRegion] = useState({
    latitude:35.000074,
    longitude:104.999927,
    latitudeDelta: 0.014,
    longitudeDelta: 0.014,
  });

  useEffect(()=>{ //quando executar ao app faz o que está no useEffect
    Alert.alert("Bem-vindo", "Veja agora sua localização atual");

    Location.installWebGeolocationPolyfill()
    navigator.geolocation.getCurrentPosition(posicao => {
        console.log(posicao.coords);

        setRegion({
          latitude:posicao.coords.latitude,
          longitude:posicao.coords.longitude,
          latitudeDelta: 0.014,
          longitudeDelta: 0.014,
        });
      }
    );
    
  },[]
  );

  return (
    <View style={styles.container}>
      <MapView style={styles.map} customMapStyle={customMap} region={region} showsUserLocation>
      <Marker
        coordinate={{
          latitude:region.latitude,
          longitude:region.longitude,
        }}
        icon={{
          uri:"https://img.icons8.com/fluency/46/000000/home.png"
        }}
          />
      </MapView>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  map:{
    width: Dimensions.get('window').width,
    height:'100%',

  }
});

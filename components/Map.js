import MapView, { Marker, Polyline } from 'react-native-maps';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  StyleSheet,
  View,
  Dimensions,
  Text
} from 'react-native';
import { useEffect } from 'react';
import GetLocation from 'react-native-get-location';
import { mapDarkStyle } from '../config';
import Road from './Road';


const Map = ({markers, location, user, setShowHelper, origin, destination}) => {
  // const getPostition = () => {
  //   GetLocation.getCurrentPosition({
  //     enableHighAccuracy: true,
  //     timeout: 15000,
  //   })
  //   .then(location => {
  //     console.log(location);
  //     // setLocation({
  //     //   longitude: location.longitude,
  //     //   latitude: location.latitude
  //     // });
  //   })
  //   .catch(error => {
  //       const { code, message } = error;
  //       console.warn(code, message);
  //   });
  // }
  // useEffect(() => {
  //   const interval = setInterval(() =>getPostition(), 5000);
  //   return () => {
  //     clearInterval(interval);
  //   }
  // }, []);
  
  return ( 
    <MapView 
      customMapStyle={mapDarkStyle}
      // showsTraffic={true}
      style={styles.map}
      initialRegion={{
        ...location,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
    >
      {/* {markers.map((marker, i) => ( */}
      <Marker 
        onPress={() => {
          setShowHelper(true);
        }}
        style={{width: 30, height: 30}} 
        coordinate={location}
        // key={i}
        // pinColor='green' 
      >
        {user.type === 'passenger' ? 
          <Icon name='bus' size={30} style={{color: 'white'}} /> 
          : <Icon name='human-greeting' size={20} style={{color: 'white'}} />
        }
      </Marker>
      {/* ))} */}
      <Road  origin={origin} destination={destination}/>
    </MapView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});

export default Map;
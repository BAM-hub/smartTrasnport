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




const Map = ({markers, location, user}) => {
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
    style={styles.map}
    initialRegion={{
      ...location,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    }}
    >
      {/* {markers.map((marker, i) => ( */}
        <Marker 
          style={{width: 30, height: 30}} 
          coordinate={location}
          // key={i}
          // pinColor='green' 
          // description={`no ${i}`} 
          >
          {user.type === 'passenger' ? <Icon name='bus' size={30} /> : <Icon name='human-greeting' size={20} />}
        </Marker>
      {/* ))} */}
      {/* <Polyline 
        coordinates={[
          {
            ...location
          },
          {
            latitude: -122.089435,
            longitude: 37.422644,
          }
        ]}
        strokeColor="#000" // fallback for when `strokeColors` is not supported by the map-provider
        strokeColors={[
          '#7F0000',
          '#00000000', // no color, creates a "long" gradient between the previous and next coordinate
          '#B24112',
          '#E5845C',
          '#238C23',
          '#7F0000'
        ]}
        strokeWidth={6}
      /> */}
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
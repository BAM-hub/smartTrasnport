import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import LoadScreen from './LoadScreen';
import RegisterScreen from './RegisterScreen';
import GetLocation from 'react-native-get-location';
import { io } from 'socket.io-client';
import MapScreen from './MapScreen';

const SOCKET_URL = 'http://192.168.1.71:5000';

const ScreenProvider = () => {
  const [markers, setMarkers] = useState([]);
  const [location, setLocation] = useState({
    longitude: 0,
    latitude: 0
  });
  const [user, setUser] = useState({
    name: '',
    type: '',
    line: '',
    id: ''
  });

  
  // useEffect(() => {
  //   const _watchId = Geolocation.watchPosition(
  //     position => {
  //       const {latitude, longitude} = position.coords;
  //       console.log({latitude, longitude});
  //       setLocation({latitude, longitude});
  //     },
  //     error => {
  //       console.log(error);
  //     },
  //     {
  //       enableHighAccuracy: true,
  //       distanceFilter: 0,
  //       interval: 5000,
  //       fastestInterval: 2000,
  //     },
  //   );
  //   Geolocation.clearWatch(_watchId);
  // }, []);

  // const [socket, setSocket] = useState(io(SOCKET_URL));
  // console.log(socket);

  useEffect(() => {
    const socket = io(SOCKET_URL);
    if(user.type !== '' && location.longitude !== 0 && location.latitude !== 0) {
      console.log(user);
      // console.log(socket);
      socket?.emit('join', {
        ...user,
        cords: location
      });
    }
    socket?.on('initial-coords', markerCords => {
      console.log('markers: ', markerCords);
        if(markers.length !== 0)
          return;
        setMarkers(markerCords);
    });

    return () => {
      socket?.off('connection');
      socket?.off('join');
      socket?.close();
    }
  }, [user.type, location.latitude, location.latitude]);

  return (
    <View style={styles.container}>
    { location.latitude === 0 || user.type === '' ? <LoadScreen 
      setLocation={setLocation}
      user={user}
      setUser={setUser}
    /> 
    : user.type === 'none' ? <RegisterScreen setUser={setUser} />
    : <MapScreen 
        location={location}
        user={user}
        markers={markers}
      /> }
    {/* <RegisterScreen /> */}
  </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
});


export default ScreenProvider;
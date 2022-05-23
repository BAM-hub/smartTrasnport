import React, { useEffect, useContext } from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import LoadScreen from './LoadScreen';
import RegisterScreen from './RegisterScreen';
import MapScreen from './MapScreen';
import GetLocation from 'react-native-get-location';
import { SocketContext } from '../context/socket';
import { MarkersContext } from '../context/MarkersContext';
import { LocationContext } from '../context/LocationContext';
import { UserContext } from '../context/UserContext';

const ScreenProvider = () => {

  const [markers, setMarkers] = useContext(MarkersContext);
  const [location] = useContext(LocationContext);
  const socket = useContext(SocketContext);
  const [user, setUser] = useContext(UserContext);

  useEffect(() => {

    if(user.type !== '' && location.longitude !== 0 && location.latitude !== 0) {
      socket.connect();
      socket.on("connect", ()  => {
        console.log('connected!');
        socket.emit('join', user);
      });
    } else {
      socket.disconnect();
    }

    // get location every seconds
    const interval = setInterval(() => {
      GetLocation.getCurrentPosition({
        enableHighAccuracy: true,
        timeout: 15000,
      })
      .then(location => {
        // console.log(location);
        // setLocation({
        //   longitude: location.longitude,
        //   latitude: location.latitude
        // });
      })
      .catch(error => {
          const { code, message } = error;
          console.warn(code, message);
      });
    }, 5000);

    // save user in server memory
    socket?.emit('user_live',
     {...user, cords: location}
    );
    
    // listen to initial coords
    socket?.on('initial-coords', markerCords => {
      console.log('markers: ', markerCords);
        if(markers.length !== 0)
          return;
        setMarkers(markerCords);
    });

    return () => {
      socket?.off('connection');
      socket?.off('join');
      socket.close();
      clearInterval(interval);
    }
  }, [user.type, location.latitude, location.latitude]);


  return (
    <View style={styles.container}>
      { 
        location.latitude === 0 || user.type === '' ? 
        <LoadScreen 
          user={user}
          setUser={setUser}
        /> 
        : user.type === 'none' ? 
          <RegisterScreen setUser={setUser} />
        : <MapScreen /> 
      }
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
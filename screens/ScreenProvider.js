import React, { useEffect, useContext } from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import LoadScreen from './LoadScreen';
import RegisterScreen from './RegisterScreen';
import MapScreen from './MapScreen';
import { SocketContext } from '../context/socket';
import { MarkersContext } from '../context/MarkersContext';
import { LocationContext } from '../context/LocationContext';
import { UserContext } from '../context/UserContext';
import { DATAContext } from '../context/DATAContext';

const ScreenProvider = () => {

  const [markers, setMarkers] = useContext(DATAContext);
  const [location] = useContext(LocationContext);
  const socket = useContext(SocketContext);
  const [user, setUser] = useContext(UserContext);

  useEffect(() => {

    if(user.type !== '' && location.longitude !== 0 && location.latitude !== 0) {
      socket.connect();
      socket.on("connect", ()  => {
        console.log('connected!');
        socket.emit('join', user);
        // save user in server memory
        socket?.emit('user_live',
        {...user, cords: location});
      });
    } else {
      socket.disconnect();
    }
    if(user.type === 'captin') {
      setUser({
        ...user,
        ride: {
          passengerCount: 0,
          requests: []
        }
      });
    }    
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
import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import LoadScreen from './LoadScreen';
import RegisterScreen from './RegisterScreen';
import { io } from 'socket.io-client';
import MapScreen from './MapScreen';
import axios from 'axios';
import { SOCKET_URL, API_KEY } from '../config';
import GetLocation from 'react-native-get-location';

const ScreenProvider = () => {
  const origin = { latitude: 31.966882, longitude: 35.988638 };
  // const destination = { latitude: 31.963817, longitude: 35.975449};
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
  // get distance
  // useEffect(async () => {
  //   try {
  //     const config = {
  //       method: 'get',
  //       url: `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${origin.latitude},${origin.longitude}&destinations=${destination.latitude},${destination.longitude}&units=km&key=${API_KEY}`,
  //       headers: {}
  //     };
  //     const res = await axios(config);
  //     console.log(JSON.stringify(res.data));
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }, []);

  useEffect(() => {
    const socket = io(SOCKET_URL, {
      transports: ["websocket"]
    });
    if(user.type !== '' && location.longitude !== 0 && location.latitude !== 0) {
      socket.connect();
      // console.log(socket);
      socket.on("connect", ()  => {
        console.log('connected!');
        socket.emit("my_event", { data: "do u hear me" });
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
    { location.latitude === 0 || user.type === '' ? <LoadScreen 
      setLocation={setLocation}
      user={user}
      setUser={setUser}
    /> 
    : user.type === 'none' ? <RegisterScreen setUser={setUser} />
    : <MapScreen 
        location={origin}
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
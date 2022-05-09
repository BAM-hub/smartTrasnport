import React, { useEffect, useState } from 'react';
import MapView, { Marker, Polyline } from 'react-native-maps';
import { io } from 'socket.io-client';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  StyleSheet,
  View,
  Dimensions,
  Text
} from 'react-native';

const SOCKET_URL = 'http://192.168.1.71:8000';


const MapScreen = ({ location, user }) => {

  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    const socket = io(SOCKET_URL, {
      transports: ["websocket"]
    });
    socket.connect();
    // console.log(socket);
    socket.on("connect", ()  => {
      console.log('connected!');
      // socket.emit("my_event", { data: "do u hear me" });
    });
    socket.emit('user_live',
     {...user, cords: location}
    );
    socket.on('initial-coords', markerCords => {
      console.log('markers: ', markerCords);
        if(markers.length !== 0)
          return;
        setMarkers(markerCords);
    });
    // console.log(socket);
    console.log(markers);
    return () => {
      socket?.off('connection');
      socket.off('join');
    //   socket.close();
    }
  }, [user]);

  return (
      <>

        <Text>
          hello
        </Text>
      </>
    // <MapView 
    // style={styles.map}
    // initialRegion={{
    //   ...location,
    //   latitudeDelta: 0.0922,
    //   longitudeDelta: 0.0421,
    // }}
    // >
    //   {markers.map((marker, i) => (
    //     <Marker 
    //       style={{width: 30, height: 30}} 
    //       coordinate={location}
    //       // key={i}
    //       // pinColor='green' 
    //       // description={`no ${i}`} 
    //       >
    //       {user.type === 'passenger' ? <Icon name='bus' size={30} /> : <Icon name='human-greeting' size={20} />}
    //     </Marker>
    //   {/* ))} */}
    //   {/* <Polyline 
    //     coordinates={[
    //       {
    //         ...location
    //       },
    //       {
    //         latitude: -122.089435,
    //         longitude: 37.422644,
    //       }
    //     ]}
    //     strokeColor="#000" // fallback for when `strokeColors` is not supported by the map-provider
    //     strokeColors={[
    //       '#7F0000',
    //       '#00000000', // no color, creates a "long" gradient between the previous and next coordinate
    //       '#B24112',
    //       '#E5845C',
    //       '#238C23',
    //       '#7F0000'
    //     ]}
    //     strokeWidth={6}
    //   /> */}
    // </MapView>
  );
};


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

  

export default MapScreen;
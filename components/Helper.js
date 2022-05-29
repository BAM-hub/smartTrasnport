import React, { useState, useContext, useEffect } from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { 
  View,
  Dimensions,
  Text,
  TouchableOpacity,
  StyleSheet
} from 'react-native';
import { API_KEY } from '../config';
import axios from 'axios';
import { SocketContext } from '../context/socket';
import { DATAContext } from '../context/DATAContext';
import { UserContext } from '../context/UserContext';
import { HelperContext } from '../context/HelperContext';
import { LocationContext } from '../context/LocationContext';

const SCROLL_WIDTH = Dimensions.get('window').width/1.2 + 10;
const CARD_WIDTH = Dimensions.get('window').width/1.4;

const Helper = () => {
  const socket = useContext(SocketContext);
  const [user, setUser] = useContext(UserContext);
  const [helper, setHelper] = useContext(HelperContext);
  // const [drivers, setDrivers] = useState(DATA);
  const [data, setData] = useContext(DATAContext);
  const [location] = useContext(LocationContext);

  useEffect(() => {
    socket.on('rideResponse', res => {
      if(res.userId !== user.id)
        return;
      console.log(res)
      setUser({...user, ride: {
        seatReserved: true,
        driverId: res.driverId
      }});
    });
    return () => {
      socket.off('rideResponse');
    }
  }, []);

  useEffect(async () => {
    try {
      const config = {
        method: 'get',
        url: 
          `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${data[helper.index].coords.latitude},${data[helper.index].coords.longitude}&destinations=${location.latitude},${location.longitude}&units=km&key=${API_KEY}`,
        headers: {}
      };
      const res = await axios(config);
      const parsed = res.data.rows[0].elements[0];
      const newData = data.map((d, i) => i === helper.index ? {
        ...d,
        distance: parsed.distance.text,
        time: parsed.duration.text
      } : d);
      setData(newData);
    } catch (err) {
      console.log(err);
    }
  }, []);

  const handelCardPress = () => {
    if(user.ride)
    socket.emit('cancelRide', {
      user: user.id,
      driverId: user.ride.driverId
    });
    socket.emit('raidRequest', {
      userId: user.id,
      driverId: helper.index,
      location
    });
  }
  return (
    <View style={styles.container}>
    <Icon 
      name='close'
      size={30}
      style={{color: 'white'}}
      onPress={() => {
        // setShowRoad(false);
        setHelper({
          state: false,
          index: 0,
          scrollHelper: false,
          showRoad: false
        });
      }}
    />
    <TouchableOpacity 
      style={styles.showAll}
      onPress={() => {
        setHelper({
          state: false,
          index: 0,
          scrollHelper: true,
          showRoad: true
        });

      }}
    >
      <Text style={styles.invertText}>Show all</Text>
    </TouchableOpacity>
      
      <View 
        style={styles.scroll}
      >
          <TouchableOpacity
            onPress={e => handelCardPress(e)}
            style={styles.card}
          >
            <Text style={styles.text}>Captin: {data[helper.index].name}</Text>
            <Text style={styles.text}>Line: {data[helper.index].line}</Text>
            <Text style={styles.text}>Distance: {data[helper.index].distance}</Text>
            <Text style={styles.text}>Estimated Time: {data[helper.index].time}</Text>
            <Text style={[styles.text, {fontWeight: 'bold'}]} >Press Card To Rquest Ride</Text>
          </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    flexDirection: 'column',
    bottom: 0,
    zIndex: 1,
    height: Dimensions.get('window').height/3,
    width: Dimensions.get('window').width,
  },
  scroll: {
    width: Dimensions.get('window').width,
    padding: 5,
    margin: 5,
    marginTop: 0,
    alignContent: 'center',
  },
  card: {
    borderRadius: 4,
    paddingHorizontal: 20,
    paddingVertical: 10,
    height: Dimensions.get('window').height/3.9,
    backgroundColor: 'white',
    margin: SCROLL_WIDTH - CARD_WIDTH,
    marginTop: 0,
    width: CARD_WIDTH,
    justifyContent: 'space-evenly',
  },
  text: {
    color: 'black',
    fontSize: 16
  },
  showAll: {
    position: 'absolute',
    right: 0,
    padding: 5,
  },
  invertText: {
    color: 'white',
    fontSize: 16
  }
});

export default Helper
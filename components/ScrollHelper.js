import React, { useState, useContext, useEffect } from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { 
  View,
  Dimensions,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet
} from 'react-native';
import axios from 'axios';
import { API_KEY } from '../config';
import { SocketContext } from '../context/socket';
import { DATAContext } from '../context/DATAContext';
import { UserContext } from '../context/UserContext';
import { HelperContext } from '../context/HelperContext';

const SCROLL_WIDTH = Dimensions.get('window').width/1.2 + 10;
const CARD_WIDTH = Dimensions.get('window').width/1.4;
const SCROLL_OFFSET = parseInt(
  CARD_WIDTH + (SCROLL_WIDTH - CARD_WIDTH) * 2
);

const ScrollHelper = () => {
  const [scrollX, setScrollX] = useState(0);
  const [user] = useContext(UserContext);
  const [helper, setHelper] = useContext(HelperContext);
  // const [drivers, setDrivers] = useState(DATA);
  const [data, setData] = useContext(DATAContext);

  useEffect(() => {
    socket.on('rideResponse', res => {
      console.log(res);
    });
    return () => {
      socket.off('rideResponse');
    }
  }, []);

  useEffect(async () => {
    try {
      const origin = { latitude: 31.966882, longitude: 35.988638 };
      const destination = { latitude: 31.963817, longitude: 35.975449};
      const config = {
        method: 'get',
        url: `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${origin.latitude},${origin.longitude}&destinations=${destination.latitude},${destination.longitude}&units=km&key=${API_KEY}`,
        headers: {}
      };
      const res = await axios(config);
      const parsed = res.data.rows[0].elements[0];
      const newData = data.map((d, i) => i === scrollX ? {
        ...d,
        distance: parsed.distance.text,
        time: parsed.duration.text
      } : d);
      setData(newData);
    } catch (err) {
      console.log(err);
    }

  }, [scrollX, helper]);

  const handelCardPress = i => {
    // console.log(e);
    socket.emit('raidRequest', {
      userId: user.id,
      driverId: i
    } );
  }
  const socket = useContext(SocketContext);
  const handelScroll = (e) => {
    setScrollX(
      parseInt(
        parseInt(e.nativeEvent.contentOffset.x)/SCROLL_OFFSET
      )
    );
    // show driver line
  };
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
          index: 0
        });
      }}
    />
      <ScrollView 
        onScroll={e => handelScroll(e)}
        horizontal={true}
        pagingEnabled
        style={styles.scroll}
      >
        {data.map((d, i) => (
          <TouchableOpacity
            onPress={e => handelCardPress(e, i)}
            key={i}
            style={styles.card}
          >
            <Text style={styles.text}>Captin: {d.name}</Text>
            <Text style={styles.text}>Line: {d.line}</Text>
            <Text style={styles.text}>Distance: {d.distance}</Text>
            <Text style={styles.text}>Estimated Time: {d.time}</Text>
            <Text style={[styles.text, {fontWeight: 'bold'}]} >Press Card To Rquest Ride</Text>
          </TouchableOpacity>
        ))}

      </ScrollView>
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
  }
});

export default ScrollHelper
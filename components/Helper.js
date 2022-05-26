import React, { useState, useContext, useEffect } from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { 
  View,
  Dimensions,
  Text,
  TouchableOpacity,
  StyleSheet
} from 'react-native';
import { SocketContext } from '../context/socket';
import { DATAContext } from '../context/DATAContext';
import { UserContext } from '../context/UserContext';
import { HelperContext } from '../context/HelperContext';

const SCROLL_WIDTH = Dimensions.get('window').width/1.2 + 10;
const CARD_WIDTH = Dimensions.get('window').width/1.4;

const Helper = ({ setShowRoad, setFocusLocation }) => {
  const [user] = useContext(UserContext);
  const [helper, setHelper] = useContext(HelperContext);
  // const [drivers, setDrivers] = useState(DATA);
  const [data] = useContext(DATAContext);

  useEffect(() => {
    socket.on('rideResponse', res => {
      console.log(res);
    });
    return () => {
      socket.off('rideResponse');
    }
  }, []);

  // useEffect(async () => {
  //     try {
  //       const config = {
  //         method: 'get',
  //         url: `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${origin.latitude},${origin.longitude}&destinations=${destination.latitude},${destination.longitude}&units=km&key=${API_KEY}`,
  //         headers: {}
  //       };
  //       const res = await axios(config);
  //       console.log(JSON.stringify(res.data));
  //     } catch (err) {
  //       console.log(err);
  //     }
  // }, []);

  const handelCardPress = () => {
    // console.log(e);
    socket.emit('raidRequest', {
      userId: user.id,
      driverId: helper.index
    } );
  }
  const socket = useContext(SocketContext);
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
          scrollHelper: false
        });
      }}
    />
    <TouchableOpacity 
      style={styles.showAll}
      onPress={() => {
        setHelper({
          state: false,
          index: 0,
          scrollHelper: true
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
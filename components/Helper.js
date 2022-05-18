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
import { SocketContext } from '../context/socket';

const SCROLL_WIDTH = Dimensions.get('window').width/1.2 + 10;
const CARD_WIDTH = Dimensions.get('window').width/1.4;
const SCROLL_OFFSET = parseInt(
  CARD_WIDTH + (SCROLL_WIDTH - CARD_WIDTH) * 2
);
const DATA = [
  {
    name: 'Ali',
    line: 'Amman As-Salt',
    distance: 'Calculating',
    time: 'Calculating'
  },
  {
    name: 'Ali',
    line: 'Amman As-Salt',
    distance: 'Calculating',
    time: 'Calculating'
  },
  {
    name: 'Ali',
    line: 'Amman As-Salt',
    distance: 'Calculating',
    time: 'Calculating'
  },
];

const Helper = ({ setShowHelper, setShowRoad, user }) => {
  const [scrollX, setScrollX] = useState(0);
  const [drivers, setDrivers] = useState(DATA);

  useEffect(() => {
    socket.on('rideResponse', res => {
      console.log(res);
    });
    return () => {
      socket.off('rideResponse');
    }
  }, []);

  const handelCardPress = i => {
    // console.log(e);
    socket.emit('raidRequest', {
      userId: user.id,
      driverId: i
    } );
  }
  const socket = useContext(SocketContext);
  const handelScroll = (e, i) => {
    setScrollX(
      parseInt(
        parseInt(e.nativeEvent.contentOffset.x)/SCROLL_OFFSET
      )
    );
    //api request for distance based on drivers location
    // show driver line
    // change drivers state with new info

  };
  return (
    <View style={styles.container}>
    <Icon 
      name='close'
      size={30}
      style={{color: 'white'}}
      onPress={() => {
        setShowRoad(false);
        setShowHelper(false);
      }}
    />
      <ScrollView 
        onScroll={e => handelScroll(e, i)}
        horizontal={true}
        pagingEnabled
        style={styles.scroll}
      >
        {drivers.map((d, i) => (
          <TouchableOpacity
            onPress={() => handelCardPress(i)}
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

export default Helper
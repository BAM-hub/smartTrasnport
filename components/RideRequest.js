import React, { useState, useEffect, useContext } from 'react';
import { 
  StyleSheet,
  View,
  Dimensions,
  Text,
  TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { ProgressBar, Colors } from 'react-native-paper';
import { SocketContext } from '../context/socket';
import { UserContext } from '../context/UserContext';
import { LocationContext } from '../context/LocationContext';

const SCROLL_WIDTH = Dimensions.get('window').width/1.2 + 10;
const CARD_WIDTH = Dimensions.get('window').width/1.4;


const RideRequest = ({ ride }) => {
  const [progress, setProgress] = useState(0);
  const socket = useContext(SocketContext);
  const [user, setUser] = useContext(UserContext);
  const [location] = useContext(LocationContext);
  useEffect(() => {
    const interval = setInterval(() => setProgress(progress + 0.1), 500);
    if(progress >= 1) 
      rejectHandel();

    return () => {
      clearInterval(interval);
    }
  }, [progress]);

  const rejectHandel = () => {
      socket.emit('answer', {
        ...ride,
        status: 'false'
      });
      let filterdRequests = user.ride.requests.filter(req => req.userId !== ride.userId && req);
      console.log(filterdRequests);
      setUser({
        ...user,
        ride: {
          ...user.ride,
          requests: filterdRequests
        }
      })
  }

  const acceptHandel = () => {
    socket.emit('answer', {
      ...ride,
      status: 'true'
    });
    setUser({
      ...user,
      ride: {
        ...user.ride,
        passengerCount: ++user.ride.passengerCount
      }
    });
    let filterdRequests = user.ride.requests.filter(req => req.userId !== ride.userId && req);
    console.log(filterdRequests);
    setUser({
      ...user,
      ride: {
        ...user.ride,
        requests: filterdRequests
      }
    })
  }

  return (
    <View style={styles.container}>
      <View 
        style={styles.scroll}
      >
      <Icon 
        name='close'
        size={30}
        style={{color: 'white'}}
        onPress={() => rejectHandel()}
      />
        <TouchableOpacity 
          style={styles.card}
          onPress={() => acceptHandel()}
        >
            <ProgressBar
              progress={progress}
              color={Colors.red500}
              style={styles.progress}
            />
            <Text style={styles.text}>Any Available Seats ?</Text>
            <Text style={styles.text}>Touch Card To Accept.</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    flexDirection: 'column',
    bottom: 0,
    zIndex: 1,
    height: Dimensions.get('window').height/4,
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
    height: Dimensions.get('window').height/6,
    backgroundColor: 'white',
    margin: SCROLL_WIDTH - CARD_WIDTH,
    marginTop: 0,
    width: CARD_WIDTH,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 10
  },
  progress: {
    zIndex: 2,
    width: CARD_WIDTH,
  },
  text: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold'
  }
});

export default RideRequest;
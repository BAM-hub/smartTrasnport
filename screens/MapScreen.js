import React, { useEffect, useState, useContext } from 'react';
import { 
  View
} from 'react-native';
import Map from '../components/Map';
import Helper from '../components/Helper';
import ScrollHelper from '../components/ScrollHelper';
import { LocationContext } from '../context/LocationContext';
import { HelperContext } from '../context/HelperContext';
import GetLocation from 'react-native-get-location';
import { UserContext } from '../context/UserContext';
import { SocketContext } from '../context/socket';
import RideRequest from '../components/RideRequest';


const MapScreen = () => {
  const socket = useContext(SocketContext);
  const [showRoad, setShowRoad] = useState(false);
  const [helper] = useContext(HelperContext);
  const [user, setUser] = useContext(UserContext);
  // const [location] = useContext(LocationContext);
  // test value
  // const location = { latitude: 31.966882, longitude: 35.988638 };
  const [focusLocation, setFocusLocation] = useState(location);
  const [location, setLocation] = useContext(LocationContext);

  useEffect(async () => {
    // get location every seconds
    if(user.type === 'captin') {
      const interval = setInterval(() => {
        GetLocation.getCurrentPosition({
          enableHighAccuracy: true,
          timeout: 15000,
        })
        .then(location => {
          socket.emit('driverBroadcast', {
            coords: { longitude: location.longitude,
              latitude: location.latitude},
            ...user
          });
          // console.log(location);
          setLocation({
            longitude: location.longitude,
            latitude: location.latitude
          });
          setFocusLocation({
            longitude: location.longitude,
            latitude: location.latitude
          });
        })
        .catch(error => {
            const { code, message } = error;
            console.warn(code, message);
        });
      }, 10000);
        socket.on('rideRequest', request => {
          setUser({
            ...user,
            ride: {
              ...user.ride,
              requests: [...user.ride.requests, request]
            }
          })
          console.log(user, user.ride.requests[0])
        });
        socket.on('cancelRide', ride => {
          let filterdRequests = user.ride.requests.filter(req => req.userId !== ride.userId && req);
          console.log(filterdRequests);
          setUser({
            ...user,
            ride: {
              passengerCount: --user.ride.passengerCount,
              requests: filterdRequests
            }
          })
        });
        return () => {
          clearInterval(interval);
          socket.off('cancelRide');
          socket.off('rideRequest');
        }
    } else {
      socket.on('changeLocation', user => console.log(user))

      return () => {
        socket.off('changeLocation')
      }
    }
  }, []);
  return (
      <View
        style={{
          flex: 1,
        }}
      >
        <Map
          showRoad={showRoad}
          setShowRoad={setShowRoad}
          focusLocation={focusLocation}
          setFocusLocation={setFocusLocation}
        />
        {helper.state ? 
          <Helper
            setShowRoad={setShowRoad}
            setFocusLocation={setFocusLocation}
          /> : helper.scrollHelper && <ScrollHelper />
        }
        {
          user.type === 'captin' && user?.ride?.requests?.length !== 0 && 
            <RideRequest ride={user?.ride?.requests[0]} />
        }
      </View>
  );
};

  

export default MapScreen;
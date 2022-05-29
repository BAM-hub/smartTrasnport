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
import { DATAContext } from '../context/DATAContext';
import RideRequest from '../components/RideRequest';
import Info from '../components/Info';


const MapScreen = () => {
  const socket = useContext(SocketContext);
  const [showRoad, setShowRoad] = useState(false);
  const [helper] = useContext(HelperContext);
  const [user, setUser] = useContext(UserContext);
  const [data, setData] = useContext(DATAContext);
  // test value
  const [focusLocation, setFocusLocation] = useState(location);
  const [location, setLocation] = useContext(LocationContext);

  useEffect(() => {
    socket.on('user_disconnect', user => {
      console.log(user)
      console.log('original data', data);
      const newData = data.filter(d => d.id !== user.id && d);
      console.log('new data', newData)
      setData(newData);
    });

    return () => {
      socket.off('user_disconnect');
    }
  });

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
              requests: [...user.ride?.requests, request]
            }
          })
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
      socket.on('changeLocation', user => {
        const newData = data.map(d => d.id === user.id ? user : d);
        setData(newData);
      })

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
        {
          user?.ride?.seatReserved && <Info />
        }
      </View>
  );
};

  

export default MapScreen;
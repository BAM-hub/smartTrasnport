import React, { useEffect, useState, useContext } from 'react';
import { View } from 'react-native';
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
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    socket.on('get_answer', request => {
      console.log('req', request)
      if(request.driverId === user.id) {
        setUser({
          ...user,
          ride: {
            ...user.ride,
            requests: [...user.ride.requests, request]
          }
        });
        setRequests(prevState => [...prevState, request]);
      }
    });
    return () => {
      socket.off('get_answer');
      socket.off('cancelRide');
    }
  });

  // initial and conditinal listners for drivers
  useEffect(async () => {
    socket.connect();
    console.log('connected!');
    socket.emit('join', {...user, coords: location});
    
    // listen to initial coords
    socket.emit('user_live', {...user, coords: location});
    socket.on('initial-coords', markerCords => {
      console.log(markerCords.markerCords);
      if(markerCords.id === user.id) 
        setData(markerCords.markerCords);
    });

    if(user.type === 'captin') {
      setUser({
        ...user,
        distance: 'Calculating',
        time: 'Calculating',
        ride: {
          passengerCount: 0,
          requests: []
        }
      });
    }    
    return () => {
      socket.off('cancelRide');
      socket.off('new_user');
      socket.off('user_live');
      socket.off('initial-coords');
      socket?.off('connection');
      socket?.off('join');
    }
  }, [user.type]);

  // driver location broadcast 
  useEffect(() => {
        const interval = setInterval(() => {
          GetLocation.getCurrentPosition({
            enableHighAccuracy: true,
            timeout: 15000,
          })
          .then(location => {
            console.log(location)
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
        }, 30000);

        return () => {
        clearInterval(interval);
        }
  }, [location.latitude, location.longitude]);



  //global event listners
  useEffect(() => {
    socket.on('new_user', newUser => {
      if(newUser.type !== user.type) 
        if(newUser.coords) 
          setData(prevState => [...prevState, newUser]);
    });
    socket.on('user_disconnect', user => {
      console.log('original data', data);
      const newData = data.filter(d => d.id !== user.id && d);
      setData(newData);
    });

    return () => {
      socket.off('new_user');
      socket.off('user_disconnect');
    }
  });

  // user's event listners
  useEffect(() => {
    if(user.type === 'passenger') {
      socket.on('changeLocation', user => {
        const newData = data.map(d => d.id === user.id ? user : d);
        setData(newData);
        console.log('new', newData);
      })
      socket.on('answer', res => {
        console.log('res', res)
        if(res.userId !== user.id)
          return;
        console.log(res)
        if(!res.status)
          setUser({...user, ride: {
            seatReserved: true,
            driverId: res.driverId
          }});
      });

      return () => {
        socket.off('answer');
        socket.off('changeLocation');
      }
    }
  }, [user.type]);

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
          user.type === 'captin' && requests.length !== 0 && 
            <RideRequest requests={requests} setRequests={setRequests} />
        }
        {
          user?.ride?.seatReserved && <Info />
        }
      </View>
  );
};

  

export default MapScreen;
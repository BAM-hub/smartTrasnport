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
import RideRequest from '../components/RideRequest';


const MapScreen = () => {
  const [showRoad, setShowRoad] = useState(false);
  const [helper] = useContext(HelperContext);
  const [user] = useContext(UserContext);
  // const [location] = useContext(LocationContext);
  // test value
  const location = { latitude: 31.966882, longitude: 35.988638 };
  const [focusLocation, setFocusLocation] = useState(location);

  // useEffect(async () => {
  //   // get location every seconds
  //   const interval = setInterval(() => {
  //     GetLocation.getCurrentPosition({
  //       enableHighAccuracy: true,
  //       timeout: 15000,
  //     })
  //     .then(location => {
  //       // console.log(location);
  //       // setLocation({
  //       //   longitude: location.longitude,
  //       //   latitude: location.latitude
  //       // });
  //     })
  //     .catch(error => {
  //         console.log('eerrrrr');
  //         const { code, message } = error;
  //         console.warn(code, message);
  //     });
  //   }, 10000);

  //   return () => {
  //     clearInterval(interval);
  //   }
  // }, []);
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
          user.type === 'captin' && <RideRequest />
        }
      </View>
  );
};

  

export default MapScreen;
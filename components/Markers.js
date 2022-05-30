import React, { useContext } from 'react';
import { Marker } from 'react-native-maps';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { UserContext } from '../context/UserContext';
import { HelperContext } from '../context/HelperContext';
import { FocusLocationContext } from '../context/FocusLocationContext';

const Markers = ({ marker, index }) => {
  const [user] = useContext(UserContext);
  const [__, setHelper] = useContext(HelperContext);
  const [focucsLocation, setFocusLocation] = useContext(FocusLocationContext);
  
  return (
    <Marker 
      onPress={() => {
        if(user.type === 'captin')
          return;
        setHelper({
          state: true,
          driverId: marker.id,
          index,
          scrollHelper: false,
          showRoad: true
        });
        setFocusLocation(marker.coords);
      }}
      style={{width: 30, height: 30}} 
      coordinate={marker.coords}
    >
      {user.type === 'passenger' ? 
        <Icon name='bus' size={30} style={{color: 'limegreen'}} /> 
        : <Icon name='human-greeting' size={20} style={{color: 'limegreen'}} />
      }
    </Marker>
  );
};

export default Markers;
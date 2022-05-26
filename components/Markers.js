import React, { useContext } from 'react';
import { Marker } from 'react-native-maps';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { UserContext } from '../context/UserContext';
import { HelperContext } from '../context/HelperContext';

const Markers = ({ marker, setShowRoad, setShowHelper, setFocusLocation, index }) => {
  const [user] = useContext(UserContext);
  const [__, setHelper] = useContext(HelperContext);

  return (
    <Marker 
      onPress={() => {
        setShowRoad(true);
        setHelper({
          state: true,
          index,
          scrollHelper: false
        });
        console.log(marker.cords)
        setFocusLocation(marker.coords);
      }}
      style={{width: 30, height: 30}} 
      coordinate={marker.coords}
    >
      {user.type === 'passenger' ? 
        <Icon name='bus' size={30} style={{color: 'white'}} /> 
        : <Icon name='human-greeting' size={20} style={{color: 'white'}} />
      }
    </Marker>
  );
};

export default Markers;
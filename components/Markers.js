import React, { useContext } from 'react';
import { Marker } from 'react-native-maps';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { UserContext } from '../context/UserContext';

const Markers = ({ marker, setShowRoad, setShowHelper, setFocusLocation }) => {
  const [user] = useContext(UserContext);

  return (
    <Marker 
      onPress={() => {
        setShowRoad(true);
        setShowHelper(true);
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
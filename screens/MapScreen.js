import React, { useEffect, useState,useContext } from 'react';
import { 
  View
} from 'react-native';
import Map from '../components/Map';
import Helper from '../components/Helper';
import { LocationContext } from '../context/LocationContext';

const MapScreen = () => {
  const [showRoad, setShowRoad] = useState(false);
  const [showHelper, setShowHelper] = useState(false);
  // const [location] = useContext(LocationContext);
  // test value
  const location = { latitude: 31.966882, longitude: 35.988638 };
  const [focusLocation, setFocusLocation] = useState(location);
  return (
      <View
        style={{
          flex: 1,
        }}
      >
        <Map
          setShowHelper={setShowHelper}
          showRoad={showRoad}
          setShowRoad={setShowRoad}
          focusLocation={focusLocation}
          setFocusLocation={setFocusLocation}
        />
        {showHelper && 
          <Helper
            setShowHelper={setShowHelper} 
            setShowRoad={setShowRoad}
            setFocusLocation={setFocusLocation}
            showHelper={showHelper}
          />
        }
      </View>
  );
};

  

export default MapScreen;
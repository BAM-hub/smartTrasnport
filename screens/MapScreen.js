import React, { useEffect, useState } from 'react';
import { 
  View
} from 'react-native';
import Map from '../components/Map';
import Helper from '../components/Helper';

const MapScreen = ({ location, user, markers }) => {
  const [showRoad, setShowRoad] = useState(false);
  const [showHelper, setShowHelper] = useState(false);
  return (
      <View
        style={{
          flex: 1,
        }}
      >
        <Map 
          location={location}
          user={user}
          markers={markers}
          setShowHelper={setShowHelper}
          showRoad={showRoad}
          setShowRoad={setShowRoad}
        />
        {showHelper && 
          <Helper
            setShowHelper={setShowHelper} 
            setShowRoad={setShowRoad}
            user={user}
          />
        }
      </View>
  );
};

  

export default MapScreen;
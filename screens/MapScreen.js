import React, { useEffect, useState } from 'react';
import { 
  View
} from 'react-native';
import Map from '../components/Map';
import Helper from '../components/Helper';

const MapScreen = ({ location, user, markers }) => {
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
        />
        {showHelper && 
            <Helper setShowHelper={setShowHelper} />
        }
      </View>
  );
};

  

export default MapScreen;
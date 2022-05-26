import MapView from 'react-native-maps';
import {
  StyleSheet,
  View,
  Dimensions,
  Text
} from 'react-native';
import { mapDarkStyle } from '../config';
import Road from './Road';
import Markers from './Markers';
import { useState, useContext } from 'react';
import { DATAContext } from '../context/DATAContext';
import { LocationContext } from '../context/LocationContext';
import { HelperContext } from '../context/HelperContext';

const Map = ({
  focusLocation,
  setFocusLocation
}) => {
  const [location] = useContext(LocationContext);
  const [DATA] = useContext(DATAContext);
  const [helper] = useContext(HelperContext);
  return ( 
    <MapView 
      customMapStyle={mapDarkStyle}
      // showsTraffic={true}
      style={styles.map}
      initialRegion={{
        ...location,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
      region={{
        ...focusLocation,
        latitudeDelta: 0.0022,
        longitudeDelta: 0.0021,
      }}
    >
      {DATA.map((marker, i) => (
        <Markers
          key={i}
          marker={marker}
          setFocusLocation={setFocusLocation}
          index={i}
        />
       ))} 
      { helper.showRoad && <Road  />}
    </MapView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});

export default Map;
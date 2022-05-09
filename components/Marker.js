import React from 'react';
import { Marker } from 'react-native-maps';

const Markers = ({cord}) => {
  return (
    <>
      <Marker 
        coordinate={cord}
        pinColor='green'
      />
    </>
  );
};

export default Markers;
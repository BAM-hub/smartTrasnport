import axios from 'axios';
import React from 'react';
import { Polyline } from 'react-native-maps';
import { useState, useEffect } from 'react';
import { line } from '../data';
import { API_KEY } from '../config';

const Road = () => {
  const [road, setRoad] = useState(null);
  useEffect(async () => {
    let path = line.map(line => line.latLong);
    path = path.join('|');
    let config = {
      method: 'get',
      url: 
        `https://roads.googleapis.com/v1/snapToRoads?path=${path}&interpolate=true&key=${API_KEY}`,
      headers: { }
    };

    axios(config)
    .then(function (response) {
      let arr = response.data.snappedPoints.map(latlng => latlng.location);
      setRoad(arr);
    })
    .catch(function (error) {
      console.log(error);
    });
  }, []);
  
  return (
    <>
    {road !== null && (
     <Polyline 
        coordinates={road}
        strokeColor='#fff'
        lineJoin='round'
        strokeWidth={6}
      /> 
    )}
    </>

  )
}

export default Road;
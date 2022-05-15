import axios from 'axios';
import React from 'react';
import { Polyline } from 'react-native-maps';
import { useState, useEffect } from 'react';
import { landmarks } from '../data';
import { API_KEY } from '../config';

const Road = ({ origin, destination }) => {
  const [road, setRoad] = useState(null);
  useEffect(async () => {
    let path = landmarks.map((landmark, i) => `${landmark.latitude},${landmark.longitude}`);
    path = path.join('|');
    let config = {
      method: 'get',
      url: 
        `https://roads.googleapis.com/v1/snapToRoads?path=${path}&interpolate=true&key=${API_KEY}`,
      headers: { }
    };

    axios(config)
    .then(function (response) {
      // console.log(JSON.stringify(response.data));
      let arr = response.data.snappedPoints.map(latlng => latlng.location);
      setRoad(arr);
      // console.log(arr);
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
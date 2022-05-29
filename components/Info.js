import React, { useContext, useEffect, useState } from 'react';
import { View, Dimensions, Text } from 'react-native';
import { DATAContext } from '../context/DATAContext';
import { UserContext } from '../context/UserContext';
import axios from 'axios';
import { API_KEY } from '../config';
import { LocationContext } from '../context/LocationContext';

const Info = () => {
  const [DATA] = useContext(DATAContext);
  const [user] = useContext(UserContext);
  const [time, setTime] = useState('...');
  const [location] = useContext(LocationContext);

  useEffect(async() => {
    const driverLocation =  DATA.filter((d) => d.id === user.ride.driverId && d);
    const interval = setInterval(async () => {
        try {
            const config = {
              method: 'get',
              url: 
                `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${driverLocation[0].coords.latitude},${driverLocation[0].coords.longitude}&destinations=${location.latitude},${location.longitude}&units=km&key=${API_KEY}`,
              headers: {}
            };
            const res = await axios(config);
            const parsed = res.data.rows[0].elements[0].duration.text;
            setTime(parsed);
        } catch(err) {
            console.log(err);
        }
    }, 30000);
    return () => {
        clearInterval(interval);
    }
  }, []);
  return (
    <View 
      style={{
        position: 'absolute',
        top: 10,
        left: 10,
        width: Dimensions.get('window').width /2.2,
        backgroundColor: 'white',
        padding: 5,
        height: Dimensions.get('window').width /7,
        borderRadius: 5
      }}
    >
      <Text
        style={{
            color: 'black',
            fontSize: 16,
            fontWeight: 'bold'
        }}
      >
        Seat Reserved
      </Text>
      <Text>
          Estimated Time: {time}
      </Text>
    </View>
  )
}

export default Info;
import React, { useEffect, useContext } from 'react';
import { View, Text } from 'react-native';
import { IconFill } from '@ant-design/icons-react-native';
import GetLocation from 'react-native-get-location';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LocationContext } from '../context/LocationContext';

const LoadScreen = ({ setUser }) => {
  const [location, setLocation] = useContext(LocationContext);
  const getData = async () => {
    try {
      const auth = await AsyncStorage.getItem('@BamLocation');
      if(auth === null)
        return setUser({
          type: 'none',
          line: 'none'
        });
      setUser(JSON.parse(auth));
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  useEffect(() => {
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 15000,
    })
    .then(location => {
      // console.log(location);
      setLocation({
        longitude: location.longitude,
        latitude: location.latitude
      });
    })
  .catch(error => {
      const { code, message } = error;
      console.warn(code, message);
  });
  }, []);

  return (
    <View  style={{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <IconFill name="compass" size={60} />
      <Text style={{
        color: 'black',
        fontSize: 30,
        padding: 20
      }}
      >Locating you...</Text>
    </View>
  )
}

export default LoadScreen;
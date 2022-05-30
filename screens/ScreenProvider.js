import React, { useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import LoadScreen from './LoadScreen';
import RegisterScreen from './RegisterScreen';
import MapScreen from './MapScreen';
import { LocationContext } from '../context/LocationContext';
import { UserContext } from '../context/UserContext';

const ScreenProvider = () => {
  const [location] = useContext(LocationContext);
  const [user, setUser] = useContext(UserContext);

  return (
    <View style={styles.container}>
      { 
        location.latitude === 0 || user.type === '' ? 
        <LoadScreen 
          user={user}
          setUser={setUser}
        /> 
        : user.type === 'none' ? 
          <RegisterScreen setUser={setUser} />
        : <MapScreen /> 
      }
  </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
});


export default ScreenProvider;
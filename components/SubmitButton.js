import React from 'react';
import { 
  View,
  Text, 
  TouchableOpacity, 
  Dimensions
} from 'react-native';
import uuid from 'react-native-uuid';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SubmitInput = ({ progress, name, line, setUser, checked }) => {
  const handleSubmit = async () => {
    if(progress < 1) return;
    const user  = {
      id: uuid.v4(),
      name,
      line,
      type: checked
    };
    try {
      await AsyncStorage.setItem('@BamLocation', JSON.stringify(user));
      setUser(user);
    } catch (err) {
      console.log(err);
      return;
    }
  }
  return(
    <TouchableOpacity
      style={{
        backgroundColor: progress < 1 ? 'rgba(150, 150, 150, 0.9)': '#34a8eb',
        width: Dimensions.get('window').width / 4,
        padding: 10,
        alignSelf: 'center',
        alignItems: 'center',
        marginBottom: 10,
        borderRadius: 2,
        marginTop: 4
      }}
      onPress={() => handleSubmit()} >
      <View>
        <Text style={{
        color: 'black',
        fontSize: 20
        }} >Sbumit</Text>
      </View>
    </TouchableOpacity> 
  );
};

export default SubmitInput;
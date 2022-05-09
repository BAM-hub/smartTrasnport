import React from 'react';
import { 
  View,
  Text, 
  TouchableOpacity, 
  Dimensions
} from 'react-native';
import {
  RadioButton, 
} from 'react-native-paper';
import { IconOutline } from '@ant-design/icons-react-native';



const UserTypeInput = ({ 
  type,
  text,
  value,
  checked,
  setChecked, 
  setProgress,
  progress
}) => {
  
  const handleCheck = (value) => {
    if(checked === value) return;
    if(checked === 'captin') {
      const prgs = progress;
      setProgress(prgs - 0.33);
    }
    if(checked === 'passenger') {
      const prgs = progress;
      setProgress(prgs - 0.5);
    }
    setChecked(value);
    if(value === 'captin')
      return setProgress(0.33);
    setProgress(0.5);  
  }
  return(
    <TouchableOpacity
      style={{
        flexDirection: 'row',
        width: Dimensions.get('window').width /1,
        height: Dimensions.get('window').height / 8,
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10,
        borderBottomWidth:  2,
        backgroundColor: 'rgba(250, 250, 250, 0.9)',
        borderColor: value === checked ? '#80ff52' : '#ffffff',
      }}
      onPress={() => handleCheck(value)}
    >
      <View style={{
        width: Dimensions.get('window').width / 3,
        justifyContent: 'center',
        marginLeft: 2,
      }}>
        <IconOutline name={type} size={30} />
      </View>
      <View style={{
        width: Dimensions.get('window').width / 3
      }}>
        <Text
          style={{ color: 'black', fontSize: 20 }}
        >{text}</Text>
      </View>
      <View style={{
        width: Dimensions.get('window').width / 3,
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <RadioButton
        value={value}
        status={ checked === value ? 'checked' : 'unchecked'}
        onPress={() => handleCheck(value)}
        color='#80ff52'
        uncheckedColor='#80ff52'
        />
      </View>
    </TouchableOpacity>
  );
};

export default UserTypeInput;
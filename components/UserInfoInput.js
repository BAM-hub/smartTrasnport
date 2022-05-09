import React from 'react';
import { 
  View,
  Dimensions,
  ToastAndroid
} from 'react-native';
import {
  TextInput
} from 'react-native-paper';

const UserInfoInput = ({ 
  name,
  setName,
  line,
  setLine,
  checked,
  setProgress,
  progress
}) => {

  const handleNameInput = (e) => {
    if(e.nativeEvent.text.length <= 20)
    return setName(e.nativeEvent.text);
    ToastAndroid.show('Name Can\'t be longer than 20', ToastAndroid.SHORT);
  }
  const handleLineInput = (e) => {
    if(e.nativeEvent.text.length <= 50)
    return setLine(e.nativeEvent.text);
    ToastAndroid.show('Line Can\'t be longer than 50', ToastAndroid.SHORT);
  }
  const handleEditEnd = () => {
    if(checked === 'none') {
      setName('');
      ToastAndroid.show('Enter The Service Type First!',ToastAndroid.SHORT);
    }
    if(checked === 'captin')
      return setProgress(progress + 0.34);
    setProgress(progress + 0.5);
  }
  return (
    <View 
    style={{
      height: Dimensions.get('window').height /5,
      justifyContent: 'space-around'
    }}
  >
      <TextInput
        mode="outlined"
        label="Name"
        outlineColor='#80ff52'
        activeOutlineColor='#6ff23f'
        placeholder="Jhon Doe"
        right={<TextInput.Affix text={`${name.length}/20`} />}
        value={name}
        onChange={(e) => handleNameInput(e)}
        onEndEditing={() => handleEditEnd()}
        
      />
      {checked === 'captin' && 
      <TextInput
        mode="outlined"
        label="Line"
        outlineColor='#80ff52'
        activeOutlineColor='#6ff23f'
        placeholder="Amman As-Salt"
        right={<TextInput.Affix text={`${line.length}/50`} />}
        value={line}
        onChange={(e) => handleLineInput(e)}
        onEndEditing={() => handleEditEnd()}
      />}
    </View>
  );
};

export default UserInfoInput;
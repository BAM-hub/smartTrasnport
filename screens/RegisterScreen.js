import React, { useState } from 'react';
import { 
  View,
  Text,
  Image
} from 'react-native';
import {
  ProgressBar,
  Colors,
} from 'react-native-paper';
import SubmitInput from '../components/SubmitButton';
import UserInfoInput from '../components/UserInfoInput';
import UserTypeInput from '../components/UserTypeInput';
import bak from '../asset/bak.webp';
import { Dimensions } from 'react-native-web';

const RegisterScreen = ({ setUser }) => {
  const [checked, setChecked] = useState('none');
  const [progress, setProgress] = useState(0);
  const [name, setName] = useState('');
  const [line, setLine] = useState('');

  return (
    <View
      style={{
        flex: 1
      }}
    >
      <Image 
        source={bak}
        style={{
          flex: 1,
          position: 'absolute',
          top: 0,
          width: 500,
          height: 350,
          zIndex: -1
        }}
      />
      <ProgressBar
        progress={progress}
        color={Colors.red500}
        style={{zIndex: 2}}
      />
      <View
        style={{
          justifyContent: 'center',
          flex: 1
        }} >

        <View
          style={{
            alignItems: 'center',
          }}
        >
          <Text style={{ color: 'black', fontSize: 20, padding: 4 }}>
            Service Type
          </Text>
        </View>
        <View>
          <UserTypeInput 
            type='user' 
            text='Passenger'
            value='passenger'
            checked={checked}
            setChecked={setChecked} 
            setProgress={setProgress}
            progress={progress}
          />
          <UserTypeInput 
            type='solution' 
            text='Captin' 
            value='captin'
            checked={checked}
            setChecked={setChecked}
            setProgress={setProgress}
            progress={progress}
          />
        </View>
        <View
          style={{
            alignItems: 'center',
          }}
        >
          <Text style={{ color: 'black', fontSize: 20, padding: 4 }}>
            Your Info
          </Text>
        </View>  
        <UserInfoInput
          name={name}
          setName={setName}
          line={line}
          setLine={setLine}
          checked={checked}
          setProgress={setProgress}
          progress={progress}
        />
        <SubmitInput 
          progress={progress}
          name={name}
          line={line}
          setUser={setUser}
          checked={checked}
        />
      </View>
    </View>
 
  );
};


export default RegisterScreen;
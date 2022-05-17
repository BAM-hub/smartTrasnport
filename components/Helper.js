import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { 
  View,
  Dimensions,
  Text,
  ScrollView,
  TouchableOpacity
} from 'react-native';

const Helper = ({ setShowHelper, setShowRoad }) => {
  return (
    <View
      style={{
        position: 'absolute',
        bottom: 0,
        zIndex: 1,
        height: 150,
        width: Dimensions.get('window').width,
      }}
    >
      <Icon 
        name='close'
        size={30}
        style={{color: 'white'}}
        onPress={() => {
          setShowRoad(false);
          setShowHelper(false);
        }}  
      />
      <ScrollView 
        horizontal={true}
        style={{
            width: Dimensions.get('window').width,
            padding: 5,
            margin: 5,
            marginTop: 0,
        }}
      >
      <TouchableOpacity
          style={{
            borderRadius: 4,
            padding: 7,
            height: 150,
            backgroundColor: 'white',
            margin: 5,
            marginTop: 0,
            width: Dimensions.get('window').width/2.2
          }}
      >
          <Text>Captin: Ali</Text>
          <Text>Line: Amman As-Salt</Text>
          <Text>Distance: 1KM</Text>
          <Text style={{ color: 'blue' }}>Estimated Time: 3min</Text>
          <Text style={{ color: 'blue' }} >Rquest Ride</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  )
}

export default Helper
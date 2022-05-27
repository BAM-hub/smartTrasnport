import React from 'react';
import { 
  StyleSheet,
  View,
  Dimensions,
  Text,
  TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

const SCROLL_WIDTH = Dimensions.get('window').width/1.2 + 10;
const CARD_WIDTH = Dimensions.get('window').width/1.4;


const RideRequest = () => {
  return (
    <View style={styles.container}>
      <View 
        style={styles.scroll}
      >
      <Icon 
        name='close'
        size={30}
        style={{color: 'white'}}
      />
        <TouchableOpacity style={styles.card}>
            <Text style={styles.text}>Any Available Seats ?</Text>
            <Text style={styles.text}>Touch Card To Accept.</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    flexDirection: 'column',
    bottom: 0,
    zIndex: 1,
    height: Dimensions.get('window').height/4,
    width: Dimensions.get('window').width,
  },
  scroll: {
    width: Dimensions.get('window').width,
    padding: 5,
    margin: 5,
    marginTop: 0,
    alignContent: 'center',
  },
  card: {
    borderRadius: 4,
    height: Dimensions.get('window').height/6,
    backgroundColor: 'white',
    margin: SCROLL_WIDTH - CARD_WIDTH,
    marginTop: 0,
    width: CARD_WIDTH,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold'
  }
});

export default RideRequest;
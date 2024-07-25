import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const GroupText2 = () => {
  return (
    <View style={styles.groupTextContainer}>
      <Image source={require('../../../assets/storefood/Tag.png')} style={styles.icon} />
      <Text style={styles.textRate}>Enjoy the offer</Text>
      <Text style={styles.textReview}>More detail</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  groupTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 5,
  },
  textRate: {
    fontSize: 18,
    width:122,
    height:24,
    color:"black",
  },
  textReview: {
    fontSize: 16,
    marginLeft: 5,
    color:"#FEBD2F"
  },
});

export default GroupText2;

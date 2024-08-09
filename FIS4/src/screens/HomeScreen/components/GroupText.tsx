import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const GroupText = () => {
  return (
    <View style={styles.groupTextContainer}>
      <Image source={require('../../../assets/storefood/Star.png')} style={styles.icon} />
      <View style={styles.textContainer}>
        <Text style={styles.boldText}>4.2</Text>
        <Text style={styles.regularText}> (200+)</Text>
      </View>
      <Text style={styles.textReview}>See review</Text>
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
    width: 16,
    height: 16,
    marginRight: 5,
  },
  textContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
    width:90,
    height:20,
  },
  boldText: {
    fontSize: 18,
    fontWeight: 'bold',
    color:"black",
  },
  regularText: {
    fontSize: 18,
    fontWeight: 'normal',
  },
  textReview: {
    fontSize: 16,
    marginLeft:30,
    color:"#FEBD2F"
  },
});

export default GroupText;

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const GroupBigText = () => {
  return (
    <View style={styles.groupBigTextContainer}>
      <Text style={styles.bigText}>Food store name</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  groupBigTextContainer: {
    padding: 10,

  },
  bigText: {
    fontSize: 19,
    fontWeight: 'bold',
    textAlign: 'center',
    color:"black",
  },
});

export default GroupBigText;

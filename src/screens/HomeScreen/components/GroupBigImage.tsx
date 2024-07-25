import React from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const GroupImage1 = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.groupImageContainer}>
      <TouchableOpacity style={styles.imageTextContainer} onPress={() => navigation.navigate('storefood1')}>
        <Image source={require('../../../assets/storefood/menu1.jpg')} style={styles.image} />
        <Text style={styles.imageText}>Vermicelli with shrimp paste</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.imageTextContainer} onPress={() => navigation.navigate('storefood1')}>
        <Image source={require('../../../assets/storefood/menu2.jpg')} style={styles.image} />
        <Text style={styles.imageText}>Vermicelli with shrimp paste</Text>
      </TouchableOpacity>
    </View>
  );
};

const GroupImage2 = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.groupImageContainer}>
      <TouchableOpacity style={styles.imageTextContainer} onPress={() => navigation.navigate('storefood1')}>
        <Image source={require('../../../assets/storefood/menu3.jpg')} style={styles.image} />
        <Text style={styles.imageText}>Vermicelli with shrimp paste</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.imageTextContainer} onPress={() => navigation.navigate('storefood1')}>
        <Image source={require('../../../assets/storefood/menu4.png')} style={styles.image} />
        <Text style={styles.imageText}>Vermicelli with shrimp paste</Text>
      </TouchableOpacity>
    </View>
  );
};

const GroupBigImage = () => {
  return (
    <View style={styles.bigImageContainer}>
      <GroupImage1 />
      <GroupImage2 />
    </View>
  );
};

const styles = StyleSheet.create({
  bigImageContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    marginVertical: 10,

  },
  groupImageContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
  imageTextContainer: {
    alignItems: 'center',
    marginHorizontal: 5,
  },
  image: {
    width: 164,
    height: 164,
    borderRadius:10,
  },
  imageText: {
    marginTop: 5,
    fontSize: 14,
  color:"black",
    width:170,
  },
});

export default GroupBigImage;

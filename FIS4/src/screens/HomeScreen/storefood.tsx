import React from 'react';
import { View, Text, ScrollView, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import GroupBigText from './components/GroupBigText';
import GroupText from './components/GroupText';
import GroupText2 from './components/GroupText2';
import GroupBigImage from './components/GroupBigImage'; 

const StoreFood = () => {
  const navigation = useNavigation();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={require('../../assets/storefood/hotpot.jpg')} style={styles.image} />
        <Image source={require('../../assets/storefood/frame.png')} style={styles.image1} />
      </View>
      <View style={styles.iconsContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('Homescreen')}>
          <Image source={require('../../assets/storefood/icon1.png')} style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('SecondScreen')}>
          <Image source={require('../../assets/storefood/icon2.png')} style={styles.icon} />
        </TouchableOpacity>
      </View>
      <View style={styles.bigtextcontainer}>
        <GroupBigText />
        <View style={styles.separator} />
        <GroupText />
        <View style={styles.separator} />
        <GroupText2 />
      </View>
      <View style={styles.justtextcontainer}>
        <Text style={styles.justtext}>Just for you</Text>
      </View>
      <GroupBigImage /> 

    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
  },
  bigtextcontainer: {
    height: 197,
    width: 248,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000000', 
    shadowOffset: { width: 0, height: 1 }, 
    shadowOpacity: 0.15,
    shadowRadius: 3, 
    elevation: 5, 
    borderRadius:10,
    position:"absolute",
    top:240,
    left:30,
  },
  justtextcontainer:{
    width:93,
    height:24,
    marginTop:170,
    marginLeft:20,
  },
  justtext:{
    fontSize:16,
    fontWeight:"bold",
    color:"black",
  },
  separator: {
    height: 1, 
    backgroundColor: '#E6E1E5', 
    marginVertical: 10, 
    marginHorizontal:10,    
  },

  imageContainer: {
    marginBottom: 20,
    backgroundColor:"green",
    alignItems:"flex-end"
  },
  image: {
    width: "100%",
    height: 280,
    resizeMode: 'cover',
  },
  image1: {
    width: 32,
    height: 32,
    resizeMode: 'cover',
    position:"absolute",
    bottom:10,
    right:10,
  },
  iconsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    position:"absolute",
    paddingHorizontal:10,
    top:30,
  },
  icon: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
});

export default StoreFood;

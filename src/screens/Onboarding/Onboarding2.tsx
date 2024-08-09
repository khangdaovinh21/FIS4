
import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, StatusBar  } from 'react-native';
import { useNavigation } from '@react-navigation/native';


const Onboarding2 = () => {
  const navigation = useNavigation();

  const handleGetStarted = () => {navigation.navigate("LoginScreen")};
  const handleGetStarted1 = () => {navigation.navigate("Onboarding1")};


  return (
    <View style={styles.container}>
    <StatusBar translucent={true} barStyle="dark-content" backgroundColor="transparent" /> 
      <Image source={require('../../assets/onboarding2.png')} style={styles.image} />
      <Text style={styles.title}>Order your food</Text>
      <Text style={styles.subtitle}>Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. </Text>
      <View style={styles.gruop1}>
      <TouchableOpacity style={styles.button} onPress={handleGetStarted}>
        <Text style={styles.buttonText}>Get started</Text>
      </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      paddingTop: StatusBar.currentHeight,
      alignItems:"center",
      justifyContent:"center"
    },
  image: {
    width: 260,
    height: 260,
    resizeMode: 'contain',
    marginBottom:50,
    alignItems:"center",
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 20,
    color:"black",

  },
  titletext1: {
    fontSize: 13,
    fontWeight: 'bold',
    color:"black",
  },
  subtitle: {
    fontSize: 16,
    color:"black",
    textAlign: 'center',
    paddingHorizontal: 30,
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#FEBD2F',
    paddingHorizontal: 140,
    borderRadius: 5,
    height:48,
    alignItems:"center",
    justifyContent:"center",
  },
  text1: {
    width:51,
    height:36,
    justifyContent:"center",
    alignItems:"center",
    marginLeft:20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    width:82,
    height:24,
    
  },
  gruop1:{
    width:"100%",
    height:49,
    flexDirection:"row",
    justifyContent:"center",
    alignItems:"center",
    marginVertical:30,

  },
  imagecontainer:{
    width:260,
    height:260,
  },
});

export default Onboarding2;

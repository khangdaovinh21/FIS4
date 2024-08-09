
import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, StatusBar  } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../types'; 
import { NavigationProp } from '@react-navigation/native';



const Onboarding1 = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const handleGetStarted = () => {navigation.navigate("Onboarding2")};
  const handleGetStarted1 = () => {navigation.navigate("Onboarding")};


  return (
    <View style={styles.container}>
    <StatusBar translucent={true} barStyle="dark-content" backgroundColor="transparent" /> 
      <Image source={require('../../assets/onboarding1.png')} style={styles.image} />
      <Text style={styles.title}>Quick delivery</Text>
      <Text style={styles.subtitle}>Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. </Text>
      <View style={styles.gruop1}>
      <TouchableOpacity style={styles.text1} onPress={handleGetStarted1}>
      <Text style={styles.titletext1}>Skip</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleGetStarted}>
        <Text style={styles.buttonText}>Next</Text>
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
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
    width:68,
    height:48,
    padding:16,
    alignItems:"center",
    justifyContent:"center",
    marginRight:20,
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
    width:36,
    height:24,
    lineHeight:24,
    
  },
  gruop1:{
    width:"100%",
    height:49,
    flexDirection:"row",
    justifyContent:"space-between",
    alignItems:"center",
    marginVertical:30,

  },
  imagecontainer:{
    width:260,
    height:260,
  },
});

export default Onboarding1;

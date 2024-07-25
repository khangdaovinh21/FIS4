import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput } from 'react-native';

const LoginScreen1 = ({ navigation }) => {
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleLogin = () => {
    console.log('Phone number:', phoneNumber);
    navigation.navigate('LoginScreen2', { phoneNumber });
  };


  const handleLogin1 = () => {
    navigation.navigate('LoginScreen');
  };

  return (
    <View style={styles.container}>
      <View style={styles.group12}>
        <View style={styles.group1}>
          <TouchableOpacity onPress={handleLogin1}>
            <Image source={require('../../assets/icon.png')} style={styles.icon} />
          </TouchableOpacity>
          <Text style={styles.text1}>Fill Information</Text>
        </View>
        <Text style={styles.text2}>Please add your phone number to order delivery food service on app</Text>
        <View style={styles.group2}>
          <Image source={require('../../assets/phone.png')} style={styles.image} />
          <TextInput
            style={styles.input}
            placeholder="Phone number"
            keyboardType="phone-pad"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
          />
        </View>
      </View>
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent:"space-between",
    alignItems:"center",    
  },
  
  group1: {
    flexDirection: 'row',
    justifyContent:"space-between",
    width:"100%",
    height:48,
  },
  group12: {
    marginTop:60,
    width:"90%",
  },
  icon: {
    width: 24,
    height: 48,
    resizeMode: 'contain',
  },
  text1: {
    fontSize: 19,
    fontWeight: 'bold',
    marginVertical:10,
    marginRight:120,
    color:"black"
    
  },
  text2: {
    fontSize: 16,
    color:"black",
    marginBottom:40 ,
    textAlign: "left",
    marginTop:30,

  },
  group2: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 5,
    height:56,
  },
  image: {
    width: 74,
    height: 56,
    resizeMode: 'contain',
    marginRight: 10,
    backgroundColor:"#E8E8E8",
    borderRadius:8,
  },
  input: {
    width:254,
    height: 56,
    fontSize: 16,
    backgroundColor:"#E8E8E8",
    borderRadius: 8,
    gap:10,
    paddingLeft:20,

},
  button: {
    backgroundColor: '#C9C5CA',
    paddingVertical: 12,
    paddingHorizontal: 150,
    borderRadius: 8,
    marginBottom:30,

  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default LoginScreen1;

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput } from 'react-native';

const LoginScreen2 = ({ navigation, route }) => {
  const [phoneNumber, setPhoneNumber] = useState('');

  useEffect(() => {
    if (route.params?.phoneNumber) {
      setPhoneNumber(route.params.phoneNumber);
    }
  }, [route.params?.phoneNumber]);

  const handleNavigate = () => {
    navigation.navigate('LoginScreen1'); 
  };

  const handleNavigate1 = () => {
    navigation.navigate('LoginScreen'); 
  };

  const handleNavigate2 = () => {
    navigation.navigate('LoginScreen3', { phoneNumber });
  };

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <TouchableOpacity onPress={handleNavigate}>
          <Image source={require('../../assets/icon.png')} style={styles.icon} />
        </TouchableOpacity>
      </View>
      <View style={styles.gruoptext1}>
        <Text style={styles.text1}>Log In</Text>
        <Text style={styles.text2}>Welcome back!</Text>
        <Text style={styles.text3}>Phone number</Text>

        <View style={styles.group2}>
          <Image source={require('../../assets/phone.png')} style={styles.image1} />
          <TextInput
            style={styles.input}
            placeholder="Phone number"
            keyboardType="phone-pad"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
          />
        </View>
      </View>

      <View style={styles.groupButtonImage}>
        <TouchableOpacity style={styles.button1}  onPress={handleNavigate2} >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <Image source={require('../../assets/with.png')} style={styles.image2} />
      </View>

      <View style={styles.groupImage}>
        <TouchableOpacity>
          <Image source={require('../../assets/apple.png')} style={styles.image} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image source={require('../../assets/facebook.png')} style={styles.image} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image source={require('../../assets/google.png')} style={styles.image} />
        </TouchableOpacity>
      </View>
      
      <TouchableOpacity>
        <Text onPress={handleNavigate1} style={styles.text4}>
          Don’t have an account?<Text style={styles.boldText}> Sign in</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent:"center",
  },
  iconContainer: {
    width:24,
    height:48,
    position:"absolute",
    top:60,
    left:25,
  },
  icon: {
    width: 24,
    height: 48,
    resizeMode: 'contain',
  },
  gruoptext1:{
    width:340,
    height:115,
    alignItems:"center",
    marginTop:10,
  },
  group2: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 5,
    height:56,
    marginVertical:10,
  },
  

  input: {
    width:254,
    height: 56,
    fontSize: 16,
    backgroundColor:"#E8E8E8",
    borderRadius: 8,
    gap:8,
    paddingLeft:20,


},
  text1: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    color:"black",
  },
  text2: {
    fontSize: 13,
    marginBottom: 30,
  },
  text3: {
    fontSize: 16,
    height:20,
    color:"black",
    fontWeight:"bold",
    marginRight:230,
  },
  groupImage: {
    flexDirection: 'column',
    width: 344,
    height: 186,
  },
  image: {
    width: 344,
    height: 48,
    resizeMode: 'contain',
    marginVertical:8,
  },
  image1: {
    width: 74,
    height: 56,
    resizeMode: 'contain',
    marginRight: 10,
    backgroundColor:"#E8E8E8",
    borderRadius:8,
  },
  text4: {
    fontSize: 13,
    color: '#888',
    marginTop:20,
  },
  button: {
    position:"absolute",
    bottom:20,
    width:185, 
  },
  text5: {
    fontSize: 11,
    textAlign: 'center',
    
  },
  boldText: {
    color: '#000', 
    fontWeight: 'bold',
},
buttonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  button1: {
    backgroundColor: '#FEBD2F',
    paddingVertical: 12,
    paddingHorizontal: 150,
    borderRadius: 8,
    marginTop:90,

  },
  groupButtonImage: {
    alignItems: 'center',
    marginBottom: 10,
  },
  image2: {
    width: 344,
    height: 25,
    resizeMode: 'contain',
    marginTop:25, 
    marginBottom:10,
  },
});

export default LoginScreen2;

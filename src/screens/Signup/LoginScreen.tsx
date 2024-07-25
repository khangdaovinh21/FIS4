import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

const LoginScreen = ({ navigation }) => {
  const handleNavigate = () => {
    navigation.navigate('Onboarding2'); 
  };
  const handleNavigate1 = () => {
    navigation.navigate('LoginScreen1'); 
  };

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <TouchableOpacity onPress={handleNavigate}>
          <Image source={require('../../assets/icon.png')} style={styles.icon} />
        </TouchableOpacity>
      </View>
      <View style={styles.gruoptext1}>
      <Text style={styles.text1}>Sign Up</Text>
      <Text style={styles.text2}>Create account and order favorite food</Text>
      </View>

      <View style={styles.groupImage}>
        <TouchableOpacity >
          <Image source={require('../../assets/apple.png')} style={styles.image} />
        </TouchableOpacity>
        <TouchableOpacity >
          <Image source={require('../../assets/facebook.png')} style={styles.image} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image source={require('../../assets/google.png')} style={styles.image} />
        </TouchableOpacity>
      </View > 
      <TouchableOpacity>
      <Text onPress={handleNavigate1} style={styles.text4}>Already have an account?<Text style={styles.boldText}> Log in</Text>
      </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
      <Text style={styles.text5}>
                By clicking Sign Up, you agree to our
                <Text style={styles.boldText}> Terms & Conditions</Text>
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
    width:237,
    height:69,
    alignItems:"center",
    marginBottom:90,

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
});

export default LoginScreen;

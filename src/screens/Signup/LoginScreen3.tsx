import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput } from 'react-native';

const LoginScreen3 = ({ navigation, route }) => {
  const [otp, setOtp] = useState(['', '', '', '']);
  const { phoneNumber } = route.params;

  const handleOtpChange = (value, index) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 3) {
      const nextInput = `otpInput${index + 1}`;
      this[nextInput].focus();
    }
  };

  const handleVerify = () => {
    navigation.navigate('Homescreen');

  };

  return (
    <View style={styles.container}>
      <View style={styles.gruopbig}>
        <View style={styles.gruop1}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image source={require('../../assets/icon.png')} style={styles.icon} />
          </TouchableOpacity>
          <Text style={styles.text}>OTP Verification</Text>
        </View>
        <View style={styles.gruop2}>
          <Text style={styles.text1}>Enter the code we sent to phone number</Text>
          <Text style={styles.text2}>{phoneNumber}</Text>
          <View style={styles.otpContainer}>
            {otp.map((digit, index) => (
              <TextInput
                key={index}
                ref={(ref) => this[`otpInput${index}`] = ref}
                style={styles.otpInput}
                keyboardType="numeric"
                maxLength={1}
                value={digit}
                onChangeText={(value) => handleOtpChange(value, index)}
              />
            ))}
          </View>
          <TouchableOpacity>
          <Text style={styles.text3}>If you didn’t receive a code? <Text style={styles.boldText}>Resend</Text></Text>
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity style={styles.button} onPress={handleVerify}>
        <Text style={styles.buttonText}>Verify</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: "space-between",
  },
  gruopbig: {
    width: '80%',
    alignItems: 'center',
    marginTop:60,
  },
  gruop1: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
    justifyContent:"space-evenly",
    width:350,
    marginRight:100,
  },
  icon: {
    width: 24,
    height: 48,
    resizeMode: 'contain',
    marginRight:10,
  },
  text: {
    fontSize: 19,
    fontWeight: 'bold',
    color: 'black',
    width:145,
  },
  gruop2: {
    alignItems: 'center',
  },
  text1: {
    fontSize: 16,
    marginBottom: 10,
  },
  text2: {
    fontSize: 16,
    marginBottom: 30,
    color: 'black',
    fontWeight:"bold"
  },
  input: {
    width: 200,
    height: 50,
    fontSize: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    textAlign: 'center',
    marginBottom: 20,
  },
  text3: {
    fontSize: 14,
    color: '#888',
  },
  boldText: {
    color: '#000',
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#FEBD2F',
    paddingVertical: 12,
    paddingHorizontal: 160,
    borderRadius: 8,
    marginBottom: 20,
  },
  buttonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginBottom: 20,
    
    
  },
  otpInput: {
    width: 50,
    height: 50,
    fontSize: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    textAlign: 'center',
    backgroundColor:"#E8E8E8",
    fontWeight:"bold",
    color:"#1C1B1F",
  },
});

export default LoginScreen3;

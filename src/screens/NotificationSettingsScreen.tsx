import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, Image, StatusBar, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PushNotification from 'react-native-push-notification';
import { DeviceEventEmitter } from 'react-native';
import { Switch as CustomSwitch } from 'react-native-switch';
import images from '../assets/images';

const NotificationSettingsScreen = ({ navigation }: any) => {
  const [isEnabled, setIsEnabled] = useState<boolean>(true);
  const [isEmailEnabled, setIsEmailEnabled] = useState<boolean>(true);

  useEffect(() => {
    const loadSettings = async () => {
      const savedState = await AsyncStorage.getItem('notificationsEnabled');
      if (savedState !== null) {
        setIsEnabled(JSON.parse(savedState));
      }
    };

    loadSettings();
  }, []);

  const toggleSwitch = async () => {
    const newState = !isEnabled;
    setIsEnabled(newState);
    await AsyncStorage.setItem('notificationsEnabled', JSON.stringify(newState));

    DeviceEventEmitter.emit('notificationSettingChanged', newState);

    if (!newState) {
      PushNotification.cancelAllLocalNotifications();
    }
  };
  const toggleSwitchemail = async () => {
    const newState = !isEmailEnabled;
    setIsEmailEnabled(newState);
    await AsyncStorage.setItem('emailNotificationsEnabled', JSON.stringify(newState));

    DeviceEventEmitter.emit('emailNotificationSettingChanged', newState);

  };

  return (
    <View style={styles.container}>
      <View style={styles.groupIconText}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={images.icon1} style={styles.icon} />
        </TouchableOpacity>
        <Text style={styles.text}>Notification Setting</Text>
      </View>
      <View style={styles.switchContainer}>
      <View style={styles.labelcontainer}>
        <Text style={styles.label}>Push Notification</Text>
        <Text style={styles.label1}>Recieve all new updates, promotion</Text>
        </View>
        <CustomSwitch
          value={isEnabled}
          onValueChange={toggleSwitch}
          circleSize={27}
          barHeight={35}
          backgroundActive={'#FEBD2F'}
          backgroundInactive={'#d3d3d3'}
          circleActiveColor={'#fff'}
          circleInActiveColor={'#fff'}
          switchWidthMultiplier={3.0} 
        />
      </View>
      <View style={styles.switchContainer}>
      <View style={styles.labelcontainer}>
        <Text style={styles.label}>Email notification</Text>
        <Text style={styles.label1}>We will update events, promotion through your email</Text>
        </View>
        <CustomSwitch
          value={isEmailEnabled}
          onValueChange={toggleSwitchemail}
          circleSize={27}
          barHeight={35}
          backgroundActive={'#FEBD2F'}
          backgroundInactive={'#d3d3d3'}
          circleActiveColor={'#fff'}
          circleInActiveColor={'#fff'}
          switchWidthMultiplier={3} 
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal:15,
    backgroundColor:"white"
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth:1,
    paddingVertical:20,
    borderColor:"#E6E1E5",
    justifyContent:"space-between"
  },
  label: {
    fontSize: 15,
    color:"black"
  },
  groupIconText: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    height: 110,
    paddingVertical: 20,
  },
  icon: {
    width: 24,
    height: 24,
  },
  text: {
    fontSize: 19,
    fontWeight: 'bold',
    color: 'black',
    marginRight: 90,
  },
  labelcontainer:{
    
  },
  label1:{
    color:"gray",
    fontSize:11,
  },
});

export default NotificationSettingsScreen;

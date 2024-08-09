import React, { useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, StatusBar, ScrollView, Alert } from 'react-native';
import { WebView } from 'react-native-webview';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../../types';

const WebViewScreen = () => {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();

    useEffect(() => {
        const timer = setTimeout(() => {
            Alert.alert(
                "Notification",
                "Order Delivered",
                [
                    {
                        text: "Order Confirmation",
                        onPress: () => navigation.navigate('OngoingScreen'), 
                    },
                    {
                        text: "Cancel",
                        onPress: () => console.log("Not received"),
                        style: "cancel"
                    }
                ],
                { cancelable: false }
            );
        }, 5000);

        return () => clearTimeout(timer);
    }, [navigation]);

    return (
      <ScrollView contentContainerStyle={styles.scrollContainer}>

            <StatusBar barStyle="light-content" backgroundColor="rgba(0, 0, 0, 0.8)" />
            <View style={styles.iconsContainer}>
                <TouchableOpacity onPress={() => navigation.navigate('storefood1')}>
                    <Image source={require('../../assets/storefood/close1.png')} style={styles.icon} />
                </TouchableOpacity>
                <Text style={styles.textmodal}>More information</Text>
            </View>
                <View style={styles.textContainer}>
                    <Text style={styles.text1}>Address</Text>
                    <Text style={styles.text2}>1000 Le Thi Rieng, Ben Thanh Ward, District 1</Text>
                </View>
                <View style={styles.ggmap}>
                    <WebView source={{ uri: 'https://www.google.com/maps/dir/%C4%90.+L%C3%AA+Th%E1%BB%8B+Ri%C3%AAng,+B%E1%BA%BFn+Th%C3%A0nh,+Qu%E1%BA%ADn+1,+H%E1%BB%93+Ch%C3%AD+Minh,+Vi%E1%BB%87t+Nam/C%C3%B4ng+Ty+TNHH+FPT+IS,+%C4%90%C6%B0%E1%BB%9Dng+S%C3%A1ng+T%E1%BA%A1o,+T%C3%A2n+Thu%E1%BA%ADn+%C4%90%C3%B4ng,+Qu%E1%BA%ADn+7,+H%E1%BB%93+Ch%C3%AD+Minh/@10.7599713,106.6954313,14z/data=!3m1!4b1!4m13!4m12!1m5!1m1!1s0x31752f3c46462e73:0x82ad2593d42baae0!2m2!1d106.6910267!2d10.7712361!1m5!1m1!1s0x31752f210b494631:0x6a827c97ede183c3!2m2!1d106.7469216!2d10.7673374?hl=vi-VN&entry=ttu' }} />
                </View>
                <Text style={styles.text3}>Open hours</Text>
                <View style={styles.textContainer1}>
                    <View style={styles.textweek1}>
                        <Text style={styles.text2}>Monday</Text>
                        <Text style={styles.text2}>Tuesday</Text>
                        <Text style={styles.text2}>Wednesday</Text>
                        <Text style={styles.text2}>Thursday</Text>
                        <Text style={styles.text2}>Friday</Text>
                        <Text style={styles.text2}>Saturday</Text>
                        <Text style={styles.text2}>Sunday</Text>
                    </View>
                    <View style={styles.textweek2}>
                        <Text style={styles.text4}>09:00 AM - 10:00 PM</Text>
                        <Text style={styles.text4}>09:00 AM - 10:00 PM</Text>
                        <Text style={styles.text4}>09:00 AM - 10:00 PM</Text>
                        <Text style={styles.text4}>09:00 AM - 10:00 PM</Text>
                        <Text style={styles.text4}>09:00 AM - 10:00 PM</Text>
                        <Text style={styles.text4}>09:00 AM - 10:00 PM</Text>
                        <Text style={styles.text4}>09:00 AM - 10:00 PM</Text>
                    </View>
                </View>
            </ScrollView>
    );
};

const styles = StyleSheet.create({
    
    ggmap:{
        width:365,
        height:350,
        marginHorizontal:15,

    },

    iconsContainer: {
        width: "100%",
        height: 100,
        justifyContent: "space-between",
        flexDirection: "row",
        alignItems: "flex-end",
        paddingHorizontal: 10,
    },
    icon: {
        width: 24,
        height: 24,
    },
    textweek1:{

    },
    textweek2:{

    },

    textmodal:{
        fontSize:20,
        fontWeight:"bold",
        color:"black",
        marginRight:100,
      },
      textContainer:{
        marginHorizontal:15,
        marginTop:20,

      },
      textContainer1:{
        marginHorizontal:15,
        marginTop:10,
        flexDirection:"row",

      },
      text1:{
        fontSize:16,
        fontWeight:"bold",
        color:"black",
      },
      text2:{
        fontSize:16 ,
        color:"#484649",
        marginVertical:5,
      },
      text3:{
        fontSize:16,
        fontWeight:"bold",
        color:"black",
        marginHorizontal:15,
        marginTop:10,
      },
      text4:{
        fontSize:16,
        color:"#484649",
        marginVertical:5,
        marginLeft:100,
      },
      scrollContainer: {
        flexGrow: 1,
        backgroundColor:"#FFFFFF"
    },

});

export default WebViewScreen;
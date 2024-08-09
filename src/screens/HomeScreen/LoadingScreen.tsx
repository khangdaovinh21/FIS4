
import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../../types';

const LoadingScreen = () => {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();

    useEffect(() => {
        const timer = setTimeout(() => {
            navigation.navigate('WebViewScreen');
        }, 3000); 

        return () => clearTimeout(timer);
    }, [navigation]);

    return (
        <View style={styles.container}>
            <Image source={require('../../assets/storefood/shipper.jpg')} style={styles.icon} />
            <Text style={styles.text}>Waiting for Deliver... </Text>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:"white",
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    icon:{
        width:200,
        height:200,
    }
});

export default LoadingScreen;


import React, { useContext } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation, NavigationProp, RouteProp } from '@react-navigation/native';
import { CouponsContext } from './context/CouponsContext';
import { RootStackParamList } from '../../types';

interface Coupon {
    id: string;
    name: string;
    discount: number;
    image: any;
    description1: string;
    description2: string;
}

type Coupons2ScreenRouteProp = RouteProp<RootStackParamList, 'coupons2'>;

type Props = {
    route: Coupons2ScreenRouteProp;
};

const Coupons2 = ({ route }: Props) => {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const { selectCoupon } = useContext(CouponsContext)!;
    const { coupon } = route.params;

    const handleSelectCoupon = () => {
        selectCoupon(coupon);
        navigation.navigate('storefood3', { coupon });
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.iconcontainer} onPress={() => navigation.navigate('storefood3')}>

        <Image source={require('../../assets/coupons/icon1.png')} style={styles.icon1} />
        </TouchableOpacity>

            <View style={styles.couponContainer}>
                <Image source={coupon.image} style={styles.couponImage} />
                <View style={styles.coupongroup1} >
                <Text style={styles.couponName}>Free shipping for every has above 5$</Text>
                <Text style={styles.couponDescription1}>{coupon.description2}</Text>
                </View>
                <View style={styles.coupongroup2} >
                <View>
                <Text style={styles.couponDescription}>Aliqua id fugiat nostrud irure ex duis ea quis id quis ad et. Sunt qui esse pariatur duis deserunt mollit dolore cillum minim tempor enim. Elit aute irure tempor cupidatat incididunt sint deserunt ut voluptate aute id deserunt nisi.</Text>
                <Text style={styles.couponDescription2}>Nulla Lorem mollit cupidatat irure. Laborum magna nulla duis ullamco cillum dolor. Voluptate xercitation incididunt aliquip deserunt reprehenderit elit borum. </Text>
                </View>
                <TouchableOpacity style={styles.selectButton} onPress={handleSelectCoupon}>
                <Text style={styles.selectButtonText}>Use code</Text>
            </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    coupongroup1: {
        alignItems: "center",
        backgroundColor: "#FFFFFF",
        shadowColor: "#000000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.26,
        shadowRadius: 3,
        elevation: 3,
        borderRadius:10,
        paddingVertical:12,
        marginTop:10,
    },
    coupongroup2:{
        backgroundColor: "#FFF",
        height:376,
        justifyContent:"space-between",
        marginTop:20,
        paddingTop:15,
    },

    couponContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    couponImage: {
        marginBottom: 10,
        height:330,
    },
    couponName: {
        fontSize: 19,
        fontWeight: 'bold',
        color:"black",
        paddingHorizontal:60,
        textAlign:"center"

    },
    couponDescription1: {
        fontSize: 14,
        color: '#555',
        marginTop:10,
    },
    couponDescription: {
        fontSize: 14,
        color: '#555',
        marginHorizontal:15,
    },
    couponDescription2: {
        fontSize: 14,
        color: '#555',
        marginTop:10,
        marginHorizontal:15,

    },
    selectButton: {
        backgroundColor: '#FEBD2F',
        borderRadius: 10,
        alignItems:"center",
        padding:16,
        marginHorizontal:15,
        marginBottom:40,
    },
    selectButtonText: {
        color: 'black',
        fontSize: 16,
        fontWeight: 'bold',
    },
    icon1:{
        width:24,
        height:24,
        position:"absolute",
        top:60,
        left:20,
    },
    iconcontainer:{
        zIndex:2,
        backgroundColor:"green"
    },
});

export default Coupons2;

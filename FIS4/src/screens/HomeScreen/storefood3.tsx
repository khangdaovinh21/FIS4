import React, { useContext } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../../types';
import { CartContext } from './context/CartContext';

const StoreFood3 = () => {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const { cart, totalPrice } = useContext(CartContext)!;

    const deliveryFee = 2; 
    const couponDiscount = 14; 

    const calculateSubtotal = () => {
        return totalPrice;
    };

    const calculateTotal = () => {
        return totalPrice + deliveryFee - couponDiscount;
    };
    
    return (
        <View style={styles.container}>
            <View style={styles.groupIconText}>
                <TouchableOpacity onPress={() => navigation.navigate('storefood1')}>
                    <Image source={require('../../assets/storefood1/icon1.png')} style={styles.icon} />
                </TouchableOpacity>
                <Text style={styles.text}>Place order</Text>
            </View>
            <View style={styles.bigmaptext}>
                <Text style={styles.heading2}>Deliver to</Text>
                <View style={styles.smallgroup}>
                    <Text style={styles.heading3}>81, Cach Mang Thang Tam, Ben Th...</Text>
                    <Image source={require('../../assets/home/icon.png')} style={styles.imageInSection} />
                </View>
                <Text style={styles.heading1}>Description: Lorem ipsum</Text>
            </View>
            <View style={styles.flatlist}>
                <FlatList 
                    data={cart}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.cartItem}>
                            <View style={styles.cartItemDetails}>
                                <Text style={styles.cartItemText1}>{item.quantities[0]} x {item.mainDish}</Text>
                                <Text style={styles.cartItemText2}>{item.totalPrice}$</Text>
                            </View>
                            {item.toppings.map((topping, idx) => (
                                <Text key={idx} style={styles.cartItemText}>{topping.quantity} x {topping.name} = {topping.price}</Text>
                            ))}
                        </View>
                    )}
                />
            </View>
            <View style={styles.summaryContainer}>
                <View style={styles.summaryItem}>
                    <Text style={styles.summaryText}>Subtotal:</Text>
                    <Text style={styles.summaryText}>{calculateSubtotal()}$</Text>
                </View>
                <View style={styles.summaryItem}>
                    <Text style={styles.summaryText}>Delivery Fee:</Text>
                    <Text style={styles.summaryText}>{deliveryFee}$</Text>
                </View>
                <View style={styles.summaryItem}>
                    <Text style={styles.summaryText}>Coupons:</Text>
                    <Text style={styles.summaryText}>-{couponDiscount}$</Text>
                </View>
                <View style={styles.summaryItembig}>
                <View style={styles.summaryItem1}>
                    <Text style={styles.totalText1}>Total</Text>
                    <Text style={styles.totalText}>{calculateTotal()}$</Text>
                    </View>
                    <TouchableOpacity style={styles.checkoutButton} onPress={() => console.log('Checkout pressed')}>
                <Text style={styles.checkoutButtonText}>Order</Text>
            </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    text: {
        fontSize: 19,
        fontWeight: 'bold',
        color: 'black',
        marginRight: 130,
    },
    flatlist: {
        height: 250,
        borderTopWidth: 10,
        borderTopColor: '#F2F2F2',
    },
    groupIconText: {
        flexDirection: 'row',
        alignItems: "flex-end",
        justifyContent: 'space-between',
        height: 110,
        paddingHorizontal: 10,
        paddingVertical: 20,
    },
    icon: {
        width: 24,
        height: 24,
        marginLeft: 10,
    },
    bigmaptext: {
        height: 80,
        justifyContent: "space-between",
        marginHorizontal: 15,
    },
    smallgroup: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    heading3: {
        fontSize: 19,
        color: "black",
    },
    heading1: {
        fontSize: 12,
        color: "black",
    },
    heading2: {
        fontSize: 13,
        color: "black",
    },
    imageInSection: {
        width: 24,
        height: 24,
    },
    cartItem: {
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        paddingHorizontal:15,
    },
    cartItemDetails: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    cartItemText: {
        fontSize: 16,
    },
    cartItemText1: {
        fontSize: 16,
        color: "black",
    },
    cartItemText2: {
        fontSize: 16,
        color: "black",
        fontWeight: "bold",
    },
    summaryContainer: {
        paddingVertical: 16,
        borderTopWidth: 10,
        borderTopColor: '#F2F2F2',

    },
    summaryItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
        paddingHorizontal:15,

    },
    summaryItem1:{
    },
    summaryItembig:{
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"space-between",
        borderTopWidth: 50,
        borderTopColor: '#F2F2F2',
        paddingHorizontal:15,

    },
    summaryText: {
        fontSize: 16,
        color: "black",
    },
    totalText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: "black",
    },
    checkoutButton: {
        backgroundColor: '#FEBD2F',
        padding: 16,
        alignItems: 'center',
        width: 272,
        borderRadius: 10,
        alignSelf: 'center',
    },
    checkoutButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    totalText1:{
        fontSize: 15,
    },
});

export default StoreFood3;

import React, { useContext, useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, FlatList, StatusBar } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../../types';
import { CartContext } from './context/CartContext';
import { CouponsContext } from './context/CouponsContext';
import { useOrders } from './context/OrderContext'; 

const StoreFood3 = () => {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const { clearCart } = useContext(CartContext)!;
    const { cart, totalPrice, storeName } = useContext(CartContext)!;
    const { selectedCoupon } = useContext(CouponsContext)!;
    const { addOrder } = useOrders(); 

    const baseDeliveryFee = 2;
    const [deliveryFee, setDeliveryFee] = useState(baseDeliveryFee);
    const [couponDiscount, setCouponDiscount] = useState(0);

    useEffect(() => {
        if (selectedCoupon) {
            if (selectedCoupon.name === 'Free Shipping') {
                setDeliveryFee(0);
            } else {
                setDeliveryFee(baseDeliveryFee);
                setCouponDiscount(selectedCoupon.discount);
            }
        } else {
            setDeliveryFee(baseDeliveryFee);
            setCouponDiscount(0);
        }
    }, [selectedCoupon]);

    const calculateSubtotal = () => totalPrice;

    const calculateTotal = () => {
        let subtotal = calculateSubtotal();
        let total = subtotal + deliveryFee;
        if (selectedCoupon && selectedCoupon.name !== 'Free Shipping') {
            total -= (subtotal * selectedCoupon.discount) / 100;
        }
        return total;
    };

    const calculateCouponDiscount = () => {
        let subtotal = calculateSubtotal();
        if (selectedCoupon && selectedCoupon.name !== 'Free Shipping') {
            return (subtotal * selectedCoupon.discount) / 100;
        }
        return 0;
    };

    const handleOrder = () => {
        const newOrder = {
            id: Date.now().toString(),
            cart,
            total: calculateTotal(),
            deliveryFee,
            couponDiscount: calculateCouponDiscount(),
            storeName,
        };
        addOrder(newOrder);
        navigation.navigate('WebViewScreen');
        clearCart();

    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle={"dark-content"} backgroundColor="transparent" />
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
                <Text style={styles.heading1 }>{storeName}</Text> 
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
                    <Text style={styles.summaryText}>Sub total:</Text>
                    <Text style={styles.summaryText}>{calculateSubtotal()}$</Text>
                </View>
                <View style={styles.summaryItem}>
                    <Text style={styles.summaryText}>Delivery Fee (2km):</Text>
                    <Text style={styles.summaryText}>+ {deliveryFee}$</Text>
                </View>
                <View style={styles.summaryItem}>
                    <TouchableOpacity onPress={() => navigation.navigate('coupons')}>
                        <Text style={styles.summaryText1}>Coupons:</Text>
                    </TouchableOpacity>
                    <Text style={styles.summaryText1}>- {calculateCouponDiscount()}$</Text>
                </View>
                <View style={styles.biggruop}>
                    <View style={styles.smallgroup1}>
                        <Image source={require('../../assets/home/icon4.png')} style={styles.paypal} />
                        <Text style={styles.heading4}>Paypal</Text>
                        <Image source={require('../../assets/home/icon.png')} style={styles.imageInSection} />
                    </View>
                    <View style={styles.smallgroup2}>
                        <Image source={require('../../assets/home/icon3.png')} style={styles.promotions} />
                        <Text style={styles.heading4}>Promotions</Text>
                        <Image source={require('../../assets/home/icon.png')} style={styles.imageInSection} />
                    </View>
                </View>
                <View style={styles.summaryItembig}>
                    <View style={styles.summaryItem1}> 
                        <Text style={styles.totalText1}>Total</Text>
                        <Text style={styles.totalText}>{calculateTotal()}$</Text>
                    </View>
                    <TouchableOpacity style={styles.checkoutButton} onPress={handleOrder}>
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
    biggruop:{
        borderTopWidth: 10,
        borderColor:"#F2F2F2",
        paddingHorizontal:15,

    },
    smallgroup: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    smallgroup1: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingVertical:10,
    },
    smallgroup2: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        borderTopWidth:1,
        borderColor:"#CCC",
        paddingVertical:10,
        
    },
    heading3: {
        fontSize: 16,
        color: "black",
        fontWeight:"bold"
    },
    heading1: {
        fontSize: 12,
        color: "black",
        marginBottom:5,
    },
    heading2: {
        fontSize: 13,
        color: "black",
    },
    imageInSection: {
        width: 24,
        height: 24,
    },
    heading4: {
        fontSize: 13,
        color: "black",
        marginRight:200,
        width:70,
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
        borderTopWidth: 2,
        borderTopColor: '#F2F2F2',

    },
    summaryItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
        paddingHorizontal:15,
        

    },
    summaryItem1:{
        marginTop:15,
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
    summaryText1: {
        fontSize: 16,
        color: "#EC7900",
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
        marginTop:15, 
    },
    checkoutButtonText: {
        color: 'black',
        fontSize: 16,
        fontWeight: 'bold',
    },
    totalText1:{
        fontSize: 15,
    },
    promotions:{
        width:40,
        height:40,
    },
    paypal:{
        width:40,
        height:40,
    },
});

export default StoreFood3;

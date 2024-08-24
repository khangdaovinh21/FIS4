import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList, Order } from '../../../types';
import images from '../../../assets/images';
import { useOrders } from '../context/OrderContext';
import { useRatedOrders } from '../context/RatedOrderContext';
import { useCanceledOrders } from '../context/CanceledOrderContext';

type DetailedOrderScreenNavigationProp = StackNavigationProp<RootStackParamList, 'DetailedOrderScreen'>;
type DetailedOrderScreenRouteProp = RouteProp<RootStackParamList, 'DetailedOrderScreen'>;

const DetailedOrderScreen: React.FC = () => {
    const route = useRoute<DetailedOrderScreenRouteProp>();
    const { order } = route.params;
    const navigation = useNavigation<DetailedOrderScreenNavigationProp>();
    const { completeOrder, completedOrders } = useOrders();
    const { addRatedOrder, ratedOrders } = useRatedOrders();
    const { canceledOrders } = useCanceledOrders();

    const isOrderCompleted = completedOrders.some(completedOrder => completedOrder.id === order.id);
    const isOrderRated = ratedOrders.some(ratedOrder => ratedOrder.id === order.id);
    const isOrderCanceled = canceledOrders.some(canceledOrder => canceledOrder.id === order.id);

    const handleReceived = () => {
        if (!isOrderCanceled) {
            completeOrder(order);
            navigation.navigate('OngoingScreen');
        }
    };

    const handleRate = () => {
        if (!isOrderCanceled) {
            addRatedOrder(order);
            navigation.navigate('RatingScreen', { order });
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.gruopicon}>
                <TouchableOpacity onPress={() => navigation.navigate('OngoingScreen')}>
                    <Image source={images.back} style={styles.icon} />
                </TouchableOpacity>
            </View>
            <View style={styles.gruopstorefood}>
                <Text style={styles.text1}>{order.storeName}</Text>
                <View style={styles.carticon}>
                    <Image 
                        source={isOrderCanceled ? images.warning : (isOrderCompleted ? images.check : images.Delivery)} 
                        style={styles.icon} 
                    />
                    <Text style={isOrderCanceled ? styles.texticonCanceled : (isOrderCompleted ? styles.textFinished : styles.texticon)}>
                        {isOrderCanceled ? 'Canceled' : (isOrderCompleted ? 'Finished' : 'Delivering')}
                    </Text>
                </View>
                <Text style={styles.texticon1}>01 Dec 10:45</Text>
            </View>
            <FlatList
                data={order.cart}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <View style={styles.cartItem}>
                        <View style={styles.maindish}>
                            <View style={styles.maindish1}>
                                <Text style={styles.text}>{item.quantities.join(', ')} x </Text>
                                <Text style={styles.text}>{item.mainDish}</Text>
                            </View>
                            <Text style={styles.text}>{item.priceMainDish} $</Text>
                        </View>
                        <FlatList
                            data={item.toppings}
                            keyExtractor={(topping, index) => index.toString()}
                            renderItem={({ item }) => (
                                <View style={styles.topping}>
                                    <Text style={styles.toppingText}>{item.quantity} x {item.name}</Text>
                                    <Text style={styles.toppingText}>{item.price}</Text>
                                </View>
                            )}
                            contentContainerStyle={styles.toppingsList}
                        />
                        <Text style={styles.text}>Sub Total: {item.totalPrice}$</Text>
                    </View>
                )}
                contentContainerStyle={styles.cartList}
                style={styles.flatList}
            />
            <View style={styles.gruopbigtotal}>
                <View style={styles.gruoptotal}>
                    <Text style={styles.text}>Delivery Fee (2km):</Text>
                    <Text style={styles.text2}>Coupon</Text>
                </View>
                <View style={styles.gruoptotal}>
                    <Text style={styles.text}>{order.deliveryFee}$</Text>
                    <Text style={styles.text2}>{order.couponDiscount}$</Text>
                </View>
            </View>
            <View style={styles.gruoptotal1}>
                <Text style={styles.text3}>Total:</Text>
                <Text style={styles.text3}>{order.total}$</Text>
            </View>
            <View style={styles.receiptbigGroup}>
                <View style={styles.receiptGroup}>
                    <Text style={styles.receiptLabel}>Receipt code:</Text>
                    <Text style={styles.receiptLabel}>Name:</Text>
                    <Text style={styles.receiptLabel}>Phone:</Text>
                    <Text style={styles.receiptValueLabel1}>Address:</Text>
                    <Text style={styles.receiptLabel}>Payment:</Text>
                </View>
                <View style={styles.receiptValues}>
                    <Text style={styles.receiptValue}>202212066-0001</Text>
                    <Text style={styles.receiptValue}>Khang Dao Vinh</Text>
                    <Text style={styles.receiptValue}>0834684568</Text>
                    <Text style={styles.receiptValueLabel}>01, Cach Mang Thang Tam, Ben Thanh Ward, District 1, HCMC</Text>
                    <View style={styles.iconpaypal}>
                        <Image source={images.paypal} style={styles.iconpay} />
                        <Text style={styles.receiptValue}>Paypal</Text>
                    </View>
                </View>
            </View>
            {isOrderCompleted || isOrderCanceled ? (
                <View>
                    <TouchableOpacity 
                        style={styles.button1} 
                    >
                        <Text style={styles.buttonText}>Re-order</Text>
                    </TouchableOpacity>
                    {!isOrderRated && !isOrderCanceled ? (
                        <TouchableOpacity 
                            style={styles.button} 
                            onPress={handleRate}
                        >
                            <Text style={styles.buttonText}>Rate</Text>
                        </TouchableOpacity>
                    ) : null}
                </View>
            ) : (
                <View>
                    <TouchableOpacity style={styles.button1} onPress={handleReceived}>
                        <Text style={styles.buttonText}>Received</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ListSupportScreen')}>
                        <Text style={styles.buttonText}>Need support</Text>
                    </TouchableOpacity>     
                </View>
            )}
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal:15,
        backgroundColor: '#fff',
    },
    maindish:{
        flexDirection:"row", 
        justifyContent:"space-between", 
    },
    maindish1:{
        flexDirection:"row",  
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    topping:{
        flexDirection:"row",
        justifyContent:"space-between",
    },
    gruopicon:{
        height:100,
        justifyContent:"flex-end",
    },
    gruopstorefood:{
        alignItems:'center',
        paddingBottom:20,
    },
    text: {
        fontSize: 14,
        color:"black",
        paddingVertical:10,
    },
    text3:{
        fontSize: 16,
        color:"black",
        fontWeight:"bold",
        paddingVertical:10,
    },
    gruoptotal1:{
        flexDirection:"row",
        justifyContent:"space-between",
        borderTopWidth:1,
        borderColor: '#ddd',
        paddingVertical:10,
    },
    text2:{
        fontSize: 14,
        color:"#EC7900",
        paddingVertical:10,
    },
    
    text1:{
        fontSize: 23,
        marginVertical: 5,
        color:"black",
        fontWeight:"bold",
    },
    cartItem: {
        marginVertical: 8,
        padding: 8,
        borderBottomWidth: 1,
        borderColor: '#ddd',
        borderRadius: 4,
        
    },
    toppingsList: {

    },
    toppingText: {
        fontSize: 14,
        marginLeft: 10,
        paddingVertical:5,
    },
    toppingText1: {
        fontSize: 14,
        marginLeft: 10,
    },
    cartList: {
    },
    gruoptotal:{
    },
    flatList:{
    maxHeight:200,

    },
    icon: {
        width: 24,
        height: 24,
    },
    carticon: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    texticon1: {
        fontSize: 11,
        color: '#666',
    },
    texticon: {
        fontSize: 16,
        marginLeft: 5,
        color:"#2563EB",
        marginBottom:5,
    },
    gruopbigtotal:{
        flexDirection:"row",
        justifyContent:"space-between",
    },
    button: {
        backgroundColor: 'white',
        paddingVertical: 12,
        paddingHorizontal: 20, 
        borderRadius: 10, 
        alignItems: 'center', 
        marginVertical: 5, 
        borderColor:"black",
        borderWidth:1,
    },
    button1: {
        backgroundColor: '#FEBD2F',
        paddingVertical: 12,
        paddingHorizontal: 20, 
        borderRadius: 10, 
        alignItems: 'center', 
        marginVertical: 5, 
        borderColor:"black",
    },
    buttonText: {
        color: 'black', 
        fontSize: 16, 
    },
    receiptGroup: {
    },
    receiptLabel: {
        fontSize: 13,
        marginBottom: 5,
        paddingVertical:5,
    },
    receiptValues: {
    },
    receiptValue: {
        fontSize: 13,
        marginBottom: 5,
        paddingVertical:5,
    }, 
    receiptbigGroup:{
        flexDirection:"row",
        justifyContent:"space-between",
        borderTopWidth:1,
        borderColor:"#ddd"

    },
    receiptValueLabel: {
        fontSize: 13,
        marginBottom: 5,
        paddingVertical:5,
        width:200,
        height:40,
        
    },
    receiptValueLabel1: {
        fontSize: 13,
        marginBottom: 5,
        paddingVertical:5,
        height:40,

    },
    iconpaypal:{
        flexDirection:"row",
    },
    iconpay:{
        width:20,
        height:20,
        marginRight:2,
    },
    textFinished: {
        fontSize: 16,
        marginLeft: 5,
        color: "#059669", 
        marginBottom: 5,
        fontWeight: "bold", 
    },
    texticonCanceled:{
        fontSize:16,
        color:"red",
        fontWeight:"bold",
        marginLeft:5,
    },
});

export default DetailedOrderScreen;

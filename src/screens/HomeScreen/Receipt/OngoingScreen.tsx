import React from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useOrders } from '../context/OrderContext';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList, Order } from '../../../types';
import images from '../../../assets/images';
import { useCanceledOrders } from '../context/CanceledOrderContext';

const OngoingScreen: React.FC = () => {
  const { orders, completeOrder } = useOrders();
  const { addCanceledOrder } = useCanceledOrders();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();


  const handleOrderPress = (order: Order) => {
    navigation.navigate('DetailedOrderScreen', { order });
  };

  const handleCancelOrder = (order: Order) => {
    completeOrder(order);
    addCanceledOrder(order);
    navigation.navigate('OngoingScreen');
  };
    return (
        <View style={styles.container}>
            <FlatList
                data={orders}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => handleOrderPress(item)}>
                        <View style={styles.cartcontainer}>
                            <View style={styles.carticon}>
                                <Image source={images.Delivery} style={styles.icon} />
                                <Text style={styles.texticon}>Delivering</Text>
                                <Text style={styles.texticon1}>01 Dec 10:45</Text>
                            </View>
                            <View style={styles.cartItem}>
                                <View style={styles.storeNameGruop}>
                                    <Text style={styles.orderText}>{item.storeName}</Text>
                                    <Image source={images.icon} style={styles.icon} />
                                </View>
                                <View style={styles.itemTotalContainer}>
                                    <Text style={styles.orderText1}>{item.total}$</Text>
                                    <Text style={styles.texttotal1}>(paypal)</Text>
                                    <Text style={styles.texttotal}>2 dishes</Text>
                                </View>
                                <View style={styles.buttonContainer}>
                                    <TouchableOpacity 
                                        style={styles.cancelButton}
                                        onPress={() => handleCancelOrder(item)}
                                    >
                                        <Text style={styles.buttonText}>Canceled</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </TouchableOpacity>
                )}
                contentContainerStyle={styles.flatListContent}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',

    },
    cartcontainer: {
        marginBottom: 16,
        padding: 16,
        borderBottomWidth:1,
        borderColor:"#E6E1E5"
        
    },
    orderText:{
        fontSize:16,
        color:"#1C1B1F",
        fontWeight:"bold",
    },
    orderText1:{
        fontSize:16,
        color:"#1C1B1F",
    },
    carticon: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    icon: {
        width: 20,
        height: 20,
    },
    texticon: {
        fontSize: 16,
        marginLeft: 5,
        color:"#2563EB"
    },
    texticon1: {
        fontSize: 11,
        color: '#666',
        marginLeft: 170,
    },
    cartItem: {
    },
    storeNameGruop: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical:15,
        justifyContent:"space-between"
    },
    storeName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    itemTotalContainer: {
        flexDirection: 'row',
        justifyContent: "flex-start",
        alignItems: 'center',
    },
    cartItemText2: {
        fontSize: 14,
        color: '#666',
    },
    texttotal1: {
        fontSize: 16,
        color: 'black',
        marginHorizontal:5,
    },
    texttotal: {
        fontSize: 13,
        color: '#666',
    },
    flatListContent: {
        paddingBottom: 15,
    },
    cancelButton: {
        borderRadius: 10,
        alignItems: 'center',
        justifyContent:"center",
        borderWidth:0.5,
        height:40,
        width:100,
    },
    buttonText: {
        color: 'gray',
        fontWeight: 'bold',  
    },
    buttonContainer:{
        backgroundColor:"white",
        alignItems:"flex-end",
        
    }

});


export default OngoingScreen;

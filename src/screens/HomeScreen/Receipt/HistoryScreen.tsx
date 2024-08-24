import React, { useEffect } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useOrders } from '../context/OrderContext';
import { useRatedOrders } from '../context/RatedOrderContext';
import { useCanceledOrders } from '../context/CanceledOrderContext';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList, Order } from '../../../types';
import images from '../../../assets/images';
import PushNotification from 'react-native-push-notification';

const sendNotification = (title: string, message: string) => {
  PushNotification.localNotification({
    channelId: 'default-channel-id', 
    title: title,
    message: message,
    soundName: 'default',
    priority: 'high',
    bigPictureUrl: 'https://i.postimg.cc/mZyybcJF/hotpot3.png', 
  });
};

const HistoryScreen: React.FC = () => {
    const { completedOrders } = useOrders();
    const { ratedOrders } = useRatedOrders();
    const { canceledOrders } = useCanceledOrders();
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();

    useEffect(() => {
        completedOrders.forEach(order => {
            if (!isOrderRated(order.id) && !isOrderCanceled(order.id)) {
                sendNotification('Order Completed', `Your order from ${order.storeName} is completed.`);
            }
        });
    }, [completedOrders]);

    const handleOrderPress = (order: Order) => {
        navigation.navigate('DetailedOrderScreen', { order });
    };

    const isOrderRated = (orderId: string) => {
        return ratedOrders.some(order => order.id === orderId);
    };

    const isOrderCanceled = (orderId: string) => {
        return canceledOrders.some(order => order.id === orderId);
    };


    return (
        <View style={styles.container}>
            <FlatList
                data={completedOrders}
                keyExtractor={(item) => item.id} 
                renderItem={({ item }) => {
                    const orderRated = isOrderRated(item.id);
                    const orderCanceled = isOrderCanceled(item.id);
                    return (
                        <TouchableOpacity onPress={() => handleOrderPress(item)}>
                            <View style={styles.cartcontainer}>
                                <View style={styles.carticon}>
                                    <Image 
                                        source={orderCanceled ? images.warning : images.check} 
                                        style={styles.icon} 
                                    />
                                    <Text style={orderCanceled ? styles.texticonCanceled : styles.texticonFinished}>
                                        {orderCanceled ? 'Canceled' : 'Finished'}
                                    </Text>
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
                                        {!orderCanceled && !orderRated && (
                                            <TouchableOpacity 
                                                style={styles.button} 
                                                onPress={() => navigation.navigate('ToRateScreen')}
                                            >
                                                <Text style={styles.buttonText}>Rate</Text>
                                            </TouchableOpacity>
                                        )}
                                        <TouchableOpacity 
                                            style={orderCanceled ? styles.button1Canceled : (orderRated ? styles.button1Rated : styles.button1)}
                                        >
                                            <Text style={styles.buttonText}>Re-order</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity>
                    );
                }}
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
      color:"#059669"
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
  buttonContainer:{
    flexDirection:"row",
    justifyContent:"space-around",
    marginTop:20,
  },
  button:{
    borderWidth:1,
    borderRadius:5,
    width:155,
    height:30,
    alignItems:"center",
    justifyContent:"center",
    borderColor:"#484649"
  },
  button1:{
    borderRadius:5,
    width:155,
    height:30,
    alignItems:"center",
    justifyContent:"center",
    backgroundColor:"#FEBD2F"
  },
  buttonText:{
    fontSize:13,
    color:"black",
  },
  button1Rated: {
    borderRadius: 5,
    width: 330,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FEBD2F", 
},
button1Canceled: {
    borderRadius: 5,
    width: 330,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FEBD2F", 
},
texticonFinished: {
    fontSize: 16,
    color: 'green',
    marginLeft:5,
},
texticonCanceled: {
    fontSize: 16,
    color: 'red',
    marginLeft:5,

},
});

export default  HistoryScreen;
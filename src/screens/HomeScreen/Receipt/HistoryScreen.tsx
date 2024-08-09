import React from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useOrders } from '../context/OrderContext';
import { useRatedOrders } from '../context/RatedOrderContext';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList, Order } from '../../../types';
import images from '../../../assets/images';

const HistoryScreen: React.FC = () => {
    const { completedOrders } = useOrders();
    const { ratedOrders } = useRatedOrders();
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();

    const handleOrderPress = (order: Order) => {
        navigation.navigate('DetailedOrderScreen', { order });
    };

    const isOrderRated = (orderId: string) => {
        return ratedOrders.some(order => order.id === orderId);
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={completedOrders}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => handleOrderPress(item)}>
                        <View style={styles.cartcontainer}>
                            <View style={styles.carticon}>
                                <Image source={images.check} style={styles.icon} />
                                <Text style={styles.texticon}>Finished</Text>
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
                                    {!isOrderRated(item.id) ? (
                                        <>
                                            <TouchableOpacity 
                                                style={styles.button} 
                                                onPress={() => navigation.navigate('RatingScreen', { order: item })}
                                            >
                                                <Text style={styles.buttonText}>Rate</Text>
                                            </TouchableOpacity>
                                        </>
                                    ) : null}
                                    <TouchableOpacity 
                                        style={isOrderRated(item.id) ? styles.button1Rated : styles.button1}
                                    >
                                        <Text style={styles.buttonText}>Re-order</Text>
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
});

export default  HistoryScreen;
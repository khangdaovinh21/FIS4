import React, { useState, useContext } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, TextInput, FlatList, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { CartContext, CartItem } from './context/CartContext';
import { RootStackParamList } from '../../types'; 
import { NavigationProp } from '@react-navigation/native';



interface DataItem {
    id: string;
    title: string;
    image: any;
    basePrice: number;
    toppingPrice: number;
    extraPrice: number;
    description: string;
}

const StoreFood1 = () => {
  
    const [showInputGroup, setShowInputGroup] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const { cart, totalPrice, addToCart } = useContext(CartContext)!;
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();


    const data: DataItem[] = [
        { id: '1', title: 'Vermicelli with shrimp paste', image: require('../../assets/storefood/menu1.jpg'), basePrice: 12, toppingPrice: 0, extraPrice: 0, description: 'Description: Lorem ipsum' },
        { id: '2', title: 'Vermicelli with shrimp paste', image: require('../../assets/storefood/menu2.jpg'), basePrice: 12, toppingPrice: 0, extraPrice: 0, description: 'Description: Lorem ipsum' },
        { id: '3', title: 'Vermicelli with shrimp paste', image: require('../../assets/storefood/menu3.jpg'), basePrice: 12, toppingPrice: 0, extraPrice: 0, description: 'Description: Lorem ipsum' },
        { id: '4', title: 'Vermicelli with shrimp paste', image: require('../../assets/storefood/menu4.png'), basePrice: 12, toppingPrice: 0, extraPrice: 0, description: 'Description: Lorem ipsum' },
    ];

    const Separator = () => <View style={styles.separator} />;

    const handleImagePress = (id: string) => {
        switch (id) {
            case '1':
                navigation.navigate("storefood2");
                break;
            case '2':
            case '3':
            case '4':
            default:
                console.log(`Image with ID ${id} pressed`);
        }
    };

    const calculateItemTotalPrice = (item: DataItem) => {
        return item.basePrice + item.toppingPrice + item.extraPrice;
    };

    const handleRemoveItem = (index: number) => {
        const updatedCart = [...cart];
        if (updatedCart[index].quantities[0] > 1) {
            updatedCart[index].quantities[0] -= 1;
            updatedCart[index].totalPrice -= 12;
        } else {
            updatedCart.splice(index, 1);
        }
        addToCart(updatedCart);
    };

    const handleAddItem = (index: number) => {
        const updatedCart = [...cart];
        updatedCart[index].quantities[0] += 1;
        updatedCart[index].totalPrice += 12;
        addToCart(updatedCart);
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.groupBig}>
                {showInputGroup ? (
                    <View style={styles.groupInput}>
                        <Image source={require('../../assets/storefood1/icon2.png')} style={styles.iconLeft} />
                        <TextInput
                            placeholder="Search in menu"
                            style={styles.input}
                        />
                        <TouchableOpacity onPress={() => setShowInputGroup(false)} style={styles.cancelButton}>
                            <Text style={styles.cancelText}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                ) : (
                    <View style={styles.groupContent}>
                        <View style={styles.groupIconText}>
                            <TouchableOpacity onPress={() => navigation.navigate('storefood')}>
                                <Image source={require('../../assets/storefood1/icon1.png')} style={styles.icon} />
                            </TouchableOpacity>
                            <Text style={styles.text}>Food store name</Text>
                            <TouchableOpacity onPress={() => setShowInputGroup(true)}>
                                <Image source={require('../../assets/storefood1/icon2.png')} style={styles.icon} />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.taskbar}>
                            <TouchableOpacity style={styles.task}>
                                <Text style={styles.taskText}>Just for you</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.task1}>
                                <Text style={styles.taskText1}>Main</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.task}>
                                <Text style={styles.taskText}>Extra</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            </View>
            <Text style={styles.text1}>Main dish</Text>
            <FlatList
                data={data}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <View style={styles.listItem1}>
                        <TouchableOpacity onPress={() => handleImagePress(item.id)}>
                            <Image source={item.image} style={styles.itemImage1} />
                        </TouchableOpacity>
                        <View style={styles.itemContent1}>
                            <TouchableOpacity onPress={() => handleImagePress(item.id)}>
                                <Text style={styles.itemTitle1}>{item.title}</Text>
                            </TouchableOpacity>
                            <View style={styles.textWithIcon1}>
                                <Text style={styles.itemText1}>{item.description}</Text>
                                <Text style={styles.itemText}>{calculateItemTotalPrice(item)}$</Text>
                            </View>
                        </View>
                    </View>
                )}
                ItemSeparatorComponent={Separator}
            />
            {cart.length > 0 && (
                <View style={styles.checkoutContainer}>
                    <View>
                        <TouchableOpacity style={styles.checkoutgruop} onPress={() => setModalVisible(true)}>
                            <Image source={require('../../assets/storefood/Cart.png')} style={styles.cartButton} />
                            <Text style={styles.textcart}>{cart.length}</Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={styles.checkoutButton} onPress={() => navigation.navigate('storefood3')} >
                        <Text style={styles.checkoutText}>Check out • {totalPrice}$</Text>
                    </TouchableOpacity>
                </View>
            )}
            <Modal
    animationType="slide"
    transparent={true}
    visible={modalVisible}
    onRequestClose={() => {
        setModalVisible(!modalVisible);
    }}
>
    <View style={styles.modalView}>
    <View style={styles.iconsContainer}>
      <TouchableOpacity  onPress={() => setModalVisible(false)}>
        <Image source={require('../../assets/storefood/close.png')} style={styles.icon} />
      </TouchableOpacity>
      <Text style={styles.textmodal}>Cart</Text>

      </View>
    
        <FlatList
            data={cart}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => (
                <View style={styles.cartItem}>
                    <View style={styles.cartItemTextContainer}>
                        <Text style={styles.cartItemText}>{item.quantities[0]} x {item.mainDish}</Text>
                        {item.toppings.map((topping, idx) => (
                            <Text key={idx} style={styles.cartItemText}>{topping.quantity} x {topping.name} = {topping.price}</Text>
                        ))}
                        <Text style={styles.cartItemText1}>Total = {item.totalPrice}$</Text>
                    </View>
                    <TouchableOpacity onPress={() => handleRemoveItem(index)} style={styles.circleButton}>
                        <Text style={styles.buttonText}>-</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleAddItem(index)} style={styles.circleButton}>
                        <Text style={styles.buttonText}>+</Text>
                    </TouchableOpacity>
                </View>
            )}
        />
        <TouchableOpacity style={styles.checkoutButton1} onPress={() => navigation.navigate('storefood3')} >
            <Text style={styles.checkoutText}>Check out • {totalPrice}$</Text>
        </TouchableOpacity>
    </View>
</Modal>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
  },
  groupBig: {
    flexDirection: 'column',
    alignItems: 'center',
    marginVertical: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05, 
    shadowRadius: 4,
    elevation: 5, 
  },
  groupContent: {
    flexDirection: 'column',
    alignItems: 'center',
},
  groupIconText: {
    flexDirection: 'row',
    alignItems: "flex-end",
    justifyContent:"space-between",
    height:80,
    width:"100%",
    paddingHorizontal:10,
  },
  icon: {
    width: 24,
    height: 24,
    marginHorizontal: 10,
  },
  text: {
    fontSize: 19,
    fontWeight: 'bold',
    color:"black",
  },
  text1:{
    fontSize: 16,
    fontWeight: 'bold',
    color:"black",
    marginLeft:15,
    marginVertical:10,

  },

  taskbar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems:"center",
    backgroundColor: '#fff',
  },
  task: {
    flex:1,
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 5,
  },
  task1: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 5,
    borderBottomWidth: 5, 
    borderBottomColor: '#FEBD2F', 
},
  taskText: {
    fontSize: 16,
    color:"black",
  },
  taskText1: {
    fontSize: 16,
    fontWeight:"bold",
    color:"black",
  },
  groupInput: {
    height:130,
    paddingHorizontal:20,
    justifyContent:"space-between",
    width: '100%',
    alignItems: "center",
    flexDirection:"row",
},
input: {
    height: 45,
    width:277,
    borderColor: 'white',
    borderWidth: 1,
    backgroundColor:"#F2F2F2",
    borderRadius: 10,
    marginTop:40,
    paddingLeft: 40,
    
},
cancelButton: {
    padding: 10,
    backgroundColor: 'white',
    marginTop:40,

},
cancelText: {
    color: '#2563EB',
    fontWeight: 'bold',
},
iconLeft: {
  width:24,
  height:24,
  color: '#888',
  position:"absolute",
  top:73,
  left:25,
  zIndex:1,
  
},
listItem1: {
  backgroundColor: 'white',
  alignItems: "center",
  marginHorizontal:20,
  borderRadius:10,
  flexDirection:"row",
},
itemImage1: {
  width: 74,
  height: 74,
  resizeMode: 'cover',
  marginBottom: 10,
  borderRadius:10,
},
itemContent1: {
  marginLeft:10,
},
itemTitle1: {
  fontSize: 13,
  color:"black",
  width:170,
  height:20,

},
textWithIcon1: {
  justifyContent:"space-between",
  width:200,
  height:60,
  marginLeft:-5,

},
icon1: {
  width: 20,
  height: 20,
  resizeMode: 'contain',
},
itemText: {
  fontSize: 13,
  marginLeft: 5,
  fontWeight:"bold",
  marginBottom:10,
  color:"black",

},
itemText1: {
  fontSize: 11,
  marginLeft: 5,

},
separator: {
  height: 1,
  backgroundColor: '#ccc',
  marginHorizontal:20,
  marginBottom:20,
  marginTop:10,
},
cartButton: {
  width:24,
  height:24,
},

checkoutgruop: {
  flexDirection:"row",
  backgroundColor:"white",
  alignItems:"center",
  justifyContent:"space-evenly",
  width:72,
  height:48,
  borderRadius:10,
  borderWidth:1,
  
},
textcart:{
  fontSize: 16,
},

checkoutContainer: {
  flexDirection:"row",
  marginBottom: 20,
  alignItems: 'center',
  justifyContent:"space-between",
  marginHorizontal:20,
},
checkoutButton: {
  backgroundColor: '#FEBD2F',
  paddingVertical: 12,
  borderRadius: 10,
  width:260,
  height:48,
  alignItems:"center"
},
checkoutButton1: {
  backgroundColor: '#FEBD2F',
  paddingVertical: 12,
  borderRadius: 10,
  width:370,
  height:48,
  alignItems:"center",
  justifyContent:"center",
  marginBottom:10,
},
checkoutText: {
  color: '#fff',
  fontSize: 16,
  fontWeight: 'bold',
},
modalView: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'rgba(0, 0, 0, 0.8)',
},
cartItem: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: 15,
  backgroundColor: '#fff',
  marginVertical: 5,
  borderRadius: 5,
  width: '100%',
},
cartItemTextContainer: {
  flex: 1,
  marginRight: 10,
},
cartItemText: {
  fontSize: 15,
},
cartItemText2: {
  fontSize: 15,
  fontWeight:"bold",
},
cartItemText1:{
  fontSize: 17,
  fontWeight:"bold",
},
textmodal:{
  fontSize:20,
  color:"white",
  marginRight:180,
},

circleButton: {
  borderWidth: 1,
  borderColor: '#CED0CE',
  borderRadius: 15,
  width: 30,
  height: 30,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor:"#FFDE97",
  marginHorizontal:10,
},
buttonText: {
  fontSize: 18,
  color: '#000',
},
iconsContainer:{
width:"100%",
height:60,
justifyContent:"space-between",
flexDirection:"row",
alignItems:"center",
},

});

export default StoreFood1;
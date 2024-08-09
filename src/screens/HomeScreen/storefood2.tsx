import React, { useState, useContext } from 'react';
import { View, Text, ScrollView, Image, StyleSheet, TouchableOpacity, FlatList,StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { CartContext, CartItem } from './context/CartContext';
import { NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../../types'; 

const StoreFood2 = () => {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const { addToCart } = useContext(CartContext)!;
    const [quantities, setQuantities] = useState([0, 0, 0]); 
    const [extraQuantity, setExtraQuantity] = useState(1); 
    const mainDish = "Mala spicy oil hot pot";
    const basePrice = 12; 

    const incrementQuantity = (index: number) => {
        const newQuantities = [...quantities];
        newQuantities[index] += 1;
        setQuantities(newQuantities);
    };

    const decrementQuantity = (index: number) => {
        if (quantities[index] > 0) {
            const newQuantities = [...quantities];
            newQuantities[index] -= 1;
            setQuantities(newQuantities);
        }
    };

    const incrementExtraQuantity = () => {
        setExtraQuantity(extraQuantity + 1);
    };

    const decrementExtraQuantity = () => {
        if (extraQuantity > 1) {
            setExtraQuantity(extraQuantity - 1);
        }
    };

    const calculateTotalPrice = () => {
        const toppingPrice = quantities.reduce((total, quantity) => total + quantity, 0);
        const extraPrice = (extraQuantity - 1) * 12;  
        return basePrice + toppingPrice + extraPrice;
    };

    const data = [
        { name: 'Lorem ipsum 1', price: '1$' },
        { name: 'Lorem ipsum 2', price: '1$' },
        { name: 'Lorem ipsum 3', price: '1$' },
    ];

    const renderItem = ({ item, index }: { item: any, index: number }) => (
        <View style={styles.itemContainer}>
            <View style={styles.counterContainer}>
                {quantities[index] > 0 && (
                    <TouchableOpacity onPress={() => decrementQuantity(index)} style={styles.circleButton}>
                        <Text style={styles.buttonText}>-</Text>
                    </TouchableOpacity>
                )}
                <Text style={styles.quantityText}>{quantities[index]}</Text>
                <TouchableOpacity onPress={() => incrementQuantity(index)} style={styles.circleButton}>
                    <Text style={styles.buttonText}>+</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.textContainer}>
                <Text style={styles.itemText}>{item.name}</Text>
                <Text style={styles.priceText}>{item.price}</Text>
            </View>
        </View>
    );

    const handleAddToCart = () => {
        const toppings = data.map((item, index) => ({
            name: item.name,
            price: item.price,
            quantity: quantities[index] || 0,
        }));

        const newItem: CartItem = {
            mainDish,
            quantities: [extraQuantity], 
            toppings,
            extraQuantity,
            totalPrice: calculateTotalPrice(),
        };

        addToCart(newItem);
        navigation.navigate('storefood1');
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
          <StatusBar barStyle="light-content" backgroundColor= "rgba(0, 0, 0, 0.4)"  />

            <View style={styles.imageContainer}>
                <Image source={require('../../assets/storefood/menu1.jpg')} style={styles.image} />
            </View>
            <View style={styles.iconsContainer}>
                <TouchableOpacity onPress={() => navigation.navigate('storefood1')}>
                    <Image source={require('../../assets/storefood/close.png')} style={styles.icon} />
                </TouchableOpacity>
            </View>
            <View style={styles.groupBig}>
                <View style={styles.groupText}>
                    <Text style={styles.text1}>{mainDish}</Text>
                    <Text style={styles.text2}>Description: Lorem ipsum</Text>
                </View>
                <Text style={styles.text3}>{basePrice}$</Text>
            </View>
            <View style={styles.separator} />
            <View style={styles.groupText2}>
                <Image source={require('../../assets/storefood/Document.png')} style={styles.icondoc} />
                <Text style={styles.text4}>Send message to restaurant?</Text>
            </View>
            <View style={styles.separator} />
            <View style={styles.groupText3}>
                <Text style={styles.text5}>Extra option</Text>
                <Text style={styles.text6}>Maximum: 3</Text>
            </View>
            <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
            />
            <View style={styles.extraOptionContainer}>
                <View style={styles.counterContainer}>
                    {extraQuantity > 1 && (
                        <TouchableOpacity onPress={decrementExtraQuantity} style={styles.circleButton1}>
                            <Text style={styles.buttonText}>-</Text>
                        </TouchableOpacity>
                    )}
                    <Text style={styles.quantityText}>{extraQuantity}</Text>
                    <TouchableOpacity onPress={incrementExtraQuantity} style={styles.circleButton}>
                        <Text style={styles.buttonText}>+</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.extraButton} onPress={handleAddToCart}>
                    <Text style={styles.extraButtonText}>Add to cart • {calculateTotalPrice()}$</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
  },
  imageContainer: {
    marginBottom: 20,
    backgroundColor: "green",
    alignItems: "flex-end"
  },
  image: {
    width: "100%",
    height: 280,
    resizeMode: 'cover',
  },
  image1: {
    width: 32,
    height: 32,
    resizeMode: 'cover',
    position: "absolute",
    bottom: 10,
    right: 10,
  },
  iconsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    position: "absolute",
    paddingHorizontal: 10,
    top: 50,
  },
  icon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  groupBig: {
    backgroundColor: '#FFFFFF',
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  groupText: {
    marginBottom: 10,
  },
  groupText2: {
    flexDirection: "row",
    marginHorizontal: 20,
    marginVertical: 15,
    alignItems: "center"
  },
  groupText3: {
    marginHorizontal: 20,
    marginVertical: 15,
  },
  text1: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  text2: {
    fontSize: 11,
    marginTop: 10,
  },
  text3: {
    fontSize: 13,
    color: 'black',
  },
  text4: {
    fontSize: 13,
    marginLeft: 10,
  },
  text5: {
    fontSize: 13,
    fontWeight: "bold",
    color: "black",
  },
  text6: {
    fontSize: 13,
    marginVertical: 5,
  },
  icondoc: {
    height: 24,
    width: 24,
  },
  separator: {
    height: 2,
    backgroundColor: '#E6E1E5',
    marginVertical: 10,
    marginHorizontal: 20,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  itemText: {
    fontSize: 16,
    color:"black",

  },
  priceText: {
    fontSize: 16,
    color: 'black',
  },
  counterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  circleButton: {
    width: 24,
    height: 24,
    borderRadius: 15,
    backgroundColor: '#FFDE97',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  circleButton1: {
    width: 24,
    height: 24,
    borderRadius: 15,
    backgroundColor: '#E6E1E5',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  quantityText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  textContainer: {
    flexDirection: 'row',
    alignItems:"center",
    justifyContent:"space-between",
    width:240,
  },
  extraOptionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 15,
    marginHorizontal:15
  },
  extraButton: {
    backgroundColor: '#FEBD2F',
    borderRadius: 10,
    paddingHorizontal:60,
    paddingVertical:10,
  },
  extraButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default StoreFood2;

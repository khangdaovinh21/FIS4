import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, FlatList, StatusBar } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../../types';
import { GestureHandlerRootView, Swipeable } from 'react-native-gesture-handler';

const initialWishList = [
  { id: '1', title: 'Mc Donald', image: require('../../assets/home/mac.jpg'), description: 'Fast food restaurant', price: '1.7 km' },
  { id: '2', title: 'Jollibee Chicken', image: require('../../assets/home/jollibee.jpg'), description: 'Famous chicken joy', price: '2.8 km' },
];

const WishList: React.FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [wishList, setWishList] = useState(initialWishList);
  const [swipedItem, setSwipedItem] = useState<string | null>(null);

  const handleDelete = (id: string) => {
    setWishList(wishList.filter(item => item.id !== id));
  };

  const renderRightActions = (id: string) => (
    <TouchableOpacity
      style={styles.deleteButton}
      onPress={() => handleDelete(id)}
    >
      <Image source={require('../../assets/home/trash.png')} style={styles.icontrash} />
      <Text style={styles.deleteButtonText}>Delete</Text>
    </TouchableOpacity>
  );

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#fff" />
        <View style={styles.groupIconText}>
          <Text style={styles.text}>Wish List</Text>
        </View>
        <FlatList
          data={wishList}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <Swipeable
              renderRightActions={() => renderRightActions(item.id)}
              onSwipeableOpen={() => setSwipedItem(item.id)}
              onSwipeableClose={() => setSwipedItem(null)}
            >
              <View style={styles.listItem}>
                <Image source={item.image} style={styles.itemImage} />
                <View style={styles.textContainer}>
                  <Text style={styles.itemTitle}>{item.title}</Text>
                  <Text style={styles.itemDescription}>{item.description}</Text>
                  <Text style={styles.itemPrice}>{item.price}</Text>
                </View>
                {swipedItem !== item.id && (
                  <TouchableOpacity>
                    <Image source={require('../../assets/home/delete.png')} style={styles.iconRight} />
                  </TouchableOpacity>
                )}
              </View>
            </Swipeable>
          )}
        />
      </View>
    </GestureHandlerRootView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  groupIconText: {
    alignItems: 'center',
    justifyContent: "flex-end",
    height:80,
    marginVertical:20,
    
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    color:"black"
  },
  
  listItem: {
    flexDirection: 'row',
    padding: 10,
    alignItems:"center",
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  itemImage: {
    width: 80,
    height: 80,
    marginRight: 10,
  },
  itemTitle: {
    fontSize: 16,
    color:"black"
  },
  iconRight: {
    width: 20,
    height: 20,
  },
  deleteButton: {
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    width: 75,
    height: '100%',
  },
  deleteButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  taskbar: {
    flexDirection: 'row',
    justifyContent: "space-evenly",
    backgroundColor: 'white',
  },
  taskIcon: {
    
  },
  taskIconImage: {
    width: 75,
    height: 75,
    resizeMode: 'contain',

  },
  taskIconImage1: {
    width: 75,
    height: 60,
    resizeMode: 'cover',
  },
  textContainer: {
    width:250,
  },
 
  itemDescription: {
    fontSize: 11,
    color:"black",
    height:40,
  },
  itemPrice: {
    fontSize: 11,
    color: '#000',
  },
  icontrash:{
    width:24,
    height:24,
    marginBottom:5,

  },
  
 
});

export default WishList;

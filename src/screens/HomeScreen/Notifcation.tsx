import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, FlatList, StatusBar } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../../types';
import { GestureHandlerRootView, Swipeable } from 'react-native-gesture-handler';
import images from '../../assets/images';

const initialNotifications = [
  { id: '1', title: 'Sale 12.12 Discount 50%', image: images.voucher1, description: 'Discount 50%. Free shipping', time: '30/11/2022 10:38' },
  { id: '2', title: 'Black Friday X2 Promotion', image: images.voucher2, description: 'X2 Promotion', time: '12/11/2022 17:34' },
  { id: '3', title: 'Black Friday X2 Promotion', image: images.voucher3, description: 'X2 Promotion', time: '12/11/2022 17:34' },
];

const NotificationScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [notifications, setNotifications] = useState(initialNotifications);

  const handleDelete = (id: string) => {
    setNotifications(notifications.filter(item => item.id !== id));
  };

  const renderRightActions = (id: string) => (
    <TouchableOpacity style={styles.deleteButton} onPress={() => handleDelete(id)}>
      <Text style={styles.deleteButtonText}>Delete</Text>
    </TouchableOpacity>
  );

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#fff" />
        <View style={styles.groupIconText}>
          <TouchableOpacity onPress={() => navigation.navigate('Homescreen')}>
            <Image source={require('../../assets/storefood1/icon1.png')} style={styles.icon} />
          </TouchableOpacity>
          <Text style={styles.text}>Notifications</Text>
        </View>
        <FlatList
          data={notifications}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <Swipeable renderRightActions={() => renderRightActions(item.id)}>
              <View style={styles.listItem}>
                <Image source={item.image} style={styles.itemImage} />
                <View style={styles.textContainer}>
                  <Text style={styles.itemTitle}>{item.title}</Text>
                  <Text style={styles.itemDescription}>{item.description}</Text>
                  <Text style={styles.itemTime}>{item.time}</Text>
                </View>
              </View>
            </Swipeable>
          )}
          style={styles.flatList}
          contentContainerStyle={styles.flatListContent}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
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
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    height: 110,
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  text: {
    fontSize: 19,
    fontWeight: 'bold',
    color: 'black',
    marginRight: 125,
  },
  flatList: {
    paddingHorizontal:10,
  },
  flatListContent: {
    paddingVertical: 10,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  itemImage: {
    width: 56,
    height: 56,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#000',
  },
  itemDescription: {
    fontSize: 11,
    color: '#000',
    paddingTop: 5,
  },
  itemTime: {
    fontSize: 11,
    color: '#939094',
    paddingTop: 10,
  },
  iconRight: {
    width: 24,
    height: 24,
  },
  deleteButton: {
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    height: '100%',
  },
  deleteButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  icon: {
    width: 24,
    height: 24,
    marginLeft: 10,
  },
  separator: {
    height: 1,
    backgroundColor: '#ddd',
  },
});

export default NotificationScreen;

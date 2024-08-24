import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, FlatList, StatusBar, Alert } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../../types';
import { GestureHandlerRootView, Swipeable, LongPressGestureHandler } from 'react-native-gesture-handler';
import PushNotification from 'react-native-push-notification';
import images from '../../assets/images';
import { CouponsContext } from './context/CouponsContext'; // Đảm bảo rằng bạn đã import đúng đường dẫn

const NotificationScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const couponsContext = useContext(CouponsContext);

  if (!couponsContext) {
    Alert.alert('Error', 'CouponsContext is not available!');
    return null;
  }

  const { selectCoupon } = couponsContext;

  const [notifications, setNotifications] = useState([
    { id: '1', title: 'Sale 12.12 Discount 50%', image: images.voucher1, description: 'Discount 50%. Free shipping', time: '30/11/2022 10:38', discount: 50 },
    { id: '2', title: 'Black Friday Free Ship 100%', image: images.voucher2, description: 'X2 Promotion', time: '12/11/2022 17:34', discount: 100 },
    { id: '3', title: 'Sale Super Discount 20%', image: images.voucher3, description: 'X2 Promotion', time: '12/11/2022 17:34', discount: 20 },
  ]);

  useEffect(() => {
    PushNotification.configure({
      onRegister: function (token) {
        console.log('TOKEN:', token);
      },
      onNotification: function (notification) {
        console.log('NOTIFICATION:', notification);

        const newNotification = {
          id: Date.now().toString(),
          title: notification.title || 'New Notification',
          image: notification.bigPictureUrl || images.voucher1,
          description: notification.message || 'No description',
          time: new Date().toLocaleString(),
          discount: Math.floor(Math.random() * 50) + 10, 
        };
        setNotifications(prevNotifications => [newNotification, ...prevNotifications]);
      },
      onAction: function (notification) {
        console.log('ACTION:', notification.action);
      },
      onRegistrationError: function (error) {
        console.log('REGISTRATION ERROR:', error.message);
      },
      senderID: 'YOUR_GCM_OR_FCM_SENDER_ID',
      popInitialNotification: true,
      requestPermissions: true,
    });
  }, []);

  const handleDelete = (id: string) => {
    setNotifications(notifications.filter(item => item.id !== id));
  };

  const handleSelectCoupon = (notification: typeof notifications[0]) => {
    Alert.alert(
      'Xác nhận chọn coupon',
      `Bạn có chắc chắn muốn chọn coupon "${notification.title}" với giảm giá ${notification.discount}% không?`,
      [
        {
          text: 'Hủy',
          onPress: () => console.log('Chọn coupon bị hủy'),
          style: 'cancel',
        },
        {
          text: 'Xác nhận',
          onPress: () => {
            const coupon = {
              id: notification.id,
              name: notification.title,
              discount: notification.discount,
              image: notification.image,
            };
            selectCoupon(coupon);
            Alert.alert('Thành công', 'Coupon đã được chọn!');
          },
        },
      ]
    );
  };

  const renderRightActions = (id: string) => (
    <TouchableOpacity style={styles.deleteButton} onPress={() => handleDelete(id)}>
      <Text style={styles.deleteButtonText}>Xóa</Text>
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
          <Text style={styles.text}>Notifcation</Text>
          <TouchableOpacity style={styles.taskIcon} onPress={() => navigation.navigate('NotificationSettingsScreen')}>
            <Image source={images.gear} style={styles.taskIconImage} />
          </TouchableOpacity>
        </View>
        <FlatList
          data={notifications}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <Swipeable renderRightActions={() => renderRightActions(item.id)}>
              <LongPressGestureHandler
                onHandlerStateChange={({ nativeEvent }) => {
                  if (nativeEvent.state === 4) { 
                    handleSelectCoupon(item);
                  }
                }}
                minDurationMs={800}
              >
                <View style={styles.listItem}>
                  <Image source={item.image} style={styles.itemImage} />
                  <View style={styles.textContainer}>
                    <Text style={styles.itemTitle}>{item.title}</Text>
                    <Text style={styles.itemDescription}>{item.description}</Text>
                    <Text style={styles.itemTime}>{item.time}</Text>
                  </View>
                </View>
              </LongPressGestureHandler>
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
  taskIcon:{
    
  },
  taskIconImage:{
    width:30,
    height:30,
  }
});

export default NotificationScreen;

import 'react-native-get-random-values';
import React, { useEffect } from 'react';
import { NavigationContainer, useNavigationState } from '@react-navigation/native';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import PushNotification from 'react-native-push-notification';
import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Onboarding from './src/screens/Onboarding/Onboarding';
import Onboarding1 from './src/screens/Onboarding/Onboarding1';
import Onboarding2 from './src/screens/Onboarding/Onboarding2';
import LoginScreen from './src/screens/Signup/LoginScreen';
import LoginScreen1 from './src/screens/Signup/LoginScreen1';
import LoginScreen2 from './src/screens/Signup/LoginScreen2';
import LoginScreen3 from './src/screens/Signup/LoginScreen3';
import HomeScreen from './src/screens/HomeScreen/Homescreen';
import StoreFood from './src/screens/HomeScreen/storefood';
import StoreFood1 from './src/screens/HomeScreen/storefood1';
import StoreFood2 from './src/screens/HomeScreen/storefood2';
import StoreFood3 from './src/screens/HomeScreen/storefood3';
import Coupons from './src/screens/HomeScreen/coupons';
import Coupons2 from './src/screens/HomeScreen/coupons2';
import { OrderProvider, useOrders } from './src/screens/HomeScreen/context/OrderContext'; 
import { CartProvider } from './src/screens/HomeScreen/context/CartContext';
import { CouponsProvider } from './src/screens/HomeScreen/context/CouponsContext';
import { RootStackParamList } from './src/types';
import { RatedOrderProvider } from './src/screens/HomeScreen/context/RatedOrderContext';
import { CanceledOrderProvider } from './src/screens/HomeScreen/context/CanceledOrderContext';
import LoadingScreen from './src/screens/HomeScreen/LoadingScreen';
import WebViewScreen from './src/screens/HomeScreen/WebViewScreen';
import RatingScreen from './src/screens/HomeScreen/RatingScreen';
import RatingScreen1 from './src/screens/HomeScreen/RatingScreen1';
import NewFood from './src/screens/HomeScreen/NewFood';
import WishList from './src/screens/HomeScreen/WishList';
import MyPage from './src/screens/HomeScreen/MyPage';
import Taskbar from './src/screens/HomeScreen/Taskbar';
import NotificationScreen from './src/screens/HomeScreen/Notifcation';
import HorizontalBar from './src/screens/HomeScreen/components/HorizontalBar';
import HistoryScreen from './src/screens/HomeScreen/Receipt/HistoryScreen';
import OngoingScreen from './src/screens/HomeScreen/Receipt/OngoingScreen';
import ListSupportScreen from './src/screens/HomeScreen/Receipt/ListSupportScreen';
import QuestionDetailScreen from './src/screens/HomeScreen/Receipt/QuestionDetailScreen';
import DetailedOrderScreen from './src/screens/HomeScreen/Receipt/DetailedOrderScreen';
import ToRateScreen from './src/screens/HomeScreen/Receipt/ToRateScreen';
import NotificationSettingsScreen from './src/screens/NotificationSettingsScreen';
import { useGlobalOrderNotification } from './src/screens/Notification/OrderNotification'; 
import useCouponNotification from './src/screens/Notification/CouponNotification'; 
import ChatbotScreen from './src/screens/HomeScreen/ChatbotScreen';


const Stack = createStackNavigator<RootStackParamList>();

const App = () => {
  const routeNamesToShowTaskbar = [
    'WishList',
    'Homescreen',
    'Notifcation',
    'ReceiptScreen',
    'HistoryScreen',
    'ToRateScreen',
    'ReceiptScreen',
    'OngoingScreen',
    "MyPage",
  ];



  const { initializeCouponNotification } = useCouponNotification(); 

  useEffect(() => {
    const cleanup = initializeCouponNotification();

    const unsubscribeOnNotificationOpenedApp = messaging().onNotificationOpenedApp(notification => {
      console.log('Notification caused app to open from background state:', notification.notification);
    });

    messaging()
      .getInitialNotification()
      .then(notification => {
        if (notification) {
          console.log('Notification caused app to open from quit state:', notification.notification);
        }
      });

    const unsubscribeOnMessage = messaging().onMessage(async remoteMessage => {
      const savedState = await AsyncStorage.getItem('notificationsEnabled');
      const notificationsEnabled = savedState !== null ? JSON.parse(savedState) : true;

      if (notificationsEnabled) {
        PushNotification.localNotification({
          channelId: 'default-channel-id',
          title: remoteMessage.notification?.title || 'Notification',
          message: remoteMessage.notification?.body || 'You have a new message',
          bigPictureUrl: remoteMessage.notification?.android?.imageUrl || 'https://i.postimg.cc/sfHMz7sX/voucher1.jpg',
        });
      }
    });

    return () => {
      unsubscribeOnNotificationOpenedApp();
      unsubscribeOnMessage();
      cleanup(); 
    };
  }, []);

  const NavigationContent = () => {
    const { orders } = useOrders(); // Lấy danh sách đơn hàng từ context

    useGlobalOrderNotification(orders); // Sử dụng hook để gửi thông báo dựa trên danh sách đơn hàng
    const state = useNavigationState(state => state);
    const currentRoute = state?.routes[state.index]?.name;
    const showTaskbar = routeNamesToShowTaskbar.includes(currentRoute);
    const showHorizontalBar = ['OngoingScreen', 'HistoryScreen', 'ToRateScreen', 'ReceiptScreen'].includes(currentRoute);

    return (
      <>
        {showHorizontalBar && <HorizontalBar />}
        <Stack.Navigator
          initialRouteName="Onboarding"
          screenOptions={{
            headerShown: false,
            gestureEnabled: true,
            cardOverlayEnabled: true,
            ...TransitionPresets.SlideFromRightIOS,
          }}
        >
          <Stack.Screen name="Onboarding" component={Onboarding} />
          <Stack.Screen name="Onboarding1" component={Onboarding1} />
          <Stack.Screen name="Onboarding2" component={Onboarding2} />
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="LoginScreen1" component={LoginScreen1} />
          <Stack.Screen name="LoginScreen2" component={LoginScreen2} />
          <Stack.Screen name="LoginScreen3" component={LoginScreen3} />
          <Stack.Screen name="Homescreen" component={HomeScreen} />
          <Stack.Screen name="storefood" component={StoreFood} />
          <Stack.Screen name="storefood1" component={StoreFood1} />
          <Stack.Screen name="storefood2" component={StoreFood2} options={{ ...TransitionPresets.ModalSlideFromBottomIOS }} />
          <Stack.Screen name="storefood3" component={StoreFood3} />
          <Stack.Screen name="LoadingScreen" component={LoadingScreen} />
          <Stack.Screen name="WebViewScreen" component={WebViewScreen} options={{ ...TransitionPresets.ModalSlideFromBottomIOS }} />
          <Stack.Screen name="coupons" component={Coupons} />
          <Stack.Screen name="coupons2" component={Coupons2} />
          <Stack.Screen name="RatingScreen" component={RatingScreen} />
          <Stack.Screen name="RatingScreen1" component={RatingScreen1} />
          <Stack.Screen name="NewFood" component={NewFood} />
          <Stack.Screen name="WishList" component={WishList} />
          <Stack.Screen name="Taskbar" component={Taskbar} options={{ cardStyle: { backgroundColor: 'transparent' } }} />
          <Stack.Screen name="Notifcation" component={NotificationScreen} />
          <Stack.Screen name="ReceiptScreen" component={ListSupportScreen} />
          <Stack.Screen name="HistoryScreen" component={HistoryScreen} />
          <Stack.Screen name="OngoingScreen" component={OngoingScreen} />
          <Stack.Screen name="QuestionDetailScreen" component={QuestionDetailScreen} />
          <Stack.Screen name="DetailedOrderScreen" component={DetailedOrderScreen} />
          <Stack.Screen name="ToRateScreen" component={ToRateScreen} />
          <Stack.Screen name="MyPage" component={MyPage} />
          <Stack.Screen name="ChatbotScreen" component={ChatbotScreen} />
          <Stack.Screen name="NotificationSettingsScreen" component={NotificationSettingsScreen} />
        </Stack.Navigator>
        {showTaskbar && <Taskbar />}
      </>
    );
  };

  return (
    <OrderProvider>
      <CartProvider>
        <CouponsProvider>
          <RatedOrderProvider>
            <CanceledOrderProvider>
              <NavigationContainer>
                <NavigationContent />
              </NavigationContainer>
            </CanceledOrderProvider>
          </RatedOrderProvider>
        </CouponsProvider>
      </CartProvider>
    </OrderProvider>
  );
};

export default App;

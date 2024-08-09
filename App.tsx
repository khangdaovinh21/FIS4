
import 'react-native-get-random-values'; 
import React from 'react';
import { NavigationContainer, useNavigationState } from '@react-navigation/native';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
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
import { OrderProvider } from './src/screens/HomeScreen/context/OrderContext'; 
import { CartProvider } from './src/screens/HomeScreen/context/CartContext';
import { CouponsProvider } from './src/screens/HomeScreen/context/CouponsContext';
import { RootStackParamList } from './src/types';
import { RatedOrderProvider } from './src/screens/HomeScreen/context/RatedOrderContext'; 
import LoadingScreen from './src/screens/HomeScreen/LoadingScreen';
import WebViewScreen from './src/screens/HomeScreen/WebViewScreen';
import RatingScreen from './src/screens/HomeScreen/RatingScreen';
import RatingScreen1 from './src/screens/HomeScreen/RatingScreen1';
import NewFood from './src/screens/HomeScreen/NewFood';
import WishList from './src/screens/HomeScreen/WishList';
import Taskbar from './src/screens/HomeScreen/Taskbar';
import Notifcation from './src/screens/HomeScreen/Notifcation';
import HorizontalBar from './src/screens/HomeScreen/components/HorizontalBar';
import HistoryScreen from './src/screens/HomeScreen/Receipt/HistoryScreen'; 
import OngoingScreen from './src/screens/HomeScreen/Receipt/OngoingScreen'; 
import ListSupportScreen from './src/screens/HomeScreen/Receipt/ListSupportScreen'; 
import QuestionDetailScreen from './src/screens/HomeScreen/Receipt/QuestionDetailScreen'; 
import DetailedOrderScreen from './src/screens/HomeScreen/Receipt/DetailedOrderScreen';
import ToRateScreen from './src/screens/HomeScreen/Receipt/ToRateScreen'; 


const Stack = createStackNavigator<RootStackParamList>();

const App = () => {
  const routeNamesToShowTaskbar = ['WishList', 'Homescreen', 'Notifcation', 'ReceiptScreen', 'HistoryScreen', 'ToRateScreen', 'ReceiptScreen', 'OngoingScreen'];

  const NavigationContent = () => {
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
          <Stack.Screen name="Notifcation" component={Notifcation} /> 
          <Stack.Screen name="HistoryScreen" component={HistoryScreen} /> 
          <Stack.Screen name="OngoingScreen" component={OngoingScreen} />
          <Stack.Screen name="ToRateScreen" component={ToRateScreen} /> 
          <Stack.Screen name="DetailedOrderScreen" component={DetailedOrderScreen} />
          <Stack.Screen name="ListSupportScreen" component={ListSupportScreen} />
          <Stack.Screen name="QuestionDetailScreen" component={QuestionDetailScreen} />
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
            <NavigationContainer>
              <NavigationContent />
            </NavigationContainer>
          </RatedOrderProvider>
        </CouponsProvider>
      </CartProvider>
    </OrderProvider>
  );
};

export default App;

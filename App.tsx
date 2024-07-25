import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
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
import { CartProvider } from './src/screens/HomeScreen/context/CartContext';
import { RootStackParamList } from './src/types'; 




const Stack = createStackNavigator<RootStackParamList>();

const App = () => {
  const transitionConfig = {
    animation: 'spring',
    config: {
      stiffness: 1000,
      damping: 50,
      mass: 3,
      overshootClamping: true,
      restDisplacementThreshold: 0.01,
      restSpeedThreshold: 0.01,
    },
  };

  return (
    <CartProvider>
      <NavigationContainer>
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
          <Stack.Screen name="storefood2" component={StoreFood2} />
          <Stack.Screen name="storefood3" component={StoreFood3} />
        </Stack.Navigator>
      </NavigationContainer>
    </CartProvider>
  );
};

export default App;

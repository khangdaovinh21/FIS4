import { useRef } from 'react';
import PushNotification from 'react-native-push-notification';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DeviceEventEmitter } from 'react-native';
import images from '../../../src/assets/images'; 

const useCouponNotification = () => {
  const intervalId = useRef<NodeJS.Timeout | null>(null);

  const vouchers = [
    { title: 'Sale 12.12 Discount 50%', description: 'Discount 50%. Free shipping', image: images.voucher1 },
    { title: 'Black Friday Free Ship 100%', description: 'X2 Promotion', image: images.voucher2 },
    { title: 'Sale Super Discount 20%', description: 'X2 Promotion', image: images.voucher3 },
  ];

  const startSendingNotifications = () => {
    intervalId.current = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * vouchers.length);
      const currentVoucher = vouchers[randomIndex];

      PushNotification.localNotification({
        channelId: 'default-channel-id',
        title: currentVoucher.title,
        message: currentVoucher.description,
        bigPictureUrl: currentVoucher.image,
      });
    }, 2000); 
  };

  const stopSendingNotifications = () => {
    if (intervalId.current) {
      clearInterval(intervalId.current);
      intervalId.current = null;
    }
  };

  const checkNotificationSettings = async () => {
    const savedState = await AsyncStorage.getItem('notificationsEnabled');
    const notificationsEnabled = savedState !== null ? JSON.parse(savedState) : true;

    if (notificationsEnabled) {
      startSendingNotifications();
    } else {
      stopSendingNotifications();
    }
  };

  const initializeCouponNotification = () => {
    checkNotificationSettings();

    const subscription = DeviceEventEmitter.addListener('notificationSettingChanged', (newState) => {
      if (newState) {
        startSendingNotifications();
      } else {
        stopSendingNotifications();
      }
    });

    return () => {
      subscription.remove();
      stopSendingNotifications();
    };
  };

  return {
    initializeCouponNotification,
  };
};

export default useCouponNotification;

import { useEffect, useRef } from 'react';
import PushNotification from 'react-native-push-notification';
import { Order } from './../../types';

const sendNotification = (title: string, message: string) => {
  PushNotification.localNotification({
    channelId: 'default-channel-id', 
    title: title,
    message: message,
    soundName: 'default',
    priority: 'high',
    bigPictureUrl: 'https://i.postimg.cc/mZyybcJF/hotpot3.png',
  });
};

export const useGlobalOrderNotification = (orders: Order[]) => {
  const notificationInterval = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (orders.length > 0) {
      notificationInterval.current = setInterval(() => {
        sendNotification('Order Update', 'You have ongoing orders.');
      }, 200000); 
    } else {
      if (notificationInterval.current) {
        clearInterval(notificationInterval.current);
      }
    }

    return () => {
      if (notificationInterval.current) {
        clearInterval(notificationInterval.current);
      }
    };
  }, [orders]);
};

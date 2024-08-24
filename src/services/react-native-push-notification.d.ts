declare module 'react-native-push-notification' {
  import { PushNotificationIOS } from 'react-native';

  interface PushNotificationOptions {
    channelId?: string;
    title?: string;
    message?: string;
    soundName?: string;
    playSound?: boolean;  
    actions?: string[];  
    priority?: 'high' | 'default' | 'low';
    importance?: number;
    vibrate?: boolean;
    alert?: boolean;
    badge?: boolean;
    bigPictureUrl?: string;
    largeIcon?: string;  
    smallIcon?: string;  
    subText?: string;  
    color?: string;  
    number?: number;  
    userInfo?: object;  
  }

  interface PushNotificationChannelOptions {
    channelId: string;
    channelName: string;
    channelDescription?: string;
    soundName?: string;
    importance?: number;
    vibrate?: boolean;
  }

  class PushNotification {
    static localNotification(options: PushNotificationOptions): void;
    static createChannel(options: PushNotificationChannelOptions, callback: (created: boolean) => void): void;
    static configure(options: {
      onRegister: (token: { token: string }) => void;
      onNotification: (notification: any) => void;
      onAction: (notification: any) => void;
      onRegistrationError: (error: Error) => void;
      senderID?: string;
      popInitialNotification?: boolean;
      requestPermissions?: boolean;
    }): void;
    static cancelAllLocalNotifications(): void;  
    static abandonPermissions(): void;  
    static checkPermissions(callback: (permissions: { alert: boolean; badge: boolean; sound: boolean }) => void): void;  // Thêm
  }

  export default PushNotification;
}

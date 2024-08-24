import messaging from '@react-native-firebase/messaging';

// Yêu cầu quyền thông báo từ người dùng
export const requestUserPermission = async () => {
  try {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status:', authStatus);
    } else {
      console.log('Authorization status: Denied');
    }
  } catch (error) {
    console.error('Failed to request permission:', error);
  }
};

// Xử lý thông báo khi ứng dụng đang hoạt động (foreground)
export const onMessageListener = () => {
  messaging().onMessage(async remoteMessage => {
    console.log('Thông báo nhận được khi ứng dụng hoạt động:', remoteMessage);
    // Bạn có thể xử lý thông báo ở đây hoặc cập nhật giao diện
  });
};

// Xử lý thông báo khi người dùng mở ứng dụng từ thông báo
export const onNotificationOpenedAppListener = () => {
  messaging().onNotificationOpenedApp(remoteMessage => {
    console.log('Thông báo khi mở ứng dụng từ thông báo:', remoteMessage.notification);
    // Bạn có thể xử lý thông báo khi mở ứng dụng từ thông báo ở đây
  });
};

// Lấy thông báo khi ứng dụng được khởi động từ thông báo
export const getInitialNotification = async () => {
  try {
    const remoteMessage = await messaging().getInitialNotification();
    if (remoteMessage) {
      console.log('Thông báo khi ứng dụng không hoạt động:', remoteMessage.notification);
      // Bạn có thể xử lý thông báo khi ứng dụng được khởi động từ thông báo ở đây
    }
  } catch (error) {
    console.error('Failed to get initial notification:', error);
  }
};

// Xử lý thông báo khi ứng dụng ở chế độ nền
messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Thông báo khi ứng dụng ở chế độ nền:', remoteMessage);
  // Bạn có thể xử lý thông báo ở đây khi ứng dụng ở chế độ nền
});

// Cài đặt tất cả các trình xử lý thông báo
export const setupNotificationListeners = () => {
  onMessageListener();
  onNotificationOpenedAppListener();
  getInitialNotification();
};

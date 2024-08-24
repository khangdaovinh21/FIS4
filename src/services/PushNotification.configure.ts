import PushNotification from 'react-native-push-notification';
import messaging from '@react-native-firebase/messaging';
import { AppState } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Cấu hình PushNotification
PushNotification.configure({
  // Được gọi khi token được tạo (khi ứng dụng đăng ký với FCM)
  onRegister: function (token) {
    console.log('TOKEN:', token);
  },

  // Được gọi khi nhận thông báo (kể cả khi ứng dụng ở foreground hoặc background)
  onNotification: async function (notification) {
    console.log('NOTIFICATION:', notification);

    // Kiểm tra trạng thái của ứng dụng và tùy chọn người dùng
    const notificationsEnabled = await AsyncStorage.getItem('notificationsEnabled');
    if (AppState.currentState === 'active' || notificationsEnabled === 'false') {
        console.log('Thông báo bị tắt hoặc ứng dụng đang mở.');
        return;
    }

    // Nếu ứng dụng không ở foreground, hiển thị thông báo bằng react-native-push-notification
    PushNotification.localNotification({
      channelId: 'default-channel-id',
      title: notification.title,
      message: notification.message,
      bigPictureUrl: notification.bigPictureUrl || 'https://i.postimg.cc/sfHMz7sX/voucher1.jpg', // Thay đổi đường dẫn hình ảnh nếu có
    });
  },

  // Được gọi khi có hành động trong thông báo (ví dụ: nhấn vào nút)
  onAction: function (notification) {
    console.log('ACTION:', notification.action);
    console.log('NOTIFICATION:', notification);
  },

  // Được gọi khi có lỗi trong quá trình đăng ký
  onRegistrationError: function(err) {
    console.error('Registration Error:', err.message, err);
  },

  // Thiết lập các tùy chọn khác
  popInitialNotification: true,
  requestPermissions: false, // Đặt thành false ở đây vì đã yêu cầu quyền bằng firebase
});

// Tạo kênh thông báo
PushNotification.createChannel(
  {
    channelId: 'default-channel-id', // id của kênh (phải là duy nhất)
    channelName: 'Default channel', // Tên của kênh
    channelDescription: 'A default channel', // Mô tả cho kênh
    importance: 4, // Độ quan trọng của thông báo: 4 = High, 3 = Default, 2 = Low, 1 = Min
    vibrate: true, // Có rung khi nhận thông báo
  },
  (created) => console.log(`createChannel returned '${created}'`) // Gọi lại sau khi kênh được tạo
);

// Thiết lập trình xử lý thông báo nền
messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Thông báo nhận được khi ứng dụng ở chế độ nền:', remoteMessage);
  // Thêm mã để xử lý thông báo khi ứng dụng ở chế độ nền (background)
});

// Cài đặt các trình xử lý thông báo
export const setupNotificationListeners = () => {
  onMessageListener();
  onNotificationOpenedAppListener();
  getInitialNotification();
};

// Thiết lập các trình xử lý thông báo
export const onMessageListener = () => {
  messaging().onMessage(async remoteMessage => {
    console.log('Thông báo nhận được:', remoteMessage);
    // Thêm mã để xử lý thông báo khi ứng dụng đang hoạt động (foreground)
  });
};

export const onNotificationOpenedAppListener = () => {
  messaging().onNotificationOpenedApp(remoteMessage => {
    console.log('Thông báo khi mở ứng dụng:', remoteMessage.notification);
    // Thêm mã để xử lý thông báo khi người dùng mở ứng dụng từ thông báo
  });
};

export const getInitialNotification = async () => {
  const remoteMessage = await messaging().getInitialNotification();
  if (remoteMessage) {
    console.log('Thông báo khi ứng dụng không hoạt động:', remoteMessage.notification);
    // Thêm mã để xử lý thông báo khi ứng dụng được mở từ thông báo khi nó bị đóng
  }
  
};

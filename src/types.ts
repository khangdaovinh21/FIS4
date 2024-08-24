export interface Topping {
  name: string;
  price: number;
  quantity: number;
}

export interface CartItem {
  mainDish: string;
  quantities: number[];
  totalPrice: number;
  toppings: Topping[];
}

export interface Order {
  id: string;
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  couponDiscount: number;
  total: number;
  storeName: string;
}

export interface Coupon {
  name: string;
  discount: number;
}

export interface Notification {
  id: string;
  title: string;
  image: string; 
  description: string;
  time: string;
}

export type RootStackParamList = {
  Onboarding: undefined;
  Onboarding1: undefined;
  Onboarding2: undefined;
  LoginScreen: undefined;
  LoginScreen1: undefined;
  LoginScreen2: undefined;
  LoginScreen3: undefined;
  Homescreen: undefined;
  storefood: undefined;
  storefood1: undefined;
  storefood2: undefined;
  storefood3: { coupon: Coupon };
  coupons: undefined;
  coupons2: { coupon: Coupon };
  WebViewScreen: undefined;
  LoadingScreen: undefined;
  RatingScreen: undefined;
  RatingScreen1: undefined;
  GroupText: undefined;
  NewFood: undefined;
  WishList: undefined;
  Taskbar: undefined;
  ReceiptScreen: undefined;
  OngoingScreen: undefined;
  HistoryScreen: undefined;
  ToRateScreen: undefined;
  ListSupportScreen: undefined;
  QuestionDetailScreen: { question: string };
  DetailedOrderScreen: { order: Order };
  Notifcation: { voucher: Notification };
  NotificationSettingsScreen: undefined; 
  MyPage: undefined; 
  ChatbotScreen: undefined; // Add this line if it's missing
};

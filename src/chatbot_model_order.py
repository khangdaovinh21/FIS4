from sklearn.feature_extraction.text import CountVectorizer
from sklearn.naive_bayes import MultinomialNB



class ChatbotModelOrder:
    def __init__(self):
        self.X_train = [
            "How do I order food", "What is the delivery time?", "Can I cancel my order?",
            "How do I track my order?", "What payment methods are accepted?", "How do I contact support?",
            "What should I do if my order is late?", "How do I update my delivery address?",
            "Can I use a discount code?", "How do I report a problem with my order?",
            "Where can I find my order history?", "How do I update my profile information?",
            "Can I schedule a delivery for later?", "What do I do if my payment fails?",
            "How can I provide feedback on my order?", "Is there a minimum order amount?",
            "Can I change my delivery time after placing the order?", "How do I apply for a refund?",
            "What is your privacy policy?", "How do I contact customer service?",
            "How do I know if a restaurant is open?", "What happens if my order gets cancelled?",
            "How do I apply a gift card?", "Can I order from multiple restaurants at once?",
            "How do I leave a tip?", "Can I reorder previous orders?", "How can I track the delivery driver?",
            "What is the estimated delivery cost?", "How do I change my payment method?",
            "Can I schedule recurring orders?", "How do I reset my password?", "What should I do if my food is cold?",
            "Can I order for someone else?", "How do I change the language in the app?",
            "How do I view my current promotions?", "What is the estimated delivery time for my location?",
            "Can I pay with cash?", "How do I delete my account?", "How do I update my payment information?",
            "What happens if the delivery driver can't find my address?", "Can I request contactless delivery?",
            "What should I do if I receive the wrong order?", "How do I apply a promo code?",
            "Is there a delivery fee?", "How do I leave a review for a restaurant?",
            "How do I change my phone number?", "Can I save multiple delivery addresses?",
            "What should I do if my app crashes?", "How do I unsubscribe from marketing emails?",
            "How do I log out of the app?", "Can I split the bill with someone?",
            "How do I change my email address?", "What happens if the restaurant cancels my order?",
            "How do I know if my order was successful?", "Can I reorder the same meal from my order history?",
            "How do I report a missing item in my order?", "What should I do if the app is not loading?",
            "Can I request a specific delivery time?", "How do I contact the delivery driver?",
            "Can I earn rewards or points on my orders?", "How can I order food", "What are the delivery options", "Can I track my order",
            "What types of cuisine are available", "How do I change my delivery address",
            "What should I do if my order is late", "How can I cancel my order",
            "Are there any discounts available", "Can I reorder my previous order",
            "How do I contact customer support", "What payment methods are accepted",
            "How can I apply a promo code", "What are the delivery hours",
            "Can I schedule a delivery for later", "How do I leave a review",
            "Can I order from multiple restaurants", "What should I do if I receive the wrong order",
            "How can I update my payment information", "What is the minimum order amount",
            "Are there any delivery fees", "Can I tip the delivery driver",
            "How do I find a restaurant near me", "What happens if my order is missing items",
            "Can I request special instructions for my order", "How can I check my order history",
            "What is your refund policy", "How do I delete my account", "How can I change my password",
            "Can I use multiple promo codes in one order", "What do I do if the app is not working",
            "Are there any new restaurants added", "How do I update my profile information",
            "What are the operating hours of customer support", "Can I use gift cards for payment",
            "What do I do if the delivery driver is late", "Can I order food for pickup",
            "How can I find out about special offers", "What do I do if I have a problem with the app",
            "Can I change my delivery time", "How do I save my favorite restaurants",
            "Can I modify my order after placing it", "How do I report a problem with my order",
            "What is the process for requesting a refund", "How do I track my delivery in real time",
            "Can I order food from different locations", "How do I use a discount code",
            "How can I ensure my order is accurate", "What should I do if I accidentally placed the wrong order",
            "Can I get a receipt for my order", "What should I do if the app crashes during payment",
            "How do I contact the restaurant directly", "Can I place an order without creating an account",
            "How do I manage my delivery addresses",  "Order food", "Delivery options", "Track my order", "Cuisine types", "Change address",
            "Order late", "Cancel order", "Discounts", "Reorder", "Contact support",
            "Payment methods", "Apply promo code", "Delivery hours", "Schedule delivery",
            "Leave review", "Multiple restaurants", "Wrong order", "Update payment info",
            "Minimum order amount", "Delivery fees", "Tip driver", "Find restaurant",
            "Missing items", "Special instructions", "Order history", "Refund policy",
            "Delete account", "Change password", "Multiple promo codes", "App not working",
            "New restaurants", "Update profile", "Customer support hours", "Gift cards",
            "Driver late", "Pickup order", "Special offers", "App problem", "Change delivery time",
            "Save favorites", "Modify order", "Report issue", "Refund process", "Track delivery",
            "Different locations", "Use discount code", "Ensure accuracy", "Wrong order",
            "Get receipt", "App crashes", "Contact restaurant", "Order without account", "Manage addresses",

        ]

        self.y_train = [
            "To order food, browse the menu, add items to your cart, and proceed to checkout.",
            "Delivery time varies by location and restaurant. Check the app for estimated delivery times.",
            "Yes, you can cancel your order if it has not yet been processed by the restaurant.",
            "You can track your order through the app under the 'Order Status' section.",
            "We accept credit/debit cards, mobile payments, and sometimes cash on delivery.",
            "Contact support through the 'Help' section in the app or call our support hotline.",
            "If your order is late, contact support to report the issue and request assistance.",
            "Update your delivery address in the 'Account Settings' section of the app.",
            "Yes, you can apply a discount code at checkout if you have one.",
            "To report a problem with your order, go to 'Order History' and select 'Report Issue'.",
            "You can find your order history in the 'Order History' section of the app.",
            "Update your profile information in the 'Profile Settings' section of the app.",
            "Yes, you can schedule a delivery for later during the checkout process.",
            "If your payment fails, try using a different payment method or contact support.",
            "To provide feedback, go to the 'Feedback' section in the app or contact support.",
            "Yes, there is a minimum order amount for free delivery. Check the app for details.",
            "To change your delivery time, contact support as soon as possible.",
            "To apply for a refund, contact support with your order details and reason for refund.",
            "Our privacy policy can be found in the 'Privacy Policy' section of the app.",
            "Contact customer service through the 'Help' section in the app or call our support hotline 0834684568.",
            "You can see restaurant hours on their page in the app.",
            "If your order is cancelled, you’ll receive a notification and a refund.",
            "Apply a gift card during checkout in the payment options.",
            "Currently, you can only order from one restaurant per order.",
            "You can leave a tip during checkout or after receiving your order.",
            "Yes, you can reorder previous orders from the 'Order History' section.",
            "Track the delivery driver in real-time through the 'Order Status' section.",
            "Delivery cost is estimated at checkout based on your location and order.",
            "Change your payment method in the 'Payment Options' during checkout.",
            "Recurring orders can be scheduled in the 'Order Settings' section.",
            "To reset your password, go to the 'Forgot Password' option on the login screen and follow the instructions.",
            "If your food is cold, please contact support to report the issue and request a replacement or refund.",
            "Yes, you can order for someone else by entering their delivery address at checkout.",
            "To change the language in the app, go to 'Settings' and select your preferred language.",
            "You can view current promotions in the 'Promotions' section of the app.",
            "The estimated delivery time varies based on your location and restaurant availability. Check the app for details.",
            "Cash payments are accepted in certain locations. Check the payment options at checkout.",
            "To delete your account, contact customer support through the app or the website.",
            "Update your payment information in the 'Payment Settings' section of the app.",
            "If the delivery driver can't find your address, they will contact you via phone. Please ensure your phone number is up-to-date.",
            "Yes, you can request contactless delivery during checkout by selecting the 'Contactless Delivery' option.",
            "If you receive the wrong order, please report the issue through the app or contact support.",
            "Apply a promo code at checkout in the 'Promo Code' section.",
            "Delivery fees vary by location and restaurant. The fee will be displayed at checkout.",
            "Leave a review for a restaurant in the 'Order History' section after your order is completed.",
            "Change your phone number in the 'Account Settings' section of the app.",
            "Yes, you can save multiple delivery addresses in your profile under 'Saved Addresses'.",
            "If the app crashes, try restarting it. If the problem persists, reinstall the app or contact support.",
            "Unsubscribe from marketing emails through the 'Account Settings' or at the bottom of any marketing email.",
            "Log out of the app by going to 'Account Settings' and selecting 'Log Out'.",
            "Currently, bill splitting is not supported directly in the app.",
            "Change your email address in the 'Account Settings' section.",
            "If a restaurant cancels your order, you will receive a notification and a refund.",
            "You'll receive a confirmation message in the app once your order is successful.",
            "Yes, you can reorder the same meal from your 'Order History' section.",
            "Report a missing item in your order by going to 'Order History' and selecting 'Report Issue'.",
            "If the app is not loading, check your internet connection or try restarting the app.",
            "Yes, you can request a specific delivery time at checkout.",
            "You can contact the delivery driver through the app once your order is on its way.",
            "Some orders may allow you to earn rewards or points. Check the app's rewards section for details.",   "You can order food by selecting your items and proceeding to checkout",
            "We offer delivery options such as standard delivery express delivery and scheduled delivery",
            "Yes you can track your order in the app under the order status section",
            "We offer various cuisines including Italian Chinese Indian and more",
            "To change your delivery address go to account settings and update your address",
            "If your order is late please contact customer support for assistance",
            "To cancel your order go to the order details and select cancel order",
            "Yes we have discounts and promotions available check the promotions section in the app",
            "You can reorder your previous order from your order history",
            "You can contact customer support through the help section in the app",
            "We accept various payment methods including credit cards debit cards and mobile payments",
            "To apply a promo code enter it at checkout in the promo code field",
            "Delivery hours vary by restaurant check the restaurant page for specific hours",
            "Yes you can schedule a delivery for a later time at checkout",
            "You can leave a review on the restaurant page after receiving your order",
            "Yes you can order from multiple restaurants in one order",
            "If you receive the wrong order contact customer support for a resolution",
            "To update your payment information go to account settings and add new payment details",
            "The minimum order amount varies by restaurant check the restaurant page for details",
            "Delivery fees may apply depending on your location and restaurant",
            "Yes you can tip the delivery driver through the app after your order is delivered",
            "To find a restaurant near you use the search function and enable location services",
            "If your order is missing items contact customer support for assistance",
            "You can request special instructions at checkout in the special instructions field",
            "To check your order history go to the orders section in your account",
            "Our refund policy is detailed in the terms and conditions section of the app",
            "To delete your account go to account settings and select delete account",
            "To change your password go to account settings and follow the password reset process",
            "Usually only one promo code can be used per order check the terms for specific rules",
            "If the app is not working try restarting it or contact support for help",
            "Yes new restaurants are added regularly check the app for updates",
            "To update your profile information go to account settings and edit your details",
            "Customer support is available during business hours check the help section for details",
            "Yes you can use gift cards for payment check the gift card section in the app",
            "If the delivery driver is late please contact customer support for assistance",
            "Food for pickup can be ordered by selecting pickup at checkout",
            "Special offers are available in the promotions section of the app",
            "If you have a problem with the app contact customer support for assistance",
            "You can change your delivery time if scheduled delivery is available for your order",
            "To save your favorite restaurants go to the restaurant page and select add to favorites",
            "Modifying an order after placing it is usually not possible contact support for options",
            "To report a problem with your order use the report issue option in the order details",
            "The refund process involves contacting support and following the instructions provided",
            "You can track your delivery in real time under the order status section in the app",
            "Yes you can order food from different locations by selecting restaurants from each location",
            "To use a discount code enter it at checkout in the discount code field",
            "To ensure your order is accurate review your order before confirming and check the details",
            "If you accidentally placed the wrong order contact support to see if changes can be made",
            "You can get a receipt for your order in the order details or email confirmation",
            "If the app crashes during payment try restarting it and retrying or contact support",
            "To contact the restaurant directly use the contact details provided on the restaurant page",
            "Yes you can place an order without creating an account but creating one provides additional benefits",
            "To manage your delivery addresses go to account settings and update or add new addresses",
            "Select items and proceed to checkout", "Standard and express delivery options available",
            "Track order in the app under order status", "Varies from Italian to Chinese and more",
            "Update address in account settings", "Contact customer support", "Cancel in order details",
            "Check promotions section for discounts", "Reorder from order history", "Use help section",
            "Accepts credit cards, debit cards, and mobile payments", "Enter code at checkout",
            "Check restaurant page for delivery hours", "Schedule delivery at checkout", "Leave review post-delivery",
            "Order from multiple restaurants if available", "Contact support for wrong orders",
            "Update in account settings", "Check restaurant page for minimum amount", "Delivery fees may apply",
            "Tip through the app after delivery", "Use search and location services", "Contact support for missing items",
            "Request instructions at checkout", "Check under orders in your account", "Refund policy in terms and conditions",
            "Delete in account settings", "Change in account settings", "Usually one promo code per order",
            "Restart app or contact support", "New restaurants added regularly", "Edit details in account settings",
            "Check help section for support hours", "Use gift cards in payment section", "Contact support for late delivery",
            "Select pickup option at checkout", "Check promotions section", "Contact support for app problems",
            "Change if scheduled delivery is available", "Save favorites on restaurant page", "Usually not possible, contact support",
            "Report issue in order details", "Follow instructions provided by support", "Track in real time in the app",
            "Order from different locations by selecting restaurants", "Enter at checkout", "Review order before confirming",
            "Contact support to correct order", "Get receipt in order details or email", "Try restarting app or contact support",
            "Use contact details on restaurant page", "Order without account but account provides benefits", "Manage in account settings"
        ]

        self.vectorizer = CountVectorizer()
        self.X_train_counts = self.vectorizer.fit_transform(self.X_train)
        self.clf = MultinomialNB().fit(self.X_train_counts, self.y_train)
        self.last_suggestions = {}

    def predict(self, text):
        text_counts = self.vectorizer.transform([text])
        prediction = self.clf.predict(text_counts)
        return prediction[0]


class ChatbotModelCustomerService:
    def __init__(self):
        self.X_train = [
            "How do I contact customer service?", "What are the operating hours of customer service?",
            "How do I file a complaint?", "How do I track my support ticket?", "What is the response time for support?",
            "How can I provide feedback on customer service?", "How do I escalate an issue?",
            "What languages does customer service support?", "How do I cancel my support request?",
            "What happens if my issue is not resolved?"
        ]

        self.y_train = [
            "You can contact customer service through the 'Help' section in the app or call our hotline.",
            "Customer service is available 24/7 for your assistance.",
            "To file a complaint, go to the 'Support' section and select 'File a Complaint'.",
            "Track your support ticket in the 'Support' section under 'My Tickets'.",
            "Response times vary, but we strive to respond within 24 hours.",
            "Provide feedback through the 'Feedback' section or by contacting support.",
            "If your issue is not resolved, you can escalate it by contacting a manager.",
            "Customer service supports multiple languages; choose your preferred language in the app settings.",
            "To cancel your support request, go to 'My Tickets' and select 'Cancel Request'.",
            "If your issue is not resolved, please contact support again or escalate the issue."
        ]

        self.vectorizer = CountVectorizer()
        self.X_train_counts = self.vectorizer.fit_transform(self.X_train)
        self.clf = MultinomialNB().fit(self.X_train_counts, self.y_train)
        self.last_suggestions = {}

    def predict(self, text):
        text_counts = self.vectorizer.transform([text])
        prediction = self.clf.predict(text_counts)
        return prediction[0]

class ChatbotModelAccount:
    def __init__(self):
        self.X_train = [
            "How do I reset my password?", "How do I update my profile information?",
            "How do I change my email address?", "How do I delete my account?",
            "What do I do if I forget my password?", "How do I manage my subscriptions?",
            "How do I change my notification settings?", "How do I link my account to social media?",
            "What do I do if I can't log in?", "How do I recover a deleted account?"
        ]

        self.y_train = [
            "To reset your password, go to 'Forgot Password' on the login screen and follow the instructions.",
            "Update your profile information in the 'Profile Settings' section of the app.",
            "Change your email address in the 'Account Settings' section.",
            "To delete your account, go to 'Account Settings' and select 'Delete Account'.",
            "If you forget your password, use the 'Forgot Password' feature to reset it.",
            "Manage your subscriptions in the 'Subscriptions' section of the app.",
            "Change your notification settings in the 'Notification Settings' section.",
            "Link your account to social media in the 'Linked Accounts' section of the app.",
            "If you can't log in, try resetting your password or contact support.",
            "To recover a deleted account, contact customer support immediately."
        ]

        self.vectorizer = CountVectorizer()
        self.X_train_counts = self.vectorizer.fit_transform(self.X_train)
        self.clf = MultinomialNB().fit(self.X_train_counts, self.y_train)
        self.last_suggestions = {}

    def predict(self, text):
        text_counts = self.vectorizer.transform([text])
        prediction = self.clf.predict(text_counts)
        return prediction[0]


class ChatbotModelProduct:
    def __init__(self):
        self.X_train = [
            "What products do you offer?", "How can I find product details?", "Can I get a product recommendation?",
            "Do you have any new arrivals?", "What are the best-selling products?", "How do I compare products?",
            "Are there any product bundles or offers?", "How do I return a product?",
            "Can I track my product shipment?",
            "What is the warranty period for your products?"
        ]

        self.y_train = [
            "We offer a wide range of products including electronics, clothing, and more. Check our catalog for details.",
            "Find product details on the product page, which includes specifications, reviews, and pricing.",
            "To get product recommendations, browse our 'Recommendations' section or use our recommendation tool.",
            "Check the 'New Arrivals' section on our website for the latest products.",
            "Our best-selling products are listed on the 'Best Sellers' page.",
            "Compare products on our 'Compare' page where you can see side-by-side comparisons.",
            "Look for product bundles or special offers in the 'Bundles' section of our website.",
            "To return a product, follow the return process detailed on the 'Returns' page.",
            "Track your product shipment under 'Order Status' in your account.",
            "The warranty period varies by product. Check the product page or warranty policy for specifics."
        ]

        self.vectorizer = CountVectorizer()
        self.X_train_counts = self.vectorizer.fit_transform(self.X_train)
        self.clf = MultinomialNB().fit(self.X_train_counts, self.y_train)
        self.last_suggestions = {}

    def predict(self, text):
        text_counts = self.vectorizer.transform([text])
        prediction = self.clf.predict(text_counts)
        return prediction[0]


class ChatbotModelPrivacy:
    def __init__(self):
        self.X_train = [
            "What is your privacy policy?", "How do you protect my personal data?", "Can I request to delete my data?",
            "How do you handle data breaches?", "What information do you collect about me?",
            "Do you share my data with third parties?", "How can I update my privacy settings?",
            "What are your data retention practices?", "How can I access my personal data?",
            "How can I contact you about privacy concerns?"
        ]

        self.y_train = [
            "Our privacy policy is detailed in the 'Privacy Policy' section of our website.",
            "We use encryption and other security measures to protect your personal data.",
            "To request data deletion, contact our support team with your request.",
            "In case of a data breach, we will notify you and take necessary actions to mitigate the issue.",
            "We collect information necessary to provide and improve our services, such as your contact details and usage data.",
            "We do not share your data with third parties without your consent, except where required by law.",
            "Update your privacy settings in the 'Account Settings' section of your account.",
            "Data retention practices are outlined in our privacy policy, detailing how long we keep your data.",
            "Access your personal data by contacting our support team or through your account settings.",
            "For privacy concerns, contact us through the 'Contact Us' section or directly via our support email."
        ]

        self.vectorizer = CountVectorizer()
        self.X_train_counts = self.vectorizer.fit_transform(self.X_train)
        self.clf = MultinomialNB().fit(self.X_train_counts, self.y_train)
        self.last_suggestions = {}

    def predict(self, text):
        text_counts = self.vectorizer.transform([text])
        prediction = self.clf.predict(text_counts)
        return prediction[0]



bot_customer_service = ChatbotModelCustomerService()
print(bot_customer_service.predict("How do I file a complaint"))

bot_account = ChatbotModelAccount()
print(bot_account.predict("How do I reset my password"))

# Example usage
bot = ChatbotModelOrder()
print(bot.predict("How do I cancel my order"))
print(bot.predict("1"))

bot_product = ChatbotModelProduct()
print(bot_product.predict("What are the best-selling products"))

bot_privacy = ChatbotModelPrivacy()
print(bot_privacy.predict("How do you protect my personal data"))


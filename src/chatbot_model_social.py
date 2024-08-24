from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.naive_bayes import MultinomialNB
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity
import random

class ChatbotModelSocial:
    def __init__(self):
        self.X_train = [
            "Hi there!", "How are you?", "Tell me a joke.", "What's your name?", "What can you do?",
            "What's the weather like?", "Do you like music?", "Can you dance?", "Do you have any hobbies?",
            "Tell me a fun fact.", "What is your favorite color?", "How old are you?",
            "Where are you from?", "What's your favorite movie?", "Do you like books?",
            "What languages do you speak?", "Can you sing?", "Tell me something interesting.",
            "What's your favorite food?", "What is your purpose?", "Can you help me with something?",
            "What do you think about AI?", "What's your favorite animal?", "Do you play games?",
            "How's your day?", "Can you recommend a good book?", "Do you have any pets?",
            "What do you do for fun?", "What's your favorite season?", "Do you watch TV?",
            "What’s your favorite hobby?", "How do you spend your weekends?", "What are your goals?",
            "Do you have any favorite quotes?", "What’s the best advice you’ve ever received?",
            "Can you tell me about your creator?", "What’s the latest news?", "What’s your favorite sport?",
            "Can you give me a recipe?", "What’s your favorite holiday?", "Do you like traveling?",
            "What’s the best movie you’ve seen recently?", "What’s your favorite song?", "Do you like to cook?",
            "What’s your favorite place to visit?", "Can you give me a random fact?",
            "What’s your favorite ice cream flavor?", "Do you have a favorite book?",
            "What’s your favorite type of food?", "Do you have any favorite games?",
            "hello", "Hello"
        ]

        self.y_train = [
            "Hello! How can I help you today?", "I'm just a bot, but I'm here to assist you!",
            "Why don't scientists trust atoms? Because they make up everything!",
            "I am your friendly chatbot.", "I can assist you with various tasks.",
            "I can't check the weather, but I hope it's nice wherever you are!",
            "I enjoy listening to any type of music you like!",
            "I don't dance, but I can help you find some great music to dance to!",
            "My hobby is helping people with their questions.", "Did you know? Honey never spoils!",
            "I like all colors equally!", "I'm ageless, just like the internet!",
            "I exist in the cloud, so I don't have a specific location.", "I enjoy all kinds of movies!",
            "Yes, I do enjoy books! Do you have a favorite?", "I can understand and process many languages.",
            "I don't have a singing voice, but I can help you find some great songs!",
            "Did you know that octopuses have three hearts?", "I don’t eat food, but I hear pizza is great!",
            "My purpose is to assist and provide information!", "Of course! What do you need help with?",
            "AI is fascinating! It can help with so many things.",
            "I like all animals, but cats are quite interesting!",
            "I don't play games, but I can suggest some great ones for you to try.", "I'm doing great, thank you!",
            "I’d recommend checking out 'To Kill a Mockingbird'.",
            "I don’t have pets, but I hear dogs and cats are wonderful!",
            "I enjoy helping people and learning new things.", "I love all seasons, but spring is quite refreshing!",
            "I don’t watch TV, but I can suggest some popular shows!", "I love reading about different hobbies!",
            "I spend my time assisting users like you.", "My goals are to continually improve and help users better.",
            "One of my favorite quotes is 'To be, or not to be, that is the question.'",
            "The best advice is to always stay curious!",
            "I was created by talented developers and engineers.",
            "I don’t have real-time news, but you can check the latest updates online.",
            "Soccer is quite popular! Do you have a favorite sport?", "I don't cook, but I can share recipes with you!",
            "Christmas is a lovely holiday! Do you have a favorite?",
            "Traveling is exciting! Do you have a dream destination?",
            "I haven't seen movies, but I can recommend some top-rated ones.",
            "Music is wonderful! What’s a song you like?",
            "I don’t cook, but I can find some great recipes for you.",
            "Paris is a beautiful city! Where would you like to go?",
            "Did you know? A group of flamingos is called a 'flamboyance'.", "Mint chocolate chip is a popular choice!",
            "I haven’t read books, but I can suggest some classics.",
            "Italian food is delicious! What’s your favorite?",
            "Board games and video games are fun! Do you have a favorite one?", "Hello can i help you", "Hi fen"
        ]

        self.vectorizer = TfidfVectorizer(stop_words='english', ngram_range=(1, 2))  # Added stop words and bigrams
        self.X_train_counts = self.vectorizer.fit_transform(self.X_train)
        self.clf = MultinomialNB().fit(self.X_train_counts, self.y_train)
        self.last_suggestions = {}

        self.default_responses = [
            "Hmm, I'm not sure I understand. Could you tell me more?",
            "That's interesting! Could you explain a bit more?",
            "I'm not sure about that. Maybe you can ask me something else?",
            "Let's keep chatting! What else would you like to know?",
            "Can you rephrase that? I want to make sure I understand."
        ]

    def predict(self, text, threshold=0.15):  # Lowered the threshold
        text_counts = self.vectorizer.transform([text])
        prediction_proba = self.clf.predict_proba(text_counts)
        max_proba = np.max(prediction_proba)

        if max_proba < threshold:
            return random.choice(self.default_responses)
        else:
            prediction = self.clf.predict(text_counts)
            return prediction[0]

# Example usage
bot = ChatbotModelSocial()
print(bot.predict("Can you tell me a joke?"))
print(bot.predict("What's your favorite color?"))
print(bot.predict("What do you think about life?"))

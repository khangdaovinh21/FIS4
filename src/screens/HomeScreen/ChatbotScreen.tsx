import React, { useState } from 'react';
import { View, TextInput, Button, Text, ScrollView, StyleSheet, TouchableOpacity, Image } from 'react-native';
import axios from 'axios';
import { StackScreenProps } from '@react-navigation/stack';
import images from '../../assets/images';

type RootStackParamList = {
    ChatbotScreen: undefined;
};

type Props = StackScreenProps<RootStackParamList>;

interface ChatMessage {
  sender: 'user' | 'bot';
  text: string;
}

const ChatbotScreen: React.FC<Props> = ({ navigation }) => {
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);

  const sendMessage = async () => {
    if (message.trim()) {
      setChatHistory(prev => [...prev, { sender: 'user', text: message }]);

      try {
        const response = await axios.post('http://10.0.2.2:5000/', { message });
        setChatHistory(prev => [...prev, { sender: 'bot', text: response.data.reply }]);
      } catch (error) {
        setChatHistory(prev => [...prev, { sender: 'bot', text: 'Error: Could not connect to the server' }]);
      }
      setMessage('');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
        <Image source={images.chatbot1} style={styles.iconbot} />
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.chatContainer}>
        {chatHistory.map((chat, index) => (
          <View key={index} style={chat.sender === 'user' ? styles.userMessage : styles.botMessage}>
            <Text>{chat.text}</Text>
          </View>
        ))}
      </ScrollView>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={message}
          onChangeText={setMessage}
          placeholder="Type a message..."
        />
         <TouchableOpacity style={styles.buttonsend} onPress={sendMessage}>
         <Image source={images.send2} style={styles.iconsend} />
         </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: "flex-end",
    justifyContent:"center",
    marginBottom: 10,
    height:100,
    backgroundColor:"#DDDDDD",
 
  },
  icon: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  chatContainer: {
    marginBottom: 10,
    paddingHorizontal:10,

  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#C0C0C0',
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
    maxWidth: '80%',
  },
  
  botMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#ECECEC',
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
    maxWidth: '80%',
    
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal:10,
    marginBottom: 10,

  },
  input: {
    borderColor: 'gray',
    borderRadius: 10,
    padding: 10,
    marginRight: 10,
    width:"90%",
    backgroundColor:"#DDDDDD"
  },
  iconbot:{
    width:55,
    height:55,
    marginBottom:15,

  },
  buttonsend:{
    
  },
  buttonText: {
    color: 'black',
    fontSize: 16,
  },
  iconsend:{
    width:25,
    height:25,
  }
});

export default ChatbotScreen;

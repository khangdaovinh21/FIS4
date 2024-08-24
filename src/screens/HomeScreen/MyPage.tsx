import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Modal, TextInput, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import images from '../../assets/images';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../types';
import { launchImageLibrary } from 'react-native-image-picker';
import { useOrders } from './context/OrderContext'; 

type Props = StackScreenProps<RootStackParamList, 'MyPage'>;

const MyPage: React.FC<Props> = ({ navigation }) => {
  const [name, setName] = useState<string | null>(null);
  const [avatar, setAvatar] = useState<string | null>(null);
  const [coverImage, setCoverImage] = useState<string | null>(null); 
  const [address, setAddress] = useState<string | null>(null);
  const [phoneNumber, setPhoneNumber] = useState<string | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const { orders } = useOrders(); 
  const activeOrderCount = orders.length; 

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const savedName = await AsyncStorage.getItem('name');
        const savedAvatar = await AsyncStorage.getItem('avatar');
        const savedCoverImage = await AsyncStorage.getItem('coverImage'); 
        const savedAddress = await AsyncStorage.getItem('address');
        const savedPhoneNumber = await AsyncStorage.getItem('phoneNumber');

        if (savedName) setName(savedName);
        if (savedAvatar) setAvatar(savedAvatar);
        if (savedCoverImage) setCoverImage(savedCoverImage); 
        if (savedAddress) setAddress(savedAddress);
        if (savedPhoneNumber) setPhoneNumber(savedPhoneNumber);
      } catch (error) {
        console.error('Error retrieving user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const saveUserData = async () => {
    try {
      if (name) await AsyncStorage.setItem('name', name);
      if (avatar) await AsyncStorage.setItem('avatar', avatar);
      if (coverImage) await AsyncStorage.setItem('coverImage', coverImage);
      if (address) await AsyncStorage.setItem('address', address);
      if (phoneNumber) await AsyncStorage.setItem('phoneNumber', phoneNumber);
    } catch (error) {
      console.error('Error saving user data:', error);
    }
  };

  const openModal = () => {
    setIsModalVisible(true);
  };

  const closeModal = () => {
    saveUserData();
    setIsModalVisible(false);
  };

  const handleAvatarPress = () => {
    launchImageLibrary({ mediaType: 'photo' }, (response) => {
      if (response.assets && response.assets.length > 0) {
        const selectedImage = response.assets[0].uri;
        setAvatar(selectedImage ?? null);
      }
    });
  };

  const handleCoverImagePress = () => { 
    launchImageLibrary({ mediaType: 'photo' }, (response) => {
      if (response.assets && response.assets.length > 0) {
        const selectedImage = response.assets[0].uri;
        setCoverImage(selectedImage ?? null);
      }
    });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleCoverImagePress}> 
        {coverImage ? (
          <Image source={{ uri: coverImage }} style={styles.coverImage} />
        ) : (
          <View style={styles.placeholderCoverImage} />
        )}
      </TouchableOpacity>
      <View style={styles.groupIconText}>

        <TouchableOpacity onPress={() => navigation.navigate('ChatbotScreen')}>
          <Image source={images.chatbot} style={styles.iconbot} />
        </TouchableOpacity>

        <TouchableOpacity onPress={openModal}>
          <Image source={images.penprofile} style={styles.icon} />
          {activeOrderCount > 0 && ( 
            <View style={styles.badgeContainer}>
              <Text style={styles.badgeText}>{activeOrderCount}</Text>
            </View>
          )}
        </TouchableOpacity>

      </View>
      <View style={styles.profileSection}>
        <TouchableOpacity onPress={handleAvatarPress}>
          {avatar ? (
            <Image source={{ uri: avatar }} style={styles.avatar} />
          ) : (
            <View style={styles.placeholderAvatar} />
          )}
        </TouchableOpacity>
        <Text style={styles.name}>{name || 'Name not provided'}</Text>

        <View style={styles.contactInfoGroup}>
          <Image source={images.phone} style={styles.icon1} />
          <Text style={styles.phoneNumber}>{phoneNumber || 'Not provided'}</Text>
        </View>
        <View style={styles.contactInfoGroup1}>
          <Image source={images.address} style={styles.icon1} />
          <Text
            style={styles.address}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {address || 'Address not provided'}
          </Text>
        </View>

        <View style={styles.gruopicon}>
          <Image source={images.order} style={styles.icon2} />
          <Image source={images.box} style={styles.icon2} />
          <Image source={images.truck} style={styles.icon2} />
          <Image source={images.rating} style={styles.icon2} />
        </View>
      </View>

      <View style={styles.gruoppaypal}>
        <Image source={images.paypal} style={styles.icon3} />
        <Text style={styles.text2}>Paypal</Text>
        <Image source={images.icon} style={styles.icon3} />
      </View>
      <View style={styles.gruoppaypal}>
        <Image source={images.momo} style={styles.icon3} />
        <Text style={styles.text2}>Momo</Text>
        <Image source={images.icon} style={styles.icon3} />
      </View>

      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="slide"
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Edit Profile</Text>
            <TextInput
              style={styles.input}
              placeholder="Name"
              value={name || ''}
              onChangeText={setName}
            />
            <TextInput
              style={styles.input}
              placeholder="Avatar URL"
              value={avatar || ''}
              onChangeText={setAvatar}
            />
            <TextInput
              style={styles.input}
              placeholder="Cover Image URL"
              value={coverImage || ''}
              onChangeText={setCoverImage}
            />
            <TextInput
              style={styles.input}
              placeholder="Address"
              value={address || ''}
              onChangeText={setAddress}
            />
            <TextInput
              style={styles.input}
              placeholder="Phone Number"
              value={phoneNumber || ''}
              onChangeText={setPhoneNumber}
            />
            <TouchableOpacity style={styles.button} onPress={closeModal}>
              <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};
const screenHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  groupIconText: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: "space-between",
    height: 110,
    paddingVertical: 25,
    paddingHorizontal:15,
  },
  icon: {
    width: 24,
    height: 24, 

  },
  text: {
    fontSize: 19,
    fontWeight: 'bold',
    color: 'black',
    paddingLeft: 155,
  },
  profileSection: {
    alignItems: 'center',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 15,
    marginTop:90,
  },
  placeholderAvatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#ccc',
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 50,
    color:"#363636"
  },
  label: {
    fontSize: 15,
    marginBottom: 10,
    width:120,
  },
  phoneNumber: {
    fontSize: 14,
    color:"black"
  },
  address: {
    fontSize: 14,
    width:250,
    color:"black"
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    height:400,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 15,
    paddingLeft: 10,
    borderRadius:10,
    
  },
  button: {
    width: 200,
    borderRadius: 10,
    borderColor: '#ccc',
    backgroundColor: '#DCDCDC',
    paddingVertical: 10,
    alignItems: 'center',

  },
  buttonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
  contactInfoGroup:{
    flexDirection:"row",
    width:"90%",
    marginBottom:15,
    },
  contactInfoGroup1:{
    marginHorizontal:15,
    flexDirection:"row",
    width:"90%"
  },
  coverImage: {
    width: '100%',
    height: screenHeight / 3,  
    position:"absolute",
    borderBottomRightRadius:150,
    borderBottomLeftRadius:150,
  },
  placeholderCoverImage: {
    width: '100%',
    height: screenHeight / 3,
    backgroundColor: '#ccc',
    marginBottom: 20,
  },
  icon1:{
    width:20,
    height:20,
    marginRight:10,
  },
  icon2:{
    width:25,
    height:25,
  },
  gruopicon:{
    flexDirection:"row",
    width:"100%",
    height:100,
    justifyContent:"space-around",
    alignItems:"center",
    borderTopWidth:15,
    borderBottomWidth:15,
    borderColor:"#F0F0F0",
    marginTop:20,
  },
  gruoppaypal:{
    flexDirection:"row",
    justifyContent:"space-between",
    height:50,
    alignItems:"center",
    borderBottomWidth:2,
    borderColor:"#F0F0F0",

  },
  icon3:{
    width:24,
    height:24,
    marginHorizontal:20,
  },
  text2:{
    fontSize:12,
    color:"black",
    marginRight:230,
  },
  iconbot:{
    width:25,
    height:25,
  },
  badgeContainer: {
    position: 'absolute',
    right: 110,
    top: 440,
    backgroundColor: 'red',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default MyPage;

import React, { useState } from 'react';
import { View, Text, ScrollView, Image, StyleSheet, TouchableOpacity, StatusBar, FlatList, ListRenderItem } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import GroupBigText from './components/GroupBigText';
import GroupText from './components/GroupText';
import GroupText2 from './components/GroupText2';
import GroupBigImage from './components/GroupBigImage';
import { RootStackParamList } from '../../types';
import Modal from 'react-native-modal';

interface Review {
  id: string;
  name: string;
  date: string;
  hashtags: string[];
  review: string;
}

const reviews: Review[] = [
  {
    id: '1',
    name: 'Nguyen Van A',
    date: '2023-07-01',
    hashtags: ['Delicious', 'Fresh', 'Good packaging', 'Full stomach', 'Worth it'],
    review: 'The food was absolutely fantastic! I loved every bite of it.',
  },
  {
    id: '2',
    name: 'Nguyen Van B',
    date: '2023-07-02',
    hashtags: ['Yummy', 'Fresh ingredients', 'Well packed', 'Satisfying', 'Value for money'],
    review: 'Great experience! The food was fresh and well packed.',
  },
  {
    id: '3',
    name: 'Nguyen Van C',
    date: '2023-07-03',
    hashtags: ['Tasty', 'Fresh', 'Nicely packed', 'Filling', 'Affordable'],
    review: 'I enjoyed the food a lot. It was tasty and filling.',
  },
];

const StoreFood: React.FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const renderItem: ListRenderItem<Review> = ({ item }) => (
    <View style={styles.reviewItem}>
       <View style={styles.reviewItem1}>

      <Text style={styles.reviewerName}>{item.name}</Text>
      <Text style={styles.reviewDate}>{item.date}</Text>
      </View>
      <View style={styles.hashtagsContainer}>
        {item.hashtags.map((hashtag, index) => (
          <Text key={index} style={styles.hashtag}>
            {hashtag}
          </Text>
        ))}
      </View>
      <Text style={styles.reviewText}>{item.review}</Text>
    </View>
  );

  return (
    <View style={{ flex: 1 }}>
      <StatusBar barStyle={isModalVisible ? "dark-content" : "light-content"} backgroundColor={isModalVisible ? "rgba(0, 0, 0, 0.8)" : "transparent"} />
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.imageContainer}>
          <Image source={require('../../assets/storefood/hotpot.jpg')} style={styles.image} />
          <Image source={require('../../assets/storefood/frame.png')} style={styles.image1} />
        </View>
        <View style={styles.iconsContainer}>
          <TouchableOpacity onPress={() => navigation.navigate('Homescreen')}>
            <Image source={require('../../assets/storefood/icon1.png')} style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('SecondScreen')}>
            <Image source={require('../../assets/storefood/icon2.png')} style={styles.icon} />
          </TouchableOpacity>
        </View>
        <View style={styles.bigtextcontainer}>
          <GroupBigText />
          <View style={styles.separator} />
          <GroupText onSeeReviewPress={toggleModal} />
          <View style={styles.separator} />
          <GroupText2 />
        </View>
        <View style={styles.justtextcontainer}>
          <Text style={styles.justtext}>Just for you</Text>
        </View>
        <GroupBigImage />
      </ScrollView>

      <Modal
        isVisible={isModalVisible}
        onBackdropPress={toggleModal}
        style={styles.bottomModal}
        coverScreen={true}
      >
        <View style={styles.modalContent}>
          <View style={styles.iconsContainermodal}>
            <TouchableOpacity onPress={toggleModal}>
              <Image source={require('../../assets/storefood/close1.png')} style={styles.icon2} />
            </TouchableOpacity>
            <Text style={styles.textmodal}>Review</Text>
          </View>
          <View style={styles.bigratingmaingroup}>
            <View style={styles.ratingmaingroup}>
              <Image source={require('../../assets/storefood/Star.png')} style={styles.icon2} />
              <Text style={styles.modalTitle}>4.2</Text>
              <Text style={styles.reviewText}>999+</Text>
            </View>
            <View style={styles.ratingmaingroup1}>
              <Text style={styles.reviewText1}>Delicious 100</Text>
              <Text style={styles.reviewText1}>Fresh 200</Text>
              <Text style={styles.reviewText}>Good packaging</Text>
              <Text style={styles.reviewText}>Full stomach</Text>
              <Text style={styles.reviewText}>Worth it</Text>
            </View>
          </View>
          <FlatList
            data={reviews}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
          />
        </View>
      </Modal>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
  },
  bigtextcontainer: {
    height: 197,
    width: 248,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000000', 
    shadowOffset: { width: 0, height: 1 }, 
    shadowOpacity: 0.15,
    shadowRadius: 3, 
    elevation: 5, 
    borderRadius:10,
    position:"absolute",
    top:240,
    left:30,
  },
  ratingmaingroup:{
    width:120,
    alignItems:"center",

  },
  ratingmaingroup1:{
    marginLeft:20,


  },
  bigratingmaingroup:{
    flexDirection:"row",

  },
  icon2: {
    width: 24,
    height: 24,
},
  
  justtextcontainer:{
    width:93,
    height:24,
    marginTop:170,
    marginLeft:20,
  },
  justtext:{
    fontSize:16,
    fontWeight:"bold",
    color:"black",
  },
  separator: {
    height: 1, 
    backgroundColor: '#E6E1E5', 
    marginVertical: 10, 
    marginHorizontal:10,    
  },

  imageContainer: {
    marginBottom: 20,
    backgroundColor:"green",
    alignItems:"flex-end"
  },
  image: {
    width: "100%",
    height: 280,
    resizeMode: 'cover',
  },
  image1: {
    width: 32,
    height: 32,
    resizeMode: 'cover',
    position:"absolute",
    bottom:10,
    right:10,
  },
  iconsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    position:"absolute",
    paddingHorizontal:10,
    top:30,
  },
  iconsContainermodal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom:20,

  },
  textmodal:{
    fontSize:20,
    fontWeight:"bold",
    color:"black",
    marginRight:140,
  },
  icon: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
  icon1: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
  bottomModal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    height: '100%',
  },
  modalTitle: {
    fontSize: 23,
    fontWeight: 'bold',
    marginBottom: 10,
    color:"black"
  },
  reviewText: {
    fontSize: 16,
    marginVertical:10,
    color:"black"
  },
  reviewText1: {
    fontSize: 13,
    marginBottom: 10,
    color:"black"
  },
  closeButton: {
    fontSize: 16,
    color: '#FEBD2F',
    textAlign: 'center',
    marginTop: 10,
  },
  reviewItem: {
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingVertical: 10,
  },
  reviewItem1: {
    flexDirection:"row",
    paddingVertical: 10,
    paddingBottom:20,
    alignItems:"center",
  },
  reviewerName: {
    fontSize: 16,
    fontWeight: 'bold',
    color:"black"
  },
  reviewDate: {
    fontSize: 13,
    color: '#666',
    paddingHorizontal:10,
  },
  hashtagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 5,
  },
  hashtag: {
    backgroundColor: '#eee',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginRight: 10,
    marginBottom: 10,
    fontSize: 13,
    color:"black"
  },
  
  
});

export default StoreFood;

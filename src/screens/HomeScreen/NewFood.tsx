import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, StatusBar, FlatList, Modal } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../../types';

const categories = ['All', 'Noodles', 'Fast food', 'Drink', 'Rice - Sticky rice', 'Other food', 'Desert', 'Traditional food'];
const sortOptions = [
  { id: 'recommended', title: 'Recommended', icon: require('../../assets/home/recommended.png') },
  { id: 'aroundYou', title: 'Around you', icon: require('../../assets/home/aroundyou.png') },
  { id: 'review', title: 'Review', icon: require('../../assets/home/review.png') },
];

const data = [
  { id: '1', title: 'Mc Donald ', image: require('../../assets/home/mac.jpg'), text: '4.2 (200+)', icon: require('../../assets/home/star.png'), category: 'Fast food' },
  { id: '2', title: 'Jollibee Chicken', image: require('../../assets/home/jollibee.jpg'), text: '4.2 (200+)', icon: require('../../assets/home/star.png'), category: 'Fast food' },
  { id: '3', title: 'KFC Chicken', image: require('../../assets/home/kfc1.jpg'), text: '4.2 (200+)', icon: require('../../assets/home/star.png'), category: 'Fast food' },
  { id: '4', title: 'Burger King', image: require('../../assets/home/burger.jpg'), text: '4.2 (200+)', icon: require('../../assets/home/star.png'), category: 'Fast food' },
  { id: '5', title: 'Starbuck', image: require('../../assets/home/starbucks.jpg'), text: '4.2 (200+)', icon: require('../../assets/home/star.png'), category: 'Drink' },
  { id: '6', title: 'Highland Coffee', image: require('../../assets/home/highlands.jpg'), text: '4.2 (200+)', icon: require('../../assets/home/star.png'), category: 'Drink' },
  { id: '7', title: 'VietNam Noodles', image: require('../../assets/home/mi2.jpg'), text: '4.2 (200+)', icon: require('../../assets/home/star.png'), category: 'Noodles' },
  { id: '8', title: 'Ramen', image: require('../../assets/home/mi.jpg'), text: '4.2 (200+)', icon: require('../../assets/home/star.png'), category: 'Noodles' },
  { id: '9', title: 'Com Tam Sai Gon', image: require('../../assets/home/comtam.jpg'), text: '4.2 (200+)', icon: require('../../assets/home/star.png'), category: 'Rice - Sticky rice' },
  { id: '10', title: 'Goreng Rice', image: require('../../assets/home/goreng.jpg'), text: '4.2 (200+)', icon: require('../../assets/home/star.png'), category: 'Rice - Sticky rice' },
  { id: '11', title: 'Combo 1', image: require('../../assets/home/ga1.jpg'), text: '4.2 (200+)', icon: require('../../assets/home/star.png'), category: 'Desert' },
  { id: '12', title: 'Combo 2', image: require('../../assets/home/sushi.jpg'), text: '4.2 (200+)', icon: require('../../assets/home/star.png'), category: 'Desert' },
];

const NewFood: React.FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [selectedCategories, setSelectedCategories] = useState<string[]>(['All']);
  const [modalVisible, setModalVisible] = useState(false);
  const [sortModalVisible, setSortModalVisible] = useState(false);
  const [filteredData, setFilteredData] = useState(data);
  const [selectedSortOption, setSelectedSortOption] = useState<string | null>(null);

  const handleImagePress = (id: string) => {
    console.log(`Pressed item with id: ${id}`);
  };

  const renderSeparator = () => (
    <View style={styles.separator} />
  );

  const filterData = () => {
    const filtered = selectedCategories.includes('All') ? data : data.filter(item => selectedCategories.includes(item.category));
    setFilteredData(filtered);
  };

  const handleApply = () => {
    filterData();
    setModalVisible(false);
  };

  const handleRefresh = () => {
    setSelectedCategories(['All']);
    setFilteredData(data);
  };

  const handleCategoryPress = (category: string) => {
    if (category === 'All') {
      setSelectedCategories(['All']);
    } else {
      setSelectedCategories(prevSelected => {
        if (prevSelected.includes(category)) {
          const newSelected = prevSelected.filter(cat => cat !== category);
          return newSelected.length === 0 ? ['All'] : newSelected;
        } else {
          return prevSelected.filter(cat => cat !== 'All').concat(category);
        }
      });
    }
  };

  const handleSortOptionPress = (option: string) => {
    setSelectedSortOption(option);
    setSortModalVisible(false);
    console.log(`Selected sort option: ${option}`);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <View style={styles.groupIconText}>
        <TouchableOpacity onPress={() => navigation.navigate('Homescreen')}>
          <Image source={require('../../assets/storefood1/icon1.png')} style={styles.icon4} />
        </TouchableOpacity>
        <Text style={styles.text}>New food</Text>
      </View>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.button1} onPress={() => setSortModalVisible(true)}>
          <Image source={require('../../assets/storefood1/arrow.png')} style={styles.icon} />
          <Text style={styles.buttonText}>Sort by</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => setModalVisible(true)}>
          <Image source={require('../../assets/storefood1/dis.png')} style={styles.icon1} />
          <Text style={styles.buttonText}>Dishes</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Promotion</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={filteredData}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            <TouchableOpacity onPress={() => handleImagePress(item.id)}>
              <Image source={item.image} style={styles.itemImage} />
            </TouchableOpacity>
            <View style={styles.itemContent}>
              <TouchableOpacity onPress={() => handleImagePress(item.id)}>
                <Text style={styles.itemTitle}>{item.title}</Text>
              </TouchableOpacity>
              <View style={styles.textWithIcon}>
                <Image source={item.icon} style={styles.iconSmall} />
                <Text style={styles.itemText}>{item.text}</Text>
              </View>
            </View>
          </View>
        )}
        ItemSeparatorComponent={renderSeparator}
      />

      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <StatusBar barStyle="light-content" backgroundColor="rgba(0, 0, 0, 0.5)" />
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeButton}>
              <Image source={require('../../assets/storefood/close1.png')} style={styles.closeIcon} />
              <Text style={styles.text3}>Dishes</Text>
            </TouchableOpacity>
            {categories.map(category => (
              <TouchableOpacity
                key={category}
                onPress={() => handleCategoryPress(category)}
                style={styles.modalButton}
              >
                <Text style={styles.modalButtonText}>{category}</Text>
                <View style={[styles.checkbox, selectedCategories.includes(category) && styles.checkedCheckbox]} />
              </TouchableOpacity>
            ))}
            <View style={styles.modalFooter}>
              <TouchableOpacity onPress={handleApply} style={styles.applyButton}>
                <Text style={styles.applyButtonText}>Apply</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleRefresh} style={styles.refreshButton}>
                <Text style={styles.refreshButtonText}>Refresh</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <Modal
        visible={sortModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setSortModalVisible(false)}
      >
        <StatusBar barStyle="light-content" backgroundColor="rgba(0, 0, 0, 0.5)" />
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity onPress={() => setSortModalVisible(false)} style={styles.closeButton}>
              <Image source={require('../../assets/storefood/close1.png')} style={styles.closeIcon} />
              <Text style={styles.text3}>Sort by</Text>
            </TouchableOpacity>
            {sortOptions.map(option => (
              <TouchableOpacity
                key={option.id}
                onPress={() => handleSortOptionPress(option.id)}
                style={styles.modalButton}
              >
                <Image source={option.icon} style={styles.sortIcon} />
                 <View style={styles.containersorttext} >
                <Text style={styles.modalButtonText}>{option.title}</Text>
                </View> 
                <View style={[styles.radio, selectedSortOption === option.id && styles.checkedRadio]} />
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  buttonsContainer: {
    flexDirection: 'row',
    alignItems:"center",
    height:80,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical:8,
    paddingHorizontal:12,
    borderRadius: 10,
    backgroundColor: '#f0f0f0',
    marginHorizontal:10,

  },
  button1: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical:8,
    paddingHorizontal:12,
    borderRadius: 10,
    backgroundColor: '#FFEFD5',
    marginHorizontal:10,

  },
  icon: {
    width: 20,
    height: 20,
  },
  icon1: {
    width: 20,
    height: 20,
    marginRight:5,
  },
  buttonText: {
    fontSize: 16,
    color: '#333',
  },
  listItem: {
    backgroundColor: 'white',
    alignItems: "flex-start",
    marginHorizontal:10,
    borderRadius:10,
    flexDirection:"row",
  },
  itemImage: {
    width: 140,
    height: 140,
    resizeMode: 'cover',
    borderRadius:10,
  },
  itemContent: {
    marginLeft:10,
  },
  itemTitle: {
    fontSize: 16,
    marginBottom: 5,
    color:"black",
    width:170,
    height:112,
  },
  textWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    width:86,
    height:20,
  },
  iconSmall: {
    width: 20,
    height: 20,
    marginRight: 5,
  },
  itemText: {
    fontSize: 14,
    marginLeft: 5,
  },
  groupIconText: {
    flexDirection: 'row',
    alignItems: "flex-end",
    justifyContent:"space-between",
    height:90,
    paddingHorizontal:5,
  },

  icon4: {
    width: 24,
    height: 24,
    marginHorizontal: 10,
  },
  text: {
    fontSize: 19,
    fontWeight: 'bold',
    color:"black",
    marginRight:145,
  },
  separator: {
    height: 1,
    backgroundColor: '#ddd',
    marginVertical: 15,
    marginHorizontal:15,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    flex: 1,
  },
  closeButton: {
    alignSelf: 'flex-start',
  },
  closeIcon: {
    width: 24,
    height: 24,
  },
  modalButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  modalButtonText: {
    fontSize: 16,
    color:"black",
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: '#000',
  },
  checkedCheckbox: {
    backgroundColor: '#000',
  },
  modalFooter: {
    marginTop: 20,
  },
  applyButton: {
    paddingHorizontal:16,
    paddingVertical:12,
    backgroundColor: '#FEBD2F',
    borderRadius: 10,
    marginBottom:5,
    alignItems:"center",
  },
  applyButtonText: {
    color: 'black',
    fontWeight: 'bold',
  },
  refreshButton: {
    paddingHorizontal:16,
    paddingVertical:12,
    backgroundColor: 'white',
    borderRadius: 10,
    borderWidth:1,
    alignItems:"center",
  },
  refreshButtonText: {
    color: 'black',
    fontWeight: 'bold',
  },
  text3:{
    fontSize:16,
    fontWeight:"bold",
    color:"#484649",
    marginVertical:20,
  },
  radio: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 10,
  },
  checkedRadio: {
    backgroundColor: '#000',
  },
  sortIcon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  containersorttext:{
    width:110,
    marginRight:180,
  },
});

export default NewFood;

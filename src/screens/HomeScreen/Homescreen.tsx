import React, { useState } from 'react';
import { View, Text, ScrollView, Image, FlatList, StyleSheet, TextInput, TouchableOpacity, Modal, StatusBar } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../../types';
import Taskbar from './Taskbar';

const HomeScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [isModalVisible, setModalVisible] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const iconLink = require('../../assets/home/ArrowUpLeft.png');

  const data = [
    { id: '1', title: 'Vermicelli with shrimp paste', image: require('../../assets/home/hotpot3.jpg'), text: '4.2 (200+)', icon: require('../../assets/home/star.png') },
    { id: '2', title: 'Vermicelli with shrimp paste', image: require('../../assets/home/an.png'), text: '4.2 (200+)', icon: require('../../assets/home/star.png') },
    { id: '3', title: 'Vermicelli with shrimp paste', image: require('../../assets/home/mien.jpg'), text: '4.2 (200+)', icon: require('../../assets/home/star.png') },
    { id: '4', title: 'Vermicelli with shrimp paste', image: require('../../assets/home/mi2.jpg'), text: '4.2 (200+)', icon: require('../../assets/home/star.png') },
  ];

  const data2 = [
    { id: '1', title: 'Vermicelli with shrimp paste', image: require('../../assets/home/hotpot3.jpg'), text: '4.2 (200+)', icon: require('../../assets/home/star.png') },
    { id: '2', title: 'Vermicelli with shrimp paste', image: require('../../assets/home/an.png'), text: '4.2 (200+)', icon: require('../../assets/home/star.png') },
    { id: '3', title: 'Vermicelli with shrimp paste', image: require('../../assets/home/mien.jpg'), text: '4.2 (200+)', icon: require('../../assets/home/star.png') },
    { id: '4', title: 'Vermicelli with shrimp paste', image: require('../../assets/home/mi2.jpg'), text: '4.2 (200+)', icon: require('../../assets/home/star.png') },
  ];

  const imageArray = [
    { id: '1', image: require('../../assets/home/image1.png') },
    { id: '2', image: require('../../assets/home/image2.jpg') },
  ];

  const handleImagePress = (id: string) => {
    switch (id) {
      case '1':
        console.log(`Image with ID ${id} pressed`);
        navigation.navigate("storefood");
        break;
      case '2':
        console.log(`Image with ID ${id} pressed`);
        break;
      case '3':
        console.log(`Image with ID ${id} pressed`);
        break;
      case '4':
        console.log(`Image with ID ${id} pressed`);
        break;
      default:
        console.log(`Image with ID ${id} pressed`);
    }
  };

  const handleSearchTextChange = (text: string) => {
    setSearchText(text);
    if (text.length > 0) {
      setSuggestions(['kfc', 'macdonal', 'starbucks', 'burger', 'hot dog', 'fried chicken', 'pizza', 'french fries', 'onion rings', 'chicken nuggets', 'tacos', 'burritos', 'sandwich', 'cheeseburger', 'submarine sandwich', 'fish and chips', 'chicken tenders', 'mozzarella sticks', 'quesadilla', 'nachos', 'gyro', 'shawarma', 'falafel', 'chicken wings', 'soft pretzel', 'corn dog', 'sloppy joe', 'egg roll', 'fried shrimp', 'chicken sandwich', 'chili dog', 'wrap', 'meatball sub', 'BLT sandwich', 'philly cheesesteak', 'fajitas', 'calzone', 'stromboli', 'sausage roll', 'empanada', 'chicken caesar wrap', 'pulled pork sandwich', 'BBQ ribs', 'banh mi', 'popcorn chicken', 'chicken parmigiana sub', 'meat pie', 'samosa', 'chicken fried steak', 'club sandwich', 'roast beef sandwich', 'breakfast burrito', 'patty melt'].filter(s => s.toLowerCase().includes(text.toLowerCase())));
    } else {
      setSuggestions([]);
    }
  };

  const handleSearch = () => {
    if (searchText && !searchHistory.includes(searchText)) {
      setSearchHistory([searchText, ...searchHistory]);
    }
    setSearchText('');
    setModalVisible(false);
  };

  const handleClearHistory = () => {
    setSearchHistory([]);
  };

  const handleRemoveHistoryItem = (item: string) => {
    setSearchHistory(searchHistory.filter(history => history !== item));
  };

  const renderSeparator = () => (
    <View style={styles.separator} />
  );

  return (
    <View style={styles.mainContainer}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.section1}>
          <Text style={styles.heading1}>Explore</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.heading2}>Deliver to</Text>
          <View style={styles.smallgroup}>
            <Image source={require('../../assets/home/pin.png')} style={styles.imageInSection} />
            <Text style={styles.heading3}>81, Cach Mang Thang Tam, Ben Th...</Text>
            <Image source={require('../../assets/home/icon.png')} style={styles.imageInSection} />
          </View>
        </View>

        <View style={styles.searchContainer}>
          <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.searchInputTouchable}>
            <Image source={require('../../assets/home/search.png')} style={styles.searchIcon} />
            <Text style={styles.searchPlaceholderText}>Search for food, drink and more</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.iconGroup}>
          <TouchableOpacity onPress={() => navigation.navigate('NewFood')} >
            <Image source={require('../../assets/home/category.png')} style={styles.Icon} />
          </TouchableOpacity>
          <TouchableOpacity >
            <Image source={require('../../assets/home/Category3.png')} style={styles.Icon} />
          </TouchableOpacity>
          <TouchableOpacity >
            <Image source={require('../../assets/home/Category2.png')} style={styles.Icon1} />
          </TouchableOpacity>
          <TouchableOpacity >
            <Image source={require('../../assets/home/Category1.png')} style={styles.Icon} />
          </TouchableOpacity>
        </View>

        <View style={styles.iconGroup1}>
          <TouchableOpacity >
            <Image source={require('../../assets/home/category6.png')} style={styles.Icon2} />
          </TouchableOpacity>
          <TouchableOpacity >
            <Image source={require('../../assets/home/Category5.png')} style={styles.Icon3} />
          </TouchableOpacity>
        </View>

        <View style={styles.smallgroup1}>
          <Text style={styles.heading4}>Order now</Text>
          <Image source={require('../../assets/home/icon.png')} style={styles.imageInSection1} />
        </View>

        <FlatList
          horizontal={true}
          data={imageArray}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity >
              <Image source={item.image} style={styles.flatListImage} />
            </TouchableOpacity>
          )}
        />

        <View style={styles.smallgroup2}>
          <Text style={styles.heading5}>You are having 100 coupon codes</Text>
          <Image source={require('../../assets/home/icon.png')} style={styles.imageInSection} />
        </View>

        <View style={styles.smallgroup3}>
          <Text style={styles.heading6}>Recommend for you</Text>
          <Image source={require('../../assets/home/icon.png')} style={styles.imageInSection1} />
        </View>

        <FlatList
          horizontal={true}
          data={data2}
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
                  <Image source={item.icon} style={styles.icon} />
                  <Text style={styles.itemText}>{item.text}</Text>
                </View>
              </View>
            </View>
          )}
        />

        <View style={styles.smallgroup4}>
          <Text style={styles.heading7}>Around you</Text>
          <Image source={require('../../assets/home/icon.png')} style={styles.imageInSection1} />
        </View>

        <FlatList
          data={data}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <View style={styles.listItem1}>
              <TouchableOpacity onPress={() => handleImagePress(item.id)} >
                <Image source={item.image} style={styles.itemImage1} />
              </TouchableOpacity>
              <View style={styles.itemContent1}>
                <TouchableOpacity onPress={() => handleImagePress(item.id)} >
                  <Text style={styles.itemTitle1}>{item.title}</Text>
                </TouchableOpacity>
                <View style={styles.textWithIcon1}>
                  <Image source={item.icon} style={styles.icon1} />
                  <Text style={styles.itemText}>{item.text}</Text>
                </View>
              </View>
            </View>
          )}
          ItemSeparatorComponent={renderSeparator}
        />

        <Modal
          visible={isModalVisible}
          animationType="slide"
          transparent={false}
          onRequestClose={() => setModalVisible(false)}
        >
            <StatusBar barStyle="dark-content" backgroundColor="white" />
            <View style={styles.modalContainer}>
            <View style={styles.modalSearchContainer}>
              <Image source={require('../../assets/home/search.png')} style={styles.searchIconModal} />
              <TextInput
                style={styles.modalSearchInput}
                placeholder="Search for food, drink and more"
                value={searchText}
                onChangeText={handleSearchTextChange}
                onSubmitEditing={handleSearch}
              />
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>
            </View>
            {searchHistory.length > 0 && (
              <View style={styles.historyHeader}>
                <Text style={styles.historyHeaderText}>Recently searching</Text>
                <TouchableOpacity onPress={handleClearHistory} style={styles.clearButton}>
                  <Text style={styles.clearButtonText}>Delete</Text>
                </TouchableOpacity>
              </View>
            )}
            <View style={styles.hashtagsContainer}>
              {searchHistory.map((item) => (
                <View key={item} style={styles.historyItem}>
                  <TouchableOpacity onPress={() => setSearchText(item)}>
                    <Text style={styles.textss}>{item}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => handleRemoveHistoryItem(item)}>
                    <Image source={require('../../assets/home/close1.png')} style={styles.closeIcon} />
                  </TouchableOpacity>
                </View>
              ))}
            </View>
            {suggestions.length > 0 ? (
              <View style={styles.suggestionsContainer}>
                {suggestions.map((suggestion, index) => (
                  <View key={index} style={styles.suggestionItem}>
                    <Text style={styles.suggestionText}>{suggestion}</Text>
                    <Image source={iconLink} style={styles.iconSuggestion} />
                  </View>
                ))}
              </View>
            ) : searchText.length > 0 && (
              <View style={styles.noResultContainer}>
                <Text style={styles.noResultText1}>No result.</Text>
                <Text style={styles.noResultText}>Please search again.</Text>
              </View>
            )}
          </View>
        </Modal>
      </ScrollView>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingVertical: 20,
    paddingHorizontal: 10,
    backgroundColor:"white"
  },
  mainContainer: {
    flex: 1,
  },
  section: {
    marginBottom: 25,
  },
  section1: {
    marginTop:50,
    marginBottom: 25,
    alignItems: 'center',
  },
  heading1: {
    alignItems:"center",
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color:"black",
  },
  heading2: {
    fontSize: 15,
    marginBottom:10,
  },
  heading5: {
    fontSize: 13,
    color:"black",
  },
  heading6: {
    fontSize: 16,
    color:"black",
    fontWeight:"bold",
    width:170,
  },
  heading7: {
    fontSize: 16,
    color:"black",
    fontWeight:"bold",
    width:100,
  },
  heading3: {
    fontSize: 16,
    color:"#000000",
    width:270,

  },
  heading4: {
    fontSize: 16,
    fontWeight:"bold",
    color:"#000000",
    width:90,

  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'cover',
    marginBottom: 10,
  },
  listItem: {
    backgroundColor: 'white',
    marginBottom: 10,
    alignItems: 'center',
    marginHorizontal:10,
    borderRadius:10,
  },

  listItem1: {
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
    marginBottom: 10,
    borderRadius:10,
  },
  itemImage1: {
    width: 140,
    height: 140,
    resizeMode: 'cover',
    borderRadius:10,
  },
  itemContent: {
    alignItems: "flex-start",
  },
  itemContent1: {
    marginLeft:10,
  },
  itemTitle: {
    fontSize: 16,
    marginBottom: 5,
    color:"black",
    width:140,
    height:48,
  },
  itemTitle1: {
    fontSize: 16,
    marginBottom: 5,
    color:"black",
    width:170,
    height:112,

  },
  itemText: {
    fontSize: 14,
    marginLeft: 5,
  },
  textWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    width:86,
    height:20,
    
  },
  textWithIcon1: {
    flexDirection: 'row',
    alignItems: 'center',
    width:86,
    height:20,
  },
  icon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  icon1: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  imageInSection:{
    height:24,
    width:24,
  },
  imageInSection1:{
    height:16,
    width:16,
  },
  smallgroup:{
    width:"100%",
    height:25,
    flexDirection:"row",
    justifyContent:"space-around",
  },
  smallgroup1:{
    width:"100%",
    height:25,
    flexDirection:"row",
    alignItems:"center",
    justifyContent:"flex-start",
    marginBottom:20,
    marginTop:40,
  },
  smallgroup2:{
    width:"100%",
    height:48,
    flexDirection:"row",
    justifyContent:"space-between",
    alignItems:"center",
    backgroundColor:"#FFEFD5",
    marginVertical:20,
  },
  smallgroup3:{
    width:"100%",
    height:25,
    flexDirection:"row",
    alignItems:"center",
    justifyContent:"flex-start",
    marginBottom:10,
  },
  smallgroup4:{
    width:"100%",
    height:25,
    flexDirection:"row",
    alignItems:"center",
    justifyContent:"flex-start",
    marginBottom:10,
  },

  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 20,
    backgroundColor:"#F2F2F2",

  },
  searchIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: 48,
  },
  iconGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  Icon: {
    width: 60,
    height: 48,
  },
  Icon1: {
    width: 79,
    height: 48,
  },
  Icon2: {
    width: 46,
    height: 48,
  },
  Icon3: {
    width: 40,
    height: 48,
  },
  iconGroup1:{
    flexDirection: 'row',
    justifyContent:"space-between",
    width:"40%"
  },
  flatListImage: {
    width: 307,
    height: 149,
    marginRight: 16,
    borderRadius:10,
    marginHorizontal:10,
  },
  separator: {
    height: 1,
    backgroundColor: '#ddd',
    marginVertical: 15,
    marginHorizontal:15,
  },
  searchInputTouchable: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    padding: 10,
  },
  searchPlaceholderText: {
    color: '#888',
    marginLeft: 10,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
    alignItems: 'center',
  },
  modalSearchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: 'gray',
  },
  modalSearchInput: {
    flex: 1,
    backgroundColor:"#F2F2F2",
    borderRadius: 10,
    paddingHorizontal: 35,
  },
  
  searchIconModal: {
    width: 24,
    height: 24,
    position:"absolute",
    zIndex:2,
    left:5,
    top:10,
  },
  cancelText: {
    color: 'blue',
    fontSize: 13,
    marginLeft:10,
  },
  historyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
    marginBottom: 10,
  },
  historyHeaderText: {
    fontSize: 13,  
  },
  hashtagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: "flex-start",
    marginTop: 10,
  },
  historyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e0e0e0',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    margin: 5,
  },
  textss: {
    marginRight: 10,
  },
  closeIcon: {
    width: 15,
    height: 15,
  },
  clearButton: {
    justifyContent: 'center',
  },
  clearButtonText: {
    color: 'black',
    fontSize: 13,
    fontWeight: 'bold',
  },
  suggestionsContainer: {
    width: '100%',
    position:"absolute",
    top:80,
    backgroundColor:"white"
  },
  suggestionItem: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginVertical: 5,
    flexDirection:"row",
    justifyContent:"space-between"
  },
  suggestionText: {
    fontSize: 14,
    color:"black"

  },
  taskbar: {
    flexDirection: 'row',
    justifyContent: "space-evenly",
    backgroundColor: 'white',
  },
  taskIcon: {
    
  },
  taskIconImage: {
    width: 75,
    height: 75,
    resizeMode: 'contain',

  },
  taskIconImage1: {
    width: 75,
    height: 60,
    resizeMode: 'cover',
  },
  iconSuggestion:{
    width:20,
    height:20,

  },
  noResultContainer: {
    height:340,
    width:"100%",
    backgroundColor:"white",
    alignItems:"center",
    justifyContent:"flex-end",
    position:"absolute",
    top:80,

  },
  noResultText: {
    fontSize: 18,
    color: 'gray',
  },
  noResultText1: {
    fontSize: 18,
    color: 'gray',
    fontWeight:"bold",
  },
  
});

export default HomeScreen;

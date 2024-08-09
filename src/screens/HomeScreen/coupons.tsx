import React, { useContext, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, FlatList, TextInput } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { CouponsContext } from './context/CouponsContext';
import { RootStackParamList } from '../../types';

interface Coupon {
    id: string;
    name: string;
    discount: number;
    image: any;
    description1: string;
    description2: string;
}

const Coupons = () => {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const { selectCoupon } = useContext(CouponsContext)!;
    const [searchText, setSearchText] = useState('');
    const [filteredCoupons, setFilteredCoupons] = useState<Coupon[]>([]);

    const coupons: Coupon[] = [
        { id: '1', name: 'Discount 10%', discount: 10, image: require('../../assets/coupons/voucher1.jpg'), description1: 'Apply for all order', description2: 'Expire date: 21/07/2024' },
        { id: '2', name: 'Discount 20%', discount: 20, image: require('../../assets/coupons/voucher3.png'), description1: 'Apply for all order', description2: 'Expire date: 21/07/2024' },
        { id: '3', name: 'Discount 50%', discount: 50, image: require('../../assets/coupons/voucher2.jpg'), description1: 'Apply for all order', description2: 'Expire date: 21/07/2024' },
        { id: '4', name: 'Free Shipping', discount: 0, image: require('../../assets/coupons/voucher4.jpg'), description1: 'Apply for all order', description2: 'Expire date: 21/07/2024' },
    ];

    const handleSelectCoupon = (coupon: Coupon) => {
        selectCoupon(coupon);
        navigation.goBack();
    };

    const handleLongPress = (coupon: Coupon) => {
        navigation.navigate('coupons2', { coupon });
    };

    const renderItem = ({ item }: { item: Coupon }) => (
        <TouchableOpacity 
            style={styles.itemContainer} 
            onPress={() => handleSelectCoupon(item)}
            onLongPress={() => handleLongPress(item)}
        >
            <Image source={item.image} style={styles.couponImage} />
            <View style={styles.textContainer}>
                <Text style={styles.couponName}>{item.name}</Text>
                <Text style={styles.couponDescription1}>{item.description1}</Text>
                <Text style={styles.couponDescription}>{item.description2}</Text>
            </View>
        </TouchableOpacity>
    );

    const handleSearch = () => {
        const filtered = coupons.filter(coupon =>
            coupon.name.toLowerCase().includes(searchText.toLowerCase())
        );
        setFilteredCoupons(filtered);
    };

    return (
        <View style={styles.container}>
            <View style={styles.groupIconText}>
                <TouchableOpacity onPress={() => navigation.navigate('storefood3')}>
                    <Image source={require('../../assets/storefood1/icon1.png')} style={styles.icon} />
                </TouchableOpacity>
                <Text style={styles.text}>Coupon List</Text>
            </View>
            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Coupon code"
                    value={searchText}
                    onChangeText={setSearchText}
                />
                <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
                    <Text style={styles.searchButtonText}>Add Code</Text>
                </TouchableOpacity>
            </View>
            <FlatList
                data={filteredCoupons.length > 0 ? filteredCoupons : coupons}
                renderItem={renderItem}
                keyExtractor={item => item.id}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        marginHorizontal:15,
    },
    couponImage: {
        width: 56,
        height: 56,
        marginRight: 10,
    },
    textContainer: {
        marginTop:10,
    },
    couponName: {
        fontSize: 18,
        fontWeight: 'bold',
        color:"black"
    },
    couponDescription: {
        fontSize: 14,
        color: '#939094',
        marginTop:10,
    },
    couponDescription1: {
        fontSize: 14,
        color: '#black',
    },
    groupIconText: {
        flexDirection: 'row',
        alignItems: "flex-end",
        justifyContent: 'space-between',
        height: 110,
        paddingHorizontal: 10,
        paddingVertical: 20,
    },
    text: {
        fontSize: 19,
        fontWeight: 'bold',
        color: 'black',
        marginRight: 130,
    },
    icon: {
        width: 24,
        height: 24,
        marginLeft: 10,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    searchInput: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        padding: 10,
        marginRight: 10,
        backgroundColor:"#E8E8E8",
        height:40,
    },
    searchButton: {
        backgroundColor: '#FEBD2F',
        paddingVertical: 9,
        paddingHorizontal: 15,
        borderRadius: 10,
    },
    searchButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default Coupons;

import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert, Image, StatusBar, ScrollView } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../../types';
import { CartContext } from './context/CartContext';

const predefinedReviews = [
    "Good packaging",
    "Fresh",
    "Delicious",
    "Full stomach",
    "Worth it"
];

const RatingScreen1 = () => {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const { clearCart } = useContext(CartContext)!;
    const [rating, setRating] = useState(0);
    const [review, setReview] = useState('');
    const [recommendation, setRecommendation] = useState<'like' | 'dislike' | null>(null);

    const submitRating = () => {
        Alert.alert("Thank you for your rating!", "Your review has been submitted.");
        clearCart();
        navigation.navigate('OngoingScreen');
    };

    const renderStar = (index: number) => (
        <TouchableOpacity key={index} onPress={() => setRating(index + 1)}>
            <Text style={[styles.star, { color: index < rating ? '#FFD700' : '#CCCCCC' }]}>★</Text>
        </TouchableOpacity>
    );

    const getRatingText = () => {
        switch (rating) {
            case 1:
                return "Poor";
            case 2:
                return "Fair";
            case 3:
                return "Good";
            case 4:
                return "Very Good";
            case 5:
                return "Excellent";
            default:
                return "";
        }
    };

    const addPredefinedReview = (predefinedReview: string) => {
        setReview(prevReview => prevReview ? `${prevReview} ${predefinedReview}` : predefinedReview);
    };

    return (
        <ScrollView contentContainerStyle={styles.scrollcontainer}>
            <StatusBar barStyle="light-content" backgroundColor="transparent" />
            <View style={styles.groupIconText}>
                <TouchableOpacity onPress={() => navigation.navigate('storefood1')}>
                    <Image source={require('../../assets/storefood1/icon1.png')} style={styles.icon1} />
                </TouchableOpacity>
                <Text style={styles.text}>Rate the store</Text>
            </View>
            <View style={styles.imagecontainer}>
                <Image source={require('../../assets/storefood/logo1.jpg')} style={styles.icon} />
                <Text style={styles.title1}>Store: Hadilao</Text>
            </View>

            <View style={styles.starsContainer}>
                {[...Array(5)].map((_, index) => renderStar(index))}
            </View>
            <View style={styles.ratingTextcontainer}>
                {rating > 0 && <Text style={styles.ratingText}>{getRatingText()}</Text>}
            </View>
            <View style={styles.containertitle1}>
                <Text style={styles.title}>Share your compliments</Text>
            </View>
            <View style={styles.predefinedReviewsContainer}>
                {predefinedReviews.map((predefinedReview, index) => (
                    <TouchableOpacity
                        key={index}
                        style={styles.predefinedReviewButton}
                        onPress={() => addPredefinedReview(predefinedReview)}
                    >
                        <Text style={styles.predefinedReviewText}>{predefinedReview}</Text>
                    </TouchableOpacity>
                ))}
            </View>
            <View style={styles.group1}>
                <TextInput
                    style={styles.textInput}
                    placeholder="Share your reviews here..."
                    value={review}
                    onChangeText={setReview}
                    multiline
                />
                <View style={styles.containertitle2}>
                    <Text style={styles.title4}>Do you recommend this?</Text>
                </View>
                <View style={styles.recommendationButtons}>
                <Image source={require('../../assets/storefood/hotpot3.png')} style={styles.icon} />
                <Text style={styles.title5}>Store: Hadilao</Text>
                    <View style={styles.recommendationButtons1} >
                    <TouchableOpacity
                        onPress={() => setRecommendation('like')}
                        style={[
                            styles.recommendationButton,
                            recommendation === 'like' && styles.selectedLikeButton
                        ]}
                    >
                        <Image
                            source={require('../../assets/storefood/Like.png')}
                            style={[
                                styles.recommendationImage,
                                recommendation === 'like' && styles.selectedLikeImage
                            ]}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => setRecommendation('dislike')}
                        style={[
                            styles.recommendationButton,
                            recommendation === 'dislike' && styles.selectedDislikeButton
                        ]}
                    >
                        <Image
                            source={require('../../assets/storefood/Dislike.png')}
                            style={[
                                styles.recommendationImage,
                                recommendation === 'dislike' && styles.selectedDislikeImage
                            ]}
                        />
                    </TouchableOpacity>
                    </View>
                </View>
                <TouchableOpacity style={styles.submitButton} onPress={submitRating}>
                    <Text style={styles.submitButtonText}>Submit</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    title: {
        fontSize: 17,
        fontWeight: 'bold',
        marginBottom: 20,
        color:"black",
    },
    title1:{
        fontSize: 15,
        fontWeight: 'bold',
        marginBottom: 20,
        color:"black",
        marginVertical:20,
    },
    containertitle1:{
        alignItems:"center",
        borderTopWidth:1,
        borderTopColor:"#E6E1E5",
        height:70,
        justifyContent:"flex-end",
        marginHorizontal:15,
    },
    containertitle2:{
        alignItems:"center",
        height:70,
    },
    scrollcontainer: {
        flexGrow: 1,
        backgroundColor: 'white',
    },
    starsContainer: {
        flexDirection: 'row',
        marginBottom: 10,
        justifyContent: "space-evenly",
    },
    star: {
        fontSize: 40,
        borderRadius:50,
    },
    icon:{
        width:110,
        height:90,   
    },
    icon2:{
        width:48,
        height:48,   
    },
    iconcontainer:{
        borderRadius:150,
        borderWidth:2,
        alignItems:"center",
        justifyContent:"center",
        width:200,
        height:200,
        borderColor:"#FEBD2F"    
    },
    textInput: {
        height: 134,
        borderColor: '#CCCCCC',
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        paddingHorizontal:20,
        textAlignVertical: 'top',
        marginBottom: 40,
        backgroundColor:"#F2F2F2",
    },
    submitButton: {
        backgroundColor: '#FEBD2F',
        padding: 15,
        borderRadius: 10,
        width: '100%',
        alignItems: 'center',
        marginBottom:10,
        marginTop:20,
    },
    submitButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    ratingText: {
        fontSize: 15,
        color: 'gray',
    },
    ratingTextcontainer:{
        marginBottom:20,
        alignItems:"center",
    },
    groupIconText: {
        flexDirection: 'row',
        alignItems: "flex-end",
        justifyContent: 'space-between',
        height: 110,
        paddingHorizontal: 10,
        paddingVertical: 20,
        marginBottom:10,
    },
    icon1: {
        width: 24,
        height: 24,
        marginLeft: 10,
    },
    text: {
        fontSize: 19,
        fontWeight: 'bold',
        color: 'black',
        marginRight: 115,
    },
    imagecontainer:{
        width:"100%",
        alignItems:"center"
    },
    group1:{
        marginHorizontal:15,
    },
    predefinedReviewsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: 40,
        paddingRight:30,
        paddingHorizontal:15,
    },
    predefinedReviewButton: {
        backgroundColor: '#f0f0f0',
        padding: 10,
        borderRadius: 10,
        margin: 5,
    },
        predefinedReviewText: {
            color: '#333',
        },
        title4:{
            fontSize:18,
            color:"black",
            fontWeight:"bold",

        },
        recommendationButtons: {
            flexDirection: 'row',
            justifyContent: "space-between",
            marginBottom: 20,
            
        },
        recommendationButtons1:{
            flexDirection: 'row',
            alignItems:"center"
        },

        recommendationButton: {
            borderColor: '#CCCCCC',
            borderWidth: 1,
            borderRadius: 10,
            backgroundColor: 'white',
            height:40,
            width:40,
            alignItems:"center",
            justifyContent:"center",
            
            
        },
        recommendationImage: {
            width: 30,
            height: 30,
        },
        selectedLikeButton: {
            borderColor: '#4CAF50',
            backgroundColor: '#E8F5E9',
            marginRight:10,
            
        },
        selectedDislikeButton: {
            borderColor: '#F44336',
            backgroundColor: '#FFEBEE',
            marginLeft:10,
        },
        selectedLikeImage: {
            tintColor: '#4CAF50',
        },
        selectedDislikeImage: {
            tintColor: '#F44336',
        },
        title5:{
            fontSize:15,
            color:"black",

        },

    });

    export default RatingScreen1;
    

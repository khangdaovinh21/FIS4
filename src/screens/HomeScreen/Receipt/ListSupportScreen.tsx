import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../../types';
import images from '../../../assets/images';

type ListSupportScreenNavigationProp = StackNavigationProp<RootStackParamList, 'ListSupportScreen'>;

const ListSupportScreen: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const navigation = useNavigation<ListSupportScreenNavigationProp>();

    const questions = [
        "Question 1",
        "Question 2",
        "Question 3",
        "Question 4",
        "Question 5"
    ];

    const handleSearch = (text: string) => {
        setSearchQuery(text);
    };

    const filteredQuestions = questions.filter(question => 
        question.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleQuestionPress = (question: string) => {
        navigation.navigate('QuestionDetailScreen', { question });
    };

    return (
        <View style={styles.container}>
            <View style={styles.groupIconText}>
                <TouchableOpacity onPress={() => navigation.navigate('OngoingScreen')}>
                    <Image source={images.icon1} style={styles.icon} />
                </TouchableOpacity>
                <Text style={styles.text}>Support</Text>
            </View>
            <View style={styles.searchContainer}>
                <Image source={images.search} style={styles.searchIcon} />
                <TextInput
                    style={styles.input}
                    placeholder="Search your issue"
                    value={searchQuery}
                    onChangeText={handleSearch}
                />
            </View>
            <Text style={styles.text1}>Frequently questions</Text>
            <FlatList
                data={filteredQuestions}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => handleQuestionPress(item)}>
                        <View style={styles.questionItem}>
                            <Text style={styles.questionText}>{item}</Text>
                            <Image source={images.icon} style={styles.icon} />
                        </View>
                    </TouchableOpacity>
                )}
                contentContainerStyle={styles.listContainer}
            />
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
        backgroundColor: '#fff',
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        borderRadius: 10,
        backgroundColor:"#F2F2F2",
        paddingHorizontal: 10,
        paddingVertical:5,
    },
    searchIcon: {
        width: 24,
        height: 24,
        marginRight: 10,
    },
    input: {
        flex: 1,
        height: 40,
        paddingHorizontal: 10,
    },
    questionItem: {
        paddingVertical:25,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        flexDirection:"row",
        justifyContent:"space-between",
    },
    questionText: {
        fontSize: 16,
        color: 'black',
    },
    listContainer: {
        paddingBottom: 20,
    },
    groupIconText: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        height: 110,
        paddingVertical: 20,
      },
      icon: {
        width: 24,
        height: 24,
      },
      text: {
        fontSize: 19,
        fontWeight: 'bold',
        color: 'black',
        marginRight: 140,
      },
      text1: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'black',
        marginRight: 140,
      },
});

export default ListSupportScreen;

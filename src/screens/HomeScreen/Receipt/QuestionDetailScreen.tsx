import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../types';
import images from '../../../assets/images';

type QuestionDetailScreenRouteProp = RouteProp<RootStackParamList, 'QuestionDetailScreen'>;
type QuestionDetailScreenNavigationProp = StackNavigationProp<RootStackParamList, 'QuestionDetailScreen'>;

type Props = {
    route: QuestionDetailScreenRouteProp;
    navigation: QuestionDetailScreenNavigationProp;
};

const QuestionDetailScreen: React.FC<Props> = ({ route, navigation }) => {
    const { question } = route.params;

    return (
        <View style={styles.container}>
            <View style={styles.groupIconText}>
                <TouchableOpacity onPress={() => navigation.navigate('ListSupportScreen')}>
                    <Image source={images.icon1} style={styles.icon} />
                </TouchableOpacity>
                <Text style={styles.text}>Support</Text>
            </View>
            <Text style={styles.questionText}>{question}</Text>
            <Text style={styles.answerText}>Aliqua id fugiat nostrud irure ex duis ea quis id quis ad et. Sunt qui esse pariatur duis deserunt mollit dolore cillum minim tempor enim. Elit aute irure tempor cupidatat incididunt sint deserunt ut voluptate aute id deserunt nisi.</Text>
            <Text style={styles.answerText}>Aliqua id fugiat nostrud irure ex duis ea quis id quis ad et. Sunt qui esse pariatur duis deserunt mollit dolore cillum minim tempor enim. Elit aute irure tempor cupidatat incididunt sint deserunt ut voluptate aute id deserunt nisi.</Text>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal:15,
        backgroundColor: '#fff',
    },
    questionText: {
        fontSize: 19,
        fontWeight: 'bold',
        marginBottom: 10,
        color:"black"
    },
    answerText: {
        fontSize: 16,
        color: '#333',
        marginBottom:10,
    },
    groupIconText: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        height: 110,
        paddingVertical: 20,
        marginBottom:40,
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
});

export default QuestionDetailScreen;

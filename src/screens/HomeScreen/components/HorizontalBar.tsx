import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Image } from 'react-native';
import images from '../../../assets/images';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../../../types';

const HorizontalBar: React.FC = () => {
    const [selectedButton, setSelectedButton] = useState<string>('Ongoing'); // Set default button here
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();

    const handleButtonPress = (buttonName: string) => {
        setSelectedButton(buttonName);

        switch (buttonName) {
            case 'Ongoing':
                navigation.navigate('OngoingScreen');
                break;
            case 'History':
                navigation.navigate('HistoryScreen');
                break;
            case 'To rate':
                navigation.navigate('ToRateScreen');
                break;
            default:
                break;
        }
    };

    return (
        <View style={styles.outerContainer}>
            <View style={styles.groupIconText}>
                <TouchableOpacity onPress={() => navigation.navigate('Homescreen')}>
                    <Image source={images.icon1} style={styles.icon} />
                </TouchableOpacity>
                <Text style={styles.text}>Receipt</Text>
            </View>
            <View style={styles.buttonContainer}>
                {['Ongoing', 'History', 'To rate'].map(button => (
                    <TouchableOpacity
                        key={button}
                        style={[
                            styles.button,
                            selectedButton === button && styles.selectedButton
                        ]}
                        onPress={() => handleButtonPress(button)}
                    >
                        <Text
                            style={[
                                styles.buttonText,
                                selectedButton === button && styles.selectedButtonText
                            ]}
                        >
                            {button}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
};


const styles = StyleSheet.create({
    outerContainer: {
        paddingHorizontal: 15,
        backgroundColor: 'white',
    },
    groupIconTextContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
    },
    groupIconText: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        height: 110,
        paddingVertical: 20,
      },
      text: {
        fontSize: 19,
        fontWeight: 'bold',
        color: 'black',
        marginRight: 150,
      },
    icon: {
    width: 24,
    height: 24,
  },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
    button: {
        width: 125,
        height: 36,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: '#939094',
        fontSize: 16,
    },

    selectedButtonText: {
        color: 'black',
    },
    selectedButton: {
        borderBottomWidth: 4,
        borderColor: '#FEBD2F',
        borderRadius :10,
    },
    
});

export default HorizontalBar;

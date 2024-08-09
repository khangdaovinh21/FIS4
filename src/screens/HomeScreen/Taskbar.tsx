import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useNavigation, NavigationProp, useIsFocused } from '@react-navigation/native';
import { RootStackParamList } from '../../types';
import images from '../../assets/images';

const Taskbar: React.FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const isFocused = useIsFocused(); 
  const [taskIcons, setTaskIcons] = useState({
    task1: images.task1,
    task2: images.task2,
    task3: images.task3,
    task4: images.task4,
  });

  useEffect(() => {
    if (navigation.getCurrentRoute()?.name === 'Homescreen') {
      setTaskIcons(prevIcons => ({
        ...prevIcons,
        task1: images.task11,
      }));
    } else {
      setTaskIcons(prevIcons => ({
        ...prevIcons,
        task1: images.task1,
      }));
    }
  }, [isFocused]); 

  const handleTask1Press = () => {
    navigation.navigate('Homescreen');
    setTaskIcons({
      task1: images.task11,
      task2: images.task2,
      task3: images.task3,
      task4: images.task4,
    });
  };

  const handleTask2Press = () => {
    setTaskIcons({
      task1: images.task1,
      task2: images.task22,
      task3: images.task3,
      task4: images.task4,
    });
    navigation.navigate('OngoingScreen');
  };

  const handleTask3Press = () => {
    setTaskIcons({
      task1: images.task1,
      task2: images.task2,
      task3: images.task33,
      task4: images.task4,
    });
    navigation.navigate('WishList');
  };

  const handleTask4Press = () => {
    setTaskIcons({
      task1: images.task1,
      task2: images.task2,
      task3: images.task3,
      task4: images.task44,
    });
    navigation.navigate('Notifcation');
  };

  return (
    <View style={styles.taskbar}>
      <TouchableOpacity style={styles.taskIcon} onPress={handleTask1Press}>
        <Image source={taskIcons.task1} style={styles.taskIconImage} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.taskIcon} onPress={handleTask2Press}>
        <Image source={taskIcons.task2} style={styles.taskIconImage} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.taskIcon} onPress={handleTask3Press}>
        <Image source={taskIcons.task3} style={styles.taskIconImage} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.taskIcon} onPress={handleTask4Press}>
        <Image source={taskIcons.task4} style={styles.taskIconImage} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.taskIcon}>
        <Image source={images.task5} style={styles.taskIconImage} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  taskbar: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    backgroundColor: 'white',
  },
  taskIcon: {},
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
});

export default Taskbar;

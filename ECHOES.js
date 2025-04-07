import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import Header from './Header';
import { useNavigation } from '@react-navigation/native';

const College = () => {
  const navigation = useNavigation();

  const colleges = [
    { name: 'College of Arts and Sciences', image: require('./images/cas-wo.png') },
    { name: 'College of Business Administration and Accountancy', image: require('./images/cbaa-wo.png') },
    { name: 'College of Education', image: require('./images/ced-wo.png') },
    { name: 'College of Hospitality and Tourism Management', image: require('./images/chtm-white.jpg') },
    { name: 'College of Criminology', image: require('./images/coc-wo.png') },
    { name: 'College of Nursing', image: require('./images/con-wo.png') },
    { name: 'College of Computer Studies', image: require('./images/ccs-wo.png') },
    { name: 'College of Engineering', image: require('./images/remove.png') },
    { name: 'College of Engineering and Computer Studies', image: require('./images/cecs-wo.png') },
  ];

  const handleCardPress = (collegeName, imageSource) => {
    navigation.navigate('Year', { collegeName, imageSource });
  };

  return (
    <View style={styles.container}>
      <Header />
      <Text style={styles.headerText}>ECHOES</Text>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.grid}>
          {colleges.map((college, index) => (
            <TouchableOpacity
              key={index}
              style={styles.card}
              onPress={() => handleCardPress(college.name, college.image)}
            >
              <Image source={college.image} style={styles.logo} />
              <Text style={styles.cardText}>{college.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#24348E',
  },
  headerText: {
    fontSize: 60,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginVertical: 20,
    letterSpacing: 15,
  },
  scrollContent: {
    alignItems: 'center',
    paddingBottom: 20,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  card: {
    borderWidth: 3,
    borderColor: '#1C2768',
    width: 140,
    alignItems: 'center',
    margin: 10,
    backgroundColor: '#FFFFFF',
    padding: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: 10,
  },
  cardText: {
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
    color: '#333333',
  },
});

export default College;

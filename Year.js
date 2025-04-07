import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import Header from './Header';
import { useNavigation, useRoute } from '@react-navigation/native';
import axios from 'axios';

const Year = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const { collegeName, imageSource } = route.params;

  const [yearbookData, setYearbookData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    navigation.setOptions({ title: collegeName });

    const fetchYearbookData = async () => {
      try {
        const response = await axios.get('https://smcyearbookdb-smcdbyearbook.up.railway.app/api/yearbook');
        setYearbookData(response.data);
      } catch (error) {
        console.error('Error fetching yearbook data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchYearbookData();
  }, [collegeName]);

  const handleImagePress = (year, theme, image) => {
    navigation.navigate('College', { 
      collegeName,   
      year,          
      imageSource: image 
    });
  };
  

  return (
    <View style={styles.container}>
      <Header />
      <Image source={imageSource} style={styles.collegeImage} />
      <Text style={styles.collegeTitle}>{collegeName}</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#FFFFFF" style={styles.loader} />
      ) : (
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {yearbookData.map((item, index) => (
            <TouchableOpacity
  key={index}
  style={styles.card}
  onPress={() => handleImagePress(item.year, item.theme, item.image)}
>
  <Image source={{ uri: item.image }} style={styles.image} />
  <Text style={styles.themeText}>"{item.theme}"</Text>
  <Text style={styles.yearText}>{item.year}</Text>
</TouchableOpacity>

          ))}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#24348E',
  },
  collegeImage: {
    width: '100%',
    height: 150,
    resizeMode: 'contain',
    marginVertical: 10,
    marginBottom: '-10',
  },
  collegeTitle: {
    fontSize: 30,
    color: '#FFFFFF',
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  },
  loader: {
    marginTop: 50,
  },
  scrollContent: {
    alignItems: 'center',
    paddingBottom: 20,
  },
  card: {
    marginVertical: 10,
    width: '95%',
    overflow: 'hidden',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    backgroundColor: '#24348E',
    borderWidth: 3,
    borderColor: '#1C2768',
  },
  image: {
    width: '100%',
    height: 110,
    resizeMode: 'cover',
    opacity: 0.8,
  },
  themeText: {
    fontStyle: 'italic',
    textAlign: 'center',
    color: '#fff',
    marginTop: 10,
    fontSize: 16,
  },
  yearText: {
    textAlign: 'center',
    fontSize: 14,
    color: '#fff',
    marginBottom: 10,
  },
});

export default Year;

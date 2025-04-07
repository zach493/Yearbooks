import React, { useState, useEffect } from 'react';
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import Header from './Header';

const { width, height } = Dimensions.get('window');

const Ignacia = () => {
  const [activeSection, setActiveSection] = useState('ignacia');
  const [ignacia, setIgnacia] = useState('');
  const navigation = useNavigation();

  const handleSectionChange = (section) => {
    setActiveSection(section);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://smcyearbookdb-smcdbyearbook.up.railway.app/api/vision-mission');
        const { ignacia } = response.data;
        setIgnacia(ignacia);
      } catch (error) {
        console.error('Error fetching Ignacia data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <Header />
      
      

      {activeSection === 'ignacia' && (
        <View style={styles.section}>
          <Image source={require('./images/ignacia.png')} style={styles.headerImage} />
          <View style={styles.contentContainer}>
            <ScrollView>
              <Text style={styles.sectionText}>
                {ignacia || 'Loading Ignacia data...'}
              </Text>
            </ScrollView>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#24348E',
  },
  section: {
    marginBottom: height * 0.02,
  },
  headerImage: {
    marginLeft: width * 0.05, 
    marginTop: height * 0.02, 
    width: width * 0.892, 
    height: height * 0.15, 
    resizeMode: 'contain',
    zIndex: 2,
  },
  contentContainer: {
    width: width * 0.87, 
    marginLeft: width * 0.06, 
    marginTop: -height * 0.02, 
    padding: width * 0.04, 
    backgroundColor: '#fff',
    elevation: 3,
  },
  sectionText: {
    color: '#000',
    fontSize: width * 0.035, 
    lineHeight: height * 0.03, 
    paddingBottom: 500,

  },
});

export default Ignacia;


import React, { useState, useEffect } from 'react';
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import Header from './Header';

const { width, height } = Dimensions.get('window');

const Alma = () => {
  const [activeSection, setActiveSection] = useState('stmichael');
  const [stmichael, setStMichael] = useState('');
  const navigation = useNavigation();

  const handleSectionChange = (section) => {
    setActiveSection(section);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://smcyearbookdb-smcdbyearbook.up.railway.app/api/vision-mission');
        const { stmichael } = response.data;
        setStMichael(stmichael);
      } catch (error) {
        console.error('Error fetching St. Michael data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <Header />
      
      <View style={styles.topHeader}>
        <TouchableOpacity onPress={() => handleSectionChange('stmichael')}>
       
        </TouchableOpacity>
      </View>

     
        <View style={styles.section}>
          <Image source={require('./images/st.m.png')} style={styles.headerImage} />
          <View style={styles.contentContainer}>
            <ScrollView>
              <Text style={styles.sectionText}>
                {stmichael || 'Loading St. Michael\'s data...'}
              </Text>
            </ScrollView>
          </View>
        </View>
      
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#24348E',
  },
  topHeader: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: height * 0.02, 
  },
  headerText: {
    marginTop: height * 0.02, 
    color: '#fff',
    fontSize: width * 0.05, 
    fontWeight: 'bold',
  },
  activeText: {
    color: '#329AFE',
  },
  activeLine: {
    position: 'absolute',
    bottom: 0,
    height: 4,
    backgroundColor: '#329AFE',
    width: '50%',
  },
  lineLeft: { left: 0 },
  lineRight: { right: 0 },
  section: {
    marginBottom: height * 0.02, 
  },
  headerImage: {
    marginLeft: width * 0.014, 
    marginTop: height * 0.01, 
    width: width * 0.970, 
    height: height * 0.17,
    resizeMode: 'contain',
    zIndex: 2,
  },
  contentContainer: {
    width: width * 0.80, 
    marginLeft: width * 0.095, 
    marginTop: -height * 0.03,
    padding: width * 0.06, 
    backgroundColor: '#fff',
    elevation: 3,
  },
  sectionText: {
    color: '#000',
    fontSize: width * 0.035, 
    lineHeight: height * 0.03, 
    textAlign: 'center', 
  },
});

export default Alma;

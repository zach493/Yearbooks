import React, { useState, useEffect } from 'react';
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import Header from './Header';

const { width, height } = Dimensions.get('window');

const Alma = () => {
  const [activeSection, setActiveSection] = useState('almaMater');
  const [almaMater, setAlmaMater] = useState('');
  const [schoolHymn, setSchoolHymn] = useState('');
  const navigation = useNavigation();

  const handleSectionChange = (section) => {
    setActiveSection(section);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://smcyearbookdb-smcdbyearbook.up.railway.app/api/vision-mission');
        const { almamater, schoolhymn } = response.data;
        setAlmaMater(almamater);
        setSchoolHymn(schoolhymn);
      } catch (error) {
        console.error('Error fetching Alma Mater and School Hymn:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.container1}>
      <View style={styles.topHeader}>
        <TouchableOpacity onPress={() => handleSectionChange('almaMater')}>
          <Text style={[styles.headerText, activeSection === 'almaMater' && styles.activeText]}>Alma Mater Hymn</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleSectionChange('schoolHymn')}>
          <Text style={[styles.headerText, activeSection === 'schoolHymn' && styles.activeText]}>School Hymn</Text>
        </TouchableOpacity>
        <View style={[styles.activeLine, activeSection === 'almaMater' ? styles.lineLeft : styles.lineRight]} />
      </View>

      {activeSection === 'almaMater' && (
        <View style={styles.section}>
          <Image source={require('./images/alma.png')} style={styles.headerImage} />
          <View style={styles.contentContainer}>
            <ScrollView>
              <Text style={styles.sectionText}>
                {almaMater || 'Loading Alma Mater...'}
              </Text>
            </ScrollView>
          </View>
        </View>
      )}

      {activeSection === 'schoolHymn' && (
        <View style={styles.section}>
          <Image source={require('./images/school.png')} style={styles.headerImage} />
          <View style={styles.contentContainer}>
            <ScrollView>
              <Text style={styles.sectionText}>
                {schoolHymn || 'Loading School Hymn...'}
              </Text>
            </ScrollView>
          </View>
        </View>
      )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container1: {
    backgroundColor: '#24348E',
  },
  topHeader: {
    flexDirection: 'row',
    justifyContent: 'space-around',
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
    marginTop: -height * 0.07, 
    marginLeft: -width * -0.04, 
    width: width * 0.92, 
    height: height * 0.15, 
    resizeMode: 'contain',
    position: 'absolute',
    top: height * 0.1, 
    zIndex: 2,
  },
  contentContainer: {
    height: height * 0.75, 
    marginTop: height *  0.15, 
    marginLeft: width * 0.05, 
    marginRight: width * 0.05, 
    backgroundColor: '#2FAFFF',
    padding: width * 0.04, 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
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
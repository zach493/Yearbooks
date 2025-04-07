import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Alert, ScrollView, TouchableOpacity, Image, Dimensions } from 'react-native';
import axios from 'axios';
import Header from './Header';

const { width, height } = Dimensions.get('window');

const VisionMission = () => {
  const [activeSection, setActiveSection] = useState('mission');
  const [visionMissionData, setVisionMissionData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [headerImage, setHeaderImage] = useState(require('./images/Vision1.png'));

  const handleSectionChange = (section) => {
    setActiveSection(section);
    setHeaderImage(
      section === 'mission' ? require('./images/Mission.png') : require('./images/Vision1.png')
    );
  };

  useEffect(() => {
    const fetchVisionMissionData = async () => {
      try {
        const response = await axios.get(
          'https://smcyearbookdb-smcdbyearbook.up.railway.app/api/vision-mission'
        );
        setVisionMissionData(response.data);
      } catch (error) {
        console.error('Error fetching vision and mission data:', error);
        Alert.alert('Error', 'Failed to load Vision and Mission data.');
      } finally {
        setLoading(false);
      }
    };

    fetchVisionMissionData();
  }, []);

  if (loading) {
    return (
      
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#24348E" />
      </View>
    );
  }

  if (!visionMissionData) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={{ color: '#24348E' }}>No data available.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header />
    <View style={styles.container}>
      <Image source={headerImage} style={styles.headerImage} />
      <View style={styles.topHeader}>
        <TouchableOpacity onPress={() => handleSectionChange('mission')}>
          <Text style={[styles.headerText, activeSection === 'mission' && styles.activeText]}>Mission</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleSectionChange('vision')}>
          <Text style={[styles.headerText, activeSection === 'vision' && styles.activeText]}>Vision</Text>
        </TouchableOpacity>
        <View style={[styles.activeLine, activeSection === 'mission' ? styles.lineLeft : styles.lineRight]} />
      </View>

      {activeSection === 'mission' && (
        <ScrollView style={styles.section}>
          <Text style={styles.sectionText}>{visionMissionData.mission}</Text>
        </ScrollView>
      )}

      {activeSection === 'vision' && (
        <ScrollView style={styles.section}>
          <Text style={styles.sectionText}>{visionMissionData.vision}</Text>
        </ScrollView>
      )}
    </View>
    </View>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#24348E',
    paddingHorizontal: width * 0.05, 
  },
  headerImage: {
    marginLeft: -4,
    marginTop: height * 0.02, 
    width: '102.6%', 
    height: height * 0.15, 
    resizeMode: 'contain',
    position: 'center',
    top: 70,
    zIndex: 2,
  },
  topHeader: {
    marginTop: -140,
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
    width: '62%',
  },
  lineLeft: { left: -40 },
  lineRight: { right: -40 },
  section: {
    marginTop: height * 0.1,
    marginBottom: height * 0.05, 
    backgroundColor: '#fff',
    padding: height * 0.02, 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionText: {
    marginTop: height * 0.06, 
    color: '#000',
    fontSize: width * 0.04, 
    lineHeight: height * 0.03, 
    marginBottom: 40,

},

loadingContainer: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#fff',
  padding: width * 0.05, 
},
});
export default VisionMission;

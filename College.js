import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Image, Text, ScrollView, ActivityIndicator, Alert, TouchableOpacity, Dimensions, Modal } from 'react-native';
import { useRoute } from '@react-navigation/native';
import axios from 'axios';
import Header from './Header';

const { width, height } = Dimensions.get('window');

const College = () => {
  const route = useRoute();
  const { collegeName, year } = route.params || {};

  const [alumniData, setAlumniData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('');
  const [activeTabWidth, setActiveTabWidth] = useState(0); 
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageVisibility, setImageVisibility] = useState([true, true, true]);

  const toggleImageVisibility = (index) => {
    setImageVisibility(prev => {
      const newVisibility = [...prev];
      newVisibility[index] = !newVisibility[index]; 
      return newVisibility;
    });
  };

  const downloadImage = (uri) => {
    Alert.alert('Download', `Downloading image from ${uri}`);
  };

  const getTabStyle = (collegeName) => {
    switch (collegeName) {
      case 'College of Arts and Sciences':
        return [styles.tab, styles.artsAndSciencesTab];
      case 'College of Education':
        return [styles.tab, styles.educationTab];
      case 'College of Business Administration and Accountancy':
        return [styles.tab, styles.businessTab];
      case 'College of Engineering':
        return [styles.tab, styles.engineeringTab];
      case 'College of Computer Studies':
        return [styles.tab, styles.computerStudiesTab];
      case 'College of Hospitality and Tourism Management':
        return [styles.tab, styles.hospitalityTab];
      case 'College of Nursing':
        return [styles.tab, styles.nursingTab];
      case 'College of Criminology':
        return [styles.tab, styles.criminologyTab];
      default:
        return styles.tab;
    }
  };
  
  const getTabTextStyle = (collegeName) => {
    switch (collegeName) {
      case 'College of Arts and Sciences':
        return [styles.tabText, styles.artsAndSciencesTabText];
      case 'College of Education':
        return [styles.tabText, styles.educationTabText];
      case 'College of Business Administration and Accountancy':
        return [styles.tabText, styles.businessTabText];
      case 'College of Engineering':
        return [styles.tabText, styles.engineeringTabText];
      case 'College of Computer Studies':
        return [styles.tabText, styles.computerStudiesTabText];
      case 'College of Hospitality and Tourism Management':
        return [styles.tabText, styles.hospitalityTabText];
      case 'College of Nursing':
        return [styles.tabText, styles.nursingTabText];
      case 'College of Criminology':
        return [styles.tabText, styles.criminologyTabText];
      default:
        return styles.tabText;
    }
  };

  const coursesData = {
    "College of Arts and Sciences": {
      tabs: ["BAP", "BSP"],
      courses: {
       "BAP": "Bachelor of Arts in Philosophy",
       "BSP": "Bachelor of Science in Psychology",
      },
    },
    "College of Education": {
      tabs: ["BAEL", "BECEd", "BEEd", "BSEd-ENGLISH", "BSEd-MATH", "BSNEd"],
      courses: {
        "BAEL": "Bachelor of Arts in English Language",
        "BECEd": "Bachelor of Early Childhood Education",
        "BEEd": "Bachelor of Elementary Education",
        "BSEd-ENGLISH": "Bachelor of Secondary Education Major in English",
        "BSEd-MATH": "Bachelor of Secondary Education Major in Mathematics",
        "BSNEd": "Bachelor of Special Needs Education (Generalist)",
      },
    },
    "College of Business Administration and Accountancy": {
      tabs: ["BSA", "BSBA-FM", "BSBA-HRM", "BSBA-MM", "BSBA-OM"],
      courses: {
       "BSA": "Bachelor of Science in Accountancy",
       "BSBA-FM": "Bachelor of Science in Business Administration Major in Financial Management",
       "BSBA-HRM": "Bachelor of Science in Business Administration Major in Human Resource Management",
       "BSBA-MM": "Bachelor of Science in Business Administration Major in Marketing Management",
       "BSBA-OM": "Bachelor of Science in Business Administration Major in Operations Management",
      },
    },
    "College of Engineering": {
      tabs: ["BSCE", "BSCpE", "BSECE"],
      courses: {
        "BSCE": "Bachelor of Science in Civil Engineering",
        "BSCpE": "Bachelor of Science in Computer Engineering",
        "BSECE": "Bachelor of Science in Electronics Engineering",
      },
    },
    "College of Computer Studies": {
      tabs: ["BSCS", "BSIS", "BSIT"],
      courses: {
        "BSCS": "Bachelor of Science in Computer Science",
        "BSIS": "Bachelor of Science in Information Systems",
        "BSIT": "Bachelor of Science in Information Technology",
      },
    },
    "College of Hospitality and Tourism Management": {
      tabs: ["CHTM"],
      courses: {
        "CHTM": "Bachelor of Science in Hospitality and Tourism Management",
      },
    },
    "College of Criminology": {
      tabs: ["BSC"],
      courses: {
        "BSC": "Bachelor of Science in Criminology",
      },
    },
    "College of Nursing": {
      tabs: ["BSN"],
      courses: {
        "BSN": "Bachelor of Science in Nursing",
      },
    },
  };

  useEffect(() => {
    const fetchAlumniData = async () => {
      try {
        const response = await axios.get(
          `https://smcyearbookdb-smcdbyearbook.up.railway.app/api/alumnicollege?course=${collegeName}&year=${year}`
        );
        setAlumniData(response.data);
      } catch (error) {
        console.error('Error fetching alumni data:', error);
        Alert.alert('Error', 'There was an issue fetching the alumni data.');
      } finally {
        setLoading(false); 
      }
    };
    
    fetchAlumniData();
    if (coursesData[collegeName]?.tabs.length > 0) {
      setActiveTab(coursesData[collegeName].tabs[0]);
    }
  }, [collegeName, year]);

  const handleTabLayout = (event) => {
    const { width } = event.nativeEvent.layout;
    if (activeTabWidth !== width) {
      setActiveTabWidth(width);
    }
  };

  const handleTabPress = (tab) => {
    setActiveTab(tab);
  };

  const openModal = (alumni) => {
    const images = [
      { type: 'Toga', uri: alumni.img_url, status: alumni.status },
      { type: 'SMC School Uniform', uri: alumni.img_url1, status: alumni.status_uni },
      { type: 'Corporate Attire', uri: alumni.img_url2, status: alumni.status_corp }
    ];

    const updatedImages = images.map(image => {
      if (image.status === 'Hidden') {
          return { ...image, uri: 'https://res.cloudinary.com/dqkcdsuwp/image/upload/v1740552918/w4dkktznjcmsdlgxuo0f.jpg' }; 
      }else {
        // If the status is not 'Hidden', keep the original URI from the database
        return { ...image }; // This will keep the original URI
      }
    });

    setSelectedImages(updatedImages);
    setSelectedImage(updatedImages[0]);
    setModalVisible(true);
  };
  
  const renderContent = () => {
    if (loading) {
      return <ActivityIndicator size="large" color="#FFFFFF" style={styles.loader} />;
    }
    const filteredAlumniData = alumniData.filter(alumni => alumni.alum_course === coursesData[collegeName]?.courses[activeTab]);
  
    return (
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.profileContainer}>
          {filteredAlumniData.map((alumni, index) => (
            <TouchableOpacity key={index} style={styles.profileCard} onPress={() => openModal(alumni)}>
              <Image source={{ uri: alumni.img_url }} style={styles.profileImage} />
              <Text style={styles.profileName}>{`${alumni.alum_fname} ${alumni.alum_lname}`}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    );
  };
    
  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.header}>
        <Text style={styles.title}>{collegeName || 'College Name'}</Text>
        <View style={styles.line1} />
        <Text style={styles.subtitle}>{year || 'S.Y 2023 - 2024'}</Text>
        <Text style={styles.activeCourse}>
          {activeTab ? coursesData[collegeName]?.courses[activeTab] : ''}
        </Text>
      </View>
      <View style={styles.tabContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
          bounces={false}
        >
          {coursesData[collegeName]?.tabs.map((tab) => (
            <TouchableOpacity
              key={tab}
              id={tab} 
              style={[
                getTabStyle(collegeName), 
                activeTab === tab && styles.activeTab
              ]}
              onPress={() => handleTabPress(tab)}
              onLayout={handleTabLayout}
            >
              <Text style={[getTabTextStyle(collegeName), activeTab === tab && styles.activeTabText]}>
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
  
      {renderContent()}

      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>x</Text>
            </TouchableOpacity>
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
              {selectedImage && (
                <TouchableOpacity onPress={() => setSelectedImage(selectedImage)}>
                  <Image source={{ uri: selectedImage.uri }} style={styles.modalImage} />
                  <Text style={styles.modalTitle}>{selectedImage.type}</Text>
                </TouchableOpacity>
              )}
              <View style={styles.thumbnailsContainer}>
                {selectedImages.map((image, index) => (
                  <TouchableOpacity key={index} onPress={() => {
                    setSelectedImage(image);
                  }}>
                    <Image 
                      source={{ uri: image.uri }} 
                      style={[
                        styles.thumbnailImage, 
                        selectedImage.uri === image.uri && styles.selectedThumbnail
                      ]} 
                    />
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#24348E', 
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.8)',
},
modalContent: {
    maxHeight: '80%',
    padding: 20,
    alignItems: 'center',
    borderRadius: 10,
    width: '90%',
},
closeButton: {
    alignSelf: 'flex-end',
},
closeButtonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
},
scrollViewContent: {
    flexGrow: 1,
    alignItems: 'center',
},
modalImage: {
  marginTop: 50,
    width: '100%',
    height: 300,
    resizeMode: 'contain',
    marginBottom: 10,
    borderColor: '#1C2768',
    width: 200,
    height: 270,
    borderWidth: 3,
  },
thumbnailsContainer: {
    
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
},
thumbnailImage: {
    width: 80,
    height: 80,
    borderWidth: 2,
    borderColor: 'transparent',
    margin: 5,
},
selectedThumbnail: {
    borderColor: '#329AFE', 
},
modalTitle: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
    marginVertical: 5,
    fontStyle: 'italic',

},
thumbnailTitle: {
    color: '#fff',
    fontSize: 12,
    textAlign: 'center',
    fontStyle: 'italic',
},
  header: {
    width: '100%',
    textAlign: 'center',
    marginTop: 30,
  },
  title: {
    color: '#ffffff',
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subtitle: {
    color: '#ffffff',
    fontSize: 20,
    marginTop: 10,
    textAlign: 'center',
    
  },
  line1: {
    width: 200,
    height: 1,
    backgroundColor: 'white',
    marginTop: 15,
    alignSelf: 'center',
  },
  activeCourse: {
    color: '#fff',
    fontSize: 16,
    fontStyle: 'italic',
    marginTop: 10,
    backgroundColor: '#000080',
    textAlign: 'center',
    paddingBottom: 10,
    paddingTop: 10,
    width: '100%',
  },
  artsAndSciencesTab: {
    alignItems: 'center',
    marginHorizontal: width * 0.025, 
    paddingHorizontal: width * 0.04, 
    paddingVertical: height * 0.02, 
  },
  artsAndSciencesTabText: {
    color: '#fff',
    fontSize: width * 0.04, 
    fontWeight: 'bold',
    textAlign: 'center',
  },
  educationTab: {
    alignItems: 'center',
    marginHorizontal: width * 0.025, 
    paddingHorizontal: width * 0.04, 
    paddingVertical: height * 0.02, 
  },
  educationTabText: {
    color: '#fff',
    fontSize: width * 0.04, 
    fontWeight: 'bold',
    textAlign: 'center',
  },
  businessTab: {
    alignItems: 'center',
    marginHorizontal: width * 0.025, 
    paddingHorizontal: width * 0.04, 
    paddingVertical: height * 0.02, 
  },
  businessTabText: {
    color: '#fff',
    fontSize: width * 0.04, 
    fontWeight: 'bold',
    textAlign: 'center',
  },
  engineeringTab: {
    alignItems: 'center',
    marginHorizontal: width * 0.08, 
    marginLeft: 25,
  },
  engineeringTabText: {
    color: '#fff',
    fontSize: width * 0.04, 
    fontWeight: 'bold',
    textAlign: 'center',
  },
  computerStudiesTab: {
    alignItems: 'center',
    marginHorizontal: width * 0.08, 
    marginLeft: 25,
  },
  computerStudiesTabText: {
    color: '#fff',
    fontSize: width * 0.04, 
    fontWeight: 'bold',
    textAlign: 'center',
  },
  tabContainer: {
    flexDirection: 'row', 
    justifyContent: 'space-evenly', 
    alignItems: 'center', 
    paddingVertical: 10,
  },
  tab: {
    alignItems: 'center',
    marginHorizontal: 10,
    paddingBottom: 5,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  tabText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  activeTabText: {
    color: '#329AFE',
  },
  activeTab: {
    alignItems: 'center',
  },
  activeLine: {
    height: 2,
    backgroundColor: '#329AFE',
    marginTop: 5,
  },
 
  scrollContainer: {
    paddingTop: 20,
  },
  profileContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  profileCard: {
    marginTop: 10,
    alignItems: 'center',
    marginHorizontal: 10,
    marginBottom: 10,
    width: '40%',
  },
  profileImage: {
    width: 100,
    height: 140,
    borderWidth: 3,
    borderColor: '#1C2768',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    elevation: 5,
  },
  profileName: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 5,
    textAlign: 'center',
  },
  profileCaption: {
    color: '#fff',
    fontSize: 13,
    fontStyle: 'italic',
    marginTop: 3,
    textAlign: 'center',
  },
});


export default College;
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Image, Text, ImageBackground, ActivityIndicator, Alert, TouchableOpacity, Modal } from 'react-native';
import axios from 'axios';
import { useAuth } from './AuthProvider'; 
import Header from './Header';

const Profile = () => {
  const { auth } = useAuth(); 
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentImage, setCurrentImage] = useState(null);
  const [imageStatuses, setImageStatuses] = useState({
    status: 'Shown',
    status_uni: 'Shown',
    status_corp: 'Shown',
  });

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const alumId = auth?.user?.alum_id_num;
        if (!alumId) {
          Alert.alert('Error', 'Unable to fetch profile. Please log in again.');
          return;
        }
        const response = await axios.get(`https://smcyearbookdb-smcdbyearbook.up.railway.app/alumniprof?idNumber=${alumId}`);
        const alumData = response.data;
        
        if (!alumData || !alumData.alumni) {
          Alert.alert('Error', 'No alumni data found.');
          return;
        }

        setProfile({
          name: `${alumData.alumni.alum_fname} ${alumData.alumni.alum_mname} ${alumData.alumni.alum_lname}`,
          idNumber: alumData.alumni.alum_id_num,
          yearGraduated: alumData.alumni.alum_year,
          college: alumData.alumni.alum_course,
          motto: alumData.alumni.motto,
          image: alumData.img_url, 
          image1: alumData.img_url1,
          image2: alumData.img_url2,
        });

        // Set the image statuses based on the data from the database
        setImageStatuses({
          status: alumData.status || 'Shown',
          status_uni: alumData.status_uni || 'Shown',
          status_corp: alumData.status_corp || 'Shown',
        });

      } catch (error) {
        console.error('Error fetching profile data:', error);
        Alert.alert('Error', 'Failed to load profile data. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchProfileData();
  }, [auth]);

  const handleImageClick = (image) => {
    setSelectedImage(image);
    setModalVisible(true);
  };

  const handleDownload = () => {
    // Implement download functionality here
    Alert.alert('Download', 'Download functionality not implemented yet.');
  };

  const toggleImageVisibility = async (imageKey) => {
    const newVisibility = imageStatuses[imageKey] === 'Shown' ? 'Hidden' : 'Shown';
    setImageStatuses((prevStatuses) => ({ ...prevStatuses, [imageKey]: newVisibility }));

    // Update the status in the database
    try {
      await axios.post('https://smcyearbookdb-smcdbyearbook.up.railway.app/updateImageStatus', {
        alumId: auth?.user?.alum_id_num,
        imageKey: imageKey,
        status: newVisibility,
      });
      Alert.alert('Success', `Image status updated to ${newVisibility}`);
    } catch (error) {
      console.error('Error updating image status:', error);
      Alert.alert('Error', 'Failed to update image status. Please try again.');
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#24348E" />
      </View>
    );
  }

  if (!profile) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={{ color: '#24348E' }}>No profile data available.</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <Header />
      <ImageBackground
        source={require('./images/profile-bg1.png')}
        style={styles.backgroundImage}
      >
        <View style={styles.profileContainer}>
          <View style={styles.imageGrid}>
            <View style={styles.profileHeader}>
              <TouchableOpacity onPress={() => toggleImageVisibility('status')}>
                <Image
                  source={imageStatuses.status === 'Shown' ? require('./images/hide.png') : require('./images/show.png')}
                  style={styles.toggleImage}
                />
              </TouchableOpacity>
              <Text style={styles.imageStatusText}>{imageStatuses.status}</Text>
              <TouchableOpacity onPress={() => handleImageClick(profile.image)}>
                <Image
                  source={{ uri: profile.image || 'https://via.placeholder.com/150' }}
                  style={styles.profileImage}
                />
              </TouchableOpacity>
            </View>

            <View style={styles.imageBox}>
              <TouchableOpacity onPress={() => toggleImageVisibility('status_uni')}>
                <Image
                  source={imageStatuses.status_uni === 'Shown' ? require('./images/hide.png') : require('./images/show.png')}
                  style={styles.toggleImage}
                />
              </TouchableOpacity>
              <Text style={styles.imageStatusText}>{imageStatuses.status_uni}</Text>
              <TouchableOpacity onPress={() => handleImageClick(profile.image1)}>
                <Image
                  source={{ uri: profile.image1 || 'https://via.placeholder.com/150' }}
                  style={styles.profileImage}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.imageBox}>
              <TouchableOpacity onPress={() => toggleImageVisibility('status_corp')}>
                <Image
                  source={imageStatuses.status_corp === 'Shown' ? require('./images/hide.png') : require('./images/show.png')}
                  style={styles.toggleImage}
                />
              </TouchableOpacity>
              <Text style={styles.imageStatusText}>{imageStatuses.status_corp}</Text>
              <TouchableOpacity onPress={() => handleImageClick(profile.image2)}>
                <Image
                  source={{ uri: profile.image2 || 'https://via.placeholder.com/150' }}
                  style={styles.profileImage}
                />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.profileDetails}>
            <View style={styles.detailBox}>
              <Text style={styles.name}>{profile.name}</Text>
            </View>

            <View style={styles.detailBox}>
              <Text style={styles.info}>ID Number: {profile.idNumber}</Text>
            </View>

            <View style={styles.detailBox}>
              <Text style={styles.info}>Year Graduated: {profile.yearGraduated}</Text>
            </View>

            <View style={styles.detailBox}>
              <Text style={styles.info}>College: {profile.college}</Text>
            </View>

            <View style={styles.detailBox}>
              <Text style={styles.info}>Motto: {profile.motto}</Text>
            </View>
          </View>
        </View>
      </ImageBackground>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.toggleContainer}>
              <TouchableOpacity onPress={handleDownload}>
                <Image
                  source={require('./images/download.png')}
                  style={styles.toggleImage}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Text style={styles.closeButton}>X</Text>
              </TouchableOpacity>
            </View>
            <Image
              source={{ uri: selectedImage || 'https://via.placeholder.com/150' }}
              style={styles.enlargedImage}
            />
            <Text style={styles.imageStatus}>{imageStatuses[currentImage]}</Text>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  toggleContainer: {
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    width: '100%', 
    marginBottom: 10,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  profileContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileHeader: {
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImage: {
    width: 100,
    height: 150,
    borderWidth: 3,
    borderColor: '#24348E',
  },
  imageGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 20,
    width: '100%',
  },
  imageBox: {
    alignItems: 'center',
  },
  detailBox: {
    backgroundColor: '#f5f5f5',
    padding: 10,
    marginVertical: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3.5,
    elevation: 3,
    width: 320,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#24348E',
    textAlign: 'center',
  },
  info: {
    fontSize: 16,
    color: '#24348E',
    textAlign: 'center',
    fontWeight: '500',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    borderRadius: 10,
    padding: 20,
    alignItems: 'flex-start',
  },
  enlargedImage: {
    width: '100%',
    height: 300,
    resizeMode: 'contain',
    marginVertical: 10,
  },
  toggleImage: {
    width: 20,
    height: 20,
    margin: 5,
  },
  closeButton: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  imageStatus: {
    fontSize: 14,
    color: '#fff',
    fontStyle: 'italic',
    textAlign: 'right',
    marginLeft: 180,
  },
  imageStatusText: {
    fontSize: 12,
    color: 'black',
    marginTop: 5,
  },
});

export default Profile;
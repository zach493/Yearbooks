import React, { useState } from 'react';
import { View, Image, ScrollView, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Header from './Header';

const { width, height } = Dimensions.get('window');

const Panel = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Header />

      <ScrollView style={styles.scrollContainer}>
        <TouchableOpacity
          style={styles.panel}
          onPress={() => navigation.navigate('VisionMission')}
        >
          <Image
            source={require('./images/vision.png')}
            style={styles.panelImage1}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.panel}
          onPress={() => navigation.navigate('Alma')}
        >
          <Image
            source={require('./images/school hymn.png')}
            style={styles.panelImage2}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.panel}
          onPress={() => navigation.navigate('SMC')}
        >
          <Image
            source={require('./images/st.m.png')}
            style={styles.panelImage3}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.panel}
          onPress={() => navigation.navigate('Ignacia')}
        >
          <Image
            source={require('./images/ignacia.png')}
            style={styles.panelImage4}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.panel}
          onPress={() => navigation.navigate('TA')}
        >
          <Image
            source={require('./images/topadmin.png')}
            style={styles.panelImage5}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.panel}
          onPress={() => navigation.navigate('ECHOES')}
        >
          <Image
            source={require('./images/echoes.png')}
            style={styles.panelImage6}
          />
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#24348E',
  },

  panelImage1: {
    marginTop: height * 0.03, 
    marginLeft: width * 0.06, 
    width: width * 0.880, 
    height: height * 0.17, 
    resizeMode: 'contain',
  },

  panelImage2: {
    marginLeft: width * 0.06, 
    marginTop: height * -0.01, 
    width: width * 0.880, 
    height: height * 0.17,  
    resizeMode: 'contain',  
  },

  panelImage3: {
    marginLeft: width * 0.06, 
    marginTop: height * -0.01, 
    width: width * 0.880, 
    height: height * 0.17, 
    resizeMode: 'contain',
  },

  panelImage4: {
    marginLeft: width * 0.06, 
    marginTop: height * -0.01, 
    width: width * 0.880, 
    height: height * 0.14, 
    resizeMode: 'contain',
  },

  panelImage5: {
    marginLeft: width * 0.07, 
    marginTop: height * 0.01, 
    width: width * 0.858, 
    height: height * 0.15, 
    resizeMode: 'contain',
  },   

  panelImage6: {
    marginLeft: width * 0.06, 
    marginTop: height * 0.02, 
    width: width * 0.874, 
    height: height * 0.15, 
    resizeMode: 'contain',
    marginBottom: height * 0.02, 
  },
});

export default Panel;

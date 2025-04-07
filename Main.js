import React from 'react';
import { View, Image, Text, TouchableOpacity, StyleSheet, ImageBackground, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

function Main({ navigation }) {
  return (
    <ImageBackground
      source={require('./images/login-bg.png')} 
      style={styles.background}
    >
      <View style={styles.container}>
        <Image source={require('./images/smclogo.png')} style={styles.logo} pointerEvents="none" />
        <Text style={styles.title}>
          Welcome to St. Michael’s{'\n'}College Alumni Yearbook!
        </Text>

        <View style={styles.divider} />

        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')}>
          <Text style={styles.buttonText}>Alumni Yearbook</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover', 
    justifyContent: 'center',
    alignItems: 'center',
  },

  container: {
    marginTop: -60,
    flex: 1,
    width: '90%', 
    paddingVertical: height * 0.05, 
    justifyContent: 'center', 
    alignItems: 'center', 
  },

  logo: {
    width: width * 0.6, 
    height: width * 0.6, 
    opacity: 0.9,
    marginBottom: 90,
  },

  title: {
    color: 'white',
    fontSize: width * 0.06, 
    textAlign: 'center',
    fontWeight: '500',
    marginVertical: height * 0.02, 
  },

  button: {
    paddingVertical: height * 0.01, 
    backgroundColor: 'white',
    borderRadius: 25,
    marginTop: height * 0.02, 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: '80%',
    alignSelf: 'center', 
  },

  buttonText: {
    fontSize: width * 0.05, 
    fontWeight: 'bold',
    color: '#3b9eff',
    textAlign: 'center',
  },

  divider: {
    width: '80%',
    height: 1,
    backgroundColor: '#ddd',
    alignSelf: 'center',
    marginVertical: height * 0.02, 
  },
});

export default Main;

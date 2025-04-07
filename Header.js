import React, { useState } from 'react';
import { View, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

const Header = () => {
  const navigation = useNavigation();
  const [activeIcons, setActiveIcons] = useState({
    home: require('./images/home.png'),
    yearbook: require('./images/yearbook.png'),
    user: require('./images/user1.png'),
    logout: require('./images/out.png'),
  });

  const handleIconChange = (iconName) => {
    const newIcons = { ...activeIcons };

    switch (iconName) {
      case 'home':
        newIcons.home = require('./images/home-hover.png');
        break;
      case 'yearbook':
        newIcons.yearbook = require('./images/yearbook-hover.png');
        break;
      case 'user':
        newIcons.user = require('./images/user-hover.png');
        break;
      case 'logout':
        newIcons.logout = require('./images/out.png');
        break;
      default:
        break;
    }

    setActiveIcons(newIcons);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require('./images/my.SMC_border.png')}
          style={styles.logo}
        />
        <Image
          source={require('./images/search.png')}
          style={styles.icon}
        />
      </View>

      <View style={styles.subHeader}>
        <TouchableOpacity
          onPress={() => {
            handleIconChange('home');
            navigation.navigate('Panel');
          }}
        >
          <Image source={activeIcons.home} style={styles.subIcon} />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            handleIconChange('yearbook');
            navigation.navigate('ECHOES');
          }}
        >
          <Image source={activeIcons.yearbook} style={styles.subIcon} />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            handleIconChange('user');
            navigation.navigate('Profile');
          }}
        >
          <Image source={activeIcons.user} style={styles.subIcon} />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            handleIconChange('logout');
            navigation.navigate('Login');
          }}
        >
          <Image source={activeIcons.logout} style={styles.subIcon} />
        </TouchableOpacity>
      </View>

      <View style={styles.line} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#002366',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    alignItems: 'center',
    backgroundColor: '#24348E',
  },
  logo: {
    marginTop: 20,
    width: 130,
    height: 70,
    resizeMode: 'contain',
  },
  icon: {
    marginRight: 15,
    marginTop: 35,
    width: 25,
    height: 25,
    tintColor: 'white',
  },
  subHeader: {
    marginRight: -10,
    marginLeft: -10,
    marginTop: -20,
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 15,
    backgroundColor: '#24348E',
  },
  subIcon: {
    width: 25,
    height: 25,
    tintColor: 'white',
  },
  line: {
    marginLeft: -25,
    height: 1,
    width: width * 3,
    backgroundColor: 'white',
    opacity: 0.5,
  },
});

export default Header;

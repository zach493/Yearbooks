import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useAuth } from './AuthProvider';

const MainScreen = ({ navigation }) => {
  const { auth, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    navigation.replace('Login'); 
  };

  return (
    <View>
      <Text>Welcome, {auth?.user?.name}</Text>
      <TouchableOpacity onPress={handleLogout}>
        <Text>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MainScreen;

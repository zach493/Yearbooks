import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(null);

  useEffect(() => {
    const loadAuth = async () => {
      const storedAuth = await AsyncStorage.getItem('auth');
      if (storedAuth) {
        setAuth(JSON.parse(storedAuth));
      }
    };
    loadAuth();
  }, []);

  const login = async (user, token) => {
    const authData = { user, token };
    setAuth(authData);
    await AsyncStorage.setItem('auth', JSON.stringify(authData));
  };

  const logout = async () => {
    setAuth(null);
    await AsyncStorage.removeItem('auth');
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthProvider } from './AuthProvider'; 
import Main from './Main';
import Login from './Login';
import Panel from './Panel';
import VisionMission from './VisionMission';
import Alma from './Alma';
import SMC from './SMC';
import Ignacia from './Ignacia';
import TA from './TA';
import ECHOES from './ECHOES';
import Year from './Year';
import College from './College';
import Header from './Header';
import Profile from './Profile';


const Stack = createStackNavigator();

export default function App() {
  return (
    <AuthProvider>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Main">
        <Stack.Screen name="Main" component={Main} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="Panel" component={Panel} options={{headerTitle: '',headerTransparent: true, headerLeft: () => null,}}/>
        <Stack.Screen name="VisionMission" component={VisionMission} options={{headerShown: false,}}/>
        <Stack.Screen name="Alma" component={Alma} options={{headerShown: false,}}/>
        <Stack.Screen name="SMC" component={SMC} options={{headerShown: false,}}/>
        <Stack.Screen name="Ignacia" component={Ignacia} options={{headerShown: false,}}/>
        <Stack.Screen name="TA" component={TA} options={{headerShown: false, }}/>
        <Stack.Screen name="ECHOES" component={ECHOES} options={{headerShown: false,}}/>
        <Stack.Screen name="Year" component={Year} options={{headerShown: false,}}/>
        <Stack.Screen name="College" component={College} options={{headerShown: false,}}/>
        <Stack.Screen name="Header" component={Header} options={{headerShown: false, }}/>
        <Stack.Screen name="Profile" component={Profile} options={{headerShown: false,}}/>
      </Stack.Navigator>
    </NavigationContainer>
  </AuthProvider>
  );
}
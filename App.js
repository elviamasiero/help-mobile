import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import Login from './src/pages/Login';
import AppProvider from './src/hooks';
import RootNavigator from './src/routes'

export default function App() {
  return (
      <SafeAreaProvider style={{paddingTop:24}}>     
          <StatusBar style="dark" />
          <NavigationContainer> 
            < AppProvider>
              < RootNavigator/>
            </AppProvider>
          </NavigationContainer>
      </SafeAreaProvider>
    
  );
}



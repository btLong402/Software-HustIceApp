/* eslint-disable prettier/prettier */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();

import {useAuth} from '../context/authContext';
import Splash from '../views/SplashScreen';
import AuthStack from './AuthStack';
import PublicStack from './PublicStack';

function AppNavigation(): JSX.Element {
  // const {isLoading, isSignout} = useAuth();
  // const isLoading = true;
  const isLoading = false;
  const isSignout = false;
  return isLoading ? (
    <Splash />
  ) : (
    <NavigationContainer>
      {!isSignout ? <AuthStack /> : <PublicStack />}
    </NavigationContainer>
  );
}
export default AppNavigation;

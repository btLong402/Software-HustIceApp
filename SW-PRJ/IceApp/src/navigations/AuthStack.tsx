import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import CartScreen from '../views/checkout/CartScreen';
import EditProfileScreen from '../views/profile/EditProfileScreen';
import CheckoutScreen from '../views/checkout/CheckoutScreen';
import ProfileScreen from '../views/profile/ProfileScreen';

const Stack = createStackNavigator();

function AuthStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Cart" component={CartScreen} />
      <Stack.Screen name="EditProfile" component={EditProfileScreen} />
      <Stack.Screen name="Checkout" component={CheckoutScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
    </Stack.Navigator>
  );
}

export default AuthStack;

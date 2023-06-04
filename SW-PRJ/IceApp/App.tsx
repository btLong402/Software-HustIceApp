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
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Ionicons from 'react-native-vector-icons/Ionicons';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// import Splash from './src/views/SplashScreen';
//import SignIn from './src/views/authentication/SignInScreen';
// import SignUp from './src/views/authentication/SignUpScreen';
import MainScreen from './src/views/main_page';
import ProfileScreen from './src/screens/profile/ProfileScreen';
import EditProfileScreen from './src/screens/profile/EditProfileScreen';
import CartScreen from './src/screens/checkout/CartScreen';
import CheckoutScreen from './src/screens/checkout/CheckoutScreen';

// const ProfileStack = () => {
//   return (
//     <Stack.Navigator screenOptions={{}} initialRouteName="ProfileStack">
//       <Stack.Screen
//         name="ProfileStack"
//         component={ProfileScreen}
//         options={{headerShown: false}}
//       />
//       <Stack.Screen name="EditProfileStack" component={EditProfileScreen} />
//     </Stack.Navigator>
//   );
// };

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName: string = '';
          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'crimson',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}>
      <Tab.Screen name="Home" component={MainScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}
// const MainStack = () => {
//   return (
//     <Stack.Navigator screenOptions={{}} initialRouteName="MainStack">
//       <Stack.Screen
//         name="MainStack"
//         component={MainScreen}
//         options={{headerShown: false}}
//       />
//       <Stack.Screen name="CheckoutStack" component={CheckoutScreen} />
//     </Stack.Navigator>
//   );
// };
function App(): JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="HomeTabs"
          component={MainTabs}
          options={{headerShown: false}}
        />
        <Stack.Screen name="Cart" component={CartScreen} />

        <Stack.Screen name="EditProfile" component={EditProfileScreen} />
        <Stack.Screen name="Checkout" component={CheckoutScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default App;

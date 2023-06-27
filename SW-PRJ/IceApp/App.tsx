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
import {Flex, NativeBaseProvider} from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Anticons from 'react-native-vector-icons/AntDesign';
import {Badge, Box, HStack, Image} from 'native-base';
import {Text} from 'react-native';
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// import Splash from './src/views/SplashScreen';
//import SignIn from './src/views/authentication/SignInScreen';
// import SignUp from './src/views/authentication/SignUpScreen';
import MainScreen from './src/views/main_page/index';
import ProfileScreen from './src/views/profile/ProfileScreen';
import EditProfileScreen from './src/views/profile/EditProfileScreen';
import CartScreen from './src/views/checkout/CartScreen';
import CheckoutScreen from './src/views/checkout/CheckoutScreen';
import MeScreen from './src/views/profile/MeScreen';

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName: string = '';
          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Me') {
            iconName = focused ? 'person' : 'person-outline';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'crimson',
        tabBarInactiveTintColor: 'gray',
        headerStyle: {
          backgroundColor: 'crimson',
          height: 80,
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          display: 'none',
        },
        headerShadowVisible: false,
        headerRight: () => (
          <Flex direction="row" marginRight={'1'} height={'full'}>
            <Box margin={'1'}>
              <Badge // bg="red.400"
                borderWidth={'1'}
                borderColor={'white'}
                background={'crimson'}
                rounded="full"
                position={'absolute'}
                zIndex={1}
                variant="solid"
                alignSelf="flex-end"
                _text={{
                  fontSize: 12,
                }}>
                2
              </Badge>
              <Anticons
                name="shoppingcart"
                size={35}
                onPress={() => {}}
                style={{marginRight: 10}}
                color="white"
              />
            </Box>
            <Box margin={'1'}>
              <Badge // bg="red.400"
                borderWidth={'1'}
                borderColor={'white'}
                background={'crimson'}
                rounded="full"
                position={'absolute'}
                zIndex={1}
                variant="solid"
                alignSelf="flex-end"
                _text={{
                  fontSize: 12,
                }}>
                2
              </Badge>
              <Anticons
                name="message1"
                size={32}
                onPress={() => {}}
                style={{marginRight: 10}}
                color="white"
              />
            </Box>
          </Flex>
        ),
      })}>
      <Tab.Screen name="Home" component={MainScreen} />
      <Tab.Screen name="Me" component={MeScreen} />
    </Tab.Navigator>
  );
}
function App(): JSX.Element {
  return (
    <NativeBaseProvider>
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
          <Stack.Screen name="Profile" component={ProfileScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}
export default App;

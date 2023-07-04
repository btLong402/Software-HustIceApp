/* eslint-disable prettier/prettier */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect} from 'react';
import MainScreen from '../views/main_page';
import MeScreen from '../views/profile/MeScreen';
import {Badge, Box} from 'native-base';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Flex} from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Anticons from 'react-native-vector-icons/AntDesign';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {useAuth} from '../context/authContext';
import Splash from '../views/SplashScreen';
import SignIn from '../views/authentication/SignInScreen';
import SignUp from '../views/authentication/SignUpScreen';
import CartScreen from '../views/checkout/CartScreen';
import EditProfileScreen from '../views/profile/EditProfileScreen';
import CheckoutScreen from '../views/checkout/CheckoutScreen';
import ProfileScreen from '../views/profile/ProfileScreen';

import AuthStack from './AuthStack';
import AccountSetting from '../views/AccountSetting';
import {useUser} from '../context/userContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function AppNavigation(): JSX.Element {
  const {isLoading, isSignout, token, _id} = useAuth();

  const {user, getUserInfo, USER_REDUCER_TYPE, dispatch} = useUser();

  const getUserInfoStorage = async () => {
    const data = await AsyncStorage.getItem('user_info');
    if (data) {
      const userInfo = JSON.parse(data);
      const userInfoParse = {...userInfo, dob: new Date(userInfo?.dob)};
      dispatch({type: USER_REDUCER_TYPE.UPDATE_MANY, payload: userInfoParse});
      return true;
    }
    return false;
  };
  useEffect(() => {
    if (!_id) return;
    if (!getUserInfoStorage()) getUserInfo(_id);
  }, [_id]);

  console.log('user :', user);
  return isLoading ? (
    <Splash />
  ) : (
    <NavigationContainer>
      <Stack.Navigator>
        {isSignout ? (
          <>
            <Stack.Screen
              name="HomeTabs"
              component={MainTabs}
              options={{headerShown: false}}
            />
            <Stack.Screen name="SignIn" component={SignIn} />
            <Stack.Screen name="SignUp" component={SignUp} />
          </>
        ) : (
          <>
            <Stack.Screen
              name="HomeTabs"
              component={MainTabs}
              options={{headerShown: false}}
            />
            <Stack.Screen name="Cart" component={CartScreen} />
            <Stack.Screen name="EditProfile" component={EditProfileScreen} />
            <Stack.Screen name="Checkout" component={CheckoutScreen} />
            <Stack.Screen name="Profile" component={ProfileScreen} />
            <Stack.Screen name="Account Setting" component={AccountSetting} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function MainTabs() {
  const {isSignout} = useAuth();

  return (
    <Tab.Navigator
      screenOptions={({route, navigation}) => ({
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
              {!isSignout && (
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
              )}
              <Anticons
                name="shoppingcart"
                size={35}
                onPress={() => {}}
                style={{marginRight: 10}}
                color="white"
                onPressIn={() => {
                  isSignout
                    ? navigation.navigate('SignIn')
                    : navigation.navigate('Home');
                }}
              />
            </Box>
            <Box margin={'1'}>
              {!isSignout && (
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
              )}
              <Anticons
                name="message1"
                size={32}
                onPress={() => {}}
                style={{marginRight: 10}}
                color="white"
                onPressIn={() => {
                  isSignout
                    ? navigation.navigate('SignIn')
                    : navigation.navigate('Home');
                }}
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

export default AppNavigation;

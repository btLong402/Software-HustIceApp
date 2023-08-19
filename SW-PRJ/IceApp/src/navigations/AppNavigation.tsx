/* eslint-disable prettier/prettier */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect, useState} from 'react';
import MeScreen from '../views/profile/MeScreen';
import {Badge, Box} from 'native-base';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Flex} from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Anticons from 'react-native-vector-icons/AntDesign';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {useAuth, AuthActionType} from '../context/authContext';
import Splash from '../views/SplashScreen';
import SignIn from '../views/authentication/SignInScreen';
import SignUp from '../views/authentication/SignUpScreen';
import CartScreen from '../views/checkout/CartScreen';
import EditProfileScreen from '../views/profile/EditProfileScreen';
import CheckoutScreen from '../views/checkout/CheckoutScreen';
import ProfileScreen from '../views/profile/ProfileScreen';
import MainPage from '../views/main_page/MainPage';
import Test from '../views/main_page/Test';
import Search from '../views/main_page/component/pages/Search';
import MapScreen from '../views/checkout/MapScreen';

import AccountSetting from '../views/AccountSetting';
import {useUser} from '../context/userContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {setAppAccessToken} from '../services/api';

import {Product, addNewProduct} from '../redux/product/productSlice';
import {addNewSize} from '../redux/size/sizeSlice';
import {addNewTopping} from '../redux/topping/toppingSlice';
import {addNewCategory} from '../redux/category/categorySlice';
import {
  getAllProducts,
  getAllCategory,
  getAllTopping,
  getAllSize,
} from '../services/product-api';
import {useAppDispatch, useAppSelector} from '../redux/hook';
import ResetPassword from '../views/authentication/ResetPasswordScreen';

import {delay} from '@reduxjs/toolkit/dist/utils';
import { TurboModuleRegistry } from 'react-native';
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function AppNavigation(): JSX.Element {
  const {isSignout, token, _id, dispatch: authDispatch} = useAuth();
  const {
    user,
    getUserInfo,
    USER_REDUCER_TYPE,
    dispatch: userDispatch,
  } = useUser();


  const productDispatch = useAppDispatch();

  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  // console.log('isLoading', isLoading);
  const getUserInfoStorage = async () => {
    try {
      const data = await AsyncStorage.getItem('user_info');
      if (data) {
        const userInfo = JSON.parse(data);
        const userInfoParse = {...userInfo, dob: new Date(userInfo?.dob)};
        userDispatch({
          type: USER_REDUCER_TYPE.UPDATE_MANY,
          payload: userInfoParse,
        });
        return true;
      }
    } catch (error) {
      console.log(error);
    } finally {
      return false;
    }
  };
  const loadProductData = () => {
    Promise.all([
      getAllProducts(),
      getAllCategory(),
      getAllSize(),
      getAllTopping(),
    ])
      .then(responses => {
        console.log('responses', responses);
        responses[0]?.data.forEach((product: any) => {
          let toppingList: any = [];
          let category: any = [];
          let size: any = [];
          product.toppingList.forEach((topping: any) => {
            toppingList.push({toppingId: String(topping.toppingId._id)});
          });
          product.category.forEach((cate: any) => {
            category.push({
              title: String(cate.title),
            });
          });
          product.sizeList.forEach((s: any) => {
            size.push({
              sizeId: String(s.sizeId._id),
            });
          });
          let newProduct: Product = {
            productId: String(product._id),
            name: String(product.name),
            description: '',
            basePrice: Number(product.basePrice),
            discount: 0,
            category: category,
            sizeList: size,
            toppingList: toppingList,
            image: String(product.image),
          };
          productDispatch(addNewProduct(newProduct));
        });

        responses[1]?.data.forEach((category: any) => {
          productDispatch(
            addNewCategory({
              title: String(category.title),
              categoryId: String(category._id),
            }),
          );
        });

        responses[2]?.data.forEach((size: any) => {
          productDispatch(
            addNewSize({
              size: String(size.size),
              sizeId: String(size._id),
              price: Number(size.price),
            }),
          );
        });
        responses[3]?.data.forEach((topping: any) => {
          productDispatch(
            addNewTopping({
              toppingId: String(topping._id),
              name: String(topping.name),
              price: Number(topping.price),
            }),
          );
        });
      }).then((_) => setTimeout(() =>{setIsLoading(false)}, 3000))
      .catch(error => {
        console.log(error);
      });
  };

  const loadAuthInfo = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const _id = await AsyncStorage.getItem('_id');
      token && setAppAccessToken(token);
      authDispatch({type: AuthActionType.RESTORE_TOKEN, token, _id});
    } catch (e: any) {
      authDispatch({type: AuthActionType.GET_MESS, mess: 'Error loading app'});
    }
  };

  useEffect(() => {
    if (isSignout !== null) return;
    const initLoad = async () => {
      setIsLoading(true);
      await loadAuthInfo();
      await loadProductData();
    };
    initLoad();
  }, [isSignout]);

  useEffect(() => {
    if (isSignout !== false || !_id) return;
    const loadUserInfo = async () => {
      if (!isSignout) {
        const isHaveUserInfo = await getUserInfoStorage();
        if (!isHaveUserInfo) {
          await getUserInfo(_id);
        }
      }
    };
    loadUserInfo();
  }, [_id, isSignout]);
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
            <Stack.Screen
              name="Test"
              component={Test}
              options={{headerShown: false}}
            />
            <Stack.Screen name="Search" component={Search} />
            <Stack.Screen name="ResetPassword" component={ResetPassword} />
          </>
        ) : (
          <>
            <Stack.Screen
              name="HomeTabs"
              component={MainTabs}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Test"
              component={Test}
              options={{headerShown: false}}
            />
            <Stack.Screen name="Search" component={Search} />
            <Stack.Screen name="Cart" component={CartScreen} />
            <Stack.Screen name="EditProfile" component={EditProfileScreen} />
            <Stack.Screen name="Checkout" component={CheckoutScreen} />
            <Stack.Screen name="Profile" component={ProfileScreen} />
            <Stack.Screen name="Account Setting" component={AccountSetting} />
            <Stack.Screen name="Map Screen" component={MapScreen} />
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
      <Tab.Screen
        name="Home"
        component={MainPage}
        options={{headerShown: false}}
      />
      <Tab.Screen name="Me" component={MeScreen} />
    </Tab.Navigator>
  );
}

export default AppNavigation;

import React from 'react';
import SignIn from '../views/authentication/SignInScreen';
import SignUp from '../views/authentication/SignUpScreen';
import Splash from '../views/SplashScreen';
import MainScreen from '../views/main_page';
import MeScreen from '../views/profile/MeScreen';
import {Badge, Box} from 'native-base';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import {Flex} from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Anticons from 'react-native-vector-icons/AntDesign';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

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

function PublicStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen
        name="Splash"
        component={Splash}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen
        name="HomeTabs"
        component={MainTabs}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}

export default PublicStack;

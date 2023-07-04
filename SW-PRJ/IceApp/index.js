/* eslint-disable prettier/prettier */
/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {
  NativeBaseProvider,
  ColorMode,
  Box,
  Heading,
  useColorMode,
  Button,
} from 'native-base';
import type {StorageManager} from 'native-base';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {UserProvider} from './src/context/userContext';
import AuthContext, {AuthProvider} from './src/context/authContext';

const theme = {
  colors: {
    primary: 'tomato',
    secondary: 'blue',
  },
  components: {
    Button: {
      baseStyle: {
        _text: {
          color: 'white',
        },
      },
      defaultProps: {
        colorScheme: 'secondary',
      },
    },
  },
};

const NBApp = ({children, theme}: any) => {
  const colorModeManager: StorageManager = {
    get: async () => {
      try {
        let val = await AsyncStorage.getItem('@my-app-color-mode');
        return val === 'dark' ? 'dark' : 'light';
      } catch (e) {
        console.log(e);
        return 'light';
      }
    },
    set: async (value: ColorMode) => {
      try {
        await AsyncStorage.setItem('@my-app-color-mode', value);
      } catch (e) {
        console.log(e);
      }
    },
  };
  return (
    <NativeBaseProvider theme={theme} colorModeManager={colorModeManager}>
      {children}
    </NativeBaseProvider>
  );
};

const RTKApp = () => {
  const {colorMode, toggleColorMode} = useColorMode();

  return <App />;
};

AppRegistry.registerComponent(appName, () => RTKApp);

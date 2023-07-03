import React from 'react';
import AuthService from '../services/auth.service';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  AuthContextProps,
  LoginResponse,
  RegisterResponse,
  AuthState,
} from '../utils/types';

const initState: AuthState = {
  token: null,
  isSignout: true,
  username: null,
  isLoading: true,
  mess: null,
};

const AuthContext = React.createContext(initState);

export const useAuth = () => React.useContext(AuthContext);

export enum AuthActionType {
  SIGN_IN = 'SIGN_IN',
  SIGN_OUT = 'SIGN_OUT',
  RESTORE_TOKEN = 'RESTORE_TOKEN',
  GET_MESS = 'GET_MESS',
  IS_LOADING = 'IS_LOADING',
  SIGN_UP = 'SIGN_UP',
  LOADED = 'LOADED',
}

export const AuthProvider = ({children}) => {
  const [state, dispatch] = React.useReducer((prevState, action) => {
    switch (action.type) {
      case 'IS_LOADING':
        return {
          ...prevState,
          isLoading: true,
        };
      case 'LOADED':
        return {
          ...prevState,
          isLoading: false,
        };
      case 'RESTORE_TOKEN':
        return {
          ...prevState,
          username: action.username,
          token: action.token,
          isSignout: action.token === null,
          mess: null,
        };
      case 'SIGN_IN':
        return {
          ...prevState,
          isSignout: false,
          username: action.username,
          token: action.token,
          mess: {
            type: 'success',
            message: 'Login successfully',
          },
        };
      case 'SIGN_OUT':
        return {
          ...prevState,
          isSignout: true,
          username: null,
          token: null,
          mess: null,
        };
      case 'SIGN_UP':
        return {
          ...prevState,
          mess: {
            type: 'success',
            message: 'Register successfully',
          },
        };
      case 'GET_MESS':
        return {
          ...prevState,
          mess: {
            type: 'error',
            message: action.mess,
          },
        };
    }
  }, initState);

  React.useEffect(() => {
    const bootstrapAsync = async () => {
      dispatch({type: AuthActionType.IS_LOADING});
      try {
        const token = await AsyncStorage.getItem('token');
        const username = await AsyncStorage.getItem('username');
        dispatch({type: AuthActionType.RESTORE_TOKEN, token, username});
      } catch (e: any) {
        dispatch({type: AuthActionType.GET_MESS, mess: 'Error loading app'});
      } finally {
        dispatch({type: AuthActionType.LOADED});
      }
    };
    bootstrapAsync();
  }, []);

  const authContext: AuthContextProps = React.useMemo(
    () => ({
      signIn: async data => {
        try {
          const resData: LoginResponse = await AuthService.login(data);
          console.log(resData);
          if (resData.status === 'OK') {
            dispatch({
              type: AuthActionType.SIGN_IN,
              token: resData.data.token,
              username: resData.data.username,
            });
          } else if (resData.status === 'ERROR') {
            dispatch({
              type: AuthActionType.GET_MESS,
              mess: resData.data.message,
            });
          }
        } catch (e) {
          dispatch({
            type: AuthActionType.GET_MESS,
            mess: e.message,
          });
        }
      },
      signOut: async () => {
        await AuthService.logout();
        dispatch({type: 'SIGN_OUT'});
      },
      signUp: async data => {
        try {
          const resData: RegisterResponse = await AuthService.register(data);
          if (resData.status === 'OK') {
            dispatch({
              type: AuthActionType.SIGN_UP,
            });
          } else if (resData.status === 'ERROR') {
            dispatch({
              type: AuthActionType.GET_MESS,
              mess: resData.data,
            });
          }
        } catch (e) {
          dispatch({
            type: AuthActionType.GET_MESS,
            mess: e.message,
          });
        }
      },
    }),
    [],
  );

  return (
    <AuthContext.Provider value={{...state, ...authContext}}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

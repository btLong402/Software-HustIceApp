import React from 'react';
import AuthService from '../services/auth.service';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  AuthContextProps,
  LoginResponse,
  RegisterResponse,
  AuthState,
} from '../utils/types';
import {setAppAccessToken} from '../services/api';

const initState: AuthState = {
  token: null,
  isSignout: null,
  _id: null,
  mess: null,
};

const AuthContext = React.createContext(initState);

export const useAuth = () => React.useContext(AuthContext);

export enum AuthActionType {
  SIGN_IN = 'SIGN_IN',
  SIGN_OUT = 'SIGN_OUT',
  RESTORE_TOKEN = 'RESTORE_TOKEN',
  GET_MESS = 'GET_MESS',
  SIGN_UP = 'SIGN_UP',
  SET_MESS = 'SET_MESS',
}

export const AuthProvider = ({children} : any) => {
  const [state, dispatch] = React.useReducer((prevState : any, action : any) => {
    switch (action.type) {
      case AuthActionType.SET_MESS:
        return {
          ...prevState,
          mess: action.mess,
        };
      case AuthActionType.RESTORE_TOKEN:
        return {
          ...prevState,
          _id: action._id,
          token: action.token,
          isSignout: action.token === null,
          mess: null,
        };
      case AuthActionType.SIGN_IN:
        return {
          ...prevState,
          isSignout: false,
          _id: action._id,
          token: action.token,
          mess: {
            type: 'success',
            message: 'Login successfully',
          },
        };
      case AuthActionType.SIGN_OUT:
        return {
          ...prevState,
          isSignout: true,
          _id: null,
          token: null,
          mess: null,
        };
      case AuthActionType.SIGN_UP:
        return {
          ...prevState,
          mess: {
            type: 'success',
            message: 'Register successfully',
          },
        };
    }
  }, initState);

  const authContext: AuthContextProps = React.useMemo(
    () => ({
      setMess: mess => {
        dispatch({
          type: AuthActionType.SET_MESS,
          mess,
        });
      },
      signIn: async data => {
        try {
          const resData: LoginResponse = await AuthService.login(data);
          if (resData.status === 'OK') {
            dispatch({
              type: AuthActionType.SIGN_IN,
              token: resData.data.token,
              _id: resData.data._id,
            });
          } else if (resData.status === 'ERROR') {
            dispatch({
              type: AuthActionType.SET_MESS,
              mess: {
                type: 'error',
                message: resData.data,
              },
            });
          }
        } catch (e) {
          dispatch({
            type: AuthActionType.SET_MESS,
            mess: {
              type: 'error',
              message: e.message,
            },
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
              type: AuthActionType.SET_MESS,
              mess: {
                type: 'error',
                message: resData.data,
              },
            });
          }
        } catch (e) {
          dispatch({
            type: AuthActionType.GET_MESS,
            mess: {
              type: 'error',
              message: e.message,
            },
          });
        }
      },
    }),
    [],
  );

  return (
    <AuthContext.Provider value={{...state, dispatch, ...authContext}}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

import React from 'react';
import * as SecureStore from 'expo-secure-store';

const initState = {
  token: null,
  isSignout: false,
  user: null,
  isLoading: true,
};

const AuthContext = React.createContext(initState);

interface AuthContextProps {
  signIn: (data: {username: string; password: string}) => Promise<void>;
  signOut: () => void;
  signUp: (data: {username: string; password: string}) => Promise<void>;
}
export const useAuth = () => React.useContext(AuthContext);

export const AuthProvider = ({children}) => {
  const [state, dispatch] = React.useReducer((prevState, action) => {
    switch (action.type) {
      case 'RESTORE_TOKEN':
        return {
          ...prevState,
          user: action.user,
          token: action.token,
          isLoading: false,
        };
      case 'SIGN_IN':
        return {
          ...prevState,
          isSignout: false,
          user: action.user,
          token: action.token,
        };
      case 'SIGN_OUT':
        return {
          ...prevState,
          isSignout: true,
          user: null,
          token: null,
        };
    }
  }, initState);

  React.useEffect(() => {
    const bootstrapAsync = async () => {
      let userToken;
      let userInfo;
      try {
        userToken = await SecureStore.getItemAsync('userToken');
        userInfo = await SecureStore.getItemAsync('userInfo');
      } catch (e) {
        console.log(e);
      }
      dispatch({type: 'RESTORE_TOKEN', token: userToken, user: userInfo});
    };
    bootstrapAsync();
  }, []);

  const authContext: AuthContextProps = React.useMemo(
    () => ({
      signIn: async data => {
        // const responseData = await signIn({data.username, data.password});
        // if (responseData) {
        //     dispatch({
        //         type: 'SIGN_IN',
        //         token: responseData.token,
        //         user: responseData.user,
        //       });
        // }
      },
      signOut: () => dispatch({type: 'SIGN_OUT'}),
      signUp: async data => {
        // const responseData = await signUp({data.username, data.password});
        // if (responseData) {
        //     dispatch({
        //         type: 'SIGN_IN',
        //         token: responseData.token,
        //         user: responseData.user,
        //       });
        // }
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

import {
  useContext,
  createContext,
  useReducer,
  ReactNode,
  useEffect,
} from 'react';
import UserService from '../services/profile.service';

interface Avatar {
  uri: string | undefined;
  type: string | undefined;
  name: string | undefined;
  size: number | undefined;
}

interface UserState {
  fullname?: string | null;
  email?: string | null;
  phoneNumber?: string | null;
  dob?: Date | null;
  gender?: number | null;
  associationAccount?: null | string;
  level?: string | null;
  avatar?: Avatar | null;
}

interface Action {
  type: keyof typeof USER_REDUCER_TYPE;
  payload: any;
}

enum USER_REDUCER_TYPE {
  UPDATE_FULLNAME = 'UPDATE_FULLNAME',
  UPDATE_EMAIL = 'UPDATE_EMAIL',
  UPDATE_PHONE = 'UPDATE_PHONE',
  UPDATE_DOB = 'UPDATE_DOB',
  UPDATE_GENDER = 'UPDATE_GENDER',
  UPDATE_AVATAR = 'UPDATE_AVATAR',
  UPDATE_MANY = 'UPDATE_MANY',
}

const initState: UserState = {
  fullname: null,
  email: null,
  phoneNumber: null,
  dob: null,
  gender: null,
  level: null,
  avatar: null,
};
const reducer = (state: UserState, action: Action) => {
  switch (action.type) {
    case USER_REDUCER_TYPE.UPDATE_FULLNAME:
      return {...state, fullname: action.payload};
    case USER_REDUCER_TYPE.UPDATE_EMAIL:
      return {...state, email: action.payload};
    case USER_REDUCER_TYPE.UPDATE_PHONE:
      return {...state, phoneNumber: action.payload};
    case USER_REDUCER_TYPE.UPDATE_DOB:
      return {...state, dob: action.payload};
    case USER_REDUCER_TYPE.UPDATE_GENDER:
      return {...state, gender: action.payload};
    // case USER_REDUCER_TYPE.UPDATE_ASSOCIATION_ACCOUNT:
    //   return {...state, associationAccount: action.payload};
    case USER_REDUCER_TYPE.UPDATE_AVATAR:
      return {...state, avatar: action.payload};
    case USER_REDUCER_TYPE.UPDATE_MANY:
      return {...state, ...action.payload};
    default:
      return state;
  }
};

interface UserContextType {
  user: UserState;
  dispatch: (action: Action) => void;
  USER_REDUCER_TYPE: typeof USER_REDUCER_TYPE;
  getUserInfo: (id: string) => void;
  updateUserInfo: (id: string, data: UserState) => void;
}

const UserContext = createContext<UserContextType>({
  user: initState,
  dispatch: () => {},
  USER_REDUCER_TYPE,
  getUserInfo: () => {},
  updateUserInfo: () => {},
});

interface UserProviderProps {
  children: ReactNode;
}

export const useUser = () => useContext(UserContext);

export const UserProvider = ({children}: UserProviderProps) => {
  const [user, dispatch] = useReducer(reducer, initState);

  const getUserInfo = async (_id: string) => {
    const data = await UserService.getProfile(_id);

    if (data?.status === 'OK') {
      const userInfo = {...data?.data, dob: new Date(data?.data?.dob)};
      dispatch({type: USER_REDUCER_TYPE.UPDATE_MANY, payload: userInfo});
    }
  };

  const updateUserInfo = async (_id: string, data: UserState) => {
    console.log('updateUserInfo: ', data);
    const newData = await UserService.updateProfile(_id, data);
    if (newData?.status === 'OK') {
      dispatch({type: USER_REDUCER_TYPE.UPDATE_MANY, payload: newData.data});
    }
  };
  return (
    <UserContext.Provider
      value={{user, dispatch, USER_REDUCER_TYPE, getUserInfo, updateUserInfo}}>
      {children}
    </UserContext.Provider>
  );
};

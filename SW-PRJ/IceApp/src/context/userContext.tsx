// import {useContext, createContext, useReducer} from 'react';

// const initState = {
//   fullname: 'Nguyen Van Pepe',
//   email: 'pepe@gmail.com',
//   phone: '0123456789',
//   dob: new Date('1999-01-01'),
//   gender: 1,
//   associationAccount: null,
//   avatar: {
//     uri: 'https://ichef.bbci.co.uk/news/976/cpsprodpb/16620/production/_91408619_55df76d5-2245-41c1-8031-07a4da3f313f.jpg',
//   },
// };

// const USER_REDUCER_TYPE = {
//   UPDATE_FULLNAME: 'UPDATE_FULLNAME',
//   UPDATE_EMAIL: 'UPDATE_EMAIL',
//   UPDATE_PHONE: 'UPDATE_PHONE',
//   UPDATE_DOB: 'UPDATE_DOB',
//   UPDATE_GENDER: 'UPDATE_GENDER',
//   UPDATE_ASSOCIATION_ACCOUNT: 'UPDATE_ASSOCIATION_ACCOUNT',
//   UPDATE_AVATAR: 'UPDATE_AVATAR',
// };

// const reducer = (state, action) => {
//   switch (action.type) {
//     case 'UPDATE_FULLNAME':
//       return {...state, fullname: action.payload};
//     case 'UPDATE_EMAIL':
//       return {...state, email: action.payload};
//     case 'UPDATE_PHONE':
//       return {...state, phone: action.payload};
//     case 'UPDATE_DOB':
//       return {...state, dob: action.payload};
//     case 'UPDATE_GENDER':
//       return {...state, gender: action.payload};
//     case 'UPDATE_ASSOCIATION_ACCOUNT':
//       return {...state, associationAccount: action.payload};
//     case 'UPDATE_AVATAR':
//       return {...state, avatar: action.payload};
//   }
// };

// const UserContext = createContext(initState);
// export const useUser = () => useContext(UserContext);
// export const UserProvider = ({children}) => {
//   const [user, dispatch] = useReducer(reducer, initState);

//   return (
//     <UserContext.Provider value={{user, dispatch, USER_REDUCER_TYPE}}>
//       {children}
//     </UserContext.Provider>
//   );
// };
import {useContext, createContext, useReducer, ReactNode} from 'react';

interface Avatar {
  uri: string;
}

interface UserState {
  fullname: string;
  email: string;
  phone: string;
  dob: Date;
  gender: number;
  associationAccount: null | string;
  avatar: Avatar;
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
  UPDATE_ASSOCIATION_ACCOUNT = 'UPDATE_ASSOCIATION_ACCOUNT',
  UPDATE_AVATAR = 'UPDATE_AVATAR',
}

const initState: UserState = {
  fullname: 'Nguyen Van Pepe',
  email: 'pepe@gmail.com',
  phone: '0123456789',
  dob: new Date('1999-01-01'),
  gender: 1,
  associationAccount: null,
  avatar: {
    uri: 'https://ichef.bbci.co.uk/news/976/cpsprodpb/16620/production/_91408619_55df76d5-2245-41c1-8031-07a4da3f313f.jpg',
  },
};

const reducer = (state: UserState, action: Action) => {
  switch (action.type) {
    case USER_REDUCER_TYPE.UPDATE_FULLNAME:
      return {...state, fullname: action.payload};
    case USER_REDUCER_TYPE.UPDATE_EMAIL:
      return {...state, email: action.payload};
    case USER_REDUCER_TYPE.UPDATE_PHONE:
      return {...state, phone: action.payload};
    case USER_REDUCER_TYPE.UPDATE_DOB:
      return {...state, dob: action.payload};
    case USER_REDUCER_TYPE.UPDATE_GENDER:
      return {...state, gender: action.payload};
    case USER_REDUCER_TYPE.UPDATE_ASSOCIATION_ACCOUNT:
      return {...state, associationAccount: action.payload};
    case USER_REDUCER_TYPE.UPDATE_AVATAR:
      return {...state, avatar: action.payload};
    default:
      return state;
  }
};

interface UserContextType {
  user: UserState;
  dispatch: (action: Action) => void;
  USER_REDUCER_TYPE: typeof USER_REDUCER_TYPE;
}

const UserContext = createContext<UserContextType>({
  user: initState,
  dispatch: () => {},
  USER_REDUCER_TYPE,
});

interface UserProviderProps {
  children: ReactNode;
}

export const useUser = () => useContext(UserContext);

export const UserProvider = ({children}: UserProviderProps) => {
  const [user, dispatch] = useReducer(reducer, initState);

  return (
    <UserContext.Provider value={{user, dispatch, USER_REDUCER_TYPE}}>
      {children}
    </UserContext.Provider>
  );
};

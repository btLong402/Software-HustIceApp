import {useContext, createContext, useReducer} from 'react';

const initState = {
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

const USER_REDUCER_TYPE = {
  UPDATE_FULLNAME: 'UPDATE_FULLNAME',
  UPDATE_EMAIL: 'UPDATE_EMAIL',
  UPDATE_PHONE: 'UPDATE_PHONE',
  UPDATE_DOB: 'UPDATE_DOB',
  UPDATE_GENDER: 'UPDATE_GENDER',
  UPDATE_ASSOCIATION_ACCOUNT: 'UPDATE_ASSOCIATION_ACCOUNT',
  UPDATE_AVATAR: 'UPDATE_AVATAR',
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_FULLNAME':
      return {...state, fullname: action.payload};
    case 'UPDATE_EMAIL':
      return {...state, email: action.payload};
    case 'UPDATE_PHONE':
      return {...state, phone: action.payload};
    case 'UPDATE_DOB':
      return {...state, dob: action.payload};
    case 'UPDATE_GENDER':
      return {...state, gender: action.payload};
    case 'UPDATE_ASSOCIATION_ACCOUNT':
      return {...state, associationAccount: action.payload};
    case 'UPDATE_AVATAR':
      return {...state, avatar: action.payload};
  }
};

const UserContext = createContext(initState);
export const useUser = () => useContext(UserContext);
export const UserProvider = ({children}) => {
  const [user, dispatch] = useReducer(reducer, initState);

  return (
    <UserContext.Provider value={{user, dispatch, USER_REDUCER_TYPE}}>
      {children}
    </UserContext.Provider>
  );
};

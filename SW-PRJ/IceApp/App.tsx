import {AuthProvider} from './src/context/authContext';
import {UserProvider} from './src/context/userContext';
import {NativeBaseProvider} from 'native-base';
import AppNavigation from './src/navigations/AppNavigation';
import { store } from './src/redux/store';
import { Provider } from 'react-redux';

function App(): JSX.Element {
  return (
    
    <AuthProvider>
      <Provider store={store}>
      <UserProvider>
        <NativeBaseProvider>
          <AppNavigation />
        </NativeBaseProvider>
      </UserProvider>
      </Provider>
    </AuthProvider>
  );
}

export default App;

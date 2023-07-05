import {AuthProvider} from './src/context/authContext';
import {UserProvider} from './src/context/userContext';
import {NativeBaseProvider} from 'native-base';
import AppNavigation from './src/navigations/AppNavigation';
import {store} from './src/redux/store';
import {Provider} from 'react-redux';

function App(): JSX.Element {
  return (
    <Provider store={store}>
      <AuthProvider>
        <UserProvider>
          <NativeBaseProvider>
            <AppNavigation />
          </NativeBaseProvider>
        </UserProvider>
      </AuthProvider>
    </Provider>
  );
}

export default App;

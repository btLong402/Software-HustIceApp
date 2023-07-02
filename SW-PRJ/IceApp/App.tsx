import {AuthProvider} from './src/context/authContext';
import {UserProvider} from './src/context/userContext';
import {NativeBaseProvider} from 'native-base';
import AppNavigation from './src/navigations/AppNavigation';

function App(): JSX.Element {
  return (
    <AuthProvider>
      <UserProvider>
        <NativeBaseProvider>
          <AppNavigation />
        </NativeBaseProvider>
      </UserProvider>
    </AuthProvider>
  );
}
export default App;

import firebaseApp from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyDOVsoQJ0hr06g4oCLcA8Rcylw108WKg9A',
  authDomain: 'sweproj-40f37.firebaseapp.com',
  projectId: 'sweproj-40f37',
  storageBucket: 'sweproj-40f37.appspot.com',
  messagingSenderId: '847425646681',
  appId: '1:847425646681:web:4264f7ddee84098a498148',
  measurementId: 'G-HYWG0915GD',
};

if (!firebaseApp.apps.length) {
  firebaseApp.initializeApp(firebaseConfig);
}
export default () => {
  return {firebaseApp, auth};
};

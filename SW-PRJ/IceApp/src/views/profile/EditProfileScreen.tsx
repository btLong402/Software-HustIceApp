import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, TextInput} from 'react-native';
import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from './types'; // import your stack param list types
import Ionicons from 'react-native-vector-icons/Ionicons';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useLayoutEffect} from 'react';

type EditProfileScreenRouteProp = RouteProp<RootStackParamList, 'EditProfile'>;
type ProfileScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Profile'
>;

type EditProfileScreenProps = {
  route: EditProfileScreenRouteProp;
  navigation: ProfileScreenNavigationProp;
};

const EditProfileScreen: React.FC<EditProfileScreenProps> = ({
  route,
  navigation,
}) => {
  const {label, value} = route.params;

  const [isCanSaved, setIsCanSaved] = useState(false);

  const handleSavedDisplay = value => setIsCanSaved(value);

  let editScreen;
  switch (label) {
    case 'Fullname':
      editScreen = (
        <FullnameEditScreen
          value={value}
          onChangeSavedDisplay={handleSavedDisplay}
        />
      );
      break;
    case 'Email':
      editScreen = (
        <EmailEditScreen
          value={value}
          onChangeSavedDisplay={handleSavedDisplay}
        />
      );
      break;
    case 'Phone':
      editScreen = (
        <PhoneEditScreen
          value={value}
          onChangeSavedDisplay={handleSavedDisplay}
        />
      );
      break;
    default:
  }
  useLayoutEffect(() => {
    const headerLeft = () => (
      <Ionicons
        name="arrow-back"
        size={30}
        color="white"
        style={{marginLeft: 10}}
        onPress={() => {
          navigation.goBack();
        }}
      />
    );
    navigation.setOptions({
      title: 'Edit ' + label,
      headerLeft: headerLeft,
      headerTintColor: 'white',
      headerStyle: {
        backgroundColor: 'crimson',
      },
      headerTitleStyle: {
        fontSize: 20, // set the font size of the header title to 20
        fontWeight: 500, // set the font weight of the header title to bold
        letterSpacing: 1, // set the letter spacing to 0.5
      },
      headerRight: () => (
        <Ionicons
          name="checkmark"
          size={30}
          color="white"
          style={{marginRight: 10, opacity: isCanSaved ? 1 : 0.5}}
          onPress={() => {
            isCanSaved && navigation.goBack();
          }}
        />
      ),
    });
  }, [navigation, isCanSaved]);

  return (
    <View style={styles.container}>
      <SafeAreaView>{editScreen}</SafeAreaView>
    </View>
  );
};

const FullnameEditScreen = ({value, onChangeSavedDisplay}) => {
  const [fullname, setFullname] = useState(value);
  const handleFullnameChange = text => {
    setFullname(text);
  };
  useLayoutEffect(() => {
    if (fullname === value || fullname.length === 0) {
      onChangeSavedDisplay(false);
    } else {
      onChangeSavedDisplay(true);
    }
  }, [fullname]);

  return (
    <View>
      <TextInput
        style={styles.input}
        value={fullname}
        onChangeText={handleFullnameChange}
        placeholder="Enter your fullname"
        maxLength={100}
      />
      <Text style={{margin: 5, fontSize: 14, opacity: 0.5}}>
        100 characters only
      </Text>
    </View>
  );
};

const EmailEditScreen = ({value, onChangeSavedDisplay}) => {
  const [email, setEmail] = useState(value);
  const handleEmailChange = text => {
    setEmail(text);
  };
  useLayoutEffect(() => {
    const regexEmail = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    if (!regexEmail.test(email) || email === value || email.length === 0) {
      onChangeSavedDisplay(false);
    } else {
      onChangeSavedDisplay(true);
    }
  }, [email]);

  return (
    <View>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={handleEmailChange}
        placeholder="Enter your email"
      />
      <Text style={{margin: 5, fontSize: 14, opacity: 0.5}}>
        Example: example@gmail.com
      </Text>
    </View>
  );
};

const PhoneEditScreen = ({value, onChangeSavedDisplay}) => {
  const [phone, setPhone] = useState(value);
  const handlePhoneChange = text => {
    setPhone(text);
  };
  useLayoutEffect(() => {
    const regexPhone = /^0[0-9]{9}$/g;
    if (!regexPhone.test(phone) || phone === value || phone.length === 0) {
      onChangeSavedDisplay(false);
    } else {
      onChangeSavedDisplay(true);
    }
  }, [phone]);

  return (
    <View>
      <TextInput
        style={styles.input}
        value={phone}
        onChangeText={handlePhoneChange}
        placeholder="Enter your phone number"
      />
      <Text style={{margin: 5, fontSize: 14, opacity: 0.5}}>
        Example: 0123456789
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eeeeee',
  },
  input: {
    marginTop: -10,
    fontSize: 18,
    borderWidth: 0.1,
    borderColor: 'gray',
    paddingVertical: 15,
    paddingHorizontal: 10,
    backgroundColor: 'white',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
});

export default EditProfileScreen;

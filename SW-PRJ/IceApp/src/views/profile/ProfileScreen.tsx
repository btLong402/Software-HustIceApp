import {
  Image,
  View,
  SafeAreaView,
  TouchableWithoutFeedback,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useState, useLayoutEffect, useRef} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {styles} from './styles';
import DatePicker from 'react-native-date-picker';
import {useToast, Box, Text, HStack, Spinner, Flex, Center} from 'native-base';
import {ImagePickerModal} from './ImagePickerModal';
import ImagePicker from 'react-native-image-crop-picker';
import {useUser} from '../../context/userContext';
import {useAuth} from '../../context/authContext';
export const convertGender = (type: number) => {
  switch (type) {
    case 0:
      return 'Male';
    case 1:
      return 'Female';
    case 2:
      return 'Other';
    default:
      return 'Unknown';
  }
};

const ProfileScreen = ({route, navigation}) => {
  const {user: userProfile, update_mess, updateUserInfo} = useUser();
  const {_id} = useAuth();
  const [userProfileState, setUserProfileState] = useState(userProfile);
  const userProfileRef = useRef(userProfileState);
  const [isLoading, setIsLoading] = useState(false);
  useLayoutEffect(() => {
    if (!route.params?.data) return;
    setUserProfileState(previousState => ({
      ...previousState,
      ...route.params.data,
    }));
  }, [route.params]);

  useLayoutEffect(() => {
    const headerLeft = () => (
      <Ionicons
        name="arrow-back"
        size={30}
        style={{marginLeft: 10, color: 'crimson', opacity: isLoading ? 0.5 : 1}}
        onPress={() => {
          !isLoading && navigation.goBack();
        }}
      />
    );
    navigation.setOptions({
      title: 'Edit Profile',
      headerLeft: headerLeft,
      headerStyle: {
        backgroundColor: 'white',
      },
      headerTintColor: 'black',
      headerTitleStyle: {
        fontSize: 20, // set the font size of the header title to 20
        fontWeight: 500, // set the font weight of the header title to bold
        letterSpacing: 1, // set the letter spacing to 0.5
      },
      headerRight: () => (
        <TouchableOpacity
          onPress={async () => {
            if (userProfileState !== userProfile && !isLoading) {
              // console.log('userProfileState Save: ', userProfileRef.current);
              setIsLoading(true);
              await updateUserInfo(_id, userProfileRef.current);
              setIsLoading(false);
              update_mess(null);
              navigation.goBack();
            }
          }}>
          <Text
            fontWeight={'500'}
            style={{
              marginRight: 10,
              fontSize: 20,
              opacity: userProfileState === userProfile && !isLoading ? 0.5 : 1,
              color: 'crimson',
            }}>
            Save
          </Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation, userProfileState === userProfile]);

  const [visible, setVisible] = useState(false);
  const [openDatePicker, setOpenDatePicker] = useState(false);
  const toast = useToast();

  const onImageLibraryPress = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    })
      .then(image => {
        console.log({
          uri: image.path,
          type: image.mime,
          name: image.filename,
          size: image.size,
        });
        setVisible(false);
        setUserProfileState(previousState => ({
          ...previousState,
          avatar: {
            uri: image.path,
            type: image.mime,
            name: image.filename,
            size: image.size,
          },
        }));
      })
      .catch(err => {
        toast.show({
          render: () => {
            return (
              <Box bg="red.400" px="2" py="1" rounded="sm" mb={5}>
                {err.message}
              </Box>
            );
          },
        });
      });
  };

  const onCameraPress = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    })
      .then(image => {
        // console.log(image);
      })
      .catch(err => {
        toast.show({
          render: () => {
            return (
              <Box bg="red.400" px="2" py="1" rounded="sm" mb={5}>
                {err.message}
              </Box>
            );
          },
        });
      });
  };

  const handleClickChangeType = (label, value) => {
    if (label === 'Fullname' || label === 'Email' || label === 'Phone') {
      value = value.includes('Enter') ? '' : value;

      navigation.navigate('EditProfile', {
        label,
        value,
        previousScreen: route.name,
      });
    } else if (label === 'Gender') {
      navigation.navigate('EditProfile', {
        label,
        value,
        previousScreen: route.name,
      });
    } else if (label === 'Date of Birth') {
      setOpenDatePicker(true);
    } else if (label === 'Association Account') {
      toast.show({
        render: () => {
          return (
            <Box bg="red.400" px="2" py="1" rounded="sm" mb={5}>
              Hello! Have a nice day
            </Box>
          );
        },
      });
    }
  };

  userProfileRef.current = userProfileState;

  return (
    <ScrollView style={styles.container}>
      <SafeAreaView style={{flex: 1}}>
        {isLoading && (
          <Center
            margin={0}
            padding={0}
            width={'100%'}
            height={'100%'}
            background={'rgba(0,0,0,0.3)'}
            style={{
              position: 'absolute',
              zIndex: 999,
              left: 0,
            }}>
            <Spinner size={'lg'} color="crimson" />
          </Center>
        )}
        <View style={styles.avatarContainer}>
          <View>
            <TouchableWithoutFeedback onPress={() => setVisible(true)}>
              <Image
                style={styles.avatar}
                source={{
                  uri:
                    userProfileState.avatar && userProfileState.avatar.uri
                      ? userProfileState.avatar.uri
                      : 'https://anubis.gr/wp-content/uploads/2018/03/no-avatar.png',
                }}
              />
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={() => setVisible(true)}>
              <Text
                style={{
                  padding: 10,
                  fontWeight: 500,
                  color: 'white',
                  textAlign: 'center',
                  fontSize: 13,
                }}>
                Edit
              </Text>
            </TouchableWithoutFeedback>
          </View>
        </View>
        <View style={styles.infoContainer}>
          <View>
            <ProfileRow
              label="Fullname"
              value={
                userProfileState.fullname
                  ? userProfileState.fullname
                  : 'Enter fullname'
              }
              navigation={navigation}
              onClick={handleClickChangeType}
            />
            <ProfileRow
              label="Email"
              value={
                userProfileState.email !== 'null'
                  ? userProfileState.email
                  : 'Enter email'
              }
              navigation={navigation}
              onClick={handleClickChangeType}
            />
            <ProfileRow
              label="Phone"
              value={
                userProfileState.phoneNumber
                  ? userProfileState.phoneNumber
                  : 'Enter phone'
              }
              navigation={navigation}
              onClick={handleClickChangeType}
            />
            <ProfileRow
              label="Gender"
              value={
                userProfileState.gender !== null ? userProfileState.gender : -1
              }
              navigation={navigation}
              onClick={handleClickChangeType}
            />
            <ProfileRow
              label="Date of Birth"
              value={
                userProfileState.dob
                  ? userProfileState.dob
                  : 'Enter date of birth'
              }
              onClick={handleClickChangeType}
            />
            <ProfileRow
              label="Association Account"
              value="@example"
              onClick={handleClickChangeType}
            />
          </View>
        </View>
      </SafeAreaView>
      {/* {openGenderPicker && GenderPicker} */}
      <DatePicker
        modal
        mode="date"
        open={openDatePicker}
        date={
          userProfileState.dob && userProfileState.dob instanceof Date
            ? userProfileState.dob
            : new Date()
        }
        key={
          userProfileState.dob && userProfileState.dob instanceof Date
            ? userProfileState.dob.toISOString()
            : new Date().toISOString()
        }
        display={'compact'}
        onConfirm={date => {
          setOpenDatePicker(false);
          setUserProfileState(previousState => ({
            ...previousState,
            dob: date,
          }));
        }}
        onCancel={() => {
          setOpenDatePicker(false);
        }}
      />
      <ImagePickerModal
        isVisible={visible}
        onClose={() => setVisible(false)}
        onImageLibraryPress={onImageLibraryPress}
        onCameraPress={onCameraPress}
      />
    </ScrollView>
  );
};

const ProfileRow = ({label, value, onClick}) => {
  let valueText = value;
  if (label === 'Date of Birth') {
    if (valueText instanceof Date) valueText = valueText.toLocaleDateString();
  } else if (label === 'Gender') {
    valueText = convertGender(value);
  }
  const handlePress = () => {
    onClick(label, value);
  };
  return (
    <>
      <View style={styles.rowBetween}>
        <Text style={styles.label}>{label}</Text>
        <TouchableOpacity style={styles.valueSection} onPress={handlePress}>
          <Text style={styles.value}>{valueText}</Text>
          <Ionicons name="chevron-forward-outline" size={20} color="black" />
        </TouchableOpacity>
      </View>
      <View style={styles.line} />
    </>
  );
};

export default ProfileScreen;

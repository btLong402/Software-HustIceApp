import {
  Image,
  View,
  SafeAreaView,
  TouchableWithoutFeedback,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useState, useLayoutEffect} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {styles} from './styles';
import DatePicker from 'react-native-date-picker';
import {useToast, Box, Text, HStack} from 'native-base';
import {ImagePickerModal} from './ImagePickerModal';
import ImagePicker from 'react-native-image-crop-picker';
import {useUser} from '../../context/userContext';

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

const ProfileScreen = ({navigation}) => {
  const {user: userProfile, dispatch, USER_REDUCER_TYPE} = useUser();

  useLayoutEffect(() => {
    const headerLeft = () => (
      <Ionicons
        name="arrow-back"
        size={30}
        style={{marginLeft: 10, color: 'crimson'}}
        onPress={() => {
          navigation.goBack();
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
        <TouchableOpacity>
          <Text
            fontWeight={'500'}
            style={{
              marginRight: 10,
              fontSize: 20,
              opacity: 1,
              color: 'crimson',
            }}
            onPress={() => {
              navigation.goBack();
            }}>
            Save
          </Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

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
        setVisible(false);
        dispatch({
          type: USER_REDUCER_TYPE.UPDATE_AVATAR,
          payload: {
            uri: image.path,
            type: image.mime,
            name: image.filename,
            size: image.size,
          },
        });
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
        console.log(image);
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
    if (
      label === 'Fullname' ||
      label === 'Email' ||
      label === 'Phone' ||
      label === 'Gender'
    ) {
      navigation.navigate('EditProfile', {label, value});
    } else if (label === 'Date of Birth') {
      setOpenDatePicker(true);
    } else if (label === 'Association Account') {
      console.log('No navigation');
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

  return (
    <ScrollView style={styles.container}>
      <SafeAreaView style={{flex: 1}}>
        <View style={styles.avatarContainer}>
          <View>
            <TouchableWithoutFeedback onPress={() => setVisible(true)}>
              <Image
                style={styles.avatar}
                source={{
                  uri: userProfile.avatar.uri,
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
              value={userProfile.fullname}
              navigation={navigation}
              onClick={handleClickChangeType}
            />
            <ProfileRow
              label="Email"
              value={userProfile.email}
              navigation={navigation}
              onClick={handleClickChangeType}
            />
            <ProfileRow
              label="Phone"
              value={userProfile.phone}
              navigation={navigation}
              onClick={handleClickChangeType}
            />
            <ProfileRow
              label="Gender"
              value={userProfile.gender}
              navigation={navigation}
              onClick={handleClickChangeType}
            />
            <ProfileRow
              label="Date of Birth"
              value={userProfile.dob}
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
        date={userProfile.dob}
        key={userProfile.dob.toISOString()}
        display={'compact'}
        onConfirm={date => {
          setOpenDatePicker(false);
          dispatch({
            type: USER_REDUCER_TYPE.UPDATE_DOB,
            payload: date,
          });
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
    valueText = valueText.toLocaleDateString();
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

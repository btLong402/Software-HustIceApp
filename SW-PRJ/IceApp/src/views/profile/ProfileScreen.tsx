import {Image, View, Text, SafeAreaView, TouchableOpacity} from 'react-native';
import {Picker as SelectPicker} from '@react-native-picker/picker';
import React, {useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {styles} from './styles';
import DatePicker from 'react-native-date-picker';
import {ScrollView} from 'react-native-gesture-handler';

const ProfileScreen = ({navigation}) => {
  const userProfile = {
    fullname: 'Nguyen Van Pepe',
    email: 'pepe@gmail.com',
    phone: '0123456789',
    dob: new Date('1999-01-01'),
    gender: 'Male',
    associationAccount: null,
  };

  const [openDatePicker, setOpenDatePicker] = useState(false);
  const [openGenderPicker, setOpenGenderPicker] = useState(false);

  const handleClickChangeType = (label, value) => {
    if (label === 'Fullname' || label === 'Email' || label === 'Phone') {
      navigation.navigate('EditProfile', {label, value});
    } else if (label === 'Date of Birth') {
      setOpenDatePicker(true);
    } else if (label === 'Gender') {
      console.log('test');
      setOpenGenderPicker(true);
    } else {
      console.log('No navigation');
    }
  };

  const GenderPicker = (
    <View>
      <Text>Select Gender:</Text>
      <SelectPicker selectedValue={userProfile.gender} onValueChange={() => {}}>
        <SelectPicker.Item label="Male" value="Male" />
        <SelectPicker.Item label="Female" value="Female" />
        <SelectPicker.Item label="Other" value="Other" />
      </SelectPicker>
    </View>
  );

  return (
    <View style={styles.container}>
      <SafeAreaView style={{flex: 1}}>
        <View style={styles.avatarContainer}>
          <View>
            <Image
              style={styles.avatar}
              source={{
                uri: 'https://ichef.bbci.co.uk/news/976/cpsprodpb/16620/production/_91408619_55df76d5-2245-41c1-8031-07a4da3f313f.jpg.webp',
              }}
            />
            <Text
              style={{
                marginTop: 10,
                color: 'white',
                textAlign: 'center',
                fontSize: 12,
              }}>
              Edit
            </Text>
          </View>
        </View>

        <View style={styles.infoContainer}>
          <ScrollView>
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
          </ScrollView>
        </View>
      </SafeAreaView>
      {/* {openGenderPicker && GenderPicker} */}
      <DatePicker
        modal
        open={openDatePicker}
        date={userProfile.dob}
        onConfirm={date => {
          setOpenDatePicker(false);
          // setDate(date)
        }}
        onCancel={() => {
          setOpenDatePicker(false);
        }}
      />
    </View>
  );
};

const ProfileRow = ({label, value, onClick}) => {
  let valueText = value;
  if (label === 'Date of Birth') {
    valueText = valueText.toLocaleDateString();
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

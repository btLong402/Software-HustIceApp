import {View, TouchableWithoutFeedback} from 'react-native';
import React, {Component} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  Box,
  Flex,
  HStack,
  Image,
  VStack,
  Text,
  Icon,
  ScrollView,
  Divider,
  Badge,
} from 'native-base';
import Anticons from 'react-native-vector-icons/AntDesign';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
// import {TouchableOpacity} from 'react-native-gesture-handler';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const MeHStack = ({icon, name}) => {
  return (
    <Box>
      <HStack
        justifyContent={'space-between'}
        alignItems={'center'}
        py={4}
        px={2}>
        <HStack justifyContent="flex-start" alignItems={'center'} space={3}>
          {icon}
          <Text fontSize="lg" opacity={0.9}>
            {name}
          </Text>
        </HStack>
        <Anticons name={'right'} size={18} color={'#1e2a3b'} />
      </HStack>
      <Divider width={'95%'} alignSelf={'center'} />
    </Box>
  );
};
const BadgeNumber = ({number}) => {
  return (
    <Box
      height={6}
      width={number > 99 ? 7 : 6}
      position={'absolute'}
      borderRadius={20}
      borderWidth={1}
      borderColor={'white'}
      zIndex={1}
      // padding={1}
      style={{
        backgroundColor: 'crimson',
        right: number > 99 ? -10 : -6,
        top: -6,
      }}
      justifyContent={'center'}
      alignItems={'center'}>
      <Text
        color="white"
        fontWeight={'semibold'}
        // fontSize="sm"
        style={{
          fontSize: 11,
        }}>
        {number > 99 ? '99+' : number}
      </Text>
    </Box>
  );
};
export default MeScreen = ({navigation}) => {
  return (
    <View flex={1}>
      <Box backgroundColor={'crimson'}>
        <VStack>
          <HStack
            justifyContent="start"
            marginBottom={'5'}
            alignItems={'center'}>
            <TouchableWithoutFeedback
              onPress={() => {
                navigation.navigate('Profile');
              }}>
              <Image
                marginX={'3'}
                size="md"
                source={{
                  uri: 'https://ichef.bbci.co.uk/news/976/cpsprodpb/16620/production/_91408619_55df76d5-2245-41c1-8031-07a4da3f313f.jpg.webp',
                }}
                alt="Avatar"
                borderRadius="full"
              />
            </TouchableWithoutFeedback>
            <VStack justifyContent={'start'} space={1}>
              <Text fontSize="xl" color="white" fontWeight={'bold'}>
                Nguyen Van Pepe
              </Text>
              <Box alignSelf={'flex-start'}>
                <LinearGradient
                  colors={['#EAEAEA', '#D6D6D6', '#C4C4C4']}
                  style={{
                    borderRadius: 20,
                  }}>
                  <HStack
                    space={2}
                    px={2}
                    py={0.5}
                    alignItems="center"
                    justifyContent="start">
                    <Text color="#1e2a3b">Silver member</Text>
                    <Anticons name={'right'} size={14} color={'#1e2a3b'} />
                  </HStack>
                </LinearGradient>
              </Box>
              <Text color="white">
                <Text fontWeight={'bold'} fontSize={'md'}>
                  1000
                </Text>
                <Text> points</Text>
              </Text>
            </VStack>
          </HStack>
        </VStack>
      </Box>

      <ScrollView backgroundColor={'#ececec'} py={2}>
        <VStack
          backgroundColor={'white'}
          shadow={{
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 1,
            },
            shadowOpacity: 0.25,
            shadowRadius: 1,
            // marginBottom: ,
          }}>
          <HStack justifyContent="space-between" py={4} px={2}>
            <HStack
              alignItems={'center'}
              space={1}
              justifyContent={'flex-start'}>
              <Ionicons
                name={'clipboard-outline'}
                size={32}
                color={'#29538f'}
              />
              <Text fontSize={'lg'} fontWeight={'medium'}>
                My Purchases
              </Text>
            </HStack>
            <HStack alignItems={'center'} space={1} justifyContent={'flex-end'}>
              <Text fontSize={'sm'} fontWeight={'light'}>
                View Purchase History
              </Text>
              <Anticons name={'right'} size={18} color={'#1e2a3b'} />
            </HStack>
          </HStack>
          <Divider width={'95%'} alignSelf={'center'} />
          <HStack
            alignItems={'center'}
            justifyContent={'space-around'}
            py={4}
            px={2}>
            <VStack alignItems={'center'} space={4}>
              <Box>
                <BadgeNumber number={1} />
                <MaterialIcons name={'payment'} size={35} color={'#5d5d5d'} />
              </Box>
              <Text fontSize={'sm'} fontWeight={'light'}>
                To pay
              </Text>
            </VStack>
            <VStack alignItems={'center'} space={4}>
              <Box>
                <BadgeNumber number={12} />
                <Anticons name={'inbox'} size={35} color={'#5d5d5d'} />
              </Box>
              <Text fontSize={'sm'} fontWeight={'light'}>
                To Ship
              </Text>
            </VStack>
            <VStack alignItems={'center'} space={4}>
              <Box>
                <BadgeNumber number={120} />
                <MaterialIcons
                  name={'local-shipping'}
                  size={35}
                  color={'#5d5d5d'}
                />
              </Box>
              <Text fontSize={'sm'} fontWeight={'light'}>
                To Receive
              </Text>
            </VStack>
            <VStack alignItems={'center'} space={4}>
              <Box>
                <BadgeNumber number={12} />
                <Anticons name={'staro'} size={35} color={'#5d5d5d'} />
              </Box>
              <Text fontSize={'sm'} fontWeight={'light'}>
                To Rate
              </Text>
            </VStack>
          </HStack>
        </VStack>
        <VStack
          backgroundColor={'white'}
          mt={3}
          shadow={{
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 1,
            },
            shadowOpacity: 0.25,
            shadowRadius: 1,
          }}>
          <MeHStack
            icon={
              <Anticons
                name={'wallet'}
                size={28}
                style={{
                  color: 'crimson',
                }}
              />
            }
            name={'My wallet'}
          />
          <MeHStack
            icon={
              <Anticons
                name={'hearto'}
                size={28}
                style={{
                  color: 'orange',
                }}
              />
            }
            name={'My likes'}
          />
          <MeHStack
            icon={
              <Anticons
                name={'clockcircleo'}
                size={28}
                style={{
                  color: 'blue',
                  opacity: 0.6,
                }}
              />
            }
            name={'Recently viewed'}
          />
          <MeHStack
            icon={
              <Anticons
                name={'staro'}
                size={28}
                style={{
                  color: 'green',
                  opacity: 0.6,
                }}
              />
            }
            name={'My Rating'}
          />
        </VStack>
        <VStack
          backgroundColor={'white'}
          mt={3}
          shadow={{
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 1,
            },
            shadowOpacity: 0.25,
            shadowRadius: 1,
          }}>
          <MeHStack
            icon={
              <Anticons
                name={'setting'}
                size={28}
                style={{
                  color: 'blue',
                  opacity: 0.6,
                }}
              />
            }
            name={'Account Settings'}
          />
          <MeHStack
            icon={
              <Anticons
                name={'questioncircleo'}
                size={28}
                style={{
                  color: 'orange',
                }}
              />
            }
            name={'Help Centre'}
          />
          <MeHStack
            icon={
              <Anticons
                name={'wechat'}
                size={28}
                style={{
                  color: 'green',
                  opacity: 0.6,
                }}
              />
            }
            name={'Chat with us'}
          />
        </VStack>
      </ScrollView>
    </View>
  );
};

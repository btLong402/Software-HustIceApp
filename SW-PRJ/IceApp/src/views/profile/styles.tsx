import {StyleSheet, StatusBar} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'crimson',
    paddingTop: StatusBar.currentHeight,
  },
  avatarContainer: {
    alignItems: 'center',
    flex: 1,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: 'white',
    objectFit: 'cover',
  },
  editAva: {
    color: 'white',
    fontSize: 16,
    position: 'absolute',
  },
  infoContainer: {
    marginTop: 40,
    backgroundColor: 'white',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    flex: 3,
    paddingVertical: 30,
    paddingHorizontal: 15,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.4,
    shadowRadius: 3,
  },
  label: {
    color: 'black',
    fontSize: 18,
    fontWeight: '500',
  },
  valueSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  value: {
    color: 'black',
    fontSize: 16,
  },
  rowBetween: {
    marginTop: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  line: {
    height: 1,
    width: '100%',
    backgroundColor: 'black',
    marginTop: 10,
    alignSelf: 'center',
    opacity: 0.2,
  },

  header: {
    width: '100%',
    height: 320,
    alignItems: 'center',
  },
});

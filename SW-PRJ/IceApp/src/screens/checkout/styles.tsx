import {StyleSheet} from 'react-native';

export default styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6f6f6',
    paddingVertical: 30,
    paddingHorizontal: 15,
  },
  childContainer: {
    flexDirection: 'column',
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 20,
    borderRadius: 10,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.4,
    shadowRadius: 1.5,
  },
  row: {
    flexDirection: 'row',
  },
  button: {
    backgroundColor: 'crimson',
    width: '90%',
    borderRadius: 10,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.4,
    shadowRadius: 1,
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: '500',
    letterSpacing: 0.8,
  },
});

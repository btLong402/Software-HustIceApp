import {View} from 'react-native';

export default Spacer = ({height = 0, width = 0}) => {
  return <View style={{paddingTop: height, paddingLeft: width}} />;
};

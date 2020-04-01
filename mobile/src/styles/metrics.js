import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const metrics = {
  smallMargin: 5,
  baseMargin: 10,
  basePadding: 20,
  screenWidth: width < height ? width : height,
  screenHeight: width < height ? height : width,
  baseRadius: 5,
};

export default metrics;

import { StyleSheet, Dimensions } from 'react-native';
import { colors, general, metrics } from '../../styles';

export default StyleSheet.create({
  container: {
    ...general.container,
  },

  header: {
    ...general.header,
  },

  headerTitle: {
    ...general.headerTitle,
    marginTop: 14,
    fontWeight: 'bold',
  },

  camera: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    height: Dimensions.get('window').width / 2,
    width: Dimensions.get('window').width / 2,
  },

  rectangleContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },

  rectangle: {
    height: 150,
    width: 150,
    borderWidth: 2,
    borderColor: '#00FF00',
    backgroundColor: 'transparent',
  },

  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  button: {
    ...general.button,
    marginVertical: 20,
    height: 50,
    width: 50,
    borderRadius: 25,
  },

  buttonText: {
    ...general.buttonText,
  },
});

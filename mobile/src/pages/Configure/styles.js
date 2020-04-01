import { StyleSheet } from 'react-native';
import { colors, metrics, fonts, general } from '../../styles';

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

  content: {
    flex: 1,
    marginHorizontal: metrics.smallMargin / 2,
    marginTop: metrics.smallMargin,
    marginBottom: metrics.basePadding,
    padding: 10,
    backgroundColor: colors.lighter,
    borderColor: colors.regular,
    borderWidth: 1,
    borderRadius: metrics.baseRadius,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
  },

  textLabel: {
    fontSize: fonts.regular,
    color: colors.regular,
    marginTop: 20,
  },

  textInput: {
    ...general.textInput,
    marginTop: 10,
  },

  button: {
    ...general.button,
    marginVertical: 20,
  },

  buttonText: {
    ...general.buttonText,
  },

  linkButton: {
    ...general.linkButton,
    marginTop: 5,
  },

  linkButtonText: {
    ...general.linkButtonText,
  },
});

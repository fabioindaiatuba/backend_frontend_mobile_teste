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
    padding: metrics.basePadding,
    backgroundColor: colors.lighter,
    borderColor: colors.regular,
    borderWidth: 1,
    borderRadius: metrics.baseRadius,
    justifyContent: 'space-between',
  },

  infoButton: {
    flex: 1,
    justifyContent: 'center',
  },

  infoProduct: {
    flex: 2,
  },

  button: {
    ...general.button,
    marginBottom: 10,
  },

  buttonText: {
    ...general.buttonText,
  },

  textLabel: {
    fontSize: fonts.regular,
    color: colors.regular,
    fontWeight: 'bold',
  },

  textValue: {
    marginTop: 8,
    fontSize: fonts.regular,
    marginBottom: 24,
    color: colors.dark,
    fontWeight: 'bold',
  },

  linkButton: {
    ...general.linkButton,
  },

  linkButtonText: {
    ...general.linkButtonText,
  },
});

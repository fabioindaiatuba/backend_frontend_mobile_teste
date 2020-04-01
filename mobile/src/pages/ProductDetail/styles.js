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
    justifyContent: 'space-between',
  },

  list: {
    flex: 1,
    marginTop: metrics.baseMargin,
    borderRadius: 5,
  },

  itemList: {
    padding: metrics.baseMargin,
    backgroundColor: colors.light,
    marginBottom: 5,
    borderRadius: 5,
  },

  groupText: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  textLabel: {
    fontSize: fonts.regular,
    color: colors.regular,
    marginRight: 5,
    fontWeight: 'bold',
  },

  textValue: {
    fontSize: fonts.regular,
    color: colors.dark,
    fontWeight: 'bold',
  },
});

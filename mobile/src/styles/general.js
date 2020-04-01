import metrics from './metrics';
import colors from './colors';
import fonts from './fonts';

const general = {
  container: {
    flex: 1,
    paddingHorizontal: metrics.basePadding,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: metrics.baseMargin,
  },

  headerTitle: {
    marginLeft: metrics.baseMargin,
    fontSize: fonts.big,
  },

  button: {
    backgroundColor: colors.primary,
    borderRadius: 5,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },

  buttonText: {
    color: colors.lighter,
    fontSize: fonts.regular,
    fontWeight: 'bold',
  },

  linkButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 5,
    backgroundColor: colors.secundary,
    padding: 5,
  },

  linkButtonText: {
    color: colors.lighter,
    fontSize: fonts.medium,
    fontWeight: 'normal',
  },

  textInput: {
    borderRadius: 5,
    borderWidth: 1,
    borderColor: colors.regular,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
};

export default general;

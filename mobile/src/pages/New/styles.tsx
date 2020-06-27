import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },

  main: {
    flex: 1,
    justifyContent: 'center',
  },

  title: {
    color: '#322153',
    fontSize: 25,
    fontFamily: 'Ubuntu_700Bold',
    maxWidth: 260,
    marginTop: 30,
  },

  description: {
    color: '#6C6C80',
    fontSize: 16,
    marginTop: 5,
    fontFamily: 'Roboto_400Regular'
  },

  footer: {},

  select: {},

  input: {
    height: 60,
    backgroundColor: '#FFF',
    borderRadius: 10,
    marginBottom: 8,
    paddingHorizontal: 10,
    fontSize: 16,
  },

  button: {
    backgroundColor: '#8E44AD',
    height: 60,
    flexDirection: 'row',
    borderRadius: 10,
    overflow: 'hidden',
    alignItems: 'center',
    marginTop: 2,
  },

  buttonIcon: {
    height: 60,
    width: 60,
    backgroundColor: '#76448A',
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonText: {
    flex: 1,
    justifyContent: 'center',
    textAlign: 'center',
    color: '#FFF',
    fontFamily: 'Roboto_500Medium',
    fontSize: 16,
  },
});

export default styles;

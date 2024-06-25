import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    backgroundColor: '#f8f8f8',
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 30,
    backgroundColor: '#007BFF',
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    lineHeight: 25,
  },
  movieContainer: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  image: {
    width: 100,
    height: 150,
  },
  movieDetails: {
    flex: 1,
    paddingLeft: 10,
    justifyContent: 'center',
  },
  title: {
    fontSize: 18,
    color: '#000',
    marginBottom: 5,
  },
  rating: {
    fontSize: 16,
    color: '#000',
    marginBottom: 5,
  },
  loadingText: {
    fontSize: 18,
    color: '#000',
    textAlign: 'center',
    marginTop: 20,
  },
});

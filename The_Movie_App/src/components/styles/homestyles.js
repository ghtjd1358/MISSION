import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  scrollViewContent: {
    paddingVertical: 16,
  },
  container: {
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
    textAlign: 'left',
  },
  movieItem: {
    marginRight: 16,
    width: 140,
  },
  poster: {
    width: '100%',
    height: 210,
    borderRadius: 8,
  },
  movieTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 8,
    marginBottom: 4,
    color: '#333',
  },
  movieRating: {
    fontSize: 14,
    color: 'gray',
  },
  buttonContainer : {
    flexDirection : 'row',
    justifyContent : 'space-between',
    marginTop : 26,
  },
  moreButtonText : {
    color : 'black',
    fontWeight : 'bold',
    fontSize : 14,
    lineHeight : 50,
    shadowOffset : '0 0 0 1'
  },
  icons : {
    marginRight : 20,
  }
});

export default styles;

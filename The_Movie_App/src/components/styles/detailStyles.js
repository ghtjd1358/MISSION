import  { StyleSheet }  from 'react-native';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      padding: 10,
    },
    movieInfoContainer: {
      flexDirection: 'row',
      marginBottom: 20,
    },
    movieImage: {
      width: 160,
      height: 250,
      borderRadius: 10,
    },
    movieDetailsContainer: {
      flex: 1,
      marginLeft: 15,
    },
    movieTitle: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 10,
      color : '#000'
    },
    movieRating: {
      fontSize: 16,
      marginBottom: 5,
      color : '#000'
    },
    movieDetail: {
      fontSize: 14,
      marginBottom: 3,
      color : '#000'
    },
    movieDescription: {
      fontSize: 16,
      marginBottom: 20,
      color : '#000'
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 10,
      color : '#000'
    },
    actorContainer: {
      alignItems: 'center',
      marginRight: 10,
    },
    actorImage: {
      width: 100,
      height: 150,
      borderRadius: 10,
      marginBottom: 5,
    },
    actorName: {
      fontSize: 14,
      fontWeight: 'bold',
      color : '#000'
    },
    actorCharacter: {
      fontSize: 12,
      color: 'gray',
      textAlign: 'center',
      color : 'green'
    },
    videoContainer: {
      alignItems: 'center',
      marginRight: 10,
    },
    videoThumbnail: {
      width: 150,
      height: 100,
      borderRadius: 10,
      marginBottom: 5,
    },
    videoLink: {
      fontSize: 14,
      color : '#000',
      textAlign: 'center',
    },
    similarMovieContainer: {
      alignItems: 'center',
      marginRight: 10,
    },
    similarMovie: {
      width: 100,
      height: 150,
      borderRadius: 10,
      marginBottom: 5,
    },
    similarMovieTitle: {
      fontSize: 14,
      textAlign: 'center',
    },
  });


  export default styles